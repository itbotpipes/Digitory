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
    links: ["About", "Blog", "Careers", "Partnership"]
  },
  {
    title: "CONTACT",
    links: ["Book a Demo", "hello@digitory.in", "+91 95350 XXXXX"]
  }
];

export default function FooterPage() {
  return (
    <footer className="bg-[#0B0C0E] text-white pt-12 pb-6 font-sans antialiased border-t border-[#1F2124]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">

          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <Link href="/" className="relative w-36 h-10 md:w-44 md:h-12 overflow-hidden flex items-center justify-center">
                <Image
                  src="/Digitory-03.png"
                  alt="Digitory Logo"
                  width={400}
                  height={400}
                  className="w-36 h-36 md:w-44 md:h-44 object-contain shrink-0"
                  priority
                />
              </Link>
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
                className="w-9 h-9 bg-[#161719] hover:bg-[#202225] border border-zinc-800/80 rounded-xl flex items-center justify-center text-[#888888] hover:text-white text-[13px] font-bold transition-colors cursor-pointer select-none"
              >
                in
              </a>
              <a
                href="https://twitter.com/dinewithdigitory"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#161719] hover:bg-[#202225] border border-zinc-800/80 rounded-xl flex items-center justify-center text-[#888888] hover:text-white text-[13px] font-bold transition-colors cursor-pointer select-none"
              >
                tw
              </a>
              <a
                href="https://www.instagram.com/dinewithdigitory/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#161719] hover:bg-[#202225] border border-zinc-800/80 rounded-xl flex items-center justify-center text-[#888888] hover:text-white text-[13px] font-bold transition-colors cursor-pointer select-none"
              >
                ig
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
                      "Careers": "#",
                      "Partnership": "#",
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
            © 2026 Digitory. All Rights Reserved.
          </p>
          <div className="flex gap-1.5 text-[13px] text-[#666666] font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
