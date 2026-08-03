'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function StorySection() {
  const [activeTimeline, setActiveTimeline] = useState<number>(3); // Default Today active

  const milestones = [
    {
      year: '2019',
      title: 'We saw the chaos',
      description: 'Restaurant owners were using 8+ different tools to run their business.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      year: '2020',
      title: 'We started building',
      description: 'We decided to build one simple, connected system.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      year: '2022',
      title: 'First restaurant went live',
      description: 'Our first customer trusted us. We built, learned and improved every single day.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      year: 'Today',
      title: 'Helping restaurants grow',
      description: '100+ restaurants trust Digitory to run their operations without chaos.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  const beforeItems = [
    { label: 'Different Apps', desc: 'Siloed tools' },
    { label: 'Manual Work', desc: 'Wasted labor' },
    { label: 'Missing Reports', desc: 'No clear numbers' },
    { label: 'No Real-time Visibility', desc: 'Running blind' },
  ];

  const afterItems = [
    {
      label: 'Orders Synced',
      icon: (
        <svg className="w-5 h-5 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Inventory Updated',
      icon: (
        <svg className="w-5 h-5 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: 'Kitchen in Control',
      icon: (
        <svg className="w-5 h-5 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      label: 'Reports Live',
      icon: (
        <svg className="w-5 h-5 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9-10v10a2 2 0 01-2 2h-2a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      label: 'Customers Engaged',
      icon: (
        <svg className="w-5 h-5 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0d0d0e] py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">
            Our <span className="text-[#FF4F18]">Story</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 mt-3 font-semibold">
            We started in kitchens, not in a boardroom.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Milestones Timeline */}
          <div className="lg:col-span-5 relative pl-4 sm:pl-6 border-l-2 border-zinc-100 dark:border-zinc-900/60">
            <div className="space-y-12">
              {milestones.map((milestone, idx) => {
                const isActive = activeTimeline === idx;
                return (
                  <div
                    key={idx}
                    className="relative cursor-pointer group"
                    onClick={() => setActiveTimeline(idx)}
                  >
                    {/* Circle Node indicator on the line */}
                    <div
                      className={`absolute -left-[27px] sm:-left-[37px] top-1.5 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FF4F18] border-[#FF4F18] text-white shadow-[0_0_12px_rgba(255,79,24,0.4)]'
                          : 'bg-white dark:bg-[#0d0d0e] border-zinc-200 dark:border-zinc-800 text-zinc-450 dark:text-zinc-500 group-hover:border-[#FF4F18] group-hover:text-[#FF4F18]'
                      }`}
                    >
                      {milestone.icon}
                    </div>

                    {/* Node Details */}
                    <div className="space-y-1 pl-4">
                      <span
                        className={`text-sm sm:text-base font-extrabold uppercase tracking-widest transition-colors duration-300 ${
                          isActive ? 'text-[#FF4F18]' : 'text-zinc-450 dark:text-zinc-500'
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <h4
                        className={`text-lg sm:text-xl font-extrabold transition-colors duration-300 ${
                          isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-650 dark:text-zinc-400'
                        }`}
                      >
                        {milestone.title}
                      </h4>
                      <p
                        className={`text-sm sm:text-base transition-all duration-350 leading-relaxed ${
                          isActive
                            ? 'text-zinc-600 dark:text-zinc-300 font-medium'
                            : 'text-zinc-450 dark:text-zinc-500 opacity-80'
                        }`}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Flowchart visual */}
          <div className="lg:col-span-7 rounded-3xl bg-[#F8F9FA] dark:bg-[#121214] border border-zinc-200/50 dark:border-[#2a2a2e]/40 p-5 sm:p-6 flex flex-col gap-5 shadow-sm">
            
            {/* BEFORE Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-zinc-300 dark:border-zinc-750">
                  Before
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-zinc-500 dark:text-zinc-450 uppercase tracking-wider">
                  Disconnected. Chaotic. Stressful.
                </h4>
              </div>

              {/* Grid of issues */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {beforeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-3 rounded-xl bg-white dark:bg-[#17171a] border border-zinc-200 dark:border-zinc-800/80 shadow-xs hover:border-[#FF4F18]/50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-150">{item.label}</span>
                    <span className="text-[10px] sm:text-xs text-zinc-450 dark:text-zinc-500 mt-0.5">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Down Arrow connector */}
            <div className="flex justify-center -my-1 select-none">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white dark:bg-[#17171a] border border-zinc-200 dark:border-[#2a2a2e] text-[#FF4F18] shadow-xs">
                <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* AFTER Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-[#FF4F18]/15 text-[#FF4F18] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#FF4F18]/20">
                    After
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Connected. Simple. In Control.
                  </h4>
                </div>
                {/* Brand Logo marker */}
                <span className="text-[10px] font-extrabold text-[#FF4F18] uppercase tracking-widest bg-orange-50 dark:bg-[#FF4F18]/10 px-2 py-0.5 rounded-md">
                  Digitory
                </span>
              </div>

              {/* Grid of synced benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {afterItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#17171a] border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-[#FF4F18]/45 transition-all"
                  >
                    <div className="scale-90 origin-left">{item.icon}</div>
                    <span className="text-[11px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* App Mockup Preview card */}
            <div className="mt-1 rounded-2xl overflow-hidden border border-zinc-200 dark:border-[#2a2a2e] relative shadow-md">
              <div className="h-5 bg-zinc-200/50 dark:bg-[#1E1E24] px-3 flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-900">
                <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="bg-white dark:bg-[#151518] p-3 flex flex-col gap-2 min-h-[100px]">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-zinc-450 uppercase tracking-widest font-extrabold">Overall Status</span>
                    <h5 className="text-[11px] sm:text-xs font-bold text-[#FF4F18] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18] animate-ping inline-block" />
                      All systems operating normally
                    </h5>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#FF4F18] border border-[#FF4F18]/25 rounded-md px-1.5 py-0.5">Live</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="p-2 bg-zinc-50 dark:bg-[#1A1A1E] rounded-lg space-y-0.5">
                    <span className="text-[9px] text-zinc-400 block font-medium">Orders today</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">412</span>
                  </div>
                  <div className="p-2 bg-zinc-50 dark:bg-[#1A1A1E] rounded-lg space-y-0.5">
                    <span className="text-[9px] text-zinc-400 block font-medium">Net Sales</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">₹84,200</span>
                  </div>
                  <div className="p-2 bg-zinc-50 dark:bg-[#1A1A1E] rounded-lg space-y-0.5">
                    <span className="text-[9px] text-zinc-400 block font-medium">Table Wait Time</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">8.5 min</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
