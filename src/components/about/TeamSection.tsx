'use client';

import React from 'react';
import Image from 'next/image';

export default function TeamSection() {
  const team = [
    {
      name: 'Shiv Mogali',
      role: 'Founder and CEO',
      image: '/founder.jpg',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        '20+ years of experience in business development and technology.',
      ],
    },
    {
      name: 'Sudhanshu Killedar',
      role: 'CTO',
      image: '/cto.png',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Experienced entrepreneur in the IT & ITES industry, MSRIT alumni',
        '25+ years of experience in technology, with leadership roles at Walmart, P&G, SAP, and TEG.',
      ],
    },
    {
      name: 'Ashish Sharnagat',
      role: 'Strategy & Marketing',
      image: '/strategy.jpg',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Retail & consumer business expert, ISB alumni, Ex-Reliance, Shoppers Stop & Landmark',
        '20+ years of experience in retail, consumer business, and marketing.',
      ],
    },
    {
      name: 'Sandeep S',
      role: 'Delivery and Client Relations',
      image: '/delivery.png',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Ex-Infosys, MSRIT alumni',
        '20+ years of experience in operations, implementation, and customer success.',
      ],
    },
    {
      name: 'Bala Sundrasamy',
      role: 'Product & Design',
      image: '/product.png',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Product development expert, COEG alumni, Software & Consulting head',
        '30+ years of experience building software products and business solutions.',
      ],
    },
    {
      name: 'Panjury V',
      role: 'Marketing Director',
      image: '/marketing.png',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'B.E - Industrial Engineering and management, MBA Marketing, Passionate Entrepreneur',
        'Entrepreneur with expertise in industrial engineering and marketing.',
      ],
    },
  ];

  return (
    <section className="bg-white dark:bg-[#121214] py-10 md:py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              The people behind <span className="text-[#FF4F18]">Digitory</span>
            </h2>
          </div>
          <div className="lg:col-span-5 text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            <p>
              Our team has years of experience in technology, business, product development, and restaurant operations. More importantly, we've spent time inside real restaurants to understand the challenges owners and staff face every day.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white dark:bg-[#17171a] border border-zinc-200/60 dark:border-[#2a2a2e]/60 rounded-3xl p-8 shadow-[0_4px_15px_rgba(0,0,0,0.015)] transition-all duration-300 hover:bg-zinc-50/50 group"
            >
              {/* Profile Avatar with Photo */}
              <div className="relative mb-6 select-none shrink-0">
                <div className="w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden relative z-10">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                {/* Visual ring overlay */}
                <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-black dark:border-white group-hover:rotate-45 transition-transform duration-700 z-0" />
              </div>

              {/* Identity */}
              <div className="text-center w-full mb-6">
                <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white transition-colors duration-300">
                  {member.name}
                </h3>
                <span className="text-[13px] font-bold text-[#FF4F18] mt-1 block uppercase tracking-wide">
                  {member.role}
                </span>
              </div>

              {/* Bio Highlights Chips / List */}
              <div className="w-full flex-1 border-t border-zinc-100 dark:border-[#2a2a2e]/50 pt-5 mt-auto">
                <ul className="space-y-2.5 text-center">
                  {member.highlights.map((highlight, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium transition-colors duration-300"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
