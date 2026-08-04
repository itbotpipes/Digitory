"use client";

import Link from "next/link";
import Image from "next/image";

const FOOTER_COLUMNS = [
  {
    title: "PLATFORM",
    links: ["Order Engine", "Kitchen Display", "Inventory Control", "Owner Dashboard", "Multi-Outlet"]
  },
  {
    title: "FOR",
    links: ["Breweries & Pubs", "QSR Chains", "Fine Dining", "Cloud Kitchens", "Multi-Outlet Groups"]
  },
  {
    title: "COMPANY",
    links: ["About", "Blog", "Solutions", "Contact"]
  },
  {
    title: "CONTACT",
    links: ["Book a Demo", "info@digitory.com", "+91 70225 11122"]
  }
];

export default function FooterPage() {
  return (
    <footer className="bg-[#0B0C0E] text-white pt-12 pb-6 font-sans antialiased border-t border-[#1F2124]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">

          {/* Logo & Description Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Digitory Logo"
                width={112}
                height={28}
                className="h-7 w-auto object-contain invert hue-rotate-180"
                priority
              />
            </div>

            <p className="text-[14px] text-[#888888] leading-relaxed max-w-[260px]">
              The operating system for modern restaurants. From chaos to clarity.
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/company/digitory-solutions/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#161719] hover:bg-[#202225] border border-zinc-800/80 rounded-xl flex items-center justify-center text-[#888888] hover:text-white transition-colors cursor-pointer select-none"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/DigitoryS"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#161719] hover:bg-[#202225] border border-zinc-800/80 rounded-xl flex items-center justify-center text-[#888888] hover:text-white transition-colors cursor-pointer select-none"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/dinewithdigitory/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#161719] hover:bg-[#202225] border border-zinc-800/80 rounded-xl flex items-center justify-center text-[#888888] hover:text-white transition-colors cursor-pointer select-none"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-[11px] font-extrabold tracking-widest text-[#FFFFFF] uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => {
                    const isEmail = link.includes("@");
                    const isPhone = link.startsWith("+");
                    const hrefMap: Record<string, string> = {
                      "About": "/about",
                      "Blog": "/blog",
                      "Solutions": "/solutions",
                      "Contact": "/contact",
                      "Book a Demo": "/request-demo",
                    };

                    if (hrefMap[link]) {
                      return (
                        <li key={link}>
                          <Link
                            href={hrefMap[link]}
                            className="text-[14px] font-semibold text-[#888888] hover:text-white transition-colors block py-0.5"
                          >
                            {link}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={link}>
                        <a
                          href={isEmail ? `mailto:${link}` : isPhone ? `tel:${link.replace(/\s+/g, "")}` : "#"}
                          className="text-[14px] font-semibold text-[#888888] hover:text-white transition-colors block py-0.5"
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-[#1F2124]/70 pt-8 mt-16 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-[#666666] font-medium">
            © 2026 Digitory. All rights reserved.
          </p>
          <div className="flex gap-4 text-[13px] text-[#666666] font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
