import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, PhoneCall } from 'lucide-react';

interface CtaSectionProps {
  title?: string;
  desc?: string;
}

export default function CtaSection({ title, desc }: CtaSectionProps) {
  // Parse title to make the last words orange (e.g. "Not the chaos.") if it matches the reference style,
  // or fall back to a default styled heading.
  const displayTitle = title || 'Run your restaurant. Not the chaos.';
  const displayDesc = desc || 'See how Digitory brings your orders, kitchen, inventory and insights together in one simple system.';

  // Highlight words wrapped in asterisks (e.g. "Ready to simplify *your restaurant operations*?")
  const renderTitle = () => {
    if (!displayTitle) return null;
    const parts = displayTitle.split(/(\*[^*]+\*)/g);
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
  };

  return (
    <section className="w-full bg-white dark:bg-[#0a0a0b] py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Copy & Action */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left flex flex-col justify-center items-start">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-zinc-900 dark:text-white text-left">
              {renderTitle()}
            </h2>

            {/* Description */}
            <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl text-left">
              {displayDesc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FF4F18] hover:bg-[#E03F0D] text-white px-7 py-3.5 text-[15px] font-semibold transition-all duration-200 shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer text-center"
              >
                <Calendar size={18} strokeWidth={2.5} />
                Book a Free Demo &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-zinc-300 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white px-7 py-3.5 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer text-center"
              >
                <PhoneCall size={18} />
                Talk to an Expert ↗
              </Link>
            </div>

            {/* Social Proof Social Indicators */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-900 w-full justify-start">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Customer Avatar"
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 object-cover"
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Trusted by 100+ outlets across India
              </span>
            </div>
          </div>

          {/* Right Column - Mockup image */}
          <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
            <div 
              className="relative w-full max-w-[540px] rounded-[18px] md:rounded-[24px] overflow-hidden transition-all duration-500 hover:-translate-y-1 group/mockup"
              style={{ filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.06))' }}
            >
              <img
                src="/digicta-white.png"
                alt="Digitory Dashboard Mockup"
                className="w-full h-auto block dark:hidden transition-transform duration-700 scale-[1.03] object-cover"
              />
              <img
                src="/digicta-black.png"
                alt="Digitory Dashboard Mockup"
                className="w-full h-auto hidden dark:block transition-transform duration-700 scale-[1.03] object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
