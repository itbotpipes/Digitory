"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import FooterPage from "../../components/Footer";
import BeliefsSection from "../../components/about/BeliefsSection";
import ToolIntegrations from "../../components/solutions/ToolIntegrations";
import RestaurantOS from "../../components/home/RestaurantOS";
import FAQPage from "../../components/home/FAQ";
import InsightsPage from "../../components/home/Insights";
import { industriesDb, IndustryData } from "../data/industriesDb";
import { api } from "@/lib/api";

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<IndustryData[]>(Object.values(industriesDb));

  // POS Simulator State
  const [businessType, setBusinessType] = useState<"restaurant" | "cloud-kitchen" | "cafes" | "cafe-chains">("restaurant");
  const [activeTableIdx, setActiveTableIdx] = useState(1);
  const [cart, setCart] = useState<{ name: string; price: number; quantity: number }[]>([
    { name: "Paneer Butter Masala", price: 280, quantity: 1 },
    { name: "Butter Naan", price: 70, quantity: 2 }
  ]);
  const [successMsg, setSuccessMsg] = useState(false);

  // Define data presets for each business type
  const posData = {
    restaurant: {
      terminalName: "POS TERMINAL #01 • MAIN FLOOR",
      tablesLabel: "SELECT ACTIVE TABLE:",
      tables: [
        { label: "Table 01", sub: "Ready" },
        { label: "Table 04", sub: "Busy (3 items)" },
        { label: "Table 09", sub: "Billing" }
      ],
      shortcuts: [
        { name: "Paneer Masala", price: 280 },
        { name: "Butter Naan", price: 70 },
        { name: "Chicken Biryani", price: 320 },
        { name: "Mango Lassi", price: 110 }
      ],
      kdsStation: "KDS Station #2 (Tandoor)"
    },
    "cloud-kitchen": {
      terminalName: "DELIVERY DECK #03 • KITCHEN AREA",
      tablesLabel: "SELECT ACTIVE CHANNEL:",
      tables: [
        { label: "Swiggy #882", sub: "Preparing" },
        { label: "Zomato #451", sub: "Dispatch" },
        { label: "Web Direct", sub: "New Order" }
      ],
      shortcuts: [
        { name: "Hakka Noodles", price: 240 },
        { name: "Chilli Chicken", price: 290 },
        { name: "Veg Spring Roll", price: 180 },
        { name: "Diet Coke", price: 60 }
      ],
      kdsStation: "KDS Station #4 (Wok & Fryer)"
    },
    cafes: {
      terminalName: "BARISTA STATION #01 • COUNTER",
      tablesLabel: "SELECT ACTIVE ORDER:",
      tables: [
        { label: "Takeaway 01", sub: "Ready" },
        { label: "Dine-in T3", sub: "Brewing" },
        { label: "Takeaway 05", sub: "Billing" }
      ],
      shortcuts: [
        { name: "Cappuccino", price: 190 },
        { name: "Cold Brew", price: 220 },
        { name: "Butter Croissant", price: 150 },
        { name: "Blueberry Muffin", price: 170 }
      ],
      kdsStation: "Espresso Bar #1"
    },
    "cafe-chains": {
      terminalName: "CENTRAL ROASTERY #02 • BULK DECK",
      tablesLabel: "SELECT OUTLET TRANSFER:",
      tables: [
        { label: "Indiranagar", sub: "Processing" },
        { label: "Koramangala", sub: "Dispensing" },
        { label: "Jayanagar", sub: "Ready" }
      ],
      shortcuts: [
        { name: "Espresso Beans 1kg", price: 1200 },
        { name: "Oat Milk Carton", price: 350 },
        { name: "Paper Cups x100", price: 450 },
        { name: "Roastery Blend", price: 950 }
      ],
      kdsStation: "Dispatch Bay #3 (Cargo)"
    }
  };

  // Sync default cart when businessType changes
  useEffect(() => {
    setSuccessMsg(false);
    if (businessType === "restaurant") {
      setCart([
        { name: "Paneer Butter Masala", price: 280, quantity: 1 },
        { name: "Butter Naan", price: 70, quantity: 2 }
      ]);
    } else if (businessType === "cloud-kitchen") {
      setCart([
        { name: "Chilli Chicken", price: 290, quantity: 1 },
        { name: "Hakka Noodles", price: 240, quantity: 1 }
      ]);
    } else if (businessType === "cafes") {
      setCart([
        { name: "Cappuccino", price: 190, quantity: 2 },
        { name: "Butter Croissant", price: 150, quantity: 1 }
      ]);
    } else if (businessType === "cafe-chains") {
      setCart([
        { name: "Espresso Beans 1kg", price: 1200, quantity: 5 },
        { name: "Oat Milk Carton", price: 350, quantity: 2 }
      ]);
    }
  }, [businessType]);

  const handleAddShortcut = (item: { name: string; price: number }) => {
    setSuccessMsg(false);
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (name: string, amt: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, quantity: i.quantity + amt } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const totalCartValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    async function loadIndustries() {
      try {
        const res = await api.get('/industries?limit=20');
        const loaded: any[] = res.data?.docs || res.data?.results || res.data || [];
        if (loaded && loaded.length > 0) {
          const normalized: IndustryData[] = loaded.map((s: any) => ({
            id: s.slug || s._id,
            slug: s.slug || '',
            shortLabel: s.shortLabel || s.title || '',
            icon: null,
            title: s.title || '',
            badge: s.badge || '',
            subtitle: s.subtitle || '',
            description: s.description || '',
            ctaText: s.ctaText || 'Book a demo',
            trustText: s.trustText || 'Trusted by restaurants across India.',
            featuresTitle: s.featuresTitle || 'Key capabilities',
            features: s.features || [],
            whyChooseTitle: s.whyChooseTitle || 'Why choose Digitory?',
            whyChoose: s.whyChoose || [],
            ctaBlock: s.ctaBlock || { title: 'Ready to grow?', desc: 'Talk to us today.' },
            image: s.image || '',
            gridTitle: s.gridTitle || '',
            gridDesc: s.gridDesc || '',
            opsTitle: s.opsTitle || '',
            opsParagraph: s.opsParagraph || '',
            opsHighlights: s.opsHighlights || '',
          }));

          const merged = normalized.map(item => {
            const staticEntry = industriesDb[item.id];
            return staticEntry ? { ...item, icon: staticEntry.icon } : item;
          });

          setIndustries(merged);
        }
      } catch (err) {
        console.warn('Failed to load industries from backend:', err);
      }
    }
    loadIndustries();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 pt-4 pb-10 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Built for <span className="text-[#FF4F18]">every food & beverage business.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
                From busy bars and craft breweries to fast QSR chains and mobile food trucks, Digitory provides the tools you need to streamline operations and grow with confidence.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/request-demo"
                  className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
                >
                  Book a demo
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex -space-x-3">
                  {[
                    { text: 'R', bg: 'bg-[#ECECEC]', textCol: 'text-zinc-600' },
                    { text: 'C', bg: 'bg-[#D2E9E9]', textCol: 'text-teal-600' },
                    { text: 'B', bg: 'bg-[#FFE5D9]', textCol: 'text-orange-600' },
                    { text: 'K', bg: 'bg-[#E8EAFF]', textCol: 'text-indigo-600' },
                  ].map((circle, idx) => (
                    <div
                      key={idx}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${circle.bg} ${circle.textCol} font-extrabold text-xs border-2 border-white dark:border-zinc-950`}
                    >
                      {circle.text}
                    </div>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-zinc-500 max-w-xs leading-normal">
                  Trusted by restaurants, cafés, bars, breweries and cloud kitchens across India.
                </p>
              </div>
            </div>

            {/* Right Column - Hero Image (Commented Out) */}
            {/* 
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full relative perspective-[1000px]">
              <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(255,79,24,0.15)] z-10 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/DIGI.jpg"
                  alt="Digitory Restaurant OS"
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[24px] pointer-events-none" />
              </div>
            </div>
            */}

            {/* Right Column - Interactive POS Terminal Simulator */}
            <div className="lg:col-span-6 flex flex-col justify-center lg:justify-end w-full max-w-[500px] mx-auto lg:mx-0 select-none">
              
              {/* POS Interface Card */}
              <div className="bg-white dark:bg-[#121319] border border-zinc-200 dark:border-zinc-800/80 shadow-2xl rounded-[28px] p-5 md:p-6 space-y-5 relative">
                
                {/* Dropdown Business Type Selector Inside Card */}
                <div className="flex items-center justify-between pb-3.5 border-b border-zinc-150 dark:border-zinc-800/80">
                  <div className="text-[11px] font-extrabold text-[#FF4F18] uppercase tracking-wider">
                    Select POS Mode:
                  </div>
                  <select 
                    value={businessType} 
                    onChange={(e) => setBusinessType(e.target.value as any)} 
                    className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/85 rounded-xl px-3 py-1.5 text-xs font-extrabold text-zinc-800 dark:text-zinc-150 focus:outline-none focus:border-[#FF4F18] transition-all cursor-pointer shadow-sm"
                  >
                    <option value="restaurant">🍴 Restaurant POS</option>
                    <option value="cloud-kitchen">🍳 Cloud Kitchen POS</option>
                    <option value="cafes">☕ Cafe POS</option>
                    <option value="cafe-chains">🏢 Cafe Chain POS</option>
                  </select>
                </div>

                {/* Header: Terminal name and online status */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#13B257] animate-pulse" />
                    <span className="font-extrabold text-[12px] text-zinc-900 dark:text-white uppercase tracking-wider">
                      {posData[businessType].terminalName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">v4.2.10</span>
                </div>

                {/* Table/Channel Selector */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                    {posData[businessType].tablesLabel}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {posData[businessType].tables.map((table, idx) => {
                      const isActive = activeTableIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveTableIdx(idx);
                            setSuccessMsg(false);
                          }}
                          className={`rounded-xl p-2.5 text-center transition-all duration-200 cursor-pointer border ${
                            isActive
                              ? "bg-[#FF4F18] border-[#FF4F18] text-white shadow-md shadow-orange-500/10"
                              : "bg-[#F8F9FA] dark:bg-zinc-850 border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-[#F1F3F5] dark:hover:bg-zinc-800"
                          }`}
                        >
                          <div className="text-[11.5px] font-extrabold leading-tight">{table.label}</div>
                          <div className={`text-[7.5px] mt-0.5 font-semibold ${isActive ? "text-orange-100" : "text-zinc-450 dark:text-zinc-500"}`}>
                            {table.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Billing Shortcuts */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                      FAST BILLING SHORTCUTS:
                    </span>
                    <span className="text-xs font-extrabold text-[#FF4F18]">
                      TOTAL: ₹ {totalCartValue}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {posData[businessType].shortcuts.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddShortcut(item)}
                        className="flex items-center justify-between bg-[#F8F9FA] dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-150 dark:border-zinc-800 rounded-xl p-2.5 transition-colors cursor-pointer text-left"
                      >
                        <span className="text-[10.5px] font-extrabold text-zinc-800 dark:text-zinc-150 truncate max-w-[120px]">
                          + {item.name}
                        </span>
                        <span className="text-[10.5px] font-bold text-zinc-450 dark:text-zinc-400">
                          ₹{item.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="bg-[#F8F9FA] dark:bg-zinc-850/60 rounded-2xl p-4 border border-zinc-150 dark:border-zinc-800/80 space-y-2.5 max-h-[140px] overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 py-4">
                      Cart is empty. Tap shortcuts to add items.
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.name, -1)}
                            className="w-4 h-4 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 flex items-center justify-center text-zinc-700 dark:text-zinc-200 text-[10px] font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold text-zinc-900 dark:text-white shrink-0">
                            {item.quantity}x
                          </span>
                          <span className="text-zinc-750 dark:text-zinc-300 font-medium truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-extrabold text-zinc-900 dark:text-white shrink-0 pl-2">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Success Banner */}
                {successMsg && (
                  <div className="absolute inset-x-5 bottom-16 bg-[#13B257]/10 border border-[#13B257]/30 rounded-xl p-3 text-center text-[#13B257] text-[11.5px] font-extrabold shadow-sm animate-fade-in">
                    🚀 Order Dispatched to {posData[businessType].kdsStation}! Ticket Printed.
                  </div>
                )}

                {/* Footer KDS details and CTA dispatch */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-850/50 rounded-xl py-2 px-3 border border-zinc-150 dark:border-zinc-800/80">
                    <svg className="w-3.5 h-3.5 text-[#FF4F18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244c0 .89-.56 1.6-1.42 1.791-.55.12-1.1.28-1.63.48-.8.3-1.37.98-1.57 1.83a8.87 8.87 0 00-.51 1.83c-.04.32-.23.6-.53.72a2.23 2.23 0 00-1.08 1.08c-.12.3-.12.63 0 .93a2.23 2.23 0 001.08 1.08c.3.12.5.4.53.72.1.6.27 1.2.51 1.83.2.85.77 1.53 1.57 1.83.53.2 1.08.36 1.63.48.86.19 1.42.9 1.42 1.79v1.244" />
                    </svg>
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                      Destination: {posData[businessType].kdsStation}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSuccessMsg(true);
                      setTimeout(() => setSuccessMsg(false), 3500);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF4F18] py-3 text-xs font-extrabold text-white transition-all hover:bg-[#E03F0D] shadow-[0_4px_12px_rgba(255,79,24,0.25)] hover:shadow-[0_6px_16px_rgba(255,79,24,0.35)] active:scale-[0.98] cursor-pointer"
                  >
                    ⚡ Dispatch Order to KDS & Print Ticket
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Industries Grid */}
        <section className="mx-auto max-w-7xl px-6 md:px-8 pt-12 md:pt-16 lg:pt-20 pb-24">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-[28px] overflow-hidden bg-white dark:bg-zinc-950/20 grid grid-cols-1 md:grid-cols-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            {industries.map((item, idx) => {
              const isLastInRow = (idx % 3) === 2;
              const isLastRow = idx >= 6;
              const isVeryLast = idx === 8;

              return (
                <Link
                  key={item.id}
                  href={`/restaurant-types/details-${item.id}`}
                  className={`p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 cursor-pointer text-left group
                    border-zinc-200 dark:border-zinc-800
                    ${!isVeryLast ? "border-b" : ""}
                    ${isLastRow ? "md:border-b-0" : ""}
                    ${!isLastInRow ? "md:border-r" : ""}
                  `}
                >
                  <div className="space-y-6 w-full">
                    {/* Header: Number and raw Icon */}
                    {!item.image && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-zinc-400 dark:text-zinc-600">0{idx + 1}</span>
                        <div className="text-[#FF4F18] shrink-0">
                          {item.icon}
                        </div>
                      </div>
                    )}

                    {/* Dynamic Card Image if uploaded */}
                    {item.image && (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-2 transition-colors duration-250">
                        {item.title}
                      </h3>
                      <p className="text-zinc-550 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-6 flex items-center text-xs font-bold text-[#FF4F18]">
                    <span>View Details</span>
                    <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Counter Section (from About Page) */}
        <BeliefsSection showBeliefs={false} showHeading={false} />

        {/* Connects with your fav app section (from Solutions Page) */}
        <ToolIntegrations />

        {/* Testimonials section (from Home Page) */}
        <RestaurantOS />

        {/* FAQs section (from Home Page) */}
        <FAQPage />

        {/* Latest Insights / Blog section (from Home Page) */}
        <InsightsPage />
      </main>

      <FooterPage />
    </div>
  );
}
