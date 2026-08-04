'use client';

import React from 'react';
import Link from 'next/link';

export default function Features() {
  const featureItems = [
    {
      num: '01',
      title: 'Orders & billing',
      desc: 'Manage dine-in, takeaway, online, and QR orders in one place. Billing is quick, simple, and accurate.',
      borderClasses: 'border-b border-zinc-200 md:border-r md:border-b',
      imageSrc: '/image4.png',
    },
    {
      num: '02',
      title: 'Kitchen display system',
      desc: 'Orders go straight to the right kitchen station. No paper. No shouting. No confusion.',
      borderClasses: 'border-b border-zinc-200 md:border-r md:border-b',
      imageSrc: '/image 6.png',
    },
    {
      num: '03',
      title: 'Smart Inventory',
      desc: "Every order automatically updates your stock. Know what's running low before it becomes a problem.",
      borderClasses: 'border-b border-zinc-200 md:border-b',
      imageSrc: '/image 7.png',
    },
    {
      num: '04',
      title: 'Live dashboard',
      desc: 'View sales, orders, inventory, and outlet performance anytime from one screen.',
      borderClasses: 'border-b border-zinc-200 md:border-b-0 md:border-r',
      imageSrc: '/image 8.png',
    },
    {
      num: '05',
      title: 'One order flow',
      desc: 'Manage Swiggy, Zomato, QR, and dine-in orders together without switching between different apps.',
      borderClasses: 'border-b border-zinc-200 md:border-b-0 md:border-r',
      imageSrc: '/image 9.png',
    },
    {
      num: '06',
      title: 'Multi-outlet management',
      desc: 'Manage one outlet or many.View reports and performance from one dashboard.',
      borderClasses: 'border-b-0',
      imageSrc: '/image 10.png',
    },
  ];

  return (
    <div className="w-full">
      {/* Horizontal Divider Line */}
      <hr className="border-t border-zinc-200 w-full" />

      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 md:mb-12">
          {/* Heading */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] leading-[1.15]">
              When your restaurant gets busy,
              <br />
              <span className="text-[#FF4F18]"> Digitory keeps everything running smoothly.</span>
            </h2>
          </div>

          {/* Description & Action */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-md">
              Connect your orders, kitchen, inventory, billing, and reports in one platform so your team can work faster and make fewer mistakes.
            </p>
            <Link
              href="#"
              className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
            >
              Explore Platform
            </Link>
          </div>
        </div>

        {/* Features Card Container with 3x2 inner grid */}
        <div className="border border-zinc-200 rounded-[28px] overflow-hidden bg-white grid grid-cols-1 md:grid-cols-3">
          {featureItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-10 flex flex-col justify-start transition-all duration-300 hover:bg-zinc-50/50 ${item.borderClasses}`}
            >
              {/* Feature Index */}
              <span className="text-sm font-bold text-zinc-400 mb-2">{item.num}</span>

              {/* Feature Image Mockup */}
              <div className="w-full h-[140px] flex items-center justify-center my-4 select-none relative">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="max-w-[240px] max-h-[140px] object-contain rounded-xl"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-zinc-950 mb-2 mt-4">{item.title}</h3>
              <p className="text-zinc-550 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
