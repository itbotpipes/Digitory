import React from 'react';
import Header from '../../../components/Header';
import FooterPage from '../../../components/Footer';
import { solutionsDb, SolutionData } from '../../data/solutionsDb';
import SolutionsCta from '../../../components/solutions/SolutionsCta';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solutionKey = Object.keys(solutionsDb).find(key => solutionsDb[key as keyof typeof solutionsDb].id === slug) || 'pos';
  const solution = solutionsDb[solutionKey as keyof typeof solutionsDb];
  
  // Try to fetch DB SEO using a deterministic ID based on slug or we skip dynamic for now?
  // Our migration might have saved Solution SEO with a specific pageId.
  // Wait, the API for Solutions needs an ID. If we don't have the ID here, we just use static fallback.
  return {
    title: `${solution?.title || 'Solutions'} | Digitory`,
    description: solution?.subtitle || '',
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  
  // Map short slugs to canonical keys
  const slugMap: Record<string, string> = {
    "pos": "pos",
    "multi-channel-integrated-pos": "pos",
    "kds": "kds",
    "kitchen-display-system": "kds",
    "inventory": "inventory",
    "automated-inventory-management": "inventory",
    "control-system": "control-system",
    "digi-food-liquor-control-system": "control-system",
    "reports": "reports",
    "analytics-reports": "reports",
    "event-management": "event-management",
    "cashless-event-entry-management-system": "event-management"
  };

  const currentKey = slugMap[rawSlug] || "pos";
  const solution = solutionsDb[currentKey] || solutionsDb.pos;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Solution Hero Section */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 text-left">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Column: Solution Information */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex">
                <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] bg-[#FFF3EF] dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full select-none">
                  {solution.badge}
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                {solution.title.split(' ').map((word, idx) => (
                  idx === 0 ? <span key={idx}>{word} </span> : <span key={idx} className={idx === 1 || idx === 2 ? 'text-[#FF4F18]' : ''}>{word} </span>
                ))}
              </h1>

              {/* Subtitle */}
              <h2 className="text-lg md:text-xl font-bold text-zinc-700 dark:text-zinc-300">
                {solution.subtitle}
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {solution.description}
              </p>

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

            {/* Right Column: Visual Mockup */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-6 select-none text-left">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                    Interactive Module View
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                </div>

                {/* Sub-widget based on type */}
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

                {/* Footer Tagline inside widget */}
                <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold border-t border-zinc-150 dark:border-zinc-805 pt-4 flex justify-between">
                  <span>System: DIGI-OS v4.2</span>
                  <span>Region: AP-SOUTH</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Why Choose Section (3-Column Layout) */}
        <section className="bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-150/30 dark:border-zinc-900 py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                Benefits Focus
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[850] text-zinc-900 dark:text-white mt-2">
                Why choose Digitory?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solution.whyChoose.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-zinc-900/80 p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/80 hover:border-[#FF4F18] hover:shadow-[0_8px_30px_rgba(255,79,24,0.08)] transition-all duration-300 text-left flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFF3EF] dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center text-sm font-black">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features list/grid */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-16">
          <div className="text-left mb-12">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
              Product Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[850] text-[#111111] dark:text-white tracking-tight mt-2">
              {solution.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solution.features.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-[#FF4F18]/50 dark:hover:border-[#FF4F18]/50 hover:shadow-sm transition-all duration-200 text-left flex gap-5"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFF3EF] dark:bg-orange-950/10 text-[#FF4F18] flex items-center justify-center shrink-0 mt-0.5">
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
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Made For / Restaurant Types */}
        <section className="bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-150/30 dark:border-zinc-900 py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                Application Verticals
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[850] text-zinc-900 dark:text-white mt-2">
                Made for every kind of food business
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.businessTypes.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 text-left hover:border-[#FF4F18]/50 hover:shadow-xs transition-all duration-200"
                >
                  <h3 className="text-md font-bold text-zinc-955 dark:text-white mb-2.5 flex items-center gap-2.5">
                    {item.icon ? (
                      <span className="text-[#FF4F18] w-5 h-5 flex items-center justify-center shrink-0">
                        {item.icon}
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
                    )}
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Sections (Growth, Owners Choice, Integrations, Support, Security) */}
        {(solution.extraGrowth || solution.integrations || solution.supportItems) && (
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-6 space-y-10">
                {solution.extraGrowth && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {solution.extraGrowth.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {solution.extraGrowth.desc}
                    </p>
                  </div>
                )}

                {solution.extraOwnersChoice && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {solution.extraOwnersChoice.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {solution.extraOwnersChoice.desc}
                    </p>
                  </div>
                )}

                {solution.integrations && (
                  <div className="space-y-6 pt-4">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      Connect with the tools you already use
                    </h3>
                    <div className="space-y-4">
                      {solution.integrations.map((item, idx) => (
                        <div key={idx} className="border-b border-zinc-150 dark:border-zinc-800 pb-3">
                          <span className="text-xs font-extrabold uppercase text-[#FF4F18] tracking-wider block mb-1">
                            {item.title}
                          </span>
                          <span className="text-sm text-zinc-700 dark:text-zinc-300 font-bold">
                            {item.items}
                          </span>
                        </div>
                      ))}
                    </div>
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
                        <li key={idx} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-450 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {solution.securityItems && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      Safe and secure
                    </h3>
                    <ul className="space-y-3.5">
                      {solution.securityItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-zinc-650 dark:text-zinc-450 font-semibold">
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

        <SolutionsCta />

      </main>

      <FooterPage />
    </div>
  );
}
