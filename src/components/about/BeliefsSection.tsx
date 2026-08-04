'use client';

import React from 'react';

export default function BeliefsSection() {
  const stats = [
    { value: '100+', label: 'outlets', sublabel: 'using Digitory' },
    { value: '2M+', label: 'orders', sublabel: 'handled monthly' },
    { value: '10+', label: 'years of', sublabel: "solving restaurant's problem" },
    { value: '150+', label: 'cities', sublabel: 'across India' },
  ];

  const beliefs = [
    {
      num: '01',
      title: 'Good systems run the restaurant, not just the people.',
      description: 'If your best manager takes a day off, your restaurant should still run smoothly.',
    },
    {
      num: '02',
      title: 'Seeing clearly is better than working harder.',
      description: "You don't need to work more hours. You need to see what's happening in your restaurant, right now.",
    },
    {
      num: '03',
      title: 'Growing should be easy, not stressful.',
      description: 'Opening a new outlet should feel exciting, not chaotic.',
    },
    {
      num: '04',
      title: 'We stay with you. We don’t just sell and leave.',
      description: 'We help set things up, we fix problems together, and we keep improving as your restaurant grows.',
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0d0d0e] py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-20">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 p-8 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200/50 dark:border-[#2a2a2e]/40 shadow-xs divide-y-2 divide-zinc-200/20 md:divide-y-0 md:divide-x-2 dark:divide-[#2a2a2e]/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 md:first:pl-0 md:last:pr-0">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#FF4F18]">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-zinc-900 dark:text-white mt-2 block transition-colors duration-300">
                {stat.label}
              </span>
              <span className="text-xs sm:text-sm text-zinc-450 dark:text-zinc-550 mt-0.5 leading-normal">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>

        {/* Beliefs Block */}
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              A few simple things <span className="text-[#FF4F18]">we <br className="hidden md:inline" />believe in.</span>
            </h2>
          </div>

          {/* 4-Column Row of Beliefs */}
          <div className="grid grid-cols-1 md:grid-cols-4 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200/60 dark:border-zinc-800/80 divide-y md:divide-y-0 md:divide-x divide-zinc-200/60 dark:divide-zinc-800/65 shadow-2xs overflow-hidden">
            {beliefs.map((belief, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 flex flex-col justify-start gap-4 transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 group"
              >
                <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 block">
                  {belief.num}
                </span>
                
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-[#FF4F18] transition-colors duration-300">
                  {belief.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  {belief.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
