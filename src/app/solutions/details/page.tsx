'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import FooterPage from '../../../components/Footer';
import { solutionsDb, SolutionData } from '../../data/solutionsDb';
import { api } from '@/lib/api';

function SolutionsDetailsContent() {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get('module');
  const [activeKey, setActiveKey] = useState<string>("pos");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [solutionsList, setSolutionsList] = useState<SolutionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Attempt to load solutions from backend database api with try-catch safety
    const loadSolutionsData = async () => {
      try {
        const res = await api.get('/solutions');
        const loaded: any[] = res.data?.docs || res.data?.results || res.data || [];
        if (loaded && loaded.length > 0) {
          // Normalize to match local schema
          const normalized = loaded.map((s: any) => ({
            id: s.slug || s._id,
            slug: s.slug || '',
            shortLabel: s.shortLabel || s.title || '',
            title: s.title || '',
            badge: s.badge || '',
            subtitle: s.subtitle || '',
            description: s.description || '',
            ctaText: s.ctaText || 'Request a Demo',
            trustText: s.trustText || 'Trusted by Indian restaurants',
            icon: s.icon || '',
            whyChoose: s.whyChoose || [],
            featuresTitle: s.featuresTitle || 'Key Capabilities',
            features: s.features || [],
            businessTypes: s.businessTypes || [],
            integrations: s.integrations || [],
            extraGrowth: s.extraGrowth,
            extraOwnersChoice: s.extraOwnersChoice,
            supportItems: s.supportItems || [],
            securityItems: s.securityItems || [],
            ctaBlock: s.ctaBlock || { title: 'Ready to upgrade?', desc: 'Talk to us today' }
          }));
          setSolutionsList(normalized);
        } else {
          setSolutionsList(Object.values(solutionsDb));
        }
      } catch (err) {
        console.warn('Backend server offline or failed to fetch solutions database. Using local static fallback database:', err);
        setSolutionsList(Object.values(solutionsDb));
      } finally {
        setLoading(false);
      }
    };

    loadSolutionsData();
  }, []);

  useEffect(() => {
    if (moduleParam) {
      setActiveKey(moduleParam);
    } else if (solutionsList.length > 0) {
      setActiveKey(solutionsList[0].id || 'pos');
    }
  }, [moduleParam, solutionsList]);

  const solution = solutionsList.find(s => s.id === activeKey || s.slug === activeKey) || solutionsList[0] || Object.values(solutionsDb)[0];

  const handleSelectSolution = (id: string) => {
    setActiveKey(id);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d0d0e] flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-[#FF4F18] rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-semibold tracking-wide uppercase">Loading System...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      <Header />

      {/* Transparent overlay backdrop to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent cursor-default" 
          onClick={() => setIsDropdownOpen(false)} 
        />
      )}

      <main className="flex-grow space-y-0">
        
        {/* 2. Hero Section */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Column: Solution Information */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 text-left">
              {/* Heading & Paragraph aligned to max-w-xl limits */}
              <div className="max-w-xl space-y-6 md:space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                  {(() => {
                    const words = solution.title.split(' ');
                    if (words.length <= 1) return solution.title;
                    
                    // For multi-word titles, highlight the last 2 words if title has 3+ words, else last 1 word.
                    const highlightCount = words.length >= 3 ? 2 : 1;
                    const splitIndex = words.length - highlightCount;
                    
                    const normalText = words.slice(0, splitIndex).join(' ');
                    const orangeText = words.slice(splitIndex).join(' ');
                    
                    return (
                      <>
                        {normalText}{' '}
                        <span className="text-[#FF4F18]">{orangeText}</span>
                      </>
                    );
                  })()}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {solution.description}
                </p>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <button className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer">
                  {solution.ctaText}
                </button>
              </div>

              {/* Trust Badge */}
              <p className="text-sm text-zinc-550 font-medium border-t border-zinc-150/60 dark:border-zinc-800/80 pt-6 max-w-sm">
                {solution.trustText}
              </p>
            </div>

            {/* Right Column: Interactive Widget (Connected Ecosystem Preview) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-6 select-none text-left">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                    Interactive Module View
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Dynamic Screen Mockup */}
                <div className="min-h-[140px] flex flex-col justify-center">
                  {solution.id === 'pos' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805">
                        <span className="text-xs font-bold text-zinc-500">Order Source</span>
                        <span className="text-xs font-extrabold text-[#FF4F18] uppercase">Zomato / Swiggy / QR</span>
                      </div>
                      <div className="flex justify-between items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805">
                        <span className="text-xs font-bold text-zinc-500">Billing speed</span>
                        <span className="text-xs font-extrabold text-zinc-900 dark:text-white">15 Seconds</span>
                      </div>
                      <div className="flex justify-between items-center bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-extrabold">
                        <span>✓ GST Compliant Billing</span>
                      </div>
                    </div>
                  )}

                  {solution.id === 'kds' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs font-extrabold border-b border-zinc-150 dark:border-zinc-805 pb-2">
                          <span>Table 04 • KOT #102</span>
                          <span className="text-amber-500">Preparing (3m)</span>
                        </div>
                        <div className="text-xs space-y-1 text-zinc-650 dark:text-zinc-300 font-bold">
                          <p>1x Paneer Butter Masala (*Less Spicy)</p>
                          <p>2x Butter Naan</p>
                        </div>
                      </div>
                      <div className="bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-extrabold text-center">
                        <span>Instant sync from billing desk</span>
                      </div>
                    </div>
                  )}

                  {solution.id === 'inventory' && (
                    <div className="space-y-4 text-xs font-bold">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500">Cheese Blend</span>
                          <span className="text-red-500">Low stock (4.5kg)</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-red-500 w-[15%] h-full" />
                        </div>
                      </div>
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500">Paneer Block</span>
                          <span className="text-green-500">In stock (28kg)</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-green-500 w-[85%] h-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {solution.id === 'control-system' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 space-y-2">
                        <div className="flex justify-between items-center text-xs font-extrabold text-zinc-500">
                          <span>Liquor Stock</span>
                          <span>Dispensed</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-black text-zinc-900 dark:text-white">
                          <span>Single Malt Whisky</span>
                          <span className="text-[#FF4F18]">60ml (Exact)</span>
                        </div>
                      </div>
                      <div className="bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-extrabold text-center">
                        <span>✓ Automatic Recipe-Based Audit</span>
                      </div>
                    </div>
                  )}

                  {solution.id === 'reports' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 flex justify-between items-center">
                        <span className="text-xs font-bold text-zinc-500">Today's Revenue</span>
                        <span className="text-sm font-black text-[#FF4F18]">₹ 1,42,850</span>
                      </div>
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 flex justify-between items-center">
                        <span className="text-xs font-bold text-zinc-500">Active Tables</span>
                        <span className="text-sm font-black text-zinc-900 dark:text-white">18 / 24 Busy</span>
                      </div>
                    </div>
                  )}

                  {solution.id === 'event-management' && (
                    <div className="space-y-4 text-center">
                      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 flex flex-col items-center gap-3">
                        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border-2 border-zinc-300 dark:border-zinc-700">
                          <svg className="w-16 h-16 text-zinc-650 dark:text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 3h3v3h-3v-3zm3 0h3v3h-3v-3zM13 13h2v2h-2v-2zm0 4h2v4h-2v-4zm4 0h2v2h-2v-2z" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">
                          Scan QR Entry Gate
                        </span>
                      </div>
                    </div>
                  )}

                  {solution.id === 'qr-ordering' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs font-extrabold border-b border-zinc-150 dark:border-zinc-805 pb-2">
                          <span>Table 12 • QR Session</span>
                          <span className="text-[#FF4F18]">Active</span>
                        </div>
                        <div className="text-xs space-y-1 text-zinc-650 dark:text-zinc-300 font-bold">
                          <p>1x Loaded Nachos</p>
                          <p>1x Virgin Mojito</p>
                        </div>
                      </div>
                      <div className="bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-extrabold text-center">
                        <span>Direct-to-kitchen self ordering</span>
                      </div>
                    </div>
                  )}

                  {solution.id === 'loyalty' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 space-y-2">
                        <div className="flex justify-between items-center text-xs font-extrabold text-zinc-500">
                          <span>Diner Profile</span>
                          <span className="text-green-505">VIP Tier</span>
                        </div>
                        <div className="text-sm font-black text-zinc-900 dark:text-white">
                          Amit Sharma (+91 98765*****)
                        </div>
                        <div className="text-xs font-bold text-zinc-500">
                          Favorite: Paneer Butter Masala
                        </div>
                      </div>
                      <div className="bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-extrabold text-center">
                        <span>Cashback Balance: ₹450</span>
                      </div>
                    </div>
                  )}

                  {solution.id === 'booking' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs font-extrabold border-b border-zinc-150 dark:border-zinc-805 pb-2">
                          <span>Upcoming Bookings</span>
                          <span className="text-[#FF4F18]">4 Reservation(s)</span>
                        </div>
                        <div className="text-xs space-y-1 text-zinc-650 dark:text-zinc-300 font-bold">
                          <p>Table 02 — Rohan Verma (8:00 PM)</p>
                          <p>Table 08 — Neha Gupta (8:30 PM)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {solution.id === 'purchasing' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 space-y-3">
                        <div className="flex justify-between items-center text-xs font-extrabold text-zinc-500">
                          <span>Supplier: Fresh Farms</span>
                          <span className="text-[#FF4F18]">Pending GRN</span>
                        </div>
                        <div className="text-xs space-y-1 text-zinc-650 dark:text-zinc-300 font-bold">
                          <p>PO #5042 • Dairy Products (₹12,450)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {solution.id === 'payroll' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 space-y-3">
                        <div className="flex justify-between items-center text-xs font-extrabold text-zinc-500">
                          <span>Shift Log</span>
                          <span className="text-green-550">All Checked In</span>
                        </div>
                        <div className="text-xs space-y-1 text-zinc-650 dark:text-zinc-300 font-bold">
                          <p>Service Team: 8 active shifts</p>
                          <p>Kitchen Team: 6 active shifts</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {solution.id === 'central-kitchen' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805 space-y-2">
                        <div className="flex justify-between items-center text-xs font-extrabold text-zinc-500">
                          <span>Central Prep Prep Batch</span>
                          <span className="text-green-550">Dispatched</span>
                        </div>
                        <div className="text-xs space-y-1 text-zinc-650 dark:text-zinc-300 font-bold">
                          <p>Batch #1042 Prep Prep</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Tagline inside widget */}
                <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold border-t border-zinc-150 dark:border-zinc-805 pt-4 flex justify-between">
                  <span>System: DIGI-OS v4.2</span>
                  <span>Region: AP-SOUTH</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Operational Problem Statement */}
        <section className="bg-white py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                  What happens when operations <span className="text-[#FF4F18]">get fragmented?</span>
                </h2>
              </div>
              <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed lg:pt-2">
                <p>
                  Most restaurants rely on five different tools that do not speak to one another. Orders get missed, inventory records fall behind, staff calculations waste hours, and management feels like chaos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How Digitory's Layer Works */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                One unified layer, <span className="text-[#FF4F18]">infinite control</span>
              </h2>
            </div>
            <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed lg:pt-2">
              <p>
                Digitory works as a smart, real-time operating layer. We interface directly with POS, inventory levels, recipe configurations, and KDS monitors to automate every task seamlessly.
              </p>
            </div>
          </div>

          {/* How it works steps - formatted as a unified grid container matching home features */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-[28px] overflow-hidden bg-white dark:bg-[#0d0d0e] grid grid-cols-1 md:grid-cols-3">
            {solution.whyChoose.slice(0, 3).map((item, idx) => (
              <div 
                key={idx} 
                className={`p-8 sm:p-10 flex flex-col justify-start transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 text-left ${
                  idx === 0 ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-r md:border-b-0' :
                  idx === 1 ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-r md:border-b-0' :
                  ''
                }`}
              >
                <span className="text-sm font-bold text-zinc-400 mb-2">0{idx + 1}</span>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 mt-4">
                  {item.title}
                </h4>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Key Operational Capabilities */}
        <section className="bg-white py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-left mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-[44px] font-[850] text-[#111111] dark:text-white tracking-tight mt-2 leading-[1.15]">
                {(() => {
                  const words = solution.featuresTitle.split(' ');
                  if (words.length <= 1) return solution.featuresTitle;
                  const highlightCount = words.length >= 3 ? 2 : 1;
                  const splitIndex = words.length - highlightCount;
                  const normalText = words.slice(0, splitIndex).join(' ');
                  const orangeText = words.slice(splitIndex).join(' ');
                  return (
                    <>
                      {normalText}{' '}
                      <span className="text-[#FF4F18]">{orangeText}</span>
                    </>
                  );
                })()}
              </h3>
            </div>

            {/* Unified 2x2 grid style matching home page features */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-[28px] overflow-hidden bg-white dark:bg-[#0d0d0e] grid grid-cols-1 md:grid-cols-2">
              {solution.features.map((item, idx) => {
                // Determine border dividers dynamically for a 2-column layout (2x3 or 2x2 grid)
                const isEven = idx % 2 === 0;
                const isLastRow = idx >= solution.features.length - 2;
                const borderClasses = `p-6 md:p-8 flex gap-5 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 text-left
                  ${isEven ? 'border-b border-zinc-200 dark:border-zinc-800 md:border-r' : 'border-b border-zinc-200 dark:border-zinc-800'}
                  ${isLastRow ? 'md:border-b-0' : ''}
                  ${idx === solution.features.length - 1 ? 'border-b-0' : ''}
                `;

                return (
                  <div key={idx} className={borderClasses}>
                    <div className="w-10 h-10 text-[#FF4F18] flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon ? (
                        <span className="w-5.5 h-5.5 flex items-center justify-center">
                          {item.icon}
                        </span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Operational Outcomes / Metrics */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16 text-left">
          {/* Left-aligned Header Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                Real operational <span className="text-[#FF4F18]">outcomes & metrics</span>
              </h2>
            </div>
            <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed lg:pt-2">
              <p>
                From neighbourhood cafés to multi-outlet restaurant chains, restaurants across India use Digitory to optimize tables, control waste, and save hours every single week.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:grid-cols-4 md:gap-0 text-center">
            {[
              { value: "22%", label: "Faster Table Turnover", desc: "Reduce wait times during peak shifts" },
              { value: "32%", label: "Less Ingredient Waste", desc: "Optimise portions & control recipes" },
              { value: "98%", label: "KDS Accuracy", desc: "Eliminate order errors & lost tickets" },
              { value: "15 hrs", label: "Saved Weekly", desc: "Cut manual inventory check stress" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center px-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 last:border-r-0">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                  <span className="text-[#FF4F18]">{stat.value}</span>
                </h3>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                  <span className="text-zinc-900 dark:text-white">{stat.label}</span>
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 max-w-[260px] leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Impact on Restaurant Operations (Verticals list) */}
        <section className="bg-white py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            {/* Left-aligned Header Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                  Built for every kind of <span className="text-[#FF4F18]">food business</span>
                </h2>
              </div>
              <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed lg:pt-2">
                <p>
                  No matter what type of food or beverage business you run, Digitory adapts to your operations, inventory configurations, and team roles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.businessTypes.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-left hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300"
                >
                  <h4 className="text-md font-bold text-zinc-955 dark:text-white mb-2.5 flex items-center gap-2.5">
                    {item.icon ? (
                      <span className="text-[#FF4F18] w-5 h-5 flex items-center justify-center shrink-0">
                        {item.icon}
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
                    )}
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Built for Modern F&B Workflows (Extra integrations/support details) */}
        {(solution.extraGrowth || solution.integrations || solution.supportItems || solution.securityItems || solution.extraOwnersChoice) && (
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6 space-y-10">
                {solution.extraGrowth && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {solution.extraGrowth.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {solution.extraGrowth.desc}
                    </p>
                  </div>
                )}

                {solution.extraOwnersChoice && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {solution.extraOwnersChoice.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {solution.extraOwnersChoice.desc}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 space-y-10 lg:pl-8">
                {solution.supportItems && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      Support you can count on
                    </h3>
                    <ul className="space-y-3.5">
                      {solution.supportItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 9. FAQs Section (Accordion matching home page FAQ) */}
        <SolutionsDetailsFaq />

        {/* 10. Dynamic Solution CTA Section */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:px-8 py-10 md:py-16">
          <div className="bg-white dark:bg-zinc-950 rounded-[32px] p-8 md:p-16 text-zinc-900 dark:text-white shadow-xl border border-zinc-200 dark:border-zinc-800/80 flex flex-col items-center text-center gap-8 relative overflow-hidden select-none">
            <div className="flex flex-col items-center space-y-4 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[850] tracking-tight leading-[1.15] text-zinc-900 dark:text-white">
                {solution.ctaBlock.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                {solution.ctaBlock.desc}
              </p>
            </div>

            <div className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer">
                Request a Demo
              </button>
            </div>
          </div>
        </section>

      </main>

      <FooterPage />
    </div>
  );
}

export default function SolutionsDetailsAllInOne() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-[#0d0d0e] flex items-center justify-center text-[#FF4F18] font-bold text-sm tracking-widest uppercase">
        Loading...
      </div>
    }>
      <SolutionsDetailsContent />
    </Suspense>
  );
}

function SolutionsDetailsFaq() {
  const [openId, setOpenId] = useState<number | null>(1); // First item open by default

  const handleToggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const FAQ_ITEMS = [
    {
      id: 1,
      question: "How does Digitory manage orders from different platforms?",
      answer: "Whether it's dine-in, online orders, QR or direct orders, everything flows into one connected system, so you never have to switch between multiple apps."
    },
    {
      id: 2,
      question: "How does the kitchen stay in sync during rush hours?",
      answer: "Orders are sent to the right kitchen station instantly, reducing communication gaps, delays and missed tickets when every second counts."
    },
    {
      id: 3,
      question: "Can Digitory help reduce inventory wastage?",
      answer: "Yes. Inventory updates automatically with every sale, helping you track stock movement, reduce wastage and protect your margins."
    },
    {
      id: 4,
      question: "Can I manage customer loyalty and repeat business?",
      answer: "Absolutely. Build customer profiles, run loyalty programs and targeted campaigns that keep guests coming back."
    },
    {
      id: 5,
      question: "Will I get real-time reports and insights?",
      answer: "Yes. Monitor sales, inventory, outlet performance and business trends in real time, so you can make faster, data-backed decisions."
    },
    {
      id: 6,
      question: "Can I manage multiple outlets from one dashboard?",
      answer: "Yes. Compare outlet performance, monitor operations, and track key metrics across all your locations without chasing managers for updates."
    },
    {
      id: 7,
      question: "Will billing slow us down during peak hours?",
      answer: "Not at all. Digitory is built for handling chaos better, helping your team bill faster, reducing queues, and keeping operations moving smoothly during rush hours."
    }
  ];

  return (
    <div className="bg-white font-sans antialiased text-[#111111] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Title */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-[#111111]">
            Questions before you <span className="text-[#FF4F18]">commit?</span>
          </h2>
        </div>

        {/* Accordions Container */}
        <div className="max-w-4xl mx-auto border-t border-zinc-100">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-zinc-100"
              >
                {/* Question Trigger */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between py-6 text-left outline-none cursor-pointer group"
                >
                  <span className="text-[16px] sm:text-[18px] font-bold text-[#111111] pr-6 transition-colors duration-200 group-hover:text-zinc-600">
                    {item.question}
                  </span>

                  {/* Plus/Minus Indicator */}
                  <span className="text-[#FF4F18] font-[400] text-[26px] leading-none select-none flex-shrink-0 w-6 text-right transition-transform duration-200">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer Panel */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[250px] pb-6 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed max-w-[90%]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
