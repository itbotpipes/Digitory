'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MissionCta() {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Animate as it scrolls through the middle of the viewport
      const startTrigger = windowHeight * 0.85; 
      const endTrigger = windowHeight * 0.15;
      const range = startTrigger - endTrigger;
      const scrolled = startTrigger - rect.top;
      
      let progress = scrolled / range;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      targetProgress.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    let rAF: number;
    const tick = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.085; // Easing LERP factor (8.5% travel per frame)
        setScrollProgress(currentProgress.current);
      }
      rAF = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rAF);
    };
  }, []);

  const line1 = ["We", "envision.", "We", "deliver."];
  const line2 = ["We", "execute.", "We", "evolve."];
  const totalWords = line1.length + line2.length;

  return (
    <section className="bg-white dark:bg-[#0d0d0e] py-8 md:py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-16">
        
        {/* Mission Statement Block */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15]">
                Our <span className="text-[#FF4F18]">vision.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed lg:pt-2">
              <p>
                Let's make restaurant management simple. We're building the infrastructure to power the future of Indian hospitality.
              </p>
            </div>
          </div>

          {/* 3-Card Grid for Vision Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch border border-zinc-200/60 dark:border-[#2a2a2e]/60 rounded-[32px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white dark:bg-zinc-950/20">
            {/* Pillar 1 */}
            <div className="flex flex-col h-full p-8 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 border-b md:border-b-0 md:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 text-[#FF4F18] mb-6 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4.5l16 2.4-2.4 16L4 18.5V4.5z" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug">Empower Every Restaurant</h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                We want every restaurant in India, big or small, to run smoothly, optimize margins, and operate without unnecessary daily stress.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col h-full p-8 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 border-b md:border-b-0 md:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 text-[#FF4F18] mb-6 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug">Unify the Chaos</h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                By bringing billing, inventory, kitchen management, and reports together, we replace fragmented tools with one unified, intelligent workspace.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col h-full p-8 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 md:border-b-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 text-[#FF4F18] mb-6 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2 leading-snug">Focus on Hospitality</h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                We want restaurant owners to spend less time troubleshooting system errors and more time serving great food and delighting their guests.
              </p>
            </div>
          </div>
        </div>

        {/* Animated Scroll Text */}
        <div ref={trackRef} className="relative py-8 md:py-16 flex items-center justify-center">
          <div className="flex flex-col gap-2 select-none text-center">

              {/* Line 1 */}
              <h3 className="text-[42px] sm:text-[54px] md:text-[72px] font-[900] tracking-tight leading-[1.05]">
                {line1.map((word, idx) => {
                  const globalIdx = idx;
                  const wordStart = globalIdx / totalWords;
                  const wordEnd = (globalIdx + 0.9) / totalWords;
                  let clamped = (scrollProgress - wordStart) / (wordEnd - wordStart);
                  clamped = Math.max(0, Math.min(1, clamped));
                  const isOrange = idx % 2 === 1;

                  return (
                    <span
                      key={idx}
                      className="relative inline-block mr-[0.25em] text-[#E5E7EB] dark:text-[#2a2a2e] select-none"
                    >
                      {word}
                      <span
                        className={`absolute inset-0 select-text transition-opacity duration-150 ${
                          isOrange ? "text-[#FF4F18]" : "text-[#111111] dark:text-white"
                        }`}
                        style={{ opacity: clamped }}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </h3>

              {/* Line 2 */}
              <h3 className="text-[42px] sm:text-[54px] md:text-[72px] font-[900] tracking-tight leading-[1.05]">
                {line2.map((word, idx) => {
                  const globalIdx = line1.length + idx;
                  const wordStart = globalIdx / totalWords;
                  const wordEnd = (globalIdx + 0.9) / totalWords;
                  let clamped = (scrollProgress - wordStart) / (wordEnd - wordStart);
                  clamped = Math.max(0, Math.min(1, clamped));
                  const isOrange = idx % 2 === 1;

                  return (
                    <span
                      key={idx}
                      className="relative inline-block mr-[0.25em] text-[#E5E7EB] dark:text-[#2a2a2e] select-none"
                    >
                      {word}
                      <span
                        className={`absolute inset-0 select-text transition-opacity duration-150 ${
                          isOrange ? "text-[#FF4F18]" : "text-[#111111] dark:text-white"
                        }`}
                        style={{ opacity: clamped }}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </h3>

            </div>
        </div>

      </div>
    </section>
  );
}
