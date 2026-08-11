'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab') || 'leads';
  const activeTab = ['leads', 'contacts', 'updates', 'blogs', 'solutions', 'industries', 'comments', 'users'].includes(tabParam)
    ? (tabParam as 'leads' | 'contacts' | 'updates' | 'blogs' | 'solutions' | 'industries' | 'comments' | 'users')
    : 'leads';

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [roles, setRoles] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', roleId: '' });
  const [creatingUser, setCreatingUser] = useState(false);

  // Updates management states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<any | null>(null);
  const [updateForm, setUpdateForm] = useState({
    title: '',
    category: 'PRODUCT UPDATE',
    excerpt: '',
    content: '',
    featuredImage: '',
    publishedAt: ''
  });
  const [savingUpdate, setSavingUpdate] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show instant local preview while uploading to Cloudinary
    const localUrl = URL.createObjectURL(file);
    setImagePreviewUrl(localUrl);
    setUploadingImage(true);

    try {
      const token = localStorage.getItem('admin_token') || '';
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/media`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const json = await res.json();
      const cloudUrl: string = json.data?.url || json.url;
      // Replace local blob URL with Cloudinary URL
      setImagePreviewUrl(cloudUrl);
      setUpdateForm(prev => ({ ...prev, featuredImage: cloudUrl }));
    } catch (err: any) {
      console.error(err);
      setImagePreviewUrl(null);
      setUpdateForm(prev => ({ ...prev, featuredImage: '' }));
      alert(err.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
      URL.revokeObjectURL(localUrl);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        api.get('/users/roles', token).then((res) => {
          setRoles(res.data || []);
          if (res.data && res.data.length > 0 && !newUser.roleId) {
            setNewUser((prev) => ({ ...prev, roleId: res.data[0]._id }));
          }
        }).catch(console.error);
      }
    }
  }, [activeTab]);

  useEffect(() => {
    setData([]); // Clear old tab data to prevent rendering mismatch crashes
    const token = localStorage.getItem('admin_token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    fetchData(token);
  }, [activeTab]);

  const fetchData = async (token: string) => {
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'leads') endpoint = '/demo-requests';
      if (activeTab === 'contacts') endpoint = '/contact-messages';
      if (activeTab === 'updates') endpoint = '/updates';
      if (activeTab === 'blogs') endpoint = '/posts?limit=50';
      if (activeTab === 'solutions') endpoint = '/solutions?limit=20';
      if (activeTab === 'industries') endpoint = '/industries?limit=20';
      if (activeTab === 'comments') endpoint = '/comments';
      if (activeTab === 'users') endpoint = '/users';

      const res = await api.get(endpoint, token);
      setData(res.data?.docs || res.data?.results || res.data || []);
    } catch (err: any) {
      console.error(err);
      if (err.message && (err.message.includes('jwt expired') || err.message.includes('Invalid token'))) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await api.delete(`/comments/${id}`, token || '');
      setData((prev) => prev.filter((item: any) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete comment');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await api.delete(`/users/${id}`, token || '');
      setData((prev) => prev.filter((item: any) => item._id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to delete user');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await api.post('/users', newUser, token || '');
      const createdUser = res.data?.doc || res.data || res;
      setData((prev) => [createdUser, ...prev]);
      setShowCreateModal(false);
      setNewUser({ name: '', email: '', password: '', roleId: roles[0]?._id || '' });
      alert('User created successfully');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to create user');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUpdate = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await api.delete(`/updates/${id}`, token || '');
      setData((prev) => prev.filter((item: any) => item._id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to delete announcement');
    }
  };

  const handleOpenCreateUpdate = () => {
    setEditingUpdate(null);
    setUpdateForm({
      title: '',
      category: 'PRODUCT UPDATE',
      excerpt: '',
      content: '',
      featuredImage: '',
      publishedAt: new Date().toISOString().split('T')[0]
    });
    setImagePreviewUrl(null);
    setShowUpdateModal(true);
  };

  const handleOpenEditUpdate = (item: any) => {
    setEditingUpdate(item);
    setUpdateForm({
      title: item.title || '',
      category: item.category || 'PRODUCT UPDATE',
      excerpt: item.excerpt || '',
      content: item.content || '',
      featuredImage: item.featuredImage || '',
      publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().split('T')[0] : ''
    });
    setImagePreviewUrl(item.featuredImage || null);
    setShowUpdateModal(true);
  };

  const handleSaveUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingUpdate(true);
    try {
      const token = localStorage.getItem('admin_token') || '';
      
      let res;
      if (editingUpdate) {
        res = await api.put(`/updates/${editingUpdate._id}`, updateForm, token);
        const updated = res.data?.doc || res.data || res;
        setData((prev) => prev.map((item: any) => item._id === editingUpdate._id ? updated : item));
        alert('Announcement updated successfully');
      } else {
        res = await api.post('/updates', updateForm, token);
        const created = res.data?.doc || res.data || res;
        setData((prev) => [created, ...prev]);
        alert('Announcement created successfully');
      }
      setShowUpdateModal(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to save announcement');
    } finally {
      setSavingUpdate(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Monitor your leads, content, and engagement metrics.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-32 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-[#FF4F18] rounded-full animate-spin mb-4"></div>
          Loading data...
        </div>
      ) : (
        <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
          {activeTab === 'updates' && (
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex justify-end bg-zinc-50/50 dark:bg-black/20">
              <button 
                onClick={handleOpenCreateUpdate}
                className="bg-[#FF4F18] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#E03F0D] transition-colors shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] transform hover:-translate-y-0.5 duration-200"
              >
                + Create Announcement
              </button>
            </div>
          )}
          {activeTab === 'blogs' && (
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex justify-end bg-zinc-50/50 dark:bg-black/20">
              <Link href="/admin/blogs/add" className="bg-[#FF4F18] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#E03F0D] transition-colors shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] transform hover:-translate-y-0.5 duration-200">
                + Create New Post
              </Link>
            </div>
          )}
          {activeTab === 'solutions' && (
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex justify-end bg-zinc-50/50 dark:bg-black/20">
              <Link href="/admin/solutions/new" className="bg-[#FF4F18] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#E03F0D] transition-colors shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] transform hover:-translate-y-0.5 duration-200">
                + Create New Solution
              </Link>
            </div>
          )}
          {activeTab === 'industries' && (
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex justify-end bg-zinc-50/50 dark:bg-black/20">
              <Link href="/admin/industries/new" className="bg-[#FF4F18] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#E03F0D] transition-colors shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] transform hover:-translate-y-0.5 duration-200">
                + Create New Industry
              </Link>
            </div>
          )}
          {activeTab === 'users' && (
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex justify-end bg-zinc-50/50 dark:bg-black/20">
              <button 
                onClick={() => setShowCreateModal(true)} 
                className="bg-[#FF4F18] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#E03F0D] transition-colors shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] transform hover:-translate-y-0.5 duration-200"
              >
                + Create New User
              </button>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80 uppercase text-[11px] tracking-wider font-extrabold">
                <tr>
                  {activeTab === 'leads' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Phone</th>
                      <th className="px-6 py-4 font-semibold">Locations</th>
                      <th className="px-6 py-4 font-semibold">Goal</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </>
                  )}
                  {activeTab === 'contacts' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Phone</th>
                      <th className="px-6 py-4 font-semibold">Interested In</th>
                      <th className="px-6 py-4 font-semibold">Message</th>
                    </>
                  )}
                  {activeTab === 'updates' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold">Category</th>
                      <th className="px-6 py-4 font-semibold">Date Published</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </>
                  )}
                  {activeTab === 'blogs' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold">Slug</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </>
                  )}
                  {activeTab === 'solutions' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold">Slug</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </>
                  )}
                  {activeTab === 'industries' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold">Slug</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </>
                  )}
                  {activeTab === 'comments' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Comment</th>
                      <th className="px-6 py-4 font-semibold">Post</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </>
                  )}
                  {activeTab === 'users' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Date Created</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                {data.map((item: any, i: number) => (
                  <tr key={item._id || i} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors group">
                    {activeTab === 'leads' && (
                      <>
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.phone}</td>
                        <td className="px-6 py-4">{item.locations}</td>
                        <td className="px-6 py-4 max-w-[200px] truncate">{item.goal}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'New' ? 'bg-[#FFF3EF] text-[#FF4F18] dark:bg-orange-500/10 dark:text-orange-400' : 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'}`}>
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === 'contacts' && (
                      <>
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.phone}</td>
                        <td className="px-6 py-4">{item.interested}</td>
                        <td className="px-6 py-4 max-w-[300px] truncate">{item.message}</td>
                      </>
                    )}
                    {activeTab === 'updates' && (
                      <>
                        <td className="px-6 py-4 font-medium max-w-[250px] truncate">{item.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                            {typeof item.category === 'object' && item.category ? item.category.name : (item.category || 'PRODUCT UPDATE')}
                          </span>
                        </td>
                        <td className="px-6 py-4">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-6 py-4 space-x-2">
                          <button 
                            onClick={() => handleOpenEditUpdate(item)} 
                            className="text-[#FF4F18] font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteUpdate(item._id)} 
                            className="text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                    {activeTab === 'blogs' && (
                      <>
                        <td className="px-6 py-4 font-medium max-w-[250px] truncate">{item.title}</td>
                        <td className="px-6 py-4">{item.slug}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase ${item.status === 'Published' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                             {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/admin/blogs/${item._id}`} className="text-[#FF4F18] font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                            Edit Post
                          </Link>
                        </td>
                      </>
                    )}
                    {activeTab === 'solutions' && (
                      <>
                        <td className="px-6 py-4 font-medium max-w-[250px] truncate">{item.title}</td>
                        <td className="px-6 py-4">{item.slug}</td>
                        <td className="px-6 py-4">
                          <Link href={`/admin/solutions/${item._id}`} className="text-[#FF4F18] font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                            Edit Solution
                          </Link>
                        </td>
                      </>
                    )}
                    {activeTab === 'industries' && (
                      <>
                        <td className="px-6 py-4 font-medium max-w-[250px] truncate">{item.title}</td>
                        <td className="px-6 py-4">{item.slug}</td>
                        <td className="px-6 py-4">
                          <Link href={`/admin/industries/${item._id}`} className="text-[#FF4F18] font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                            Edit Industry
                          </Link>
                        </td>
                      </>
                    )}
                    {activeTab === 'comments' && (
                      <>
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4 max-w-[300px] truncate">{item.text}</td>
                        <td className="px-6 py-4 max-w-[200px] truncate">{item.post?.title || 'Unknown Post'}</td>
                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDeleteComment(item._id)} className="text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                    {activeTab === 'users' && (
                      <>
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3EF] text-[#FF4F18]">
                            {item.roleId?.name || 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDeleteUser(item._id)} className="text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-zinc-500">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10">
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white mb-6">Create New User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name</label>
                <input 
                  type="text" 
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Password</label>
                <input 
                  type="password" 
                  required
                  minLength={8}
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Role</label>
                <select 
                  required
                  value={newUser.roleId}
                  onChange={(e) => setNewUser(prev => ({ ...prev, roleId: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white cursor-pointer"
                >
                  <option value="" disabled>Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>{role.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={creatingUser}
                  className="flex-1 bg-[#FF4F18] hover:bg-[#E03F0D] text-white py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  {creatingUser ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setShowUpdateModal(false)} />
          <div className="relative bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10">
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white mb-6">
              {editingUpdate ? 'Edit Announcement' : 'Create Announcement'}
            </h2>
            <form onSubmit={handleSaveUpdate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Title</label>
                <input 
                  type="text" 
                  required
                  value={updateForm.title}
                  onChange={(e) => setUpdateForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Announcement title"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Category</label>
                  <select 
                    required
                    value={updateForm.category}
                    onChange={(e) => setUpdateForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white cursor-pointer"
                  >
                    <option value="PRODUCT UPDATE">Product Update</option>
                    <option value="INTEGRATION">Integration</option>
                    <option value="NEW FEATURE">New Feature</option>
                    <option value="GUIDE">Guide</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Publish Date</label>
                  <input 
                    type="date" 
                    required
                    value={updateForm.publishedAt}
                    onChange={(e) => setUpdateForm(prev => ({ ...prev, publishedAt: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Excerpt / Brief Description</label>
                <textarea 
                  required
                  rows={2}
                  value={updateForm.excerpt}
                  onChange={(e) => setUpdateForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Short summary displayed on list card..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Detail Content (Optional)</label>
                <textarea 
                  rows={4}
                  value={updateForm.content}
                  onChange={(e) => setUpdateForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full announcement content..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Featured Image</label>
                <div className="flex flex-col gap-3">
                  {/* Live preview (local blob → Cloudinary URL after upload) */}
                  {imagePreviewUrl && (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 group">
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="text-white text-xs font-semibold">Uploading to Cloudinary...</span>
                        </div>
                      )}
                      {!uploadingImage && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                          <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            className="bg-white/90 text-zinc-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white transition-colors"
                          >
                            Change Image
                          </button>
                          <button
                            type="button"
                            onClick={() => { setImagePreviewUrl(null); setUpdateForm(prev => ({ ...prev, featuredImage: '' })); }}
                            className="bg-red-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {!imagePreviewUrl && (
                    <div
                      className="relative flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors cursor-pointer group"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <svg className="w-8 h-8 text-zinc-400 mb-2 group-hover:text-[#FF4F18] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-[#FF4F18] transition-colors">
                        Click to upload image
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-1">PNG, JPG, WEBP up to 10MB</span>
                    </div>
                  )}

                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 px-4 py-2.5 font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={savingUpdate}
                  className="flex-1 bg-[#FF4F18] hover:bg-[#E03F0D] text-white py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  {savingUpdate ? 'Saving...' : (editingUpdate ? 'Save Changes' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


