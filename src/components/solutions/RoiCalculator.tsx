"use client";

import React, { useState, useEffect } from "react";

export default function RoiCalculator() {
  const [orders, setOrders] = useState<number>(3500);
  const [outlets, setOutlets] = useState<number>(2);

  // Bottom stats state (animated or calculated)
  const [turnover, setTurnover] = useState<number>(0);
  const [wastage, setWastage] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [savedHrs, setSavedHrs] = useState<number>(0);

  // Exact math from reference design:
  // (3500 * 15.5) + (2 * 12500) = 79,250
  const monthlySavings = (orders * 15.5) + (outlets * 12500);
  // (3500 * 0.008) + (2 * 4) = 36
  const hoursSaved = Math.round((orders * 0.008) + (outlets * 4));

  // Animate/calculate outcomes on slider change
  useEffect(() => {
    // Dynamic values based on inputs
    const targetTurnover = Math.min(Math.round(15 + outlets * 3.5), 35);
    const targetWastage = Math.min(Math.round(18 + (orders / 250)), 35);
    const targetAccuracy = Math.min(Math.round(92 + (orders / 600)), 99.8);
    const targetSavedHrs = Math.round(5 + (orders * 0.002) + (outlets * 1.5));

    // Simple smooth stepping simulation for counter animation
    let currentTurnover = 0;
    let currentWastage = 0;
    let currentAccuracy = 0;
    let currentSavedHrs = 0;

    const timer = setInterval(() => {
      let updated = false;
      if (currentTurnover < targetTurnover) {
        currentTurnover += 1;
        setTurnover(currentTurnover);
        updated = true;
      }
      if (currentWastage < targetWastage) {
        currentWastage += 1;
        setWastage(currentWastage);
        updated = true;
      }
      if (currentAccuracy < targetAccuracy) {
        currentAccuracy += 2;
        setAccuracy(Math.min(currentAccuracy, targetAccuracy));
        updated = true;
      }
      if (currentSavedHrs < targetSavedHrs) {
        currentSavedHrs += 1;
        setSavedHrs(currentSavedHrs);
        updated = true;
      }

      if (!updated) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [orders, outlets]);

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      
      {/* Header Block */}
      <div className="text-left mb-10 md:mb-12">
        <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
          ROI Calculator & Outcomes
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] leading-[1.15] mb-4">
          Calculate your <span className="text-[#FF4F18]">Monthly Savings</span>
        </h2>
        <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
          Adjust the sliders below to estimate how much food waste and labor hours Digitory saves for your business.
        </p>
      </div>

      {/* Main Calculator Panel */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900/50 rounded-[32px] p-6 md:p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left mb-12">
        
        {/* Left Side: Sliders (7 Cols) */}
        <div className="md:col-span-7 space-y-8 pr-0 md:pr-4">
          {/* Slider 1: Monthly Orders */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-extrabold text-zinc-800">
                Monthly Orders:
              </span>
              <span className="text-sm font-black text-[#FF4F18]">
                {orders.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={100}
              value={orders}
              onChange={(e) => setOrders(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#FF4F18]"
            />
          </div>

          {/* Slider 2: Number of Outlets */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-extrabold text-zinc-800">
                Number of Outlets:
              </span>
              <span className="text-sm font-black text-[#FF4F18]">
                {outlets} {outlets === 1 ? "Outlet" : "Outlets"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={outlets}
              onChange={(e) => setOutlets(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#FF4F18]"
            />
          </div>
        </div>

        {/* Right Side: Results Display Card (5 Cols) */}
        <div className="md:col-span-5">
          <div className="bg-white rounded-2xl p-6 border border-zinc-150 flex flex-col items-center justify-center text-center shadow-3xs select-none min-h-[160px]">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-3 block">
              Estimated Monthly Savings
            </span>
            <span className="text-3xl md:text-4xl font-black text-[#FF4F18] leading-none mb-3">
              ₹ {Math.round(monthlySavings).toLocaleString()} / month
            </span>
            <span className="text-sm font-bold text-zinc-700">
              {hoursSaved} Hours / month saved
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Outcomes Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {[
          { value: `${turnover}%`, label: "Faster Table Turnover" },
          { value: `${wastage}%`, label: "Less Raw Wastage" },
          { value: `${accuracy}%`, label: "Order Kitchen Accuracy" },
          { value: `${savedHrs} hrs`, label: "Saved Weekly per Manager" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-zinc-200/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-3xs hover:border-zinc-300 transition-all duration-200"
          >
            <span className="text-3xl md:text-4xl font-black text-[#FF4F18] leading-none mb-2">
              {item.value}
            </span>
            <span className="text-xs font-bold text-zinc-800">
              {item.label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
