'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function OperationsReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);
  const doneRef = useRef(false);
  const lockedRef = useRef(false);

  const paragraphWords = [
    "Most", "restaurants", "rely", "on", "five", "different", "tools", "that", "do", "not",
    "speak", "to", "one", "another.", "Orders", "get", "missed,", "inventory", "records", "fall",
    "behind,", "staff", "calculations", "waste", "hours,", "and", "management", "feels", "like", "chaos."
  ];
  const totalWords = paragraphWords.length;

  const TOTAL_DELTA = 900; // scroll effort to reveal all words

  // Randomize the reveal order on mount
  const [revealOrder, setRevealOrder] = useState<number[]>([]);
  useEffect(() => {
    const order = Array.from({ length: totalWords }, (_, i) => i);
    // Deterministic-like simple shuffle so it doesn't change on every render, only on mount
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setRevealOrder(order);
  }, [totalWords]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          if (!doneRef.current) lockedRef.current = true;
        } else {
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
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

  const renderWord = (word: string, globalIdx: number) => {
    // Fallback to sequential if order is not generated yet
    const orderIndex = revealOrder.length > 0 ? revealOrder.indexOf(globalIdx) : globalIdx;
    
    const wordStart = orderIndex / totalWords;
    const isActive = scrollProgress >= wordStart;
    
    // Highlight specific pain-point keywords in orange for visual appeal
    const isOrange = word.toLowerCase().includes("five") || 
                     word.toLowerCase().includes("missed") || 
                     word.toLowerCase().includes("behind") || 
                     word.toLowerCase().includes("waste") || 
                     word.toLowerCase().includes("chaos");

    return (
      <span
        key={globalIdx}
        className={`transition-colors duration-300 ${
          isActive 
            ? (isOrange ? 'text-[#FF4F18] font-bold' : 'text-zinc-600 dark:text-zinc-300') 
            : 'text-zinc-300 dark:text-zinc-700'
        }`}
      >
        {word}{" "}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-white dark:bg-[#0d0d0e] py-16 md:py-24 border-t border-b border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-7 text-left lg:sticky lg:top-24">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              What happens when operations <span className="text-[#FF4F18]">get fragmented?</span>
            </h2>
          </div>

          {/* Right Column: Scroll reveal paragraph */}
          <div className="lg:col-span-5 text-left pt-2">
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              {paragraphWords.map((word, idx) => renderWord(word, idx))}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
