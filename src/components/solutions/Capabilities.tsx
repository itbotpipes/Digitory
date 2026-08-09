"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface FeatureItem {
  num: string;
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function Capabilities() {
  const router = useRouter();

  const featureItems: FeatureItem[] = [
    {
      num: "01",
      id: "pos",
      title: "Orders & billing",
      desc: "Take dine-in, takeaway, online, and direct orders from one system. Create bills quickly, accept different payment methods, and keep every order organised without switching between multiple apps.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      num: "02",
      id: "kds",
      title: "Kitchen display system",
      desc: "Orders go straight to the right kitchen station. No paper. No shouting. No confusion. Direct routing from orders to specific kitchen displays.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      num: "03",
      id: "inventory",
      title: "Smart Inventory",
      desc: "Every order automatically updates your stock. Know what's running low before it becomes a problem. Keep track of ingredients automatically whenever an order is placed.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7.5l-8 4-8-4M12 11.5v9M20 7.5v9l-8 4M20 7.5L12 3.5M4 7.5v9l8 4M4 7.5L12 3.5" />
        </svg>
      ),
    },
    {
      num: "04",
      id: "reports",
      title: "Live Business Dashboard",
      desc: "See how your restaurant is performing at any moment. Track sales, orders, inventory, and staff performance from one easy dashboard.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: "05",
      id: "control-system",
      title: "Multi-Outlet Management",
      desc: "Managing multiple outlets shouldn't mean managing more stress. Digitory lets you monitor all your locations from one place, making it easy to sync menus.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      num: "06",
      id: "event-management",
      title: "One Connected System",
      desc: "No more jumping between different software. Billing, kitchen, inventory, reports, and customer information all work together, helping your team save time.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
    },
    {
      num: "07",
      id: "qr-ordering",
      title: "QR Dine-in Ordering",
      desc: "Let your guests view the menu, customize their dishes, and order directly from their tables. Connects directly to POS and KDS to turn tables faster.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1v6M4 9h16M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      num: "08",
      id: "loyalty",
      title: "CRM & Loyalty Hub",
      desc: "Build lasting relationships with customer point profiles. Automate cashback rules, personalized birthday offers, and targeted WhatsApp updates.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-3.75-3.75M19.5 12l-3.75 3.75m-11.25-3a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>
      ),
    },
    {
      num: "09",
      id: "booking",
      title: "Waitlist & Booking",
      desc: "Coordinate reservation requests, manage walk-in waiting list timelines, and optimize dining layouts to seat guests quickly.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: "10",
      id: "purchasing",
      title: "Purchase & Supplier",
      desc: "Create purchase requests, manage active supplier invoices, log goods receipt details, and track food ingredient price variations.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      num: "11",
      id: "payroll",
      title: "Shift & Payroll Hub",
      desc: "Log worker attendance checklists, configure monthly shift schedules, track server table zones, and manage salary reports.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      num: "12",
      id: "central-kitchen",
      title: "Central Prep Kitchen",
      desc: "Manage batch preparation formulas, track raw material shipping to outlets, and maintain consistent dish recipes centrally.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2h-2" />
        </svg>
      ),
    },
  ];

  const handleCardClick = (featureId: string) => {
    router.push(`/solutions/details?module=${featureId}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
      
      {/* 1. Header Area */}
      <div className="mb-12 text-left">
        <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-3">
          Features Matrix
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15] mb-4">
          Twelve powerful features to <span className="text-[#FF4F18]">help your restaurant run better</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          Click on any feature card below to open its full specifications and details on a new page.
        </p>
      </div>

      {/* 2. Grid Container with Linings/Separation */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-[28px] overflow-hidden bg-white dark:bg-zinc-950/20 grid grid-cols-1 md:grid-cols-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        {featureItems.map((item, idx) => {
          const isLastInRow = (idx % 3) === 2;
          const isLastRow = idx >= 9;
          const isVeryLast = idx === 11;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(item.id)}
              className={`p-8 sm:p-10 flex flex-col justify-start transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 cursor-pointer text-left
                ${!isLastInRow ? "md:border-r border-zinc-200 dark:border-zinc-800" : ""}
                ${!isLastRow ? "md:border-b border-zinc-200 dark:border-zinc-800" : ""}
                ${!isVeryLast ? "border-b border-zinc-200 dark:border-zinc-800 md:border-b-0" : "border-b-0"}
              `}
            >
              {/* Header: Number and raw Icon (No background color) */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-zinc-400 dark:text-zinc-650">{item.num}</span>
                <div className="text-[#FF4F18] shrink-0">
                  {item.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">{item.title}</h3>
              <p className="text-zinc-550 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
