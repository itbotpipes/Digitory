'use client';

import React from 'react';

export default function BeliefsSection() {
  const stats = [
    { value: '100+', label: 'restaurant outlets', sublabel: 'using Digitory' },
    { value: '2M+', label: 'orders', sublabel: 'handled every month' },
    { value: '10+', label: 'years of experience', sublabel: 'solving restaurant challenges' },
    { value: '150+', label: 'cities', sublabel: 'across India' },
  ];

  const beliefs = [
    {
      num: '01',
      title: 'Good systems make restaurants stronger.',
      description: 'A restaurant should run smoothly even when your best manager is on leave.',
    },
    {
      num: '02',
      title: 'Clear information leads to better decisions.',
      description: "You don't need to work longer hours. You simply need to know what's happening in your restaurant at the right time.",
    },
    {
      num: '03',
      title: 'Growing your business should feel exciting.',
      description: 'Opening a new outlet should help your business grow, not create more confusion.',
    },
    {
      num: '04',
      title: 'We stay with our customers.',
      description: 'Our work doesn\'t end after installation. We help you set up the system, solve problems, and keep improving as your business grows.',
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0d0d0e] py-8 md:py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-20">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-y-12 gap-x-4 md:grid-cols-4 md:gap-0 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center px-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 last:border-r-0">
              <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                <span className="text-[#FF4F18]">{stat.value}</span>
              </h3>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-[260px]">
                <span className="text-zinc-900 dark:text-white">{stat.label}</span>
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 max-w-[260px] leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Beliefs Block */}
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              What <span className="text-[#FF4F18]">we believe</span>
            </h2>
          </div>

          {/* 4-Column Row of Beliefs */}
          <div className="grid grid-cols-1 md:grid-cols-4 rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200/60 dark:border-zinc-800/80 divide-y md:divide-y-0 md:divide-x divide-zinc-200/60 dark:divide-zinc-800/65 shadow-2xs overflow-hidden">
            {beliefs.map((belief, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 flex flex-col justify-start gap-4 transition-all duration-300 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 group"
              >
                <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 block">
                  {belief.num}
                </span>
                
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug transition-colors duration-300">
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
