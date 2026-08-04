"use client";

import React from "react";

export default function SolutionsCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-8 md:p-16 text-zinc-900 dark:text-white shadow-xl border border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden select-none">

        {/* Left Side: Title and Subtitle */}
        <div className="flex flex-col space-y-4 text-left max-w-xl">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18]">
            Ready to transform?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
            Elevate your restaurant <br />
            <span className="text-[#FF4F18]">operations today.</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Schedule a personalized 15-minute demo with our F&B solution architect.
          </p>
        </div>

        {/* Right Side: CTA Button */}
        {/* <div className="flex-shrink-0 w-full md:w-auto">
          <button className="w-full md:w-auto inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer">
            Book Free Live Demo <span className="text-white font-normal">→</span>
          </button>
        </div> */}

      </div>
    </section>
  );
}
