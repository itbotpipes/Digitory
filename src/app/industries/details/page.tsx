"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import FooterPage from '../../../components/Footer';
import { industriesDb } from '../../data/industriesDb';

function IndustriesDetailsContent() {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get('module');
  const [activeKey, setActiveKey] = useState<string>("bars-restaurants");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (moduleParam && industriesDb[moduleParam]) {
      setActiveKey(moduleParam);
    }
  }, [moduleParam]);

  const industries = Object.values(industriesDb);
  const industry = industriesDb[activeKey] || industries[0];

  const handleSelectIndustry = (id: string) => {
    setActiveKey(id);
    setIsDropdownOpen(false);
  };

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

      <main className="flex-grow">
        
        {/* Banner Section with Dropdown Switcher */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 pt-16 pb-10 text-center relative z-50">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] bg-[#FFF3EF] px-3.5 py-1.5 rounded-full select-none">
              Industry Spec Sheet
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] pt-3 relative">
              Explore details for{' '}
              <span className="relative inline-block text-left align-middle">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  type="button"
                  className="inline-flex items-center gap-2 text-[#FF4F18] hover:text-[#E03F0D] border-b-4 border-dashed border-[#FF4F18]/30 hover:border-[#FF4F18] pb-1 cursor-pointer transition-all duration-250 select-none font-[900] tracking-tight"
                >
                  {industry.shortLabel}
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 origin-top">
                    <div className="px-3 py-2 text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 mb-1">
                      Choose an Industry
                    </div>
                    {industries.map((item) => {
                      const isSelected = item.id === activeKey;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectIndustry(item.id)}
                          className={`flex items-center gap-3.5 w-full text-left px-3.5 py-3 rounded-xl transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-[#FF4F18] text-white"
                              : "hover:bg-zinc-100 dark:hover:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          <span className={isSelected ? "text-white" : "text-[#FF4F18]"}>
                            {item.icon}
                          </span>
                          <span className="text-xs font-black uppercase tracking-wider">
                            {item.shortLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto pt-3">
              Click on the dropdown above to toggle between different industries and view specifications.
            </p>
          </div>
        </section>

        {/* Dynamic Detail Content */}
        <div className="animate-fade-in-slow transition-all duration-300">
          
          {/* Hero Section */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Left Column: Industry Info */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 text-left">
                <div className="inline-flex">
                  <div className="flex items-center gap-2 bg-[#FFF3EF] px-3.5 py-1.5 rounded-full select-none">
                    <span className="h-2 w-2 rounded-full bg-[#FF4F18]"></span>
                    <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-wider text-[#FF4F18]">
                      {industry.title}
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                  {industry.subtitle}
                </h2>

                <p className="text-base sm:text-lg text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  {industry.description}
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  <button className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer">
                    Request a Demo
                  </button>
                </div>

                <p className="text-sm text-zinc-550 font-medium border-t border-zinc-150/60 dark:border-zinc-800/80 pt-6 max-w-sm">
                  {industry.trustText}
                </p>
              </div>

              {/* Right Column: Visual Mockup */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-6 select-none text-left">
                  <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-805 pb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                      Industry Module View
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805">
                      <span className="text-xs font-bold text-zinc-500">Live Status</span>
                      <span className="text-xs font-extrabold text-[#FF4F18] uppercase">Sync Active</span>
                    </div>
                    <div className="flex justify-between items-center bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-150/40 dark:border-zinc-805">
                      <span className="text-xs font-bold text-zinc-500">Response Speed</span>
                      <span className="text-xs font-extrabold text-zinc-900 dark:text-white">Sub-second</span>
                    </div>
                    <div className="bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-extrabold text-center">
                      <span>✓ Customized for {industry.shortLabel}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-400 dark:text-zinc-550 font-bold border-t border-zinc-150 dark:border-zinc-805 pt-4 flex justify-between">
                    <span>System: DIGI-OS v4.2</span>
                    <span>Region: AP-SOUTH</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Why Choose Section (Only if present) */}
          {industry.whyChoose && (
            <section className="bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-150/30 dark:border-zinc-900 py-16 text-left">
              <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className="mb-12">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                    Benefits Focus
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-[850] text-zinc-900 dark:text-white mt-2">
                    {industry.whyChooseTitle || "Why choose Digitory?"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {industry.whyChoose.map((text, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-zinc-900/80 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 text-left flex items-start gap-4 hover:border-[#FF4F18] transition-all duration-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#FFF3EF] dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 leading-relaxed">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Features list/grid */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-16">
            <div className="text-left mb-12">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                Industry Capabilities
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-[850] text-[#111111] dark:text-white tracking-tight mt-2">
                {industry.featuresTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.features.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-[#FF4F18]/50 dark:hover:border-[#FF4F18]/50 hover:shadow-xs transition-all duration-200 text-left flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {item.linkText && item.linkHref && (
                    <div className="pt-2">
                      <a href={item.linkHref} className="inline-flex items-center text-xs font-bold text-[#FF4F18] hover:text-[#E03F0D]">
                        {item.linkText}
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Industry CTA Section */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-10">
            <div className="bg-white dark:bg-zinc-950 rounded-[32px] p-8 md:p-16 text-zinc-900 dark:text-white shadow-xl border border-zinc-200 dark:border-zinc-800/80 flex flex-col items-center text-center gap-8 relative overflow-hidden select-none">
              <div className="flex flex-col items-center space-y-4 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-[850] tracking-tight leading-[1.15] text-zinc-900 dark:text-white">
                  {industry.ctaBlock.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  {industry.ctaBlock.desc}
                </p>
              </div>

              <div className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer">
                  Request a Demo
                </button>
              </div>
            </div>
          </section>

        </div>

      </main>

      <FooterPage />
    </div>
  );
}

export default function IndustriesDetailsAllInOne() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-[#0d0d0e] flex items-center justify-center text-[#FF4F18] font-bold text-sm tracking-widest uppercase">
        Loading...
      </div>
    }>
      <IndustriesDetailsContent />
    </Suspense>
  );
}
