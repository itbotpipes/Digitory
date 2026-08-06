"use client";

import React from "react";

interface TypeData {
  innerBadge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function RestaurantTypes() {
  const types: TypeData[] = [
    {
      innerBadge: "PREMIUM DINING SUITE",
      title: "Fine Dining & Casual Restaurants",
      description: "Seamless table management, course timing, sommelier notes, and captain app for unforgettable dining experiences.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      innerBadge: "FAST QSR SUITE",
      title: "Quick Service Restaurants (QSR)",
      description: "Lightning-fast billing, kitchen display sync, token systems, and self-ordering kiosks to handle long lines easily.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      innerBadge: "CLOUD KITCHEN SUITE",
      title: "Cloud Kitchens & Delivery Brands",
      description: "2-way integrations with Swiggy and Zomato, automated order dispatching, unified menu pushes, and central inventory management.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      innerBadge: "COFFEE & BAKERY SUITE",
      title: "Cafés, Bakeries & Quick Bites",
      description: "Customized order billing modifiers, combo items, loyalty reward programs, and offline-first terminal reliability.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.999 2.999 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.999 2.999 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      )
    },
    {
      innerBadge: "BAR & BREWERY SUITE",
      title: "Bars & Breweries",
      description: "Open tab management, quick bartender reordering, table-side drink service, and liquor inventory tracking.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )
    },
    {
      innerBadge: "ENTERPRISE CHAIN SUITE",
      title: "Multi-Outlet Restaurant Chains",
      description: "Compare outlet metrics, centrally push menus, sync price sheets, and streamline stock transfers.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
  ];

  return (
    <section id="restaurant-types" className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
      
      {/* Header Block */}
      <div className="text-center mb-16">
        <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
          Tailored to your needs
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
          Built for <span className="text-[#FF4F18]">every type of restaurant</span>
        </h2>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Whether you own a single café or a growing restaurant chain, Digitory is designed to fit the way you work.
        </p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type, idx) => (
          <div 
            key={idx}
            className="group bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-8 hover:border-[#FF4F18]/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300"
          >
            {/* Icon & Badge Row */}
            <div className="flex flex-col mb-6">
              <div className="w-12 h-12 bg-[#FFF3EF] dark:bg-[#FF4F18]/10 text-[#FF4F18] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {type.icon}
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF4F18]">
                {type.innerBadge}
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
              {type.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {type.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
