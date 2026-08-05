'use client';

import React from 'react';
import Header from '../../../components/Header';
import FooterPage from '../../../components/Footer';
import Link from 'next/link';

export default function SolutionsDetailsStorytellingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Solution Details Page Main Banner */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 pt-20 pb-16 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-[#FF4F18] bg-[#FFF3EF] px-3.5 py-1.5 rounded-full select-none">
              Operational Handbook
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] pt-3">
              Explore Our <span className="text-[#FF4F18]">Solutions Details</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-350 max-w-2xl mx-auto pt-2 leading-relaxed">
              Read how our 6 core systems work in harmony to solve the daily chaos of restaurant operations, inventory leakages, kitchen delays, and scaling friction.
            </p>
          </div>
        </section>

        {/* 6 Solutions Sections Alternating with Storytelling + Icons */}
        {/* Mockups start from Left for Section 1, then alternate */}
        <div className="space-y-32 md:space-y-44 pb-28">

          {/* Section 1: POS (Mockup Left, Text Right) */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Mockup Area (Left on Desktop, Bottom on Mobile) */}
              <div className="lg:col-span-5 flex justify-center w-full order-2 lg:order-1">
                <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5 select-none text-left">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4F18]">
                      Digi-POS terminal
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs font-bold text-zinc-500">Order Channels</span>
                      <span className="text-xs font-semibold text-[#FF4F18] uppercase">Zomato • Swiggy • Direct</span>
                    </div>
                    <div className="flex justify-between items-center bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs font-bold text-zinc-500">Average Checkout</span>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white">15 Seconds</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-semibold">
                      <span>✓ GST-Compliant Billing Enabled</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-555 font-bold border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between">
                    <span>POS Terminal #01</span>
                    <span>System: Online</span>
                  </div>
                </div>
              </div>

              {/* Text Area (Right on Desktop, Top on Mobile) */}
              <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#FF4F18] uppercase tracking-wider bg-[#FFF3EF] px-3 py-1 rounded-full">
                    01 • Front of House Core
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
                  Multi-channel <span className="text-[#FF4F18]">integrated POS</span>
                </h2>
                
                {/* Storytelling Element */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-l-4 border-[#FF4F18] p-4 rounded-r-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-505 block">
                    The Daily Challenge
                  </span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                    "When the weekend rush hits, waitstaff get overwhelmed. Billing queues grow at the counter, Swiggy and Zomato notification machines beep constantly, and waiters scramble to write split-bill notes on napkins. A single misplaced order can ruin a table's dinner."
                  </p>
                </div>

                <p className="text-sm text-zinc-605 dark:text-zinc-400 leading-relaxed">
                  Digitory's multi-channel POS operates as the central command desk for your billing team. By combining offline walk-ins, phone calls, QR table service, and online aggregator channels into one fluid queue, billing bottlenecks disappear.
                </p>
                
                {/* Core Features with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Omnichannel Sync</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Consolidate Zomato, Swiggy, self-ordering QR apps, and table bills in one queue without switching platforms.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">15-Second Billing</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed">Split bills, merge tables, apply discounts, choose payment types, and calculate GST in just a few taps.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Staff Shift Control</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed">Track waiter tables, shift durations, cashier reconciliations, and handle user security clearances.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Restaurants", "Cafés", "Bars & Breweries", "Fast Food Chains", "Cloud Kitchens"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-550 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Section 2: KDS (Text Left, Mockup Right) */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Text Area (Left on Desktop, Top on Mobile) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#FF4F18] uppercase tracking-wider bg-[#FFF3EF] px-3 py-1 rounded-full">
                    02 • Kitchen Automation
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
                  Kitchen <span className="text-[#FF4F18]">display system</span>
                </h2>
                
                {/* Storytelling Element */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-l-4 border-[#FF4F18] p-4 rounded-r-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-505 block">
                    The Daily Challenge
                  </span>
                  <p className="text-sm text-zinc-660 dark:text-zinc-300 italic leading-relaxed">
                    "A waiter scribbles a complex dish modification on a paper slip. In the heat of the kitchen burners, that slip gets misplaced, soaked in grease, or ignored. The kitchen cooks the wrong meal, table waiting times spike, and food goes straight to the waste bin."
                  </p>
                </div>

                <p className="text-sm text-zinc-605 dark:text-zinc-400 leading-relaxed">
                  Digitory KDS bridges the communication gap between the front desk and the cooking line. By showing orders instantly on clean, bright digital screens, chefs can prepare dishes in the correct sequence, manage prep steps, and reduce errors.
                </p>
                
                {/* Core Features with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Instant routing</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">No paper KOT slips required. Every single order is routed to specific prep stations within milliseconds.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Allergen Flags</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Important food allergen warnings and customer-specific diet requests are highlighted in bright, flashing alert panels.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Prep Trackers</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Tracks the duration of every ticket from receipt to checkout, helping chef managers optimize kitchen layout speeds.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Fine Dining Restaurants", "Cafés", "Bars & Pubs", "Microbreweries", "Cloud Kitchen Networks"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup Area (Right on Desktop, Bottom on Mobile) */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5 select-none text-left">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4F18]">
                      Kitchen Display System
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                  <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-bold border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <span>Table 04 • KOT #102</span>
                      <span className="text-amber-500">Preparing (3m)</span>
                    </div>
                    <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-300 font-semibold">
                      <p>1x Paneer Butter Masala (*Less Spicy)</p>
                      <p>2x Butter Naan</p>
                    </div>
                  </div>
                  <div className="bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-semibold text-center">
                    <span>Direct routing from POS terminals</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-555 font-bold border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between">
                    <span>KDS Station 1</span>
                    <span>99.8% Sync Rate</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section 3: Inventory (Mockup Left, Text Right) */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Mockup Area (Left on Desktop, Bottom on Mobile) */}
              <div className="lg:col-span-5 flex justify-center w-full order-2 lg:order-1">
                <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5 select-none text-left">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4F18]">
                      Inventory Dashboard
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="space-y-3.5 text-xs font-bold">
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Cheese Blend</span>
                        <span className="text-red-500">Low stock (4.5kg)</span>
                      </div>
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 w-[15%] h-full" />
                      </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Paneer Block</span>
                        <span className="text-green-500">In stock (28kg)</span>
                      </div>
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 w-[85%] h-full" />
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-555 font-bold border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between">
                    <span>Central Kitchen stock</span>
                    <span>Auto-PO Active</span>
                  </div>
                </div>
              </div>

              {/* Text Area (Right on Desktop, Top on Mobile) */}
              <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#FF4F18] uppercase tracking-wider bg-[#FFF3EF] px-3 py-1 rounded-full">
                    03 • Inventory Control
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
                  Automated <span className="text-[#FF4F18]">inventory management</span>
                </h2>
                
                {/* Storytelling Element */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-l-4 border-[#FF4F18] p-4 rounded-r-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-505 block">
                    The Daily Challenge
                  </span>
                  <p className="text-sm text-zinc-650 dark:text-zinc-300 italic leading-relaxed">
                    "A restaurant owner wonders why profit margins are thin despite high billing volumes. In the dark storage room, cheese blocks vanish, expensive raw meat reaches its expiry date unused, and kitchen staff place panic orders because they don't know what's in stock."
                  </p>
                </div>

                <p className="text-sm text-zinc-605 dark:text-zinc-400 leading-relaxed">
                  Digitory's smart inventory system links your kitchen directly with your billing data. By automating ingredient deductions, auditing store room values, and generating alerts, you keep raw food costs under strict, profitable control.
                </p>
                
                {/* Core Features with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Recipe deduction</h4>
                    <p className="text-xs text-zinc-505 dark:text-zinc-450 leading-relaxed">Billed POS checks automatically subtract the exact ingredient weights (e.g. 50g cheese, 100g paneer) from raw stock levels.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Low-Stock Warnings</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed">Get auto-triggered alerts and draft Purchase Orders (PO) sent to your suppliers the moment key items drop below safety thresholds.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Central Kitchens</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed">Manage central warehouses, batch production costs, raw goods transport logs, and outlet inventory transfers in real-time.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Chain Outlets", "Cafés", "Bars & Nightclubs", "Central Kitchens", "Fine Dining"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Section 4: Food & Liquor Control (Text Left, Mockup Right) */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Text Area (Left on Desktop, Top on Mobile) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#FF4F18] uppercase tracking-wider bg-[#FFF3EF] px-3 py-1 rounded-full">
                    04 • Bar Integrity & Audits
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
                  Digi food & <span className="text-[#FF4F18]">liquor control</span> system
                </h2>
                
                {/* Storytelling Element */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-l-4 border-[#FF4F18] p-4 rounded-r-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                    The Daily Challenge
                  </span>
                  <p className="text-sm text-zinc-650 dark:text-zinc-300 italic leading-relaxed">
                    "Liquor inventory represents the highest capital investment in a bar. When bartenders pour free tasters, over-pour shots, or neglect to record bottle breakages, the bar's entire monthly profit margins disappear silently behind the counter."
                  </p>
                </div>

                <p className="text-sm text-zinc-605 dark:text-zinc-400 leading-relaxed">
                  Digitory's Food & Liquor Audit module helps you track every single drop. By connecting bar recipe configurations to POS billing checkouts, bar managers can run precise pour comparisons, track liquid levels, and minimize revenue leakage.
                </p>
                
                {/* Core Features with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Volume Liquor Tracking</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Track liquor inventories down to the milliliter, recording pour counts, open bottle weights, and decanting logs.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Pour Auditing</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Automatically compare physical pour quantities against actual POS transaction sales to detect theft or over-pouring.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Excise Reports</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Maintain clean, automatic sales and usage logs configured to state excise guidelines for compliance audits.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Bars & Pubs", "Microbreweries", "Resto-Bars", "Fine Dining Clubs"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-555 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup Area (Right on Desktop, Bottom on Mobile) */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5 select-none text-left">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4F18]">
                      Bar Audit Controller
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-zinc-550">
                        <span>Active Recipe Audit</span>
                        <span>Dispensed Volume</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-semibold text-zinc-900 dark:text-white">
                        <span>Single Malt Whisky</span>
                        <span className="text-[#FF4F18]">60ml (Exact)</span>
                      </div>
                    </div>
                    <div className="bg-[#FFF3EF] dark:bg-orange-950/20 p-4 rounded-xl border border-orange-100 dark:border-orange-950/50 text-[#FF4F18] text-xs font-semibold text-center">
                      <span>✓ Automatic Recipe-Based Audit Complete</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-555 font-bold border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between">
                    <span>Bar Counter #02</span>
                    <span>Audit Status: Normal</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section 5: Reports (Mockup Left, Text Right) */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Mockup Area (Left on Desktop, Bottom on Mobile) */}
              <div className="lg:col-span-5 flex justify-center w-full order-2 lg:order-1">
                <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5 select-none text-left">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4F18]">
                      Analytics Dashboard
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="space-y-3.5">
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-500">Today's Revenue</span>
                      <span className="text-sm font-semibold text-[#FF4F18]">₹ 1,42,850</span>
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-500">Active Tables</span>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">18 / 24 Occupied</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-555 font-bold border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between">
                    <span>Updates: Live (Every 1m)</span>
                    <span>DB Connection: OK</span>
                  </div>
                </div>
              </div>

              {/* Text Area (Right on Desktop, Top on Mobile) */}
              <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#FF4F18] uppercase tracking-wider bg-[#FFF3EF] px-3 py-1 rounded-full">
                    05 • Business Intelligence
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
                  Analytics <span className="text-[#FF4F18]">& reports</span>
                </h2>
                
                {/* Storytelling Element */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-l-4 border-[#FF4F18] p-4 rounded-r-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                    The Daily Challenge
                  </span>
                  <p className="text-sm text-zinc-650 dark:text-zinc-300 italic leading-relaxed">
                    "Managing a restaurant chain by calling managers for daily sales figures is exhausting. Multi-outlet owners struggle to find which stores are underperforming, which menu items drive the highest profit margins, and where cash differences are happening."
                  </p>
                </div>

                <p className="text-sm text-zinc-605 dark:text-zinc-400 leading-relaxed">
                  Digitory's Analytics suite consolidates raw checkout numbers, ingredient updates, and shift details into clean visual metrics. Spot trends, compare profit margins, and manage your entire business network from your mobile device.
                </p>
                
                {/* Core Features with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Owner Live App</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">View live sales graphs, table occupancy updates, cash handovers, and system edits from anywhere in the world.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Menu Engineering</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed">Analyze high-margin dishes, slow-moving drinks, and raw ingredient costs to optimize your menu prices.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Tax Accounting</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed">Automate service charge splits, discounts audit reports, cashier closing registers, and export accounting sheets.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Single Outlets", "Franchise Networks", "Cloud Kitchen Chains", "Fine Dining Groups"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-550 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Section 6: Event Management (Text Left, Mockup Right) */}
          <section className="mx-auto max-w-7xl px-6 md:px-8 scroll-mt-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Text Area (Left on Desktop, Top on Mobile) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#FF4F18] uppercase tracking-wider bg-[#FFF3EF] px-3 py-1 rounded-full">
                    06 • Live Event Entry
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
                  Cashless <span className="text-[#FF4F18]">Event & Entry</span> Management System
                </h2>
                
                {/* Storytelling Element */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-l-4 border-[#FF4F18] p-4 rounded-r-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                    The Daily Challenge
                  </span>
                  <p className="text-sm text-zinc-650 dark:text-zinc-300 italic leading-relaxed">
                    "When hosting ticketed events or weekend club nights, long entry queues, slow cash handling at beverage counters, and entry ticket fraud ruin the guest experience. Sluggish bar service means lost drink sales."
                  </p>
                </div>

                <p className="text-sm text-zinc-605 dark:text-zinc-400 leading-relaxed">
                  Digitory's Event OS coordinates ticket validations and cashless payments into one platform. By utilizing secure QR codes, RFID bands, and digital credits, guests check in faster and make purchases at bar counters in seconds.
                </p>
                
                {/* Core Features with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2m-6-12h.01M9 11h.01M9 17h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Contactless Gate check-in</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Validate ticket QR codes, RFID wristbands, or digital passes in under 2 seconds to keep queue entry lines moving.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">RFID Tap Cashless</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Allow guests to top up digital credits and complete food/beverage purchases instantly, reducing transaction bottlenecks.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100/55 dark:bg-orange-950/20 text-[#FF4F18] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200">Live Attendance Logs</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">Track entry gate volumes, bar queue metrics, active tickets sold, and vendor revenues from a single master layout.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Bars & Breweries", "Nightclubs & Lounges", "Café Event Hosts", "Multi-Store Event Managers"].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-zinc-550 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mockup Area (Right on Desktop, Bottom on Mobile) */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="w-full max-w-[460px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col gap-5 select-none text-left">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF4F18]">
                      Event Entry Scanner
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                  <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-3 text-center">
                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                      <svg className="w-16 h-16 text-zinc-600 dark:text-zinc-350" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 3h3v3h-3v-3zm3 0h3v3h-3v-3zM13 13h2v2h-2v-2zm0 4h2v4h-2v-4zm4 0h2v2h-2v-2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Scan QR Entry Ticket
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-555 font-bold border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between">
                    <span>Gate terminal #01</span>
                    <span>System: Ready</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Global CTA Block Banner */}
        <section className="mx-auto max-w-5xl px-6 md:px-8 py-10 mb-10 text-center">
          <div className="rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-8 sm:p-12 text-center shadow-lg relative overflow-hidden transition-all duration-300">
            {/* Visual gradient backdrop */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4F18]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF4F18]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white leading-snug">
                Want to see how <span className="text-[#FF4F18]">Digitory</span> can help your restaurant?
              </h3>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-455 leading-relaxed max-w-xl mx-auto">
                Book a personalized demo and see how Digitory can simplify your restaurant operations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link
                  href="/request-demo"
                  className="w-full sm:w-auto inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Free Demo
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex justify-center items-center text-center rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-[15px] font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-200 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white active:scale-[0.98] cursor-pointer gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <FooterPage />
    </div>
  );
}
