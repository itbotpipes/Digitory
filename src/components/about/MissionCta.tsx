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
      
      // Calculate scroll progress within the pinned track range
      const totalScrollRange = rect.height - windowHeight;
      const scrolled = -rect.top;
      
      let progress = scrolled / totalScrollRange;
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

  const line1 = ["We", "Engineer.", "We", "Procure."];
  const line2 = ["We", "Build.", "We", "Maintain."];
  const totalWords = line1.length + line2.length;

  // Calculate opacity for the subtext (fades in at the end of the animation)
  const subtextProgress = Math.max(0, Math.min(1, (scrollProgress - 0.8) / 0.2));

  return (
    <section className="bg-white dark:bg-[#0d0d0e] py-8 md:py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-16">
        
        {/* Mission Statement Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Main Statement */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              Our <span className="text-[#FF4F18]">vision</span>
            </h2>

            {/* Badge */}
            <div className="flex justify-start pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-[#FF4F18]/10 px-4 py-2 text-xs sm:text-sm font-extrabold text-[#FF4F18]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Let's make restaurant management simple.
              </span>
            </div>
          </div>

          {/* Subtext */}
          <div className="lg:col-span-5 space-y-6 text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            <p>
              We want every restaurant in India, big or small, to run smoothly without unnecessary stress.
            </p>
            <p>
              Today, Digitory brings billing, inventory, kitchen management, and reports together in one simple system.
            </p>
            <p className="font-bold text-zinc-800 dark:text-zinc-200">
              Tomorrow, we want every restaurant owner to spend less time solving problems and more time serving great food and creating happy customers.
            </p>
          </div>
        </div>

        {/* Pinned Card Track Container */}
        <div ref={trackRef} className="relative h-[180vh] -mx-6 md:-mx-8">
          <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-8">
            {/* Call to Action Card */}
            <div className="rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 py-24 md:py-32 px-8 sm:px-16 text-center shadow-lg relative overflow-hidden transition-all duration-300 w-full max-w-5xl">
              {/* Visual gradient backdrop */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4F18]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF4F18]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
                <div className="flex flex-col gap-3 select-none">
                  
                  {/* Line 1 */}
                  <h3 className="text-3xl sm:text-5xl md:text-[64px] font-[900] tracking-tight leading-[1.1]">
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
                          className="relative inline-block mr-[0.3em] text-[#E5E7EB] dark:text-[#2a2a2e] select-none"
                        >
                          {word}
                          <span 
                            className={`absolute inset-0 select-text transition-opacity duration-150 ${
                              isOrange ? "text-[#FF4F18]" : "text-[#111111] dark:text-white"
                            }`}
                            style={{
                              opacity: clamped,
                            }}
                          >
                            {word}
                          </span>
                        </span>
                      );
                    })}
                  </h3>

                  {/* Line 2 */}
                  <h3 className="text-3xl sm:text-5xl md:text-[64px] font-[900] tracking-tight leading-[1.1] mt-2">
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
                          className="relative inline-block mr-[0.3em] text-[#E5E7EB] dark:text-[#2a2a2e] select-none"
                        >
                          {word}
                          <span 
                            className={`absolute inset-0 select-text transition-opacity duration-150 ${
                              isOrange ? "text-[#FF4F18]" : "text-[#111111] dark:text-white"
                            }`}
                            style={{
                              opacity: clamped,
                            }}
                          >
                            {word}
                          </span>
                        </span>
                      );
                    })}
                  </h3>

                </div>
                
                {/* Subtext with scroll-driven opacity */}
                <div 
                  className="transition-all duration-300 transform"
                  style={{
                    opacity: subtextProgress,
                    transform: `translateY(${(1 - subtextProgress) * 8}px)`,
                  }}
                >
                  <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-550 max-w-xl mx-auto font-medium">
                    One accountable partner, from the first site visit to year twenty-five.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
