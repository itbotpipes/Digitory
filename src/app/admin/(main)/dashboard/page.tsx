'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'contacts' | 'blogs' | 'solutions' | 'comments'>('leads');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Monitor your leads, content, and engagement metrics.</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800/80 pb-4 overflow-x-auto custom-scrollbar">
        {[
          { id: 'leads', label: 'Demo Requests' },
          { id: 'contacts', label: 'Contact Messages' },
          { id: 'blogs', label: 'Blog Posts' },
          { id: 'solutions', label: 'Solutions' },
          { id: 'comments', label: 'Comments' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 font-bold rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-[#FF4F18] text-white shadow-[0_4px_12px_rgba(255,79,24,0.3)]' 
                : 'bg-zinc-100 dark:bg-[#1A1A1D] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#252528] hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
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
    </div>
  );
}


