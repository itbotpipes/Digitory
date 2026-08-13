"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface FeatureItem {
  num: string;
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image?: string;
}

function renderHighlightedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <span key={index} className="text-[#FF4F18]">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

export default function Capabilities() {
  const router = useRouter();

  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [gridTitle, setGridTitle] = useState('Twelve powerful features to help *your restaurant run better*');
  const [gridDesc, setGridDesc] = useState('Click on any feature card below to open its full specifications and details on a new page.');
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function loadSolutions() {
      try {
        const res = await api.get('/solutions?limit=30');
        const loaded = res.data?.docs || res.data?.results || res.data || [];
        if (loaded && loaded.length > 0) {
          const normalized = loaded.map((s: any) => {
            const staticItem = featureItems.find(f => f.id === s.slug);
            return {
              num: staticItem?.num || "00",
              id: s.slug || s._id,
              title: s.gridTitle || staticItem?.title || s.title || '',
              desc: s.gridDesc || staticItem?.desc || s.description || '',
              icon: staticItem?.icon || null,
              image: s.image || '',
            };
          });

          // Sort normalized features list to exactly match static featureItems array order
          normalized.sort((a: any, b: any) => {
            const idxA = featureItems.findIndex(f => f.id === a.id);
            const idxB = featureItems.findIndex(f => f.id === b.id);
            return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
          });

          // Re-index card numbers dynamically based on sorted sequence (01, 02, etc.)
          const reindexed = normalized.map((item: any, idx: number) => ({
            ...item,
            num: String(idx + 1).padStart(2, '0')
          }));

          // Pad with static items if backend returns fewer than 12
          if (reindexed.length < featureItems.length) {
            const extra = featureItems.slice(reindexed.length);
            setFeatures([...reindexed, ...extra]);
          } else {
            setFeatures(reindexed);
          }
        } else {
          setFeatures(featureItems);
        }
      } catch (err) {
        console.warn('Failed to load solutions from backend:', err);
        setFeatures(featureItems);
      } finally {
        setLoading(false);
      }
    }
    async function loadSettings() {
      try {
        const res = await api.get('/settings');
        if (res.data) {
          if (res.data.solutionsGridTitle) setGridTitle(res.data.solutionsGridTitle);
          if (res.data.solutionsGridDesc) setGridDesc(res.data.solutionsGridDesc);
        }
      } catch (err) {
        console.warn('Failed to load settings:', err);
      }
    }
    loadSolutions();
    loadSettings();
  }, []);

  const handleCardClick = (featureId: string) => {
    // Use the dynamic routing system for solution details
    router.push(`/solutions/${featureId}`);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
        {/* Header Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16 items-start">
          <div className="lg:col-span-7">
            <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse mb-2" />
            <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Grid Container Skeleton */}
        <div className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-[32px] overflow-hidden bg-white dark:bg-zinc-950/20 grid grid-cols-1 md:grid-cols-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-10 flex flex-col justify-start border-zinc-200/60 dark:border-zinc-800/60 animate-pulse
                ${idx !== 11 ? "border-b" : ""}
                ${idx >= 9 ? "md:border-b-0" : ""}
                ${idx % 3 !== 2 ? "md:border-r" : ""}
              `}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="h-4 w-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-6 w-6 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              </div>
              <div className="h-5 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
              <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
      
      {/* 1. Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16 items-start">
        <div className="lg:col-span-7">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
            {renderHighlightedText(gridTitle)}
          </h2>
        </div>
        <div className="lg:col-span-5 text-sm md:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed lg:pt-2">
          <p>
            {gridDesc}
          </p>
        </div>
      </div>

      {/* 2. Grid Container with Linings/Separation */}
      <div className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-[32px] overflow-hidden bg-white dark:bg-zinc-950/20 grid grid-cols-1 md:grid-cols-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        {features.map((item, idx) => {
          return (
            <Link
              key={idx}
              href={`/solutions/${item.id}`}
              className={`p-8 sm:p-10 flex flex-col justify-start transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 cursor-pointer text-left border-zinc-200/60 dark:border-zinc-800/60
                ${idx !== features.length - 1 ? "border-b" : ""}
                ${idx >= 9 ? "md:border-b-0" : ""}
                ${idx % 3 !== 2 ? "md:border-r" : ""}
              `}
            >
              {/* Header: Number and raw Icon (No background color) */}
              {!item.image && (
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-zinc-400 dark:text-zinc-650">{item.num}</span>
                  <div className="text-[#FF4F18] shrink-0">
                    {item.icon}
                  </div>
                </div>
              )}

              {/* Dynamic Solution Image if uploaded */}
              {item.image && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">{item.title}</h3>
              <p className="text-zinc-550 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </Link>
          );
        })}
      </div>

    </section>
  );
}
