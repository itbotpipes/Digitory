'use client';

import React, { useState, useEffect, use } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

interface SolutionEditorProps {
  params: Promise<{ id: string }>;
}

export default function AdminSolutionEditor({ params }: SolutionEditorProps) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  
  const [formData, setFormData] = useState({
    slug: '',
    shortLabel: '',
    title: '',
    badge: '',
    subtitle: '',
    description: '',
    ctaText: '',
    trustText: '',
    icon: '',
    whyChoose: [] as any[],
    featuresTitle: '',
    features: [] as any[],
    businessTypes: [] as any[],
    integrations: [] as any[],
    extraGrowth: { title: '', desc: '' },
    extraOwnersChoice: { title: '', desc: '' },
    supportItems: [] as string[],
    securityItems: [] as string[],
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
      fetchSolution(token);
    }
  }, [isNew, resolvedParams.id]);

  const fetchSolution = async (token: string) => {
    try {
      const res = await api.get(`/solutions/${resolvedParams.id}`, token);
      const s = res.data;
      setFormData({
        slug: s.slug || '',
        shortLabel: s.shortLabel || '',
        title: s.title || '',
        badge: s.badge || '',
        subtitle: s.subtitle || '',
        description: s.description || '',
        ctaText: s.ctaText || '',
        trustText: s.trustText || '',
        icon: s.icon || '',
        whyChoose: s.whyChoose || [],
        featuresTitle: s.featuresTitle || '',
        features: s.features || [],
        businessTypes: s.businessTypes || [],
        integrations: s.integrations || [],
        extraGrowth: s.extraGrowth || { title: '', desc: '' },
        extraOwnersChoice: s.extraOwnersChoice || { title: '', desc: '' },
        supportItems: s.supportItems || [],
        securityItems: s.securityItems || [],
        ctaBlock: s.ctaBlock || { title: '', desc: '' },
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to load solution');
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
        await api.post('/solutions', formData, token!);
        setMessage('Solution created successfully!');
        setTimeout(() => { window.location.href = '/admin/dashboard'; }, 1000);
      } else {
        await api.patch(`/solutions/${resolvedParams.id}`, formData, token!);
        setMessage('Solution updated successfully!');
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Failed to save solution');
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
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  if (loading) {
    return <div className="p-8 text-center">Loading editor...</div>;
  }

  return (
    <div className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h2 className="text-2xl font-bold">{isNew ? 'Create New Solution' : 'Edit Solution'}</h2>
        <Link href="/admin/dashboard" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium">
          &larr; Back to Dashboard
        </Link>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-6 font-medium ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* SECTION: BASIC INFO */}
        <section className="space-y-6">
          <h3 className="text-lg font-extrabold text-[#FF4F18]">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Short Label (for menus) *</label>
              <input
                type="text"
                value={formData.shortLabel}
                onChange={e => setFormData({...formData, shortLabel: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge (e.g. 01 • POS)</label>
              <input
                type="text"
                value={formData.badge}
                onChange={e => setFormData({...formData, badge: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={e => setFormData({...formData, subtitle: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={e => setFormData({...formData, ctaText: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trust Text</label>
              <input
                type="text"
                value={formData.trustText}
                onChange={e => setFormData({...formData, trustText: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Icon (SVG String)</label>
              <textarea
                value={formData.icon}
                onChange={e => setFormData({...formData, icon: e.target.value})}
                rows={2}
                className="w-full font-mono text-xs px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]"
              />
            </div>
          </div>
        </section>

        {/* SECTION: WHY CHOOSE */}
        <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#FF4F18]">Why Choose</h3>
            <button type="button" onClick={() => addArrayItem('whyChoose', { title: '', desc: '' })} className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700">+ Add Item</button>
          </div>
          {formData.whyChoose.map((item, idx) => (
            <div key={idx} className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 relative">
              <button type="button" onClick={() => removeArrayItem('whyChoose', idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-bold">Remove</button>
              <div className="space-y-4 pr-16">
                <input type="text" placeholder="Title" value={item.title} onChange={e => updateArrayItem('whyChoose', idx, 'title', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
                <textarea placeholder="Description" rows={2} value={item.desc} onChange={e => updateArrayItem('whyChoose', idx, 'desc', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
              </div>
            </div>
          ))}
        </section>

        {/* SECTION: FEATURES */}
        <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#FF4F18]">Features</h3>
            <button type="button" onClick={() => addArrayItem('features', { title: '', desc: '', icon: '' })} className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700">+ Add Feature</button>
          </div>
          <input type="text" placeholder="Features Section Title" value={formData.featuresTitle} onChange={e => setFormData({...formData, featuresTitle: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900" />
          
          {formData.features.map((item, idx) => (
            <div key={idx} className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 relative">
              <button type="button" onClick={() => removeArrayItem('features', idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-bold">Remove</button>
              <div className="space-y-4 pr-16">
                <input type="text" placeholder="Feature Title" value={item.title} onChange={e => updateArrayItem('features', idx, 'title', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
                <textarea placeholder="Feature Description" rows={2} value={item.desc} onChange={e => updateArrayItem('features', idx, 'desc', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
                <textarea placeholder="Icon SVG (optional)" rows={1} value={item.icon} onChange={e => updateArrayItem('features', idx, 'icon', e.target.value)} className="w-full font-mono text-xs px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
              </div>
            </div>
          ))}
        </section>

        {/* SECTION: BUSINESS TYPES */}
        <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#FF4F18]">Business Types</h3>
            <button type="button" onClick={() => addArrayItem('businessTypes', { name: '', desc: '', icon: '' })} className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700">+ Add Business Type</button>
          </div>
          {formData.businessTypes.map((item, idx) => (
            <div key={idx} className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 relative">
              <button type="button" onClick={() => removeArrayItem('businessTypes', idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-bold">Remove</button>
              <div className="space-y-4 pr-16">
                <input type="text" placeholder="Type Name (e.g. Restaurants)" value={item.name} onChange={e => updateArrayItem('businessTypes', idx, 'name', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
                <textarea placeholder="Description" rows={2} value={item.desc} onChange={e => updateArrayItem('businessTypes', idx, 'desc', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
                <textarea placeholder="Icon SVG (optional)" rows={1} value={item.icon} onChange={e => updateArrayItem('businessTypes', idx, 'icon', e.target.value)} className="w-full font-mono text-xs px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
              </div>
            </div>
          ))}
        </section>

        {/* SECTION: EXTRAS */}
        <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-extrabold text-[#FF4F18]">Extra Blocks</h3>
          
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h4 className="font-bold text-sm">Extra Growth Block</h4>
            <input type="text" placeholder="Title" value={formData.extraGrowth.title} onChange={e => updateObjectField('extraGrowth', 'title', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
            <textarea placeholder="Description" rows={2} value={formData.extraGrowth.desc} onChange={e => updateObjectField('extraGrowth', 'desc', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h4 className="font-bold text-sm">Extra Owners Choice Block</h4>
            <input type="text" placeholder="Title" value={formData.extraOwnersChoice.title} onChange={e => updateObjectField('extraOwnersChoice', 'title', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
            <textarea placeholder="Description" rows={2} value={formData.extraOwnersChoice.desc} onChange={e => updateObjectField('extraOwnersChoice', 'desc', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h4 className="font-bold text-sm">Bottom CTA Block</h4>
            <input type="text" placeholder="Title" value={formData.ctaBlock.title} onChange={e => updateObjectField('ctaBlock', 'title', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
            <textarea placeholder="Description" rows={2} value={formData.ctaBlock.desc} onChange={e => updateObjectField('ctaBlock', 'desc', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />
          </div>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-4 sticky bottom-6 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md p-4 rounded-2xl shadow-sm">
          <Link href="/admin/dashboard" className="px-6 py-3 font-bold rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 font-bold rounded-xl bg-[#FF4F18] text-white hover:bg-[#E03F0D] transition-colors disabled:opacity-50 shadow-[0_4px_14px_rgba(255,79,24,0.3)]"
          >
            {saving ? 'Saving...' : 'Save Solution'}
          </button>
        </div>
      </form>
    </div>
  );
}
