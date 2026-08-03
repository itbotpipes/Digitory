'use client';

import React from 'react';

export default function ProblemsSection() {
  const problems = [
    {
      title: 'You find out about problems too late',
      description: 'Stock runs out. Orders get delayed. But you only hear about it after it happens — often from a WhatsApp message at night.',
      icon: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'More outlets mean more confusion',
      description: 'What works for one outlet often breaks at the next one. More outlets should mean more growth, not more chaos.',
      icon: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Your tools don’t work together',
      description: 'Billing is in one place. Inventory is in another. Staff talk on WhatsApp. Connecting all of this wastes time you could spend on your customers.',
      icon: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
  ];

  const scenarios = [
    {
      text: 'Paneer ran out mid service',
      subtext: 'Three tables already ordered it',
      status: 'Stock',
      badgeClass: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700/60',
    },
    {
      text: 'Zomato order missed',
      subtext: 'Printed somewhere on the floor',
      status: 'Lost',
      badgeClass: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700/60',
    },
    {
      text: 'Cash mismatch at closing',
      subtext: 'An hour of late night reconciling',
      status: 'Delay',
      badgeClass: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700/60',
    },
    {
      text: 'This is exactly why we built Digitory',
      subtext: 'One system. No more guessing.',
      status: 'Fixed',
      badgeClass: 'bg-orange-50 dark:bg-[#FF4F18]/15 text-[#FF4F18] border border-[#FF4F18]/25',
    },
  ];

  return (
    <section className="bg-[#F8F9FA] dark:bg-[#121214] py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 items-start">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] transition-colors duration-300">
              Running a restaurant
              <br />
              today is hard. <span className="text-[#FF4F18]">Here’s why.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 text-zinc-650 dark:text-zinc-400 space-y-4 text-base sm:text-lg leading-relaxed transition-colors duration-300">
            <p>
              Every restaurant owner deals with the same problems. Orders from many places. Many outlets to manage. A busy kitchen. Staff that keeps changing.
            </p>
            <p>
              Most owners work very hard. But hard work is not enough if you can't see what's happening in your own restaurant.
            </p>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column - Problems */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-2">
              Three simple problems
            </h3>
            <div className="space-y-6 flex-1">
              {problems.map((prob, idx) => (
                <div 
                  key={idx}
                  className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-[#17171a] border border-zinc-200/60 dark:border-[#2a2a2e]/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-[#FF4F18]/10 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {prob.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                      {prob.title}
                    </h4>
                    <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                      {prob.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Friday Night Scenarios */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-2">
              A typical friday night
            </h3>
            <div className="flex-1 flex flex-col gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#17171a] border border-zinc-200/60 dark:border-[#2a2a2e]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
              {scenarios.map((scene, idx) => {
                const isFixed = scene.status === 'Fixed';
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl transition-all duration-300 ${
                      isFixed 
                        ? 'bg-orange-50/10 dark:bg-[#FF4F18]/5 border-2 border-[#FF4F18]/30' 
                        : 'bg-[#F9FAFB] dark:bg-[#1C1C20]/50 border border-zinc-100 dark:border-zinc-900/30'
                    } hover:translate-x-1`}
                  >
                    <div className="space-y-1">
                      <p className={`text-sm sm:text-base font-bold ${isFixed ? 'text-zinc-900 dark:text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>
                        {scene.text}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-450 dark:text-zinc-450">
                        {scene.subtext}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${scene.badgeClass}`}>
                      {scene.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
