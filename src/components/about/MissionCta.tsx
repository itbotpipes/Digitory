'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function MissionCta() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const words = [
    "Want", "to", "see", "how", "Digitory", "can", "help", "your", "restaurant?"
  ];
  return (
    <section className="bg-white dark:bg-[#0d0d0e] py-8 md:py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-16">
        
        {/* Mission Statement Block */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Main Statement */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
            Our vision
          </h2>

          {/* Subtext */}
          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
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

          {/* Badge */}
          <div className="flex justify-center pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-[#FF4F18]/10 px-4 py-2 text-xs sm:text-sm font-extrabold text-[#FF4F18]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Let's make restaurant management simple.
            </span>
          </div>

        </div>

        {/* Call to Action Card */}
        <div className="rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 py-20 md:py-32 px-8 sm:px-16 text-center shadow-lg relative overflow-hidden transition-all duration-300">
          {/* Visual gradient backdrop */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4F18]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF4F18]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h3
              ref={containerRef}
              className={`text-2xl sm:text-3xl font-extrabold leading-snug transition-all duration-1000 transform select-none ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-30"
              }`}
            >
              {words.map((word, idx) => {
                const isSpecial = word === "Digitory";
                return (
                  <span
                    key={idx}
                    className={`inline-block mr-[0.25em] transition-colors duration-500 ${
                      isVisible
                        ? isSpecial
                          ? "text-[#FF4F18]"
                          : "text-zinc-900 dark:text-white"
                        : "text-zinc-300 dark:text-zinc-700"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${idx * 120 + 350}ms` : "0ms"
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h3>
            
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-450 leading-relaxed max-w-xl mx-auto">
              Book a personalized demo and see how Digitory can simplify your restaurant operations.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
