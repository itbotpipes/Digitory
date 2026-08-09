"use client";

import React from "react";
import Image from "next/image";

interface IntegrationItem {
  id: string;
  name: string;
  subtext: string;
  brandColor: string;
  iconBg: string;
  iconSvg: React.ReactNode;
}

export default function ToolIntegrations() {
  const integrations: IntegrationItem[] = [
    {
      id: "swiggy",
      name: "Swiggy Direct",
      subtext: "2-way menu & order sync.",
      brandColor: "#FC8019",
      iconBg: "bg-[#FC8019]/10 text-[#FC8019]",
      iconSvg: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: "razorpay",
      name: "Razorpay",
      subtext: "UPI & Card reconciliation.",
      brandColor: "#3395FF",
      iconBg: "bg-[#3395FF]/10 text-[#3395FF]",
      iconSvg: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      ),
    },
    {
      id: "zomato",
      name: "Zomato Connect",
      subtext: "Auto-accept & instant toggles.",
      brandColor: "#CB202D",
      iconBg: "bg-[#CB202D]/10 text-[#CB202D]",
      iconSvg: (
        <span className="w-4 h-4 rounded-full bg-[#CB202D] block shadow-sm" />
      ),
    },
    {
      id: "tally",
      name: "Tally Prime",
      subtext: "Automated daily sales entries.",
      brandColor: "#7E22CE",
      iconBg: "bg-[#7E22CE]/10 text-[#7E22CE]",
      iconSvg: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24 overflow-hidden">
      
      {/* Header Block: Left Heading, Right Subtitle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-16 md:mb-24">
        <div className="lg:col-span-7">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[850] tracking-tight leading-[1.15]">
            Connects with <span className="text-[#FF4F18]">your favorite apps.</span>
          </h2>
        </div>
        <div className="lg:col-span-5 text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed lg:pt-2">
          <p>
            1-click setup with Swiggy, Zomato, Razorpay, Paytm, Tally, WhatsApp, and POS hardware.
          </p>
        </div>
      </div>

      {/* Professional Circuit-Board Architecture */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
        
        {/* Mobile View: Simple Grid (Hidden on Desktop) */}
        <div className="md:hidden grid grid-cols-1 gap-4 w-full">
          {integrations.map((item) => (
            <div key={item.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm w-full">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                {item.iconSvg}
              </div>
              <div className="text-left">
                <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-0.5">{item.name}</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Network Diagram */}
        <div className="hidden md:flex items-center justify-center w-full">
          
          {/* Left Column (Integrations 1 & 2) */}
          <div className="relative flex flex-col gap-16 w-[300px]">
            {/* Vertical Circuit Line */}
            <div className="absolute -right-12 top-[4.5rem] bottom-[4.5rem] w-[2px] bg-gradient-to-b from-zinc-200/20 via-zinc-200 dark:via-zinc-700 to-zinc-200/20" />
            {/* Horizontal Connection to Center Node */}
            <div className="absolute -right-24 top-1/2 w-12 h-[2px] bg-gradient-to-r from-zinc-200 dark:from-zinc-700 to-[#FF4F18]/40" />
            
            {[integrations[0], integrations[1]].map((item) => (
              <div key={item.id} className="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-[#FF4F18]/40 transition-colors duration-300">
                {/* Horizontal line to vertical track */}
                <div className="absolute -right-12 top-1/2 w-12 h-[2px] bg-zinc-200 dark:bg-zinc-700" />
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  {item.iconSvg}
                </div>
                <div className="text-left">
                  <h4 className="text-[15px] font-extrabold text-zinc-900 dark:text-white mb-0.5 tracking-tight">{item.name}</h4>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">{item.subtext}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Central Digitory Node */}
          <div className="mx-24 relative z-20 flex flex-col items-center justify-center">
            {/* Sleek Professional Node — Made Bigger with dynamic hover scaling and neutral shadow depth */}
            <div className="relative w-28 h-28 bg-white dark:bg-zinc-900 rounded-[1.75rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center z-10 overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.3)] cursor-pointer">
              <div className="relative w-16 h-16 z-10">
                <Image
                  src="/demologo.png"
                  alt="Digitory Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column (Integrations 3 & 4) */}
          <div className="relative flex flex-col gap-16 w-[300px]">
            {/* Vertical Circuit Line */}
            <div className="absolute -left-12 top-[4.5rem] bottom-[4.5rem] w-[2px] bg-gradient-to-b from-zinc-200/20 via-zinc-200 dark:via-zinc-700 to-zinc-200/20" />
            {/* Horizontal Connection to Center Node */}
            <div className="absolute -left-24 top-1/2 w-12 h-[2px] bg-gradient-to-l from-zinc-200 dark:from-zinc-700 to-[#FF4F18]/40" />
            
            {[integrations[2], integrations[3]].map((item) => (
              <div key={item.id} className="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-[#FF4F18]/40 transition-colors duration-300">
                {/* Horizontal line to vertical track */}
                <div className="absolute -left-12 top-1/2 w-12 h-[2px] bg-zinc-200 dark:bg-zinc-700" />
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  {item.iconSvg}
                </div>
                <div className="text-left">
                  <h4 className="text-[15px] font-extrabold text-zinc-900 dark:text-white mb-0.5 tracking-tight">{item.name}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.subtext}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
