'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const trustCircles = [
    { text: 'R', bg: 'bg-[#ECECEC]', textCol: 'text-zinc-600' },
    { text: 'C', bg: 'bg-[#D2E9E9]', textCol: 'text-teal-600' },
    { text: 'B', bg: 'bg-[#FFE5D9]', textCol: 'text-orange-600' },
    { text: 'K', bg: 'bg-[#E8EAFF]', textCol: 'text-indigo-600' },
  ];

  const chatMessages = [
    {
      role: 'Chef',
      text: 'Orders reaching kitchen on time. 🍳',
      time: '7:42 PM',
      avatarColor: 'bg-emerald-100 text-emerald-700',
      avatarLabel: '👨‍🍳',
    },
    {
      role: 'Inventory',
      text: 'Stock updated. No low stock. 📦',
      time: '7:45 PM',
      avatarColor: 'bg-orange-100 text-orange-700',
      avatarLabel: '📦',
    },
    {
      role: 'Cashier',
      text: 'Billing running smoothly. 🧾',
      time: '7:48 PM',
      avatarColor: 'bg-blue-100 text-blue-700',
      avatarLabel: '💵',
    },
    {
      role: 'Captain',
      text: 'All tables served on time. 🍽️',
      time: '7:52 PM',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarLabel: '🤵',
    },
    {
      role: 'Manager',
      text: 'Sales looking great today! 🚀',
      time: '7:53 PM',
      avatarColor: 'bg-amber-100 text-amber-700',
      avatarLabel: '👔',
    },
  ];


  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 pt-4 pb-10 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">

        {/* Left Copy Column */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Tagline */}
          <div className="flex items-center gap-2">
            {/* <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F18]"></span> */}
            {/* <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#FF4F18]">
              Built for restaurants, cafés & cloud kitchens
            </span> */}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Manage busy hours <span className="text-[#FF4F18]">with ease</span>
            <br />
            {/* <span className="text-[#FF4F18]">not chaos.</span> */}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
            From billing and inventory to customer loyalty and reports, Digitory helps you run your restaurant smoothly and grow your business.          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/request-demo"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              Book a demo
            </Link>
            {/* <Link
              href="#"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              See how it works
            </Link> */}
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
            <div className="flex -space-x-3">
              {trustCircles.map((circle, idx) => (
                <div
                  key={idx}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${circle.bg} ${circle.textCol} font-extrabold text-xs border-2 border-white`}
                >
                  {circle.text}
                </div>
              ))}
            </div>
            <p className="text-xs md:text-sm text-zinc-500 max-w-xs leading-normal">
              Trusted by restaurants, cafés, bars, breweries and cloud kitchens across India.
            </p>
          </div>
        </div>

        {/* Right Column - Restaurant Kitchen Image (Commented out) */}
        {/*
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] group">
            <img
              src="/kitchen.png"
              alt="Restaurant Kitchen"
              className="w-full h-full object-cover transition-transform duration-555 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        */}

        {/* Right Column - Hero Image (Commented out) */}
        {/*
        <div className="lg:col-span-6 flex justify-center lg:justify-end w-full relative perspective-[1000px]">
          <div 
            className="relative w-full max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(255,79,24,0.15)] z-10 transition-transform duration-500 hover:-translate-y-1"
          >
            <Image
              src="/home-hero.png"
              alt="Digitory Restaurant OS"
              fill
              className="object-cover transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[24px] pointer-events-none" />
              {/* Right Column - Custom Interactive Platform Diagram (Commented out previous version) */}
        {/*
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full">
          <div className="w-full max-w-[480px] bg-white dark:bg-[#121214] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_40px_rgba(255,79,24,0.03)] border border-zinc-150 dark:border-zinc-800 transition-all duration-300">
            <div className="bg-[#18181b] dark:bg-black px-4 py-2 flex items-center justify-between text-white">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[9.5px] font-mono tracking-wider text-zinc-400">The Digitory platform</span>
              <span className="text-[7.5px] font-mono tracking-widest text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 uppercase font-bold">&#9679; ONE RECORD</span>
            </div>
            <div className="relative p-3.5 space-y-2.5 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
              <div className="absolute left-2.5 top-12 bottom-16 w-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute right-2.5 top-12 bottom-16 w-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute left-2.5 top-12 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute right-2.5 top-12 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute left-2.5 bottom-16 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="absolute right-2.5 bottom-16 w-6 h-[1px] bg-orange-200/40 dark:bg-orange-950/15" />
              <div className="space-y-1">
                <div className="text-[7.5px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">1 · THE ORDER COMES IN</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { title: 'POS · Billing', sub: 'COUNTER' },
                    { title: 'QR Ordering', sub: 'TABLE' },
                    { title: 'Order Taking App', sub: 'CAPTAIN' }
                  ].map((box, i) => (
                    <div key={i} className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-800/60 rounded-lg p-1.5 text-center">
                      <div className="font-bold text-zinc-900 dark:text-white text-[9.5px]">{box.title}</div>
                      <div className="text-[7px] font-mono text-zinc-400 mt-0.5">{box.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-around items-center h-3">
                {[1, 2, 3].map((n) => (
                  <svg key={n} className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                    <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <div className="text-center relative">
                <div className="inline-block w-[85%] bg-orange-50/50 dark:bg-orange-950/10 border border-[#FF4F18] rounded-xl px-4 py-1.5 shadow-sm z-10 max-w-sm mx-auto">
                  <div className="font-extrabold text-[#FF4F18] text-[10.5px] tracking-wide">One live record</div>
                  <div className="text-[6.5px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5 uppercase tracking-wider">The bill and the stock movement are the same write</div>
                </div>
              </div>
              <div className="flex justify-around items-center h-3">
                {[1, 2, 3].map((n) => (
                  <svg key={n} className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                    <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <div className="space-y-1">
                <div className="text-[7.5px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">2 · EVERYTHING RUNS OFF IT</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { title: 'Kitchen Display', sub: 'STATIONS' },
                    { title: 'Stock', sub: 'LIVE, AS YOU SELL', highlight: true },
                    { title: 'Inventory', sub: 'GRN · PO · VENDORS' }
                  ].map((box, i) => (
                    <div key={i} className={`rounded-lg p-1.5 text-center transition-all ${
                      box.highlight 
                        ? 'border border-[#FF4F18] bg-orange-50/20 dark:bg-orange-950/5 shadow-sm' 
                        : 'bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-800/60'
                    }`}>
                      <div className={`font-bold text-[9.5px] ${box.highlight ? 'text-[#FF4F18]' : 'text-zinc-900 dark:text-white'}`}>{box.title}</div>
                      <div className="text-[7px] font-mono text-zinc-400 mt-0.5">{box.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-around items-center h-3">
                {[1, 2, 3].map((n) => (
                  <svg key={n} className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                    <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>
              <div className="space-y-1">
                <div className="text-[7.5px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">3 · WHAT IT COST YOU</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { title: 'Recipe', sub: 'COST PER DISH' },
                    { title: 'Party Management', sub: 'EVENT COSTING' },
                    { title: 'Cost of Issue', sub: 'VS REVENUE, REAL TIME', highlight: true }
                  ].map((box, i) => (
                    <div key={i} className={`rounded-lg p-1.5 text-center transition-all ${
                      box.highlight 
                        ? 'border border-[#FF4F18] bg-orange-50/20 dark:bg-orange-950/5 shadow-sm' 
                        : 'bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-800/60'
                    }`}>
                      <div className={`font-bold text-[9.5px] ${box.highlight ? 'text-[#FF4F18]' : 'text-zinc-900 dark:text-white'}`}>{box.title}</div>
                      <div className="text-[7px] font-mono text-zinc-400 mt-0.5">{box.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center h-3">
                <svg className="w-2.5 h-3 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 10 20">
                  <path d="M5 0 L5 20 M2 14 L5 20 L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="bg-[#121824] dark:bg-black border border-zinc-850 rounded-xl p-2 text-center text-white shadow-md">
                <div className="font-extrabold text-[10.5px] text-zinc-100 tracking-wide">Analytics & AI layer</div>
                <div className="text-[6.5px] font-mono text-zinc-400 mt-0.5 uppercase tracking-widest">Reads and acts across every module above</div>
              </div>
              <div className="text-center text-[7.5px] font-mono text-zinc-450 dark:text-zinc-500 pt-0.5 tracking-wide">
                Nothing re-entered. Nothing reconciled.
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs md:text-sm text-zinc-650 dark:text-zinc-400 text-center lg:text-left font-medium max-w-[480px]">
            One record underneath, AI across the top — <span className="font-extrabold text-zinc-900 dark:text-white">nothing re-entered,<br />nothing reconciled.</span>
          </p>
        </div>
        */}

        {/* Right Column - New premium platform diagram with Twelve Pillars */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full lg:pt-8">

          {/* New Flow Diagram Card */}
          <div className="w-full max-w-[540px] bg-white dark:bg-[#0c0d12] rounded-2xl p-4 md:p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl">
            <div className="space-y-0.5">
              
              {/* Row 1 Modules */}
              <div className="grid grid-cols-3 gap-2.5 relative z-10">
                {[
                  { title: 'POS & Billing', sub: 'COUNTER · FAST & ACCURATE' },
                  { title: 'QR Code Ordering', sub: 'TABLE · PREPAID & POSTPAID' },
                  { title: 'Order Management', sub: 'CAPTAIN APP · AGGREGATORS' }
                ].map((card, i) => (
                  <div key={i} className="bg-white dark:bg-[#121319] border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-2.5 flex items-start gap-2 min-h-[50px] shadow-sm">
                    {/* Orange Dot grid icon */}
                    <div className="grid grid-cols-3 gap-[2px] w-3.5 h-3.5 pt-0.5 flex-shrink-0">
                      {[...Array(9)].map((_, idx) => (
                        <span key={idx} className={`w-[3px] h-[3px] rounded-[1px] ${idx % 3 === 0 ? 'bg-[#FF4F18] shadow-[0_0_3px_#FF4F18]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                      ))}
                    </div>
                    <div>
                      <div className="font-extrabold text-[10px] md:text-[10.5px] text-zinc-900 dark:text-white leading-tight">{card.title}</div>
                      <div className="text-[6.5px] font-mono text-zinc-450 dark:text-zinc-500 mt-0.5 tracking-wide">{card.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider 1 - Row 1 to One Live Record */}
              <div className="relative h-6 z-0">
                <div className="absolute left-[16.6%] right-[16.6%] top-[10px] h-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[16.6%] top-[2px] h-2 w-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute right-[16.6%] top-[2px] h-2 w-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[50%] top-[2px] h-6 w-[1.5px] bg-[#FF4F18]/80 -translate-x-[0.75px]" />
                
                {/* Glowing junction dots */}
                <div className="absolute left-[16.6%] top-[8.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] -translate-x-[2px]" />
                <div className="absolute right-[16.6%] top-[8.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] translate-x-[2px]" />
                <div className="absolute left-[50%] top-[8.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] -translate-x-[2.5px]" />
              </div>

              {/* Middle Layer - One Live Record */}
              <div className="relative z-10 text-center">
                <div className="inline-block w-full bg-white dark:bg-[#121319] border border-[#FF4F18]/45 rounded-xl px-4 py-2.5 shadow-sm">
                  <div className="font-extrabold text-[#FF4F18] text-[12px] tracking-wide">One Live Record</div>
                  <div className="text-[7.5px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5 uppercase tracking-wider">The bill and the stock movement are the same write</div>
                </div>
              </div>

              {/* Divider 2 - One Live Record to Row 2 */}
              <div className="relative h-6 z-0">
                <div className="absolute left-[50%] top-0 h-3 w-[1.5px] bg-[#FF4F18]/80 -translate-x-[0.75px]" />
                <div className="absolute left-[16.6%] right-[16.6%] top-[12px] h-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[16.6%] top-[12px] h-3 w-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[50%] top-[12px] h-3 w-[1.5px] bg-[#FF4F18]/80 -translate-x-[0.75px]" />
                <div className="absolute right-[16.6%] top-[12px] h-3 w-[1.5px] bg-[#FF4F18]/80" />
                
                {/* Glowing junction dots */}
                <div className="absolute left-[50%] top-[10.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] -translate-x-[2.5px]" />
                <div className="absolute left-[16.6%] top-[10.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] -translate-x-[2px]" />
                <div className="absolute right-[16.6%] top-[10.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] translate-x-[2px]" />
              </div>

              {/* Row 2 Modules */}
              <div className="grid grid-cols-3 gap-2.5 relative z-10">
                {[
                  { title: 'Kitchen Display System', sub: 'STATIONS · REAL-TIME KOT' },
                  { title: 'Smart Stock Counting', sub: 'LIVE, AS YOU SELL', highlight: true },
                  { title: 'Inventory Management', sub: 'GRN · PO · VENDORS' }
                ].map((card, i) => (
                  <div key={i} className={`border rounded-xl p-2.5 flex items-start gap-2 min-h-[50px] shadow-sm transition-all ${
                    card.highlight 
                      ? 'border-[#FF4F18] bg-orange-50/20 dark:bg-[#FF4F18]/5 shadow-[0_0_12px_rgba(255,79,24,0.1)]' 
                      : 'bg-white dark:bg-[#121319] border-zinc-200 dark:border-zinc-800/80'
                  }`}>
                    {/* Orange grid icon */}
                    <div className="grid grid-cols-3 gap-[2px] w-3.5 h-3.5 pt-0.5 flex-shrink-0">
                      {[...Array(9)].map((_, idx) => (
                        <span key={idx} className={`w-[3px] h-[3px] rounded-[1px] ${card.highlight || idx % 2 === 0 ? 'bg-[#FF4F18] shadow-[0_0_3px_#FF4F18]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                      ))}
                    </div>
                    <div>
                      <div className={`font-extrabold text-[10px] md:text-[10.5px] leading-tight ${card.highlight ? 'text-[#FF4F18]' : 'text-zinc-900 dark:text-white'}`}>{card.title}</div>
                      <div className="text-[6.5px] font-mono text-zinc-450 dark:text-zinc-500 mt-0.5 tracking-wide">{card.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider 3 - Row 2 to Row 3 (Straight drops) */}
              <div className="relative h-5 z-0">
                <div className="absolute left-[16.6%] top-0 h-5 w-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[50%] top-0 h-5 w-[1.5px] bg-[#FF4F18]/80 -translate-x-[0.75px]" />
                <div className="absolute right-[16.6%] top-0 h-5 w-[1.5px] bg-[#FF4F18]/80" />
              </div>

              {/* Row 3 Modules */}
              <div className="grid grid-cols-3 gap-2.5 relative z-10">
                {[
                  { title: 'Recipe Management', sub: 'COST PER DISH' },
                  { title: 'Clubs & Events', sub: 'CASHLESS, EVENT COSTING' },
                  { title: 'Business Analytics', sub: 'COST OF ISSUE VS REVENUE, LIVE', highlight: true }
                ].map((card, i) => (
                  <div key={i} className={`border rounded-xl p-2.5 flex items-start gap-2 min-h-[50px] shadow-sm transition-all ${
                    card.highlight 
                      ? 'border-[#FF4F18] bg-orange-50/20 dark:bg-[#FF4F18]/5 shadow-[0_0_12px_rgba(255,79,24,0.1)]' 
                      : 'bg-white dark:bg-[#121319] border-zinc-200 dark:border-zinc-800/80'
                  }`}>
                    {/* Orange grid icon */}
                    <div className="grid grid-cols-3 gap-[2px] w-3.5 h-3.5 pt-0.5 flex-shrink-0">
                      {[...Array(9)].map((_, idx) => (
                        <span key={idx} className={`w-[3px] h-[3px] rounded-[1px] ${card.highlight || idx % 3 === 1 ? 'bg-[#FF4F18] shadow-[0_0_3px_#FF4F18]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                      ))}
                    </div>
                    <div>
                      <div className={`font-extrabold text-[10px] md:text-[10.5px] leading-tight ${card.highlight ? 'text-[#FF4F18]' : 'text-zinc-900 dark:text-white'}`}>{card.title}</div>
                      <div className="text-[6.5px] font-mono text-zinc-450 dark:text-zinc-500 mt-0.5 tracking-wide">{card.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider 4 - Row 3 to AI Layer */}
              <div className="relative h-6 z-0">
                <div className="absolute left-[16.6%] top-0 h-3 w-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[50%] top-0 h-3 w-[1.5px] bg-[#FF4F18]/80 -translate-x-[0.75px]" />
                <div className="absolute right-[16.6%] top-0 h-3 w-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[16.6%] right-[16.6%] top-[12px] h-[1.5px] bg-[#FF4F18]/80" />
                <div className="absolute left-[50%] top-[12px] h-3 w-[1.5px] bg-[#FF4F18]/80 -translate-x-[0.75px]" />
                
                {/* Glowing junction dots */}
                <div className="absolute left-[16.6%] top-[10.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] -translate-x-[2px]" />
                <div className="absolute right-[16.6%] top-[10.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] translate-x-[2px]" />
                <div className="absolute left-[50%] top-[10.5px] w-1.5 h-1.5 rounded-full bg-[#FF4F18] shadow-[0_0_8px_#FF4F18] -translate-x-[2.5px]" />
              </div>

              {/* Bottom Layer - Digitory AI Layer */}
              <div className="relative z-10 bg-white dark:bg-[#121319] border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-3 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18] animate-pulse" />
                  <span className="font-extrabold text-[11.5px] text-zinc-900 dark:text-white tracking-wide">Digitory AI Layer</span>
                </div>
                <div className="text-[7.5px] font-mono text-zinc-450 dark:text-zinc-500 mt-0.5 uppercase tracking-widest">
                  Forecasting, procurement & anomaly detection — reads and acts across every module above
                </div>
              </div>

            </div>
          </div>

          {/* Under Caption */}
          <p className="mt-4 text-xs md:text-sm text-zinc-650 dark:text-zinc-400 text-center lg:text-left font-medium max-w-[540px] w-full">
            One record underneath, AI across the top — <span className="font-extrabold text-[#FF4F18]">nothing re-entered, nothing reconciled.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
