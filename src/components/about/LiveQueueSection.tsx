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
            <div className="w-full max-w-[480px] rounded-3xl bg-white dark:bg-[#17171a] border border-zinc-200/60 dark:border-[#2a2a2e]/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.18)] overflow-hidden">
              
              {/* Header of Queue */}
              <div className="bg-zinc-50 dark:bg-[#1f1f23] px-6 py-4 flex items-center justify-between border-b border-zinc-100 dark:border-[#2a2a2e]/60">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-zinc-800 dark:text-zinc-100">
                    Live Order Queue
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-orange-50 dark:bg-[#FF4F18]/15 px-2.5 py-0.5 text-xs font-bold text-[#FF4F18] border border-[#FF4F18]/20">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#FF4F18] animate-pulse" />
                    14 active
                  </span>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Auto-refreshing</span>
              </div>

              {/* Tickets list */}
              <div className="divide-y divide-zinc-100 dark:divide-[#2a2a2e]/40 p-4 sm:p-6 space-y-3.5">
                {tickets.map((t) => {
                  let statusBg = 'bg-zinc-50 dark:bg-[#1C1C20] text-zinc-600 dark:text-zinc-400';
                  let isWarning = t.status === 'warning';
                  let isServed = t.status === 'served';

                  if (isWarning) {
                    statusBg = 'bg-orange-50 dark:bg-[#FF4F18]/15 text-[#FF4F18] border border-[#FF4F18]/25 font-extrabold';
                  } else if (isServed) {
                    statusBg = 'bg-zinc-100 dark:bg-zinc-800/85 text-zinc-600 dark:text-zinc-350 border border-zinc-200/50 dark:border-zinc-700/60 font-extrabold';
                  }

                  return (
                    <div
                      key={t.id}
                      className="flex items-center justify-between pt-3.5 first:pt-0 group hover:translate-x-0.5 transition-transform"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-extrabold text-zinc-450 dark:text-zinc-550 uppercase tracking-wider block">
                          {t.source}
                        </span>
                        <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                          {t.detail}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${statusBg}`}>
                          {isWarning && (
                            <svg className="w-3.5 h-3.5 text-[#FF4F18] shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          )}
                          {t.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
