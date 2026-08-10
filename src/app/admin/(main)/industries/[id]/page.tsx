'use client';

import React, { useState, useEffect, use } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

interface IndustryEditorProps {
  params: Promise<{ id: string }>;
}

export default function AdminIndustryEditor({ params }: IndustryEditorProps) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';

  const [formData, setFormData] = useState({
    slug: '',
    shortLabel: '',
    title: '',
    subtitle: '',
    description: '',
    trustText: '',
    icon: '',
    featuresTitle: '',
    features: [] as any[],
    whyChooseTitle: '',
    whyChoose: [] as string[],
    ctaBlock: { title: '', desc: '' },
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    if (!isNew) {
      fetchIndustry(token);
    }
  }, [isNew, resolvedParams.id]);

  const fetchIndustry = async (token: string) => {
    try {
      const res = await api.get(`/industries/${resolvedParams.id}`, token);
      const s = res.data;
      setFormData({
        slug: s.slug || '',
        shortLabel: s.shortLabel || '',
        title: s.title || '',
        subtitle: s.subtitle || '',
        description: s.description || '',
        trustText: s.trustText || '',
        icon: s.icon || '',
        featuresTitle: s.featuresTitle || '',
        features: s.features || [],
        whyChooseTitle: s.whyChooseTitle || '',
        whyChoose: s.whyChoose || [],
        ctaBlock: s.ctaBlock || { title: '', desc: '' },
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to load industry');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const token = localStorage.getItem('admin_token');

    try {
      if (isNew) {
        await api.post('/industries', formData, token!);
        setMessage('Industry created successfully!');
        setTimeout(() => { window.location.href = '/admin/dashboard?tab=industries'; }, 1000);
      } else {
        await api.put(`/industries/${resolvedParams.id}`, formData, token!);
        setMessage('Industry updated successfully!');
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Failed to save industry');
    } finally {
      setSaving(false);
    }
  };

  const addArrayItem = (key: string, defaultItem: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: [...prev[key], defaultItem] }));
  };

  const updateArrayItem = (key: string, index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newArray = [...prev[key]];
      if (typeof newArray[index] === 'string') {
        newArray[index] = value;
      } else {
        newArray[index][field] = value;
      }
      return { ...prev, [key]: newArray };
    });
  };

  const removeArrayItem = (key: string, index: number) => {
    setFormData((prev: any) => {
      const newArray = [...prev[key]];
      newArray.splice(index, 1);
      return { ...prev, [key]: newArray };
    });
  };

  const updateObjectField = (key: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const inputCls = 'w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]';
  const innerInputCls = 'w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900';

  if (loading) return <div className="p-8 text-center">Loading editor...</div>;

  return (
    <div className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h2 className="text-2xl font-bold">{isNew ? 'Create New Industry' : 'Edit Industry'}</h2>
        <Link href="/admin/dashboard?tab=industries" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium">
          &larr; Back to Dashboard
        </Link>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-6 font-medium ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* BASIC INFO */}
        <section className="space-y-6">
          <h3 className="text-lg font-extrabold text-[#FF4F18]">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Short Label (for menus) *</label>
              <input type="text" value={formData.shortLabel} onChange={e => setFormData({...formData, shortLabel: e.target.value})} required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trust Text</label>
              <input type="text" value={formData.trustText} onChange={e => setFormData({...formData, trustText: e.target.value})} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className={inputCls} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className={inputCls} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icon (SVG String)</label>
            <textarea value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} rows={2} className={`${inputCls} font-mono text-xs`} />
          </div>
        </section>

        {/* FEATURES */}
        <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#FF4F18]">Features</h3>
            <button type="button" onClick={() => addArrayItem('features', { title: '', desc: '', linkText: '', linkHref: '' })} className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700">+ Add Feature</button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Features Section Title</label>
            <input type="text" placeholder="e.g. Built for busy restaurants" value={formData.featuresTitle} onChange={e => setFormData({...formData, featuresTitle: e.target.value})} className={inputCls} />
          </div>
          {formData.features.map((item, idx) => (
            <div key={idx} className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 relative">
              <button type="button" onClick={() => removeArrayItem('features', idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-bold">Remove</button>
              <div className="space-y-3 pr-16">
                <input type="text" placeholder="Feature Title" value={item.title} onChange={e => updateArrayItem('features', idx, 'title', e.target.value)} className={innerInputCls} />
                <textarea placeholder="Feature Description" rows={2} value={item.desc} onChange={e => updateArrayItem('features', idx, 'desc', e.target.value)} className={innerInputCls} />
                <input type="text" placeholder="Link Text (optional)" value={item.linkText || ''} onChange={e => updateArrayItem('features', idx, 'linkText', e.target.value)} className={innerInputCls} />
                <input type="text" placeholder="Link URL (optional, e.g. /solutions/details?module=pos)" value={item.linkHref || ''} onChange={e => updateArrayItem('features', idx, 'linkHref', e.target.value)} className={innerInputCls} />
              </div>
            </div>
          ))}
        </section>

        {/* WHY CHOOSE */}
        <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#FF4F18]">Why Choose (bullet points)</h3>
            <button type="button" onClick={() => addArrayItem('whyChoose', '')} className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700">+ Add Point</button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Section Title</label>
            <input type="text" placeholder="e.g. Why choose Digitory?" value={formData.whyChooseTitle} onChange={e => setFormData({...formData, whyChooseTitle: e.target.value})} className={inputCls} />
          </div>
          {formData.whyChoose.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input type="text" placeholder={`Point ${idx + 1}`} value={item} onChange={e => updateArrayItem('whyChoose', idx, '', e.target.value)} className={`${innerInputCls} flex-1`} />
              <button type="button" onClick={() => removeArrayItem('whyChoose', idx)} className="text-red-500 hover:text-red-700 text-sm font-bold shrink-0">Remove</button>
            </div>
          ))}
        </section>

        {/* CTA BLOCK */}
        <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-extrabold text-[#FF4F18]">Bottom CTA Block</h3>
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <input type="text" placeholder="CTA Title" value={formData.ctaBlock.title} onChange={e => updateObjectField('ctaBlock', 'title', e.target.value)} className={innerInputCls} />
            <textarea placeholder="CTA Description" rows={3} value={formData.ctaBlock.desc} onChange={e => updateObjectField('ctaBlock', 'desc', e.target.value)} className={innerInputCls} />
          </div>
        </section>

        {/* SUBMIT */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-4 sticky bottom-6 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md p-4 rounded-2xl shadow-sm">
          <Link href="/admin/dashboard?tab=industries" className="px-6 py-3 font-bold rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 font-bold rounded-xl bg-[#FF4F18] text-white hover:bg-[#E03F0D] transition-colors disabled:opacity-50 shadow-[0_4px_14px_rgba(255,79,24,0.3)]"
          >
            {saving ? 'Saving...' : 'Save Industry'}
          </button>
        </div>
      </form>
    </div>
  );
}
