"use client";

import React, { useState } from "react";

interface SimItem {
  name: string;
  qty: number;
  price: number;
}

export default function Capabilities() {
  // Simulator State
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

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      
      {/* 1. Header Area */}
      <div className="mb-12">
        <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
          System Capability Matrix
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] leading-[1.15] mb-4">
          6 Core Platform <span className="text-[#FF4F18]">Capabilities</span>
        </h2>
        <p className="text-base md:text-lg text-zinc-650 leading-relaxed max-w-2xl">
          Engineered without compromise for high-turnover F&B operators.
        </p>
      </div>

      {/* 2. Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Row 1 - Card 1 (Orders & Billing - 2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900/50/65 border border-zinc-200/50 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-6 shadow-2xs">
          
          <div className="space-y-4">
            {/* Header / Badges */}
            <div className="flex items-center justify-between">
              <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                01 • Orders & Billing
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Interactive Simulator
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-black text-[#111111] tracking-tight">
              Orders & billing
            </h3>
            <p className="text-sm text-zinc-650 leading-relaxed max-w-xl">
              From dine-in to online and direct orders, every bill, every payment and every table flows through one seamless system.
            </p>
          </div>

          {/* Interactive Simulator Box */}
          <div className="bg-white rounded-2xl p-5 border border-zinc-150 shadow-3xs flex flex-col gap-5 select-none">
            
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
                onClick={() => handleAddSimItem("Garlic Naan", 80)}
                className="px-3.5 py-2 bg-[#F8F9FA] hover:bg-[#F1F3F5] text-zinc-700 font-extrabold text-xs rounded-xl border border-zinc-200 transition-colors cursor-pointer"
              >
                + Garlic Naan (₹80)
              </button>
              <button
                onClick={() => handleAddSimItem("Dal Makhani", 240)}
                className="px-3.5 py-2 bg-[#F8F9FA] hover:bg-[#F1F3F5] text-zinc-700 font-extrabold text-xs rounded-xl border border-zinc-200 transition-colors cursor-pointer"
              >
                + Dal Makhani (₹240)
              </button>
              <button
                onClick={() => handleAddSimItem("Cold Drink", 60)}
                className="px-3.5 py-2 bg-[#F8F9FA] hover:bg-[#F1F3F5] text-zinc-700 font-extrabold text-xs rounded-xl border border-zinc-200 transition-colors cursor-pointer"
              >
                + Cold Drink (₹60)
              </button>
            </div>

            {/* Receipt Items Area */}
            <div className="space-y-2 py-1 min-h-[60px]">
              {simItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold text-zinc-650">
                  <span>{item.qty}x {item.name} (₹{item.price * item.qty})</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleFireOrder}
                disabled={fired}
                className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  fired
                    ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    : "bg-[#FF4F18] hover:bg-[#E03F0D] text-white shadow-sm"
                }`}
              >
                {fired ? "Order Fired Successfully!" : "Fire Order to Kitchen KDS →"}
              </button>

              <div className="flex items-center justify-center gap-1.5 bg-[#FFF3EF] py-2 rounded-xl text-[10px] font-extrabold text-[#FF4F18]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]" />
                KDS Station 1 Connected
              </div>
            </div>

          </div>

        </div>

        {/* Row 1 - Card 2 (Kitchen KDS - 1/3 width on desktop) */}
        <div className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs">
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              02 • Kitchen KDS
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-[#111111]">
                Kitchen display system
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                Every order reaches the right station instantly. Less shouting. Less confusion. Faster service.
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

      {/* Row 2 - Cards 3, 4, 5 (Equal 3-column width) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        
        {/* Card 3: Smart Inventory */}
        <div className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs">
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              03 • Smart Inventory
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-[#111111]">
                Inventory that thinks ahead
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                Every dish updates your inventory automatically. Know what's running low before your chef does.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Low Stock Alert Triggers Auto-PO
          </div>
        </div>

        {/* Card 4: Live Dashboard */}
        <div className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs">
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              04 • Live Dashboard
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0017.75 3.75H6.25A2.25 2.25 0 004 6v12A2.25 2.25 0 006.25 20.25z" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-[#111111]">
                Live business dashboard
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                Sales. Orders. Inventory. Outlet performance. Everything you need to know, in one place, in real time.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            Real-Time Owner Mobile App
          </div>
        </div>

        {/* Card 5: One Flow & Chains */}
        <div className="bg-white border border-zinc-200/60 rounded-[32px] p-6 md:p-8 flex flex-col justify-between gap-8 shadow-2xs">
          <div className="space-y-6">
            <span className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider inline-block">
              05 & 06 • One Flow & Chains
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EF] text-[#FF4F18] flex items-center justify-center shadow-3xs">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-[#111111]">
                Multi-Outlet Management
              </h3>
              <p className="text-sm text-zinc-550 leading-relaxed">
                Whether you're managing 1 outlet or 20, get complete visibility without chasing managers.
              </p>
            </div>
          </div>

          <div className="bg-[#FFF3EF] text-[#FF4F18] text-xs font-extrabold px-4 py-3.5 rounded-2xl flex items-center gap-2 border border-orange-100">
            <svg className="w-4 h-4 text-[#FF4F18] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM2.25 12h19.5m-3.18-5.25H5.43m13.14 10.5H5.43M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9z" />
            </svg>
            Global Menu & Price Push
          </div>
        </div>

      </div>

    </section>
  );
}
