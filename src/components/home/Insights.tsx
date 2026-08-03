"use client";

import { useState } from "react";
import Link from "next/link";

const INSIGHTS_ITEMS = [
  {
    id: 1,
    slug: "why-restaurants-in-india-trust-digitory-for-smart-operations-growth",
    badge: "FEATURED",
    imageSrc: "/featured.png",
    metadata: "Operations · 8 min read · June 2025",
    title: "Why Restaurants in India Face Operational Burnout — And What the Numbers Tell Us"
  },
  {
    id: 2,
    slug: "kitchen-automation-how-to-future-proof-restaurant-backends",
    badge: "KITCHEN",
    imageSrc: "/kitchen.png",
    metadata: "Kitchen · 5 min read",
    title: "Future-Proof Your Kitchen: How Advanced KDS Changes Rush-Hour Service"
  },
  {
    id: 3,
    slug: "data-driven-kitchen-operations",
    badge: "DATA",
    imageSrc: "/data.png",
    metadata: "Technology · 6 min read",
    title: "Data-Driven Kitchens: How Forecasting Changes Real-Time Restaurant Operations"
  }
];

export default function InsightsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % INSIGHTS_ITEMS.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + INSIGHTS_ITEMS.length) % INSIGHTS_ITEMS.length);
    }
  };

  const renderCard = (item: typeof INSIGHTS_ITEMS[0], isSlider: boolean = false) => {
    return (
      <Link 
        href={`/blog/${item.slug}`}
        className={`flex flex-col h-full bg-white rounded-[28px] border border-zinc-200/60 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform duration-300 ${
          isSlider ? "" : "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.025)]"
        } group block cursor-pointer`}
      >
        {/* Top Banner Graphic area - Full bleed image */}
        <div className="h-[200px] w-full relative overflow-hidden">
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-20" />
          
          {/* Badge */}
          <div className="absolute top-5 left-5 bg-[#FF4F18] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full tracking-wider z-10">
            {item.badge}
          </div>
        </div>

        {/* Bottom text content */}
        <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Metadata */}
            <p className="text-[12px] text-zinc-400 font-semibold tracking-wide">
              {item.metadata}
            </p>
            
            {/* Title */}
            <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#111111] leading-snug group-hover:text-[#FF4F18] transition-colors">
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-white font-sans antialiased text-[#111111] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight leading-[1.15] text-[#111111]">
            Latest <span className="text-[#FF4F18]">insights.</span>
          </h2>
          
          <div>
            <Link
              href="/blog"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              <span>View all</span>
              <svg className="w-4 h-4 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Desktop grid layout (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-stretch">
          {INSIGHTS_ITEMS.map((item) => (
            <div key={item.id} className="h-full">
              {renderCard(item)}
            </div>
          ))}
        </div>

        {/* Mobile slider layout (hidden on desktop) */}
        <div className="block md:hidden">
          <div 
            className="relative w-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {INSIGHTS_ITEMS.map((item) => (
                <div key={item.id} className="w-full shrink-0 px-1">
                  {renderCard(item, true)}
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls: Prev, Dots, Next */}
          <div className="flex justify-center items-center gap-4 mt-8 select-none">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + INSIGHTS_ITEMS.length) % INSIGHTS_ITEMS.length)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-[#111111] hover:bg-zinc-50 active:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous insight"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex gap-2">
              {INSIGHTS_ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-6 bg-[#FF4F18]" : "w-2.5 bg-zinc-300"
                  }`}
                  aria-label={`Go to insight ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % INSIGHTS_ITEMS.length)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-[#111111] hover:bg-zinc-50 active:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
              aria-label="Next insight"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
