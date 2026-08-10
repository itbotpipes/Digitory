'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MissionCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);
  const doneRef = useRef(false);
  const lockedRef = useRef(false);

  const line1 = ["We", "envision.", "We", "deliver."];
  const line2 = ["We", "execute.", "We", "evolve."];
  const totalWords = line1.length + line2.length;

  // Total accumulated wheel delta needed to go 0→1
  const TOTAL_DELTA = 900;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Watch when section reaches center of viewport → lock scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Lock when section is >60% visible; unlock when animation done or leaving
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          if (!doneRef.current) lockedRef.current = true;
        } else {
          // Allow re-lock only if scrolling back up (reset progress)
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Section scrolled back above viewport — reset so user can replay
            progressRef.current = 0;
            doneRef.current = false;
            setScrollProgress(0);
          }
          lockedRef.current = false;
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    observer.observe(section);

    const handleWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;

      // Allow scrolling UP past section start (so user can go back)
      if (e.deltaY < 0 && progressRef.current <= 0) {
        lockedRef.current = false;
        doneRef.current = false;
        return;
      }

      e.preventDefault();

      const accumulated = progressRef.current * TOTAL_DELTA + e.deltaY;
      const clamped = Math.max(0, Math.min(TOTAL_DELTA, accumulated));
      progressRef.current = clamped / TOTAL_DELTA;
      setScrollProgress(progressRef.current);

      if (progressRef.current >= 1) {
        doneRef.current = true;
        lockedRef.current = false;
      }
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;

      if (deltaY < 0 && progressRef.current <= 0) {
        lockedRef.current = false;
        return;
      }

      e.preventDefault();

      const accumulated = progressRef.current * TOTAL_DELTA + deltaY * 2.5;
      const clamped = Math.max(0, Math.min(TOTAL_DELTA, accumulated));
      progressRef.current = clamped / TOTAL_DELTA;
      setScrollProgress(progressRef.current);

      if (progressRef.current >= 1) {
        doneRef.current = true;
        lockedRef.current = false;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-[#0d0d0e] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-16 py-8 md:py-12">

        {/* Mission Statement Block */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15]">
                Our <span className="text-[#FF4F18]">vision.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed lg:pt-2">
              <p>
                Let&apos;s make restaurant management simple. We&apos;re building the infrastructure to power the future of Indian hospitality.
              </p>
            </div>
          </div>

          {/* 3-Card Grid for Vision Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch border border-zinc-200/60 dark:border-[#2a2a2e]/60 rounded-[32px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white dark:bg-zinc-950/20">
            {/* Pillar 1 */}
            <div className="flex flex-col h-full p-8 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 border-zinc-200/60 dark:border-[#2a2a2e]/60 border-b md:border-b-0 md:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[#FF4F18] mb-6 shrink-0">
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[#FF4F18] mb-6 shrink-0">
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[#FF4F18] mb-6 shrink-0">
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

        {/* Scroll-locked Word Reveal — natural height, no extra scroll track space */}
        <div
          ref={sectionRef}
          className="flex flex-col gap-2 select-none text-center py-16 md:py-24"
        >
          {/* Line 1 */}
          <h3 className="text-[48px] sm:text-[62px] md:text-[82px] font-[900] tracking-tight leading-[1.05]">
            {line1.map((word, idx) => {
              const wordStart = idx / totalWords;
              const wordEnd = (idx + 0.9) / totalWords;
              let clamped = (scrollProgress - wordStart) / (wordEnd - wordStart);
              clamped = Math.max(0, Math.min(1, clamped));
              const isOrange = idx % 2 === 1;
              return (
                <span
                  key={idx}
                  className="relative inline-block mr-[0.25em] text-[#E5E7EB] dark:text-[#2a2a2e]"
                >
                  {word}
                  <span
                    className={`absolute inset-0 ${isOrange ? 'text-[#FF4F18]' : 'text-[#111111] dark:text-white'}`}
                    style={{ opacity: clamped }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </h3>

          {/* Line 2 */}
          <h3 className="text-[48px] sm:text-[62px] md:text-[82px] font-[900] tracking-tight leading-[1.05]">
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
                  className="relative inline-block mr-[0.25em] text-[#E5E7EB] dark:text-[#2a2a2e]"
                >
                  {word}
                  <span
                    className={`absolute inset-0 ${isOrange ? 'text-[#FF4F18]' : 'text-[#111111] dark:text-white'}`}
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
    </section>
  );
}
