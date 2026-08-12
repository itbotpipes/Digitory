'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

type SeoEntry = {
  _id: string;
  pageType: 'Post' | 'Page' | 'Solution';
  name: string;
  url: string;
  slug: string;
  status: string;
  updatedAt: string;
  seo: {
    _id?: string;
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    robotsIndex?: 'index' | 'noindex';
    robotsFollow?: 'follow' | 'nofollow';
    openGraph?: { title?: string; description?: string; image?: string };
    twitterCard?: { title?: string; description?: string; image?: string };
  } | null;
};

type SeoForm = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  robotsIndex: 'index' | 'noindex';
  robotsFollow: 'follow' | 'nofollow';
  openGraph: { title: string; description: string; image: string };
  twitterCard: { title: string; description: string; image: string };
};

const EMPTY_SEO: SeoForm = {
  title: '',
  description: '',
  keywords: [],
  canonicalUrl: '',
  robotsIndex: 'index',
  robotsFollow: 'follow',
  openGraph: { title: '', description: '', image: '' },
  twitterCard: { title: '', description: '', image: '' },
};

export default function SeoManagementPage() {
  const [pages, setPages] = useState<SeoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'website' | 'blogs'>('website');
  const [editing, setEditing] = useState<SeoEntry | null>(null);
  const [form, setForm] = useState<SeoForm>({ ...EMPTY_SEO });
  const [keywordsInput, setKeywordsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'og' | 'twitter' | 'robots'>('basic');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { window.location.href = '/admin/login'; return; }
    fetchData(token);
    fetchAnalytics(token);
  }, []);

  const fetchData = async (token: string) => {
    setLoading(true);
    try {
      const res = await api.get('/seo', token);
      setPages(res.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchAnalytics = async (token: string) => {
    try {
      const res = await api.get('/seo/analytics', token);
      setAnalytics(res.data);
    } catch (err) { console.error(err); }
  };

  const websitePages = pages.filter(p => p.pageType === 'Page' || p.pageType === 'Solution');
  const blogPages = pages.filter(p => p.pageType === 'Post');
  const displayed = activeSection === 'website' ? websitePages : blogPages;

  const openEditor = (page: SeoEntry) => {
    setEditing(page);
    setActiveTab('basic');
    setMessage('');
    const seo = page.seo;
    setForm({
      title: seo?.title || '',
      description: seo?.description || '',
      keywords: seo?.keywords || [],
      canonicalUrl: seo?.canonicalUrl || '',
      robotsIndex: (seo?.robotsIndex as 'index' | 'noindex') || 'index',
      robotsFollow: (seo?.robotsFollow as 'follow' | 'nofollow') || 'follow',
      openGraph: { title: seo?.openGraph?.title || '', description: seo?.openGraph?.description || '', image: seo?.openGraph?.image || '' },
      twitterCard: { title: seo?.twitterCard?.title || '', description: seo?.twitterCard?.description || '', image: seo?.twitterCard?.image || '' },
    });
    setKeywordsInput((seo?.keywords || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('admin_token') || '';
      const keywords = keywordsInput.split(',').map(k => k.trim()).filter(Boolean);
      const payload = { ...form, keywords, pageId: editing._id, pageType: editing.pageType };
      await api.post('/seo', payload, token);
      setMessage('✅ SEO saved successfully!');
      const t = localStorage.getItem('admin_token') || '';
      await fetchData(t);
      await fetchAnalytics(t);
    } catch (err: any) {
      setMessage('❌ ' + (err.message || 'Failed to save SEO'));
    } finally {
      setSaving(false);
    }
  };

  const getSeoScore = (seo: SeoEntry['seo']) => {
    if (!seo) return { score: 0, color: 'text-red-500', bg: 'bg-red-500' };
    let score = 0;
    if (seo.title) score += 40;
    if (seo.description) score += 35;
    if (seo.keywords && seo.keywords.length > 0) score += 15;
    if (seo.openGraph?.title || seo.openGraph?.description) score += 10;
    const color = score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';
    const bg = score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    return { score, color, bg };
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0b] text-zinc-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">SEO Management</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Manage meta titles, descriptions, and social tags for every page.</p>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'SEO Score', value: `${analytics.score}%`, color: analytics.score >= 70 ? 'text-green-500' : analytics.score >= 40 ? 'text-yellow-500' : 'text-red-500' },
              { label: 'Missing Titles', value: analytics.missingTitle, color: analytics.missingTitle > 0 ? 'text-red-500' : 'text-green-500' },
              { label: 'Missing Descriptions', value: analytics.missingDesc, color: analytics.missingDesc > 0 ? 'text-orange-500' : 'text-green-500' },
              { label: 'No-Index Pages', value: analytics.noIndex, color: analytics.noIndex > 0 ? 'text-yellow-500' : 'text-green-500' },
            ].map(card => (
              <div key={card.label} className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">{card.label}</p>
                <p className={`text-2xl font-extrabold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6">
          {(['website', 'blogs'] as const).map(section => (
            <button
              key={section}
              onClick={() => { setActiveSection(section); setEditing(null); }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeSection === section
                  ? 'bg-[#FF4F18] text-white shadow-[0_4px_14px_rgba(255,79,24,0.35)]'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-[#FF4F18]/40'
              }`}
            >
              {section === 'website' ? '🌐 Website Pages' : '📝 Blog Posts'}
              <span className="ml-2 text-xs opacity-70">
                ({section === 'website' ? websitePages.length : blogPages.length})
              </span>
            </button>
          ))}
        </div>

        {/* Main Content: Table + Editor side by side */}
        <div className="flex gap-6 items-start">
          {/* Pages Table */}
          <div className="flex-1 min-w-0 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-zinc-400">
                <div className="w-8 h-8 border-2 border-[#FF4F18] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Loading pages...
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500 font-extrabold">
                  <tr>
                    <th className="px-5 py-3 text-left">Page</th>
                    <th className="px-5 py-3 text-left hidden lg:table-cell">URL</th>
                    <th className="px-5 py-3 text-left">SEO Score</th>
                    <th className="px-5 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {displayed.length === 0 && (
                    <tr><td colSpan={4} className="px-5 py-10 text-center text-zinc-400 text-sm">No {activeSection} pages found.</td></tr>
                  )}
                  {displayed.map(page => {
                    const { score, color, bg } = getSeoScore(page.seo);
                    const isSelected = editing?._id === page._id;
                    return (
                      <tr
                        key={page._id}
                        onClick={() => openEditor(page)}
                        className={`cursor-pointer transition-colors group ${isSelected ? 'bg-[#FFF3EF] dark:bg-orange-950/20' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                      >
                        <td className="px-5 py-3.5">
                          <div className="font-semibold text-zinc-900 dark:text-white">{page.name}</div>
                          <div className="text-xs text-zinc-500 mt-0.5 capitalize">{page.pageType}</div>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <span className="text-xs text-zinc-400 font-mono truncate max-w-[150px] block">{page.url || `/${page.slug}`}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                              <div className={`h-full ${bg} rounded-full transition-all`} style={{ width: `${score}%` }} />
                            </div>
                            <span className={`text-xs font-bold ${color}`}>{score}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-bold transition-colors ${isSelected ? 'text-[#FF4F18]' : 'text-zinc-400 group-hover:text-[#FF4F18]'}`}>
                            {isSelected ? 'Editing ›' : 'Edit ›'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* SEO Editor Panel */}
          {editing ? (
            <div className="w-[420px] flex-shrink-0 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="font-extrabold text-base text-zinc-900 dark:text-white truncate">{editing.name}</h2>
                <p className="text-xs text-zinc-400 font-mono">{editing.url || `/${editing.slug}`}</p>
              </div>

              {/* Sub-tabs */}
              <div className="flex border-b border-zinc-100 dark:border-zinc-800 text-xs font-bold">
                {(['basic', 'og', 'twitter', 'robots'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 capitalize transition-colors ${activeTab === tab ? 'text-[#FF4F18] border-b-2 border-[#FF4F18]' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
                  >
                    {tab === 'og' ? 'OG' : tab === 'twitter' ? 'Twitter' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col">
                <div className="p-5 space-y-4 flex-1">
                  {activeTab === 'basic' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Meta Title</label>
                        <input
                          value={form.title}
                          onChange={e => setForm({ ...form, title: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
                          placeholder="Page Title | Brand Name"
                        />
                        <div className={`text-xs mt-1 ${form.title.length > 60 ? 'text-red-500' : 'text-zinc-400'}`}>{form.title.length}/60 chars</div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Meta Description</label>
                        <textarea
                          value={form.description}
                          onChange={e => setForm({ ...form, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18] resize-none"
                          placeholder="A compelling description for search engines..."
                        />
                        <div className={`text-xs mt-1 ${form.description.length > 160 ? 'text-red-500' : 'text-zinc-400'}`}>{form.description.length}/160 chars</div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Keywords</label>
                        <input
                          value={keywordsInput}
                          onChange={e => setKeywordsInput(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
                          placeholder="keyword1, keyword2, keyword3"
                        />
                        <p className="text-xs text-zinc-400 mt-1">Separate with commas</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Canonical URL</label>
                        <input
                          value={form.canonicalUrl}
                          onChange={e => setForm({ ...form, canonicalUrl: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
                          placeholder="https://digitory.io/page"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'og' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">OG Title</label>
                        <input value={form.openGraph.title} onChange={e => setForm({ ...form, openGraph: { ...form.openGraph, title: e.target.value } })}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
                          placeholder="Social share title..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">OG Description</label>
                        <textarea value={form.openGraph.description} onChange={e => setForm({ ...form, openGraph: { ...form.openGraph, description: e.target.value } })}
                          rows={3} className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18] resize-none"
                          placeholder="Social share description..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">OG Image URL</label>
                        <input value={form.openGraph.image} onChange={e => setForm({ ...form, openGraph: { ...form.openGraph, image: e.target.value } })}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
                          placeholder="https://..." />
                        {form.openGraph.image && (
                          <img src={form.openGraph.image} alt="OG Preview" className="mt-2 w-full h-24 object-cover rounded-lg border border-zinc-200 dark:border-zinc-700" onError={e => (e.currentTarget.style.display = 'none')} />
                        )}
                      </div>
                    </>
                  )}

                  {activeTab === 'twitter' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Twitter Title</label>
                        <input value={form.twitterCard.title} onChange={e => setForm({ ...form, twitterCard: { ...form.twitterCard, title: e.target.value } })}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
                          placeholder="Twitter card title..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Twitter Description</label>
                        <textarea value={form.twitterCard.description} onChange={e => setForm({ ...form, twitterCard: { ...form.twitterCard, description: e.target.value } })}
                          rows={3} className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18] resize-none"
                          placeholder="Twitter card description..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-1">Twitter Image URL</label>
                        <input value={form.twitterCard.image} onChange={e => setForm({ ...form, twitterCard: { ...form.twitterCard, image: e.target.value } })}
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
                          placeholder="https://..." />
                      </div>
                    </>
                  )}

                  {activeTab === 'robots' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-2">Index Setting</label>
                        <div className="flex gap-4">
                          {(['index', 'noindex'] as const).map(val => (
                            <label key={val} className="flex items-center gap-2 cursor-pointer font-semibold text-sm">
                              <input type="radio" name="robotsIndex" value={val} checked={form.robotsIndex === val}
                                onChange={() => setForm({ ...form, robotsIndex: val })} className="accent-[#FF4F18]" />
                              <span className="capitalize">{val}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500 mb-2">Follow Setting</label>
                        <div className="flex gap-4">
                          {(['follow', 'nofollow'] as const).map(val => (
                            <label key={val} className="flex items-center gap-2 cursor-pointer font-semibold text-sm">
                              <input type="radio" name="robotsFollow" value={val} checked={form.robotsFollow === val}
                                onChange={() => setForm({ ...form, robotsFollow: val })} className="accent-[#FF4F18]" />
                              <span className="capitalize">{val}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl text-xs font-semibold ${form.robotsIndex === 'noindex' ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400' : 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'}`}>
                        {form.robotsIndex === 'noindex' ? '⚠️ This page will NOT be indexed by search engines.' : '✅ This page will be indexed by search engines.'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Save */}
                <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/80">
                  {message && (
                    <p className={`text-xs font-semibold mb-3 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
                  )}
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditing(null)}
                      className="flex-1 py-2.5 rounded-full text-sm font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={saving}
                      className="flex-1 bg-[#FF4F18] hover:bg-[#E03F0D] text-white py-2.5 rounded-full text-sm font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                      {saving ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving...</>) : 'Save SEO'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-[380px] flex-shrink-0 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center min-h-[300px]">
              <div className="text-center p-8">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Click any row to edit its SEO</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
