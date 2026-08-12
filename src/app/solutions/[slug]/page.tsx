'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Header from '../../../components/Header';
import FooterPage from '../../../components/Footer';
import OperationsReveal from '../../../components/solutions/OperationsReveal';
import InsightsPage from '../../../components/home/Insights';
import { solutionsDb, SolutionData } from '../../data/solutionsDb';
import { api } from '@/lib/api';
import SolutionsDetailsCta from '../../../components/solutions/SolutionsDetailsCta';

/**
 * Helper to render highlighted text. 
 * E.g., "This is *highlighted* text" -> "This is <span className="text-[#FF4F18]">highlighted</span> text"
 */
function renderHighlightedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <span key={index} className="text-[#FF4F18]">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

function DynamicSolutionDetailContent({ slug }: { slug: string }) {
  const [activeKey, setActiveKey] = useState<string>("pos");
  const [solutionsList, setSolutionsList] = useState<SolutionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSolutionsData = async () => {
      try {
        const res = await api.get('/solutions?limit=30');
        const loaded: any[] = res.data?.docs || res.data?.results || res.data || [];
        if (loaded && loaded.length > 0) {
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
            gridTitle: s.gridTitle || '',
            gridDesc: s.gridDesc || '',
            opsTitle: s.opsTitle || '',
            opsParagraph: s.opsParagraph || '',
            opsHighlights: s.opsHighlights || '',
            icon: s.icon || '',
            category: s.category || '',
            whyChoose: s.whyChoose || [],
            featuresTitle: s.featuresTitle || 'Key Capabilities',
            features: s.features || [],
            businessTypes: s.businessTypes || [],
            integrations: s.integrations || [],
            extraGrowth: s.extraGrowth,
            extraOwnersChoice: s.extraOwnersChoice,
            supportItems: s.supportItems || [],
            securityItems: s.securityItems || [],
            ctaBlock: s.ctaBlock || { title: 'Ready to upgrade?', desc: 'Talk to us today' },
            layerTitle: s.layerTitle || '',
            layerDesc: s.layerDesc || '',
            metricsTitle: s.metricsTitle || '',
            metricsItems: s.metricsItems || [],
            businessTypesTitle: s.businessTypesTitle || '',
            businessTypesDesc: s.businessTypesDesc || ''
          }));
          setSolutionsList(normalized);
        } else {
          setSolutionsList(Object.values(solutionsDb));
        }
      } catch (err) {
        setSolutionsList(Object.values(solutionsDb));
      } finally {
        setLoading(false);
      }
    };

    loadSolutionsData();
  }, []);

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

  useEffect(() => {
    if (slug) {
      const mapped = slugMap[slug] || slug;
      setActiveKey(mapped);
    }
  }, [slug, solutionsList]);

  const solution = solutionsList.find(s => s.id === activeKey || s.slug === activeKey) || solutionsList[0] || Object.values(solutionsDb)[0];

  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  useEffect(() => {
    setActiveFeatureIdx(0);
    setSimulating(false);
    setSimulationSuccess(false);
  }, [activeKey]);

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

      <main className="flex-grow space-y-0">
        
        {/* 2. Hero Section */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Column: Solution Information */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 text-left">
              <div className="max-w-xl space-y-6 md:space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                  {solution.title && solution.title.includes('*') ? (
                    renderHighlightedText(solution.title)
                  ) : (
                    (() => {
                      const words = (solution.title || '').split(' ');
                      if (words.length <= 1) return solution.title;
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
                    })()
                  )}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {solution.description}
                </p>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <button className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer">
                  {solution.ctaText === 'Request a Demo' ? 'Book a demo' : solution.ctaText || 'Book a demo'}
                </button>
              </div>

              {/* Trust Badge */}
              <p className="text-sm text-zinc-550 font-medium border-t border-zinc-150/60 dark:border-zinc-800/80 pt-6 max-w-sm">
                {solution.trustText}
              </p>
            </div>

            {/* Right Column: Interactive Widget (Connected Ecosystem Preview) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              {(() => {
                const activeFeature = solution.features[activeFeatureIdx] || solution.features[0] || { title: 'System Core', desc: 'Main operations layer.' };
                return (
                  <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5 select-none text-left">
                    
                    {/* Visual Header */}
                    <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
                        Interactive Module Simulator
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-500">Live</span>
                      </span>
                    </div>

                    {/* Module Title */}
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">Active Module</span>
                      <h4 className="text-base font-black text-zinc-900 dark:text-white leading-tight">
                        {solution.shortLabel || solution.title}
                      </h4>
                    </div>

                    {/* Tabs of Features */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-0.5">Select Feature to Run</span>
                      <div className="flex flex-wrap gap-1.5">
                        {solution.features.slice(0, 4).map((feat, idx) => {
                          const isActive = activeFeatureIdx === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setActiveFeatureIdx(idx);
                                setSimulationSuccess(false);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                                isActive
                                  ? "bg-[#FF4F18] text-white shadow-xs"
                                  : "bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              }`}
                            >
                              {feat.title.split(' ').slice(0, 2).join(' ')}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interactive Status Display */}
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 space-y-3 min-h-[150px] flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-zinc-400 font-extrabold">
                          <span>Feature Status</span>
                          <span className="text-emerald-500">Operational</span>
                        </div>
                        <h5 className="text-xs font-extrabold text-zinc-900 dark:text-white">
                          {activeFeature.title}
                        </h5>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed font-semibold">
                          {activeFeature.desc}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-zinc-100 dark:border-zinc-900 text-[10px] font-bold text-zinc-450 dark:text-zinc-500">
                        <div>
                          <span className="block text-[8px] uppercase tracking-wider text-zinc-400">Response Speed</span>
                          <span className="text-zinc-900 dark:text-white font-extrabold">
                            {activeFeature.speed || (activeFeatureIdx === 0 ? "12ms" : activeFeatureIdx === 1 ? "18ms" : "24ms")}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase tracking-wider text-zinc-400">Accuracy Rate</span>
                          <span className="text-zinc-900 dark:text-white font-extrabold">
                            {activeFeature.accuracy || (activeFeatureIdx === 0 ? "99.8%" : activeFeatureIdx === 1 ? "99.4%" : "99.9%")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Simulation Trigger Button */}
                    <div>
                      <button
                        type="button"
                        disabled={simulating}
                        onClick={async () => {
                          setSimulating(true);
                          await new Promise((r) => setTimeout(r, 1200));
                          setSimulating(false);
                          setSimulationSuccess(true);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-[#FF4F18] dark:hover:bg-[#FF4F18] hover:text-white dark:hover:text-white transition-all duration-200 text-xs font-black tracking-wider uppercase disabled:opacity-50 cursor-pointer text-center"
                      >
                        {simulating ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Running Simulation...
                          </span>
                        ) : simulationSuccess ? (
                          "✓ Simulation Success: Module Configured!"
                        ) : (
                          `Simulate ${solution.shortLabel || 'Module'}`
                        )}
                      </button>
                    </div>

                    {/* Footer Tagline inside widget */}
                    <div className="text-[11px] text-zinc-400 dark:text-zinc-505 font-bold border-t border-zinc-150 dark:border-zinc-800 pt-4 flex justify-between">
                      <span>System: DIGI-OS v4.2</span>
                      <span>Region: AP-SOUTH</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* 3. Operational Problem Statement */}
        <OperationsReveal 
          title={solution.opsTitle ? <span dangerouslySetInnerHTML={{ __html: solution.opsTitle }} /> : undefined}
          words={solution.opsParagraph ? solution.opsParagraph.split(/\s+/) : undefined}
          highlights={solution.opsHighlights ? solution.opsHighlights.split(',').map(h => h.trim()) : undefined}
        />

        {/* 4. How Digitory's Layer Works */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                {solution.layerTitle ? (
                  renderHighlightedText(solution.layerTitle)
                ) : (
                  <>One unified layer, <span className="text-[#FF4F18]">infinite control</span></>
                )}
              </h2>
            </div>
            <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed lg:pt-2">
              <p>
                {solution.layerDesc || "Digitory works as a smart, real-time operating layer. We interface directly with POS, inventory levels, recipe configurations, and KDS monitors to automate every task seamlessly."}
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
        <section className="bg-white dark:bg-[#0d0d0e] py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-left mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-[44px] font-[850] text-[#111111] dark:text-white tracking-tight mt-2 leading-[1.15]">
                {solution.featuresTitle && solution.featuresTitle.includes('*') ? (
                  renderHighlightedText(solution.featuresTitle)
                ) : (
                  (() => {
                    const words = (solution.featuresTitle || 'Key Capabilities').split(' ');
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
                  })()
                )}
              </h3>
            </div>

            {/* Unified 2x2 grid style matching home page features */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-[28px] overflow-hidden bg-white dark:bg-[#0d0d0e] grid grid-cols-1 md:grid-cols-2">
              {solution.features.map((item, idx) => {
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
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
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
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="text-center text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              {solution.metricsTitle ? (
                renderHighlightedText(solution.metricsTitle)
              ) : (
                <>Real operational <span className="text-[#FF4F18]">outcomes & metrics</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:grid-cols-4 md:gap-0 text-center">
            {(solution.metricsItems && solution.metricsItems.length > 0 ? solution.metricsItems : [
              { value: "22%", label: "Faster Table Turnover", desc: "Reduce wait times during peak shifts" },
              { value: "32%", label: "Less Ingredient Waste", desc: "Optimise portions & control recipes" },
              { value: "98%", label: "KDS Accuracy", desc: "Eliminate order errors & lost tickets" },
              { value: "15 hrs", label: "Saved Weekly", desc: "Cut manual inventory check stress" }
            ]).map((stat, idx) => (
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

        {/* 7. Impact on Restaurant Operations */}
        {solution.businessTypes && solution.businessTypes.length > 0 && (
          <section className="bg-white dark:bg-[#0d0d0e] py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 items-start">
                <div className="lg:col-span-7">
                  <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                    {solution.businessTypesTitle ? (
                      renderHighlightedText(solution.businessTypesTitle)
                    ) : (
                      <>Built for every kind of <span className="text-[#FF4F18]">food business</span></>
                    )}
                  </h2>
                </div>
                <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed lg:pt-2">
                  <p>
                    {solution.businessTypesDesc || "No matter what type of food or beverage business you run, Digitory adapts to your operations, inventory configurations, and team roles."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {solution.businessTypes.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-left hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all duration-300"
                  >
                    <h4 className="text-md font-bold text-zinc-950 dark:text-white mb-2.5 flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
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
        )}

        {/* 8. Built for Modern F&B Workflows */}
        {(solution.extraGrowth || solution.integrations || solution.supportItems || solution.securityItems || solution.extraOwnersChoice) && (
          <section className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-12 lg:gap-x-16 items-start">
              
              {solution.extraGrowth && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18]">Scalability</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {solution.extraGrowth.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-350 leading-relaxed">
                    {solution.extraGrowth.desc}
                  </p>
                </div>
              )}

              {solution.extraOwnersChoice && (
                <div className="space-y-4 md:border-l md:border-zinc-200/60 dark:md:border-zinc-800/60 md:pl-8 lg:pl-12">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18]">Business Value</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {solution.extraOwnersChoice.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-350 leading-relaxed">
                    {solution.extraOwnersChoice.desc}
                  </p>
                </div>
              )}

              {solution.supportItems && (
                <div className="space-y-5 md:border-l md:border-zinc-200/60 dark:md:border-zinc-800/60 md:pl-8 lg:pl-12">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F18]">Customer Success</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mt-1">
                      Support you can count on
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {solution.supportItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#FF4F18] font-bold text-sm shrink-0">✓</span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-300 font-semibold leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </section>
        )}

        {/* 9. FAQs Section */}
        <SolutionsDetailsFaq items={solution.faqs} />

        {/* 10. Latest Insights Section */}
        <InsightsPage />

        {/* 11. CTA Section */}
        <SolutionsDetailsCta 
          title={solution.ctaBlock?.title} 
          desc={solution.ctaBlock?.desc} 
        />

      </main>

      <FooterPage />
    </div>
  );
}

export default function SolutionsDetailsAllInOne({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-[#0d0d0e] flex items-center justify-center text-[#FF4F18] font-bold text-sm tracking-widest uppercase">
        Loading...
      </div>
    }>
      <DynamicSolutionDetailContent slug={resolvedParams.slug} />
    </Suspense>
  );
}

function SolutionsDetailsFaq({ items }: { items?: { question: string; answer: string }[] }) {
  const [openId, setOpenId] = useState<number | null>(0);

  const handleToggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const defaultFaqs = [
    {
      question: "How does Digitory manage orders from different platforms?",
      answer: "Whether it's dine-in, online orders, QR or direct orders, everything flows into one connected system, so you never have to switch between multiple apps."
    },
    {
      question: "How does the kitchen stay in sync during rush hours?",
      answer: "Orders are sent to the right kitchen station instantly, reducing communication gaps, delays and missed tickets when every second counts."
    },
    {
      question: "Can Digitory help reduce inventory wastage?",
      answer: "Yes. Inventory updates automatically with every sale, helping you track stock movement, reduce wastage and protect your margins."
    },
    {
      question: "Can I manage customer loyalty and repeat business?",
      answer: "Absolutely. Build customer profiles, run loyalty programs and targeted campaigns that keep guests coming back."
    },
    {
      question: "Will I get real-time reports and insights?",
      answer: "Yes. Monitor sales, inventory, outlet performance and business trends in real time, so you can make faster, data-backed decisions."
    },
    {
      question: "Can I manage multiple outlets from one dashboard?",
      answer: "Yes. Compare outlet performance, monitor operations, and track key metrics across all your locations without chasing managers for updates."
    },
    {
      question: "Will billing slow us down during peak hours?",
      answer: "Not at all. Digitory is built for handling chaos better, helping your team bill faster, reducing queues, and keeping operations moving smoothly during rush hours."
    }
  ];

  const listToRender = items && items.length > 0 ? items : defaultFaqs;

  return (
    <div className="bg-white dark:bg-[#0d0d0e] font-sans antialiased text-[#111111] dark:text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-14 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-[#111111] dark:text-white">
            Questions before you <span className="text-[#FF4F18]">commit?</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto border-t border-zinc-150 dark:border-zinc-800">
          {listToRender.map((item, idx) => {
            const isOpen = openId === idx;
            return (
              <div
                key={idx}
                className="border-b border-zinc-150 dark:border-zinc-800"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between py-6 text-left outline-none cursor-pointer group"
                >
                  <span className="text-[16px] sm:text-[18px] font-bold text-[#111111] dark:text-white pr-6 transition-colors duration-200 group-hover:text-zinc-650">
                    {item.question}
                  </span>

                  <span className="text-[#FF4F18] font-[400] text-[26px] leading-none select-none flex-shrink-0 w-6 text-right transition-transform duration-200">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[250px] pb-6 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-[15px] sm:text-[16px] text-[#666666] dark:text-zinc-400 leading-relaxed max-w-[90%]">
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
