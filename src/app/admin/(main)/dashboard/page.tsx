'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab') || 'leads';
  const activeTab = ['leads', 'contacts', 'blogs', 'solutions', 'comments', 'users'].includes(tabParam)
    ? (tabParam as 'leads' | 'contacts' | 'blogs' | 'solutions' | 'comments' | 'users')
    : 'leads';

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [roles, setRoles] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', roleId: '' });
  const [creatingUser, setCreatingUser] = useState(false);

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
      if (activeTab === 'blogs') endpoint = '/posts';
      if (activeTab === 'solutions') endpoint = '/solutions';
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
    </div>
  );
}


