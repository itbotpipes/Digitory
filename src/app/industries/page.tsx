"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import FooterPage from "../../components/Footer";
import { industriesDb, IndustryData } from "../data/industriesDb";
import { api } from "@/lib/api";

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<IndustryData[]>(Object.values(industriesDb));

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
            subtitle: s.subtitle || '',
            description: s.description || '',
            trustText: s.trustText || 'Trusted by restaurants across India.',
            featuresTitle: s.featuresTitle || 'Key capabilities',
            features: s.features || [],
            whyChooseTitle: s.whyChooseTitle || 'Why choose Digitory?',
            whyChoose: s.whyChoose || [],
            ctaBlock: s.ctaBlock || { title: 'Ready to grow?', desc: 'Talk to us today.' },
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

            {/* Right Column - Hero Image */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full relative perspective-[1000px]">
              <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(255,79,24,0.15)] z-10 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/home-hero.png"
                  alt="Digitory Restaurant OS"
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[24px] pointer-events-none" />
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
                  href={`/industries/details?module=${item.id}`}
                  className={`p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 cursor-pointer text-left group
                    border-zinc-200 dark:border-zinc-800
                    ${!isVeryLast ? "border-b" : ""}
                    ${isLastRow ? "md:border-b-0" : ""}
                    ${!isLastInRow ? "md:border-r" : ""}
                  `}
                >
                  <div className="space-y-6">
                    {/* Header: Number and raw Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-zinc-400 dark:text-zinc-600">0{idx + 1}</span>
                      <div className="text-[#FF4F18] shrink-0">
                        {item.icon}
                      </div>
                    </div>

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
      </main>

      <FooterPage />
    </div>
  );
}
