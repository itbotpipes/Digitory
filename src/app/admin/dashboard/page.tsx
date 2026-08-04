'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'contacts' | 'blogs'>('leads');
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

      const res = await api.get(endpoint, token);
      setData(res.data?.docs || res.data?.results || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-colors ${activeTab === 'leads' ? 'bg-[#FF4F18] text-white' : 'bg-zinc-100 dark:bg-zinc-900'}`}
        >
          Demo Requests
        </button>
        <button 
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-colors ${activeTab === 'contacts' ? 'bg-[#FF4F18] text-white' : 'bg-zinc-100 dark:bg-zinc-900'}`}
        >
          Contact Messages
        </button>
        <button 
          onClick={() => setActiveTab('blogs')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-colors ${activeTab === 'blogs' ? 'bg-[#FF4F18] text-white' : 'bg-zinc-100 dark:bg-zinc-900'}`}
        >
          Blog Posts
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500 font-semibold animate-pulse">Loading...</div>
      ) : (
        <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
          {activeTab === 'blogs' && (
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-end">
              <Link href="/admin/posts/new" className="bg-[#FF4F18] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#E03F0D] transition-colors">
                + Create New Post
              </Link>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {data.map((item: any, i: number) => (
                  <tr key={item._id || i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    {activeTab === 'leads' && (
                      <>
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.phone}</td>
                        <td className="px-6 py-4">{item.locations}</td>
                        <td className="px-6 py-4 max-w-[200px] truncate">{item.goal}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
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
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/admin/posts/${item._id}`} className="text-[#FF4F18] font-bold hover:underline">
                            Edit
                          </Link>
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
