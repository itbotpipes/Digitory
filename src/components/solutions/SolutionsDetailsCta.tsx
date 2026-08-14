import React from 'react';
import Link from 'next/link';

interface SolutionsDetailsCtaProps {
  title?: string;
  desc?: string;
}

export default function CtaSection({ title, desc }: SolutionsDetailsCtaProps) {
  return (
    <section className="w-full bg-white dark:bg-[#0d0d0e] pt-8 md:pt-12 pb-16 md:pb-24 transition-colors duration-300 text-center">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col items-center">
        {/* Mascot Image at Top */}
        <div className="relative w-56 h-56 mb-8 select-none">
          <img
            src="/mascot_new.png"
            alt="Digitory Mascot"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Two-line Badge Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-[850] tracking-tight leading-[1.25] text-[#111111] dark:text-white max-w-5xl mb-8">
          Still facing <span className="text-[#FF4F18]">issues</span> in your restaurant?
          <br />
          <span className="block mt-4">
            Try our <span className="text-[#FF4F18]">smart</span> and <span className="text-[#FF4F18]">free</span> Demo
          </span>
        </h2>

        {/* CTA Button */}
        <Link
          href="/request-demo"
          className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
        >
          Book a Demo &rarr;
        </Link>

      </div>
    </section>
  );
}
