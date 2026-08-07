'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function SeoDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('admin_token') || '';
        const res = await api.get('/seo/analytics', token);
        setAnalytics(res.data);
      } catch (error) {
        console.error('Failed to fetch SEO analytics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="p-10 text-center text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center h-[400px]">
      <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-[#FF4F18] rounded-full animate-spin mb-4"></div>
      Loading Analytics...
    </div>
  );
  if (!analytics) return <div className="p-8 text-center text-red-500 font-bold">Failed to load analytics.</div>;

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-10 bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800/80">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">SEO Health Score</h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">A holistic overview of your website's search engine optimization performance and meta data coverage.</p>
        </div>
        <div className={`w-32 h-32 rounded-full border-[10px] flex items-center justify-center font-black text-4xl shadow-sm bg-white dark:bg-[#121214]
          ${analytics.score > 80 ? 'border-green-500 text-green-500' : analytics.score > 50 ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'}`}
        >
          {analytics.score}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Pages" value={analytics.totalEntries} />
        <StatCard title="Missing Titles" value={analytics.missingTitle} isWarning={analytics.missingTitle > 0} />
        <StatCard title="Missing Descriptions" value={analytics.missingDesc} isWarning={analytics.missingDesc > 0} />
        <StatCard title="Duplicate Titles" value={analytics.duplicateTitles} isWarning={analytics.duplicateTitles > 0} />
        <StatCard title="Duplicate Descriptions" value={analytics.duplicateDescriptions} isWarning={analytics.duplicateDescriptions > 0} />
        <StatCard title="No Index Pages" value={analytics.noIndex} />
      </div>
    </div>
  );
}

function StatCard({ title, value, isWarning = false }: { title: string, value: number, isWarning?: boolean }) {
  return (
    <div className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
      isWarning 
        ? 'border-red-200 bg-[#FFF3EF] dark:border-red-900/50 dark:bg-red-950/20' 
        : 'border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-[#1A1A1D]'
    }`}>
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isWarning ? 'text-[#FF4F18] dark:text-red-400' : 'text-zinc-500 dark:text-zinc-400'}`}>{title}</h3>
      <p className={`text-5xl font-black tracking-tighter ${isWarning ? 'text-[#FF4F18] dark:text-red-400' : 'text-zinc-900 dark:text-white'}`}>{value}</p>
    </div>
  );
}
