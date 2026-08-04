'use client';

import React from 'react';

export default function TeamSection() {
  const team = [
    {
      name: 'Shiv Mogali',
      role: 'Founder and CEO',
      initials: 'SM',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Seasoned entrepreneur in IT & ITES industry',
        'MSRIT alumni',
        'Business development & sales expert',
        '20+ years experience',
      ],
    },
    {
      name: 'Sudhanshu Killedar',
      role: 'CTO',
      initials: 'SK',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Veteran Technologist',
        'MS Virginia',
        'Serial Entrepreneur',
        'Ex Walmart, P&G, SAP & TEG',
        '25+ years experience',
      ],
    },
    {
      name: 'Ashish Sharnagat',
      role: 'Strategy & Marketing',
      initials: 'AS',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Retail & consumer business expert',
        'ISB alumni',
        'Ex Reliance, Shoppers Stop & Landmark',
        '20+ years experience',
      ],
    },
    {
      name: 'Sandeep S',
      role: 'Delivery and Client Relations',
      initials: 'SS',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Expert delivery & operations leader',
        'Ex Infosys',
        'MSRIT alumni',
        '20+ years experience',
      ],
    },
    {
      name: 'Bala Sundrasamy',
      role: 'Product & Design',
      initials: 'BS',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'Product development expert',
        'COEG alumni',
        'Software & Consulting head',
        '30+ years experience',
      ],
    },
    {
      name: 'Panjury V',
      role: 'Marketing Director',
      initials: 'PV',
      gradient: 'from-[#FF4F18] to-[#FF8A00]',
      highlights: [
        'B.E - Industrial engineering and Mngt',
        'MBA Marketing',
        'Passionate Entrepreneur',
      ],
    },
  ];

  return (
    <section className="bg-white dark:bg-[#121214] py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-center mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
            The people behind <span className="text-[#FF4F18]">Digitory</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Our team has spent real time on restaurant floors — not just behind computer screens.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white dark:bg-[#17171a] border border-zinc-200/60 dark:border-[#2a2a2e]/60 rounded-3xl p-8 shadow-[0_4px_15px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Profile Avatar with dynamic gradient */}
              <div className="relative mb-6 select-none shrink-0">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${member.gradient} flex items-center justify-center text-white text-3xl font-extrabold shadow-[0_8px_20px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-300`}>
                  {member.initials}
                </div>
                {/* Visual ring overlay */}
                <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-zinc-250/30 dark:border-zinc-800/40 group-hover:rotate-45 transition-transform duration-700" />
              </div>

              {/* Identity */}
              <div className="text-center w-full mb-6">
                <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white transition-colors duration-300">
                  {member.name}
                </h3>
                <span className="text-sm font-bold text-[#FF4F18] mt-1 block">
                  {member.role}
                </span>
              </div>

              {/* Bio Highlights Chips / List */}
              <div className="w-full flex-1 border-t border-zinc-100 dark:border-[#2a2a2e]/50 pt-5 mt-auto">
                <ul className="space-y-2.5 text-center">
                  {member.highlights.map((highlight, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-snug font-medium transition-colors duration-300"
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
