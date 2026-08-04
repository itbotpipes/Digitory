"use client";

import React, { useState } from "react";

interface IntegrationItem {
  id: string;
  category: "delivery" | "payment" | "accounting";
  name: string;
  subtext: string;
  iconBg: string;
  iconSvg: React.ReactNode;
}

export default function ToolIntegrations() {
  const integrations: IntegrationItem[] = [
    {
      id: "swiggy",
      category: "delivery",
      name: "Swiggy Direct",
      subtext: "2-way menu & order sync",
      iconBg: "bg-[#FFF3EF]",
      iconSvg: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: "zomato",
      category: "delivery",
      name: "Zomato Connect",
      subtext: "Auto-accept & stock toggle",
      iconBg: "bg-[#FFF3EF]",
      iconSvg: (
        <span className="w-5 h-5 rounded-full bg-[#FF4F18] block shadow-3xs" />
      ),
    },
    {
      id: "razorpay",
      category: "payment",
      name: "Razorpay",
      subtext: "UPI & card payment recon",
      iconBg: "bg-[#FFF3EF]",
      iconSvg: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      ),
    },
    {
      id: "tally",
      category: "accounting",
      name: "Tally Prime",
      subtext: "Automated daily sales entries",
      iconBg: "bg-[#FFF3EF]",
      iconSvg: (
        <svg className="w-6 h-6 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
  ];

  const categories = [
    { label: "All Tools", value: "all" },
    { label: "Food Delivery", value: "delivery" },
    { label: "Payments", value: "payment" },
    { label: "Accounting", value: "accounting" },
  ];

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredIntegrations = integrations.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-6 md:py-10">
      
      {/* Header Block */}
      <div className="text-left mb-10 md:mb-12">
        <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
          Tool Integrations
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] leading-[1.15] mb-4">
          Connects with <span className="text-[#FF4F18]">your favorite apps</span>
        </h2>
        <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
          1-click setup with Swiggy, Zomato, Razorpay, Paytm, Tally, WhatsApp, and POS hardware.
        </p>
      </div>

      {/* Category Tab Selector */}
      <div className="flex flex-wrap justify-start gap-2.5 mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#FF4F18] text-white shadow-[0_4px_12px_rgba(255,79,24,0.25)]"
                  : "bg-[#F8F9FA] text-zinc-700 hover:bg-[#F1F3F5] border border-zinc-200/60"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch justify-center max-w-5xl mx-auto">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-zinc-200/60 hover:border-zinc-300 rounded-[24px] p-6 flex flex-col items-start text-left transition-all duration-250 hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)]"
          >
            {/* Styled Icon */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-5 ${item.iconBg}`}>
              {item.iconSvg}
            </div>

            {/* Title & Subtext */}
            <h4 className="text-base font-black text-zinc-950 tracking-tight mb-1">
              {item.name}
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
              {item.subtext}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
