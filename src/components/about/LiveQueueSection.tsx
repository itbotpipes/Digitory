'use client';

import React, { useEffect, useState } from 'react';

interface QueueItem {
  id: string;
  source: string;
  detail: string;
  time: string;
  status: 'active' | 'served' | 'warning';
  timeInSecs: number;
}

export default function LiveQueueSection() {
  const [tickets, setTickets] = useState<QueueItem[]>([
    { id: '1', source: 'Table 4', detail: 'Butter Chicken × 2', time: '8 min', status: 'active', timeInSecs: 480 },
    { id: '2', source: 'Zomato #9042', detail: 'Biryani × 3', time: '12 min', status: 'active', timeInSecs: 720 },
    { id: '3', source: 'Table 11', detail: 'Tandoori Platter', time: 'Served', status: 'served', timeInSecs: 0 },
    { id: '4', source: 'Table 8', detail: 'Dal Makhani × 2', time: '5 min', status: 'active', timeInSecs: 300 },
    { id: '5', source: 'Swiggy #7831', detail: 'Paneer Set', time: '3 min', status: 'warning', timeInSecs: 180 },
  ]);

  // Tick down the times on active tickets to show it's alive!
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prev) =>
        prev.map((t) => {
          if (t.status === 'served') return t;
          const nextSecs = t.timeInSecs > 10 ? t.timeInSecs - 10 : 0;
          const mins = Math.ceil(nextSecs / 60);
          
          let nextStatus = t.status;
          if (nextSecs <= 180 && nextSecs > 0) {
            nextStatus = 'warning';
          }
          
          return {
            ...t,
            timeInSecs: nextSecs,
            time: nextSecs === 0 ? 'Served' : `${mins} min`,
            status: nextSecs === 0 ? 'served' : nextStatus,
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const bullets = [
    'Restaurant outlets using Digitory',
    'Orders handled every month',
    'Years working with restaurants',
    'Cities we work in across India',
  ];

  return (
    <section className="bg-white dark:bg-[#121214] py-8 md:py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              Built with restaurants,{' '}
              <span className="text-[#FF4F18]">not just for them</span>
            </h2>
            
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We don't build software and expect restaurants to adjust. Instead, we work closely with restaurant owners, managers, chefs, and staff to understand how restaurants actually operate. Their feedback helps us improve Digitory every day, making it useful even during the busiest shifts. Whether it's a café, brewery, cloud kitchen, or multi-outlet restaurant, we build features that solve real problems.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF4F18]/10 text-[#FF4F18]">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Live Queue Mockup */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[24px] p-6 md:p-8 space-y-6 w-full max-w-[500px] mx-auto lg:mx-0">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 dark:text-white text-[16px]">
                  Live Order Queue
                </h3>
                <span className="inline-flex items-center gap-1.5 bg-[#EAF9F0] dark:bg-[#13B257]/15 text-[#13B257] px-3 py-1 rounded-full text-xs font-bold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13B257] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#13B257]"></span>
                  </span>
                  <span>14 active</span>
                </span>
              </div>

              {/* Tickets list */}
              <div className="space-y-3">
                {tickets.map((t) => {
                  const isWarning = t.status === 'warning';
                  const isServed = t.status === 'served';

                  return (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 cursor-pointer select-none bg-[#F8F9FA] dark:bg-zinc-800/50 hover:bg-[#F1F3F5] dark:hover:bg-zinc-800/80 border border-transparent hover:border-zinc-200/20 dark:hover:border-zinc-700/50 transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center min-w-0 pr-4">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${isWarning ? 'bg-[#FF4F18]' : isServed ? 'bg-[#13B257]' : 'bg-[#4285F4]'}`}
                        />
                        <span className="ml-3.5 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          {t.source} — {t.detail}
                        </span>
                      </div>

                      <div className="flex-shrink-0 flex items-center">
                        {isServed ? (
                          <span className="text-[#13B257] font-bold text-[13px]">
                            Served
                          </span>
                        ) : isWarning ? (
                          <span className="text-[#FF3B30] font-bold text-[13px] flex items-center gap-1">
                            {t.time}
                            <svg
                              className="w-4 h-4 text-amber-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="text-[#888888] font-semibold text-[13px]">
                            {t.time}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                  Auto-refreshing live queue connection.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
