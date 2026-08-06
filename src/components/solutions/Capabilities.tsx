"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SimItem {
  name: string;
  qty: number;
  price: number;
}

export default function Capabilities() {
  const router = useRouter();

  // Simulator State (Card 1 simulator)
  const [simItems, setSimItems] = useState<SimItem[]>([
    { name: "Paneer Butter Masala", qty: 1, price: 280 },
    { name: "Butter Naan", qty: 2, price: 70 },
  ]);
  const [fired, setFired] = useState(false);

  const totalAmount = simItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleAddSimItem = (name: string, price: number) => {
    setFired(false);
    setSimItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { name, qty: 1, price }];
    });
  };

  const handleFireOrder = () => {
    if (simItems.length === 0) return;
    setFired(true);
    setTimeout(() => {
      setFired(false);
      setSimItems([
        { name: "Paneer Butter Masala", qty: 1, price: 280 },
        { name: "Butter Naan", qty: 2, price: 70 },
      ]);
    }, 3000);
  };

  const handleCardClick = (featureId: string) => {
    router.push(`/solutions/details?module=${featureId}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      
      {/* 1. Header Area */}
      <div className="mb-12 text-left">
        <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
          Features Matrix
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15] mb-4">
          Six powerful features to <span className="text-[#FF4F18]">help your restaurant run better</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          Click on any feature card below to open its full specifications and details on a new page.
        </p>
      </div>

      {/* 2. Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Row 1 - Card 1 (Orders & Billing - 2/3 width on desktop) */}
        <div 
          onClick={() => handleCardClick("pos")}
          className="lg:col-span-2 bg-white dark:bg-zinc-900/50 border border-zinc-200/50 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-6 shadow-2xs cursor-pointer hover:border-[#FF4F18]/60 hover:shadow-md transition-all duration-300 group text-left"
        >
          <div className="space-y-4">
            {/* Header / Badges */}
            <div className="flex items-center justify-between">
              <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                01 • Orders & Billing
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-[#FF4F18] transition-colors">
                Interactive Simulator
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Orders & Billing
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-xl">
              Take dine-in, takeaway, online, and direct orders from one system. Create bills quickly, accept different payment methods, and keep every order organised without switching between multiple apps.
            </p>
          </div>

          {/* Interactive Simulator Box */}
          <div 
            onClick={(e) => e.stopPropagation()} // Stop click propagation to parent card
            className="bg-white rounded-2xl p-5 border border-zinc-200/50 shadow-3xs flex flex-col gap-5 select-none"
          >
            {/* Simulator Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <span className="text-[11px] font-extrabold text-[#777] uppercase tracking-wider">
                Click Item to Add:
              </span>
              <span className="text-sm font-black text-[#FF4F18]">
                ₹ {totalAmount}
              </span>
            </div>

            {/* Shortcut Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleAddSimItem("Paneer Butter Masala", 280)}
                className="px-3.5 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-bold rounded-xl border border-zinc-150 transition-all cursor-pointer"
              >
                + Paneer Butter Masala (₹280)
              </button>
              <button
                onClick={() => handleAddSimItem("Butter Naan", 70)}
                className="px-3.5 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-bold rounded-xl border border-zinc-150 transition-all cursor-pointer"
              >
                + Butter Naan (₹70)
              </button>
              <button
                onClick={() => handleAddSimItem("Veg Biryani", 220)}
                className="px-3.5 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-bold rounded-xl border border-zinc-150 transition-all cursor-pointer"
              >
                + Veg Biryani (₹220)
              </button>
              <button
                onClick={() => handleAddSimItem("Cold Drink", 40)}
                className="px-3.5 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-bold rounded-xl border border-zinc-150 transition-all cursor-pointer"
              >
                + Cold Drink (₹40)
              </button>
            </div>

            {/* Current Order Items */}
            <div className="space-y-2.5 max-h-36 overflow-y-auto pr-1">
              {simItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold text-zinc-700">
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>₹ {item.price * item.qty}</span>
                </div>
              ))}
              {simItems.length === 0 && (
                <span className="text-zinc-400 text-xs italic block text-center py-2">
                  No items in order. Click buttons to add.
                </span>
              )}
            </div>

            {/* Fire KOT Action */}
            <div className="flex justify-between items-center border-t border-zinc-100 pt-3">
              <button
                onClick={handleFireOrder}
                disabled={simItems.length === 0 || fired}
                className="w-full bg-[#FF4F18] text-white text-xs font-bold py-3 px-4 rounded-xl hover:bg-[#E03F0D] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer text-center"
              >
                {fired ? "✓ Sent to Kitchen KDS Screen!" : "Fire KOT & Print Bill"}
              </button>
            </div>

          </div>

        </div>

        {/* Row 1 - Card 2 (Kitchen KDS - 1/3 width on desktop) */}
        <div 
          onClick={() => handleCardClick("kds")}
          className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs cursor-pointer hover:border-[#FF4F18]/60 hover:shadow-md transition-all duration-300 group text-left"
        >
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              02 • Kitchen KDS
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                Kitchen Display System (KDS)
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                Orders reach the kitchen instantly. Your chefs know exactly what to prepare and in what order, reducing confusion, missed orders, and waiting time. Serve customers faster, even during busy hours.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Avg Kitchen Prep: 4.2 Mins
          </div>
        </div>

      </div>

      {/* Row 2 - Cards 3, 4, 5, 6 (Equal 4-column width on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 text-left">
        
        {/* Card 3: Smart Inventory */}
        <div 
          onClick={() => handleCardClick("inventory")}
          className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs cursor-pointer hover:border-[#FF4F18]/60 hover:shadow-md transition-all duration-300 group"
        >
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              03 • Smart Inventory
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                Smart Inventory
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                Keep track of your stock automatically. Whenever a dish is sold, the required ingredients are updated in your inventory. Know what's running low before you run out, and restock on time.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Low Stock Alert
          </div>
        </div>

        {/* Card 4: Live Dashboard */}
        <div 
          onClick={() => handleCardClick("reports")}
          className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs cursor-pointer hover:border-[#FF4F18]/60 hover:shadow-md transition-all duration-300 group"
        >
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              04 • Live Dashboard
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0017.75 3.75H6.25A2.25 2.25 0 004 6v12A2.25 2.25 0 006.25 20.25z" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                Live Business Dashboard
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                See how your restaurant is performing at any moment. Track sales, orders, inventory, staff performance, and business reports from one easy dashboard.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            Owner Mobile Dashboard
          </div>
        </div>

        {/* Card 5: Multi-Outlet Management */}
        <div 
          onClick={() => handleCardClick("control-system")}
          className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs cursor-pointer hover:border-[#FF4F18]/60 hover:shadow-md transition-all duration-300 group"
        >
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              05 • Multi-Outlet Management
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                Multi-Outlet Management
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                Managing multiple outlets shouldn't mean managing more stress. Digitory lets you monitor all your locations from one place, making it easy to sync menus.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM2.25 12h19.5m-3.18-5.25H5.43m13.14 10.5H5.43M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9z" />
            </svg>
            Global Menu Sync
          </div>
        </div>

        {/* Card 6: One Connected System */}
        <div 
          onClick={() => handleCardClick("event-management")}
          className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs cursor-pointer hover:border-[#FF4F18]/60 hover:shadow-md transition-all duration-300 group"
        >
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              06 • One Connected System
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                One Connected System
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                No more jumping between different software. Billing, kitchen, inventory, reports, and customer information all work together, helping your team save time.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            100% Real-Time Sync
          </div>
        </div>

      </div>

    </section>
  );
}
