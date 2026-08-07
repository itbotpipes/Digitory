'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Trash2 } from 'lucide-react';

export default function RedirectsManager() {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newRedirect, setNewRedirect] = useState({ oldUrl: '', newUrl: '', status: 301, isEnabled: true });

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const token = localStorage.getItem('admin_token') || '';
      const res = await api.get('/redirects', token);
      if (res.data) setRedirects(res.data);
    } catch (error) {
      console.error('Failed to fetch redirects', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin_token') || '';
      await api.post('/redirects', newRedirect, token);
      setShowAdd(false);
      setNewRedirect({ oldUrl: '', newUrl: '', status: 301, isEnabled: true });
      fetchRedirects();
    } catch (error) {
      console.error(error);
      alert('Failed to add redirect');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete redirect?')) return;
    try {
      const token = localStorage.getItem('admin_token') || '';
      await api.delete(`/redirects/${id}`, token);
      setRedirects(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete redirect');
    }
  };

  const toggleEnabled = async (id: string, current: boolean) => {
    try {
      const token = localStorage.getItem('admin_token') || '';
      await api.put(`/redirects/${id}`, { isEnabled: !current }, token);
      setRedirects(prev => prev.map(r => r._id === id ? { ...r, isEnabled: !current } : r));
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-6 md:p-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Redirect Manager</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Manage 301 and 302 redirects seamlessly.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 bg-[#FF4F18] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#E03F0D] transition-all duration-200 shadow-[0_4px_14px_rgba(255,79,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,79,24,0.4)] transform hover:-translate-y-0.5"
        >
          <Plus size={18} /> Add Redirect
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 mb-8 grid grid-cols-1 sm:grid-cols-5 gap-6 items-end animate-fade-in shadow-sm">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Old URL Path</label>
            <input type="text" value={newRedirect.oldUrl} onChange={e => setNewRedirect({...newRedirect, oldUrl: e.target.value})} placeholder="/old-path" required className="w-full bg-white dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">New URL Path</label>
            <input type="text" value={newRedirect.newUrl} onChange={e => setNewRedirect({...newRedirect, newUrl: e.target.value})} placeholder="/new-path" required className="w-full bg-white dark:bg-[#1A1A1D] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] text-sm text-zinc-900 dark:text-white transition-all" />
          </div>
          <div>
            <button type="submit" className="w-full bg-[#FF4F18] text-white font-bold py-3 rounded-xl hover:bg-[#E03F0D] transition-colors shadow-sm">
              Save Redirect
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80 uppercase text-[11px] tracking-wider font-extrabold">
            <tr>
              <th className="px-6 py-4">Old URL</th>
              <th className="px-6 py-4">New URL</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-16 text-center text-zinc-400 font-semibold animate-pulse">Loading redirects...</td></tr>
            ) : redirects.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-16 text-center text-zinc-500">No redirects found.</td></tr>
            ) : (
              redirects.map(redirect => (
                <tr key={redirect._id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors group">
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{redirect.oldUrl}</td>
                  <td className="px-6 py-4 text-[#FF4F18] font-bold">{redirect.newUrl}</td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 px-2 py-1 rounded-md font-bold text-xs">{redirect.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleEnabled(redirect._id, redirect.isEnabled)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${redirect.isEnabled ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-200'}`}
                    >
                      {redirect.isEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(redirect._id)} className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
