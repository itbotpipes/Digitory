'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const trustCircles = [
    { text: 'R', bg: 'bg-[#ECECEC]', textCol: 'text-zinc-600' },
    { text: 'C', bg: 'bg-[#D2E9E9]', textCol: 'text-teal-600' },
    { text: 'B', bg: 'bg-[#FFE5D9]', textCol: 'text-orange-600' },
    { text: 'K', bg: 'bg-[#E8EAFF]', textCol: 'text-indigo-600' },
  ];

  const chatMessages = [
    {
      role: 'Chef',
      text: 'Orders reaching kitchen on time. ✅',
      time: '7:42 PM',
      avatarColor: 'bg-emerald-100 text-emerald-700',
      avatarLabel: '👨‍🍳',
    },
    {
      role: 'Inventory',
      text: 'Stock updated. No low stock. ✅',
      time: '7:45 PM',
      avatarColor: 'bg-orange-100 text-orange-700',
      avatarLabel: '📦',
    },
    {
      role: 'Cashier',
      text: 'Billing running smoothly. ✅',
      time: '7:48 PM',
      avatarColor: 'bg-blue-100 text-blue-700',
      avatarLabel: '💵',
    },
    {
      role: 'Captain',
      text: 'All tables served on time. 😊',
      time: '7:52 PM',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarLabel: '🤵',
    },
    {
      role: 'Manager',
      text: 'Sales looking great today! 👍',
      time: '7:53 PM',
      avatarColor: 'bg-amber-100 text-amber-700',
      avatarLabel: '👔',
    },
  ];


  return (
    <section className="mx-auto max-w-7xl px-6 md:px-8 pt-4 pb-10 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">

        {/* Left Copy Column */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
          {/* Tagline */}
          <div className="flex items-center gap-2">
            {/* <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F18]"></span> */}
            {/* <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#FF4F18]">
              Built for restaurants, cafés & cloud kitchens
            </span> */}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Manage busy hours <span className="text-[#FF4F18]">with ease</span>
            <br />
            {/* <span className="text-[#FF4F18]">not chaos.</span> */}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
            From billing and inventory to customer loyalty and reports, Digitory helps you run your restaurant smoothly and grow your business.          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/request-demo"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              Book a demo
            </Link>
            {/* <Link
              href="#"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              See how it works
            </Link> */}
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
            <div className="flex -space-x-3">
              {trustCircles.map((circle, idx) => (
                <div
                  key={idx}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${circle.bg} ${circle.textCol} font-extrabold text-xs border-2 border-white`}
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

        {/* Right Column - Restaurant Kitchen Image (Commented out) */}
        {/*
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] group">
            <img
              src="/kitchen.png"
              alt="Restaurant Kitchen"
              className="w-full h-full object-cover transition-transform duration-555 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        */}

        {/* Right Column - Hero Image */}
        <div className="lg:col-span-6 flex justify-center w-full relative perspective-[1000px]">
          {/* Subtle Glow Behind the Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FF4F18]/20 blur-[100px] rounded-full z-0" />
          
          <div 
            className="relative w-full max-w-[500px] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(255,79,24,0.15)] border-8 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 z-10 transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-2"
          >
            <Image
              src="/home-hero.png"
              alt="Digitory Restaurant OS"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.05]"
              priority
            />
            {/* Subtle inner overlay for premium finish */}
            <div className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[24px] pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}

