'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  const trustCircles = [
    { text: 'R', bg: 'bg-[#ECECEC]', textCol: 'text-zinc-650' },
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
            Manage busy hours with <span className="text-[#FF4F18]">ease</span>
            <br />
            {/* <span className="text-[#FF4F18]">not chaos.</span> */}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
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

        {/* Right WhatsApp Mockup Column */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes phoneFloat {
              0%, 100% { transform: translateY(0px) rotate(0.5deg); }
              50% { transform: translateY(-12px) rotate(-0.5deg); }
            }
            @keyframes msgPop0 {
              0% { opacity: 0; transform: translateY(15px) scale(0.97); }
              3% { opacity: 1; transform: translateY(0) scale(1); }
              93% { opacity: 1; transform: translateY(0) scale(1); }
              96%, 100% { opacity: 0; transform: translateY(-10px) scale(0.97); }
            }
            @keyframes msgPop1 {
              0%, 17% { opacity: 0; transform: translateY(15px) scale(0.97); }
              20% { opacity: 1; transform: translateY(0) scale(1); }
              93% { opacity: 1; transform: translateY(0) scale(1); }
              96%, 100% { opacity: 0; transform: translateY(-10px) scale(0.97); }
            }
            @keyframes msgPop2 {
              0%, 33% { opacity: 0; transform: translateY(15px) scale(0.97); }
              37% { opacity: 1; transform: translateY(0) scale(1); }
              93% { opacity: 1; transform: translateY(0) scale(1); }
              96%, 100% { opacity: 0; transform: translateY(-10px) scale(0.97); }
            }
            @keyframes msgPop3 {
              0%, 50% { opacity: 0; transform: translateY(15px) scale(0.97); }
              54% { opacity: 1; transform: translateY(0) scale(1); }
              93% { opacity: 1; transform: translateY(0) scale(1); }
              96%, 100% { opacity: 0; transform: translateY(-10px) scale(0.97); }
            }
            @keyframes msgPop4 {
              0%, 67% { opacity: 0; transform: translateY(15px) scale(0.97); }
              71% { opacity: 1; transform: translateY(0) scale(1); }
              93% { opacity: 1; transform: translateY(0) scale(1); }
              96%, 100% { opacity: 0; transform: translateY(-10px) scale(0.97); }
            }
          `}} />
          <div className="w-full max-w-[440px] rounded-[32px] bg-[#F0EBE3] shadow-2xl overflow-hidden relative animate-[phoneFloat_6s_ease-in-out_infinite]">

            {/* Phone Header */}
            <div className="bg-[#005C4B] px-4 py-4 flex items-center justify-between text-white select-none">
              <div className="flex items-center gap-3">
                {/* Back Arrow */}
                <svg className="h-5 w-5 opacity-90 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>

                {/* Group Avatar */}
                <div className="h-10 w-10 rounded-full bg-zinc-200/20 flex items-center justify-center font-semibold text-xs border border-white/10">
                  Group
                </div>

                {/* Header Information */}
                <div>
                  <h3 className="font-semibold text-sm leading-tight">Restaurant Operations</h3>
                  <span className="text-[11px] text-emerald-100/80">12 members, 3 online</span>
                </div>
              </div>

              {/* Call/Menu Icons */}
              <div className="flex items-center gap-4 text-white/95">
                <svg className="h-5 w-5 cursor-pointer hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
                <svg className="h-[18px] w-[18px] cursor-pointer hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <svg className="h-5 w-5 cursor-pointer hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-4 space-y-4 max-h-[460px] overflow-y-auto">

              {/* Date Separator */}
              <div className="flex justify-center my-2">
                <span className="bg-white/80 backdrop-blur-xs text-[11px] text-zinc-500 font-medium px-3 py-1 rounded-md shadow-xs select-none">
                  Today
                </span>
              </div>

              {/* Chat Messages */}
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 transition-all duration-300 hover:translate-x-1"
                  style={{
                    animation: `msgPop${index} 15s infinite ease-in-out`,
                    opacity: 0
                  }}
                >
                  {/* Avatar */}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-xs shrink-0 text-sm select-none ${msg.avatarColor}`}>
                    {msg.avatarLabel}
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-white rounded-2xl rounded-tl-none px-3.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)] max-w-[82%] relative flex flex-col">
                    <span className="text-[11px] font-bold text-[#FF4F18] mb-0.5 leading-none">
                      {msg.role}
                    </span>
                    <p className="text-[13px] text-zinc-800 leading-snug pr-8 py-0.5">
                      {msg.text}
                    </p>
                    <span className="text-[9px] text-zinc-400 absolute bottom-1 right-2 leading-none">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock Chat Input Bar */}
            <div className="bg-[#F0F2F5] px-3 py-3 border-t border-zinc-200/50 flex items-center gap-2 select-none">
              <div className="flex items-center gap-2.5 bg-white rounded-full px-3 py-2 flex-1 shadow-xs border border-zinc-200/20">
                {/* Emoji Icon */}
                <svg className="h-5.5 w-5.5 text-zinc-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                {/* Text Field */}
                <span className="text-zinc-400 text-xs flex-1 cursor-text">Type a message</span>

                {/* Attachment Icon */}
                <svg className="h-5 w-5 text-zinc-500 cursor-pointer -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>

                {/* Camera Icon */}
                <svg className="h-5 w-5 text-zinc-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              {/* Microphone Button */}
              <button className="bg-[#00a884] h-9 w-9 rounded-full flex items-center justify-center text-white shadow-sm shrink-0 active:scale-95 transition-transform">
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

