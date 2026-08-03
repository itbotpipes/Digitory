"use client";

import React, { useState } from "react";

interface TypeData {
  innerBadge: string;
  title: string;
  description: string;
}

export default function RestaurantTypes() {
  const types: Record<string, TypeData> = {
    "Fine Dining": {
      innerBadge: "PREMIUM DINING SUITE",
      title: "Fine Dining & Casual Restaurants",
      description: "Seamless table management, course timing, sommelier notes, and captain app for unforgettable dining experiences.",
    },
    "QSR": {
      innerBadge: "FAST QSR SUITE",
      title: "Quick Service Restaurants (QSR)",
      description: "Lightning-fast billing, kitchen display sync, token systems, and self-ordering kiosks to handle long lines easily.",
    },
    "Cloud Kitchen": {
      innerBadge: "CLOUD KITCHEN SUITE",
      title: "Cloud Kitchens & Delivery Brands",
      description: "2-way integrations with Swiggy and Zomato, automated order dispatching, unified menu pushes, and central inventory management.",
    },
    "Café": {
      innerBadge: "COFFEE & BAKERY SUITE",
      title: "Cafés, Bakeries & Quick Bites",
      description: "Customized order billing modifiers, combo items, loyalty reward programs, and offline-first terminal reliability.",
    },
  };

  const [activeTab, setActiveTab] = useState<string>("Fine Dining");
  const activeData = types[activeTab];

  return (
    <section id="restaurant-types" className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      
      {/* Header Block */}
      <div className="text-left mb-10 md:mb-12">
        <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
          F&B Model Tailored
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] leading-[1.15] mb-4">
          Built for <span className="text-[#FF4F18]">your restaurant type</span>
        </h2>
      </div>

      {/* Category Tab Selector */}
      <div className="flex flex-wrap justify-start gap-2.5 mb-12">
        {Object.keys(types).map((tabName) => {
          const isActive = activeTab === tabName;
          return (
            <button
              key={tabName}
              onClick={() => setActiveTab(tabName)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center ${
                isActive
                  ? "bg-[#FF4F18] text-white shadow-[0_4px_12px_rgba(255,79,24,0.25)]"
                  : "bg-[#F8F9FA] text-zinc-700 hover:bg-[#F1F3F5] border border-zinc-200/60"
              }`}
            >
              {tabName}
            </button>
          );
        })}
      </div>

      {/* Dynamic Display Card */}
      <div className="max-w-4xl mx-auto">
        <div className="w-full bg-white dark:bg-zinc-900/50 rounded-[32px] p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center shadow-2xs select-none min-h-[220px] transition-all duration-300">
          {/* Inner Badge */}
          <div className="bg-[#FFF3EF] text-[#FF4F18] text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
            {activeData.innerBadge}
          </div>

          {/* Title & Description */}
          <h3 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight mb-4">
            {activeData.title}
          </h3>
          <p className="text-sm md:text-base text-zinc-650 leading-relaxed max-w-2xl">
            {activeData.description}
          </p>
        </div>
      </div>

    </section>
  );
}
