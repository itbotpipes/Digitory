'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
}

const mainArticle: Article = {
  id: 'main-1',
  slug: 'kitchen-automation-how-to-future-proof-restaurant-backends',
  title: 'Kitchen Automation: How to Future-Proof Restaurant Backends',
  date: 'July 8, 2026',
  image: '/Kitchen Automation.jpg',
  category: 'Kitchen',
};

const topSideArticles: Article[] = [
  {
    id: 'side-1',
    slug: 'data-driven-kitchen-operations',
    title: 'Data-Driven Kitchen Operations: From Insights to Efficiency',
    date: 'July 18, 2026',
    image: '/data_driven.jpg',
    category: 'Kitchen',
  },
  {
    id: 'side-2',
    slug: 'ai-powered-forecasting-reducing-food-waste',
    title: 'AI-Powered Forecasting: Reducing Food Waste with Predictive Analytics',
    date: 'June 12, 2026',
    image: '/ai_driven_forecasting.jpg',
    category: 'Analytics',
  },
];

const mediumGridArticles: Article[] = [
  {
    id: 'med-1',
    slug: 'dynamic-pricing-for-fb',
    title: 'Dynamic Pricing for F&B: What It Is and How to Implement It',
    date: 'May 28, 2026',
    image: '/Dynamic Pricing.jpg',
    category: 'Restaurant Operations',
  },
  {
    id: 'med-2',
    slug: 'how-ai-is-transforming-menu-strategy',
    title: 'How AI Is Transforming Menu Strategy for Modern Restaurants',
    date: 'April 28, 2026',
    image: '/AI is Transforming.jpg',
    category: 'Analytics',
  },
  {
    id: 'med-3',
    slug: 'smart-qr-menus',
    title: 'Smart QR Menus: Dynamic Pricing, Upsell Automation & Allergy Filters | Automated Inventory Management Software',
    date: 'April 21, 2026',
    image: '/Smart QR Menus.jpg',
    category: 'Restaurant Operations',
  },
  {
    id: 'med-4',
    slug: 'ai-and-automation-in-fb',
    title: 'AI & Automation in F&B: Menu Engineering, Predictive Ordering & Dynamic Pricing with Automated Inventory Management Software',
    date: 'April 5, 2026',
    image: '/AI & Automation in F&B.jpg',
    category: 'Inventory',
  },
];

const smallGridArticles: Article[] = [
  {
    id: 'sm-1',
    slug: 'why-smart-restaurants-are-reducing-staff-dependency',
    title: 'Why Smart Restaurants Are Reducing Staff Dependency, Not Just Managing Shifts',
    date: 'March 5, 2026',
    image: '/Why Smart Restaurants.jpg',
    category: 'Restaurant Operations',
  },
  {
    id: 'sm-2',
    slug: 'smart-kitchens-and-central-kitchens',
    title: "Smart Kitchens and Central Kitchens: How India's Top F&B Brands Scale in 2025",
    date: 'March 3, 2026',
    image: '/Smart Kitchens and Central Kitchens.jpg',
    category: 'Kitchen',
  },
  {
    id: 'sm-3',
    slug: 'how-smart-menu-engineering-boosts-profits',
    title: 'How Smart Menu Engineering Boosts Restaurant Profits by 15–25%',
    date: 'January 19, 2026',
    image: '/How Smart Menu.jpg',
    category: 'Analytics',
  },
  {
    id: 'sm-4',
    slug: 'beyond-points-native-crm-loyalty-strategies',
    title: 'Beyond Points: Native CRM & Loyalty Strategies for F&B Growth',
    date: 'January 19, 2026',
    image: '/Beyond Point.jpg',
    category: 'Restaurant Operations',
  },
  {
    id: 'sm-5',
    slug: 'how-to-manage-and-scale-a-microbrewery-in-india',
    title: 'How to Manage and Scale a Microbrewery in India: The Secret Ingredient Behind the Best Brands',
    date: 'January 19, 2026',
    image: '/How to Manage and Scale a Microbrewery in India.jpg',
    category: 'Restaurant Operations',
  },
  {
    id: 'sm-6',
    slug: 'how-restaurants-bars-and-breweries-can-slash-wastage',
    title: 'How Restaurants, Bars, and Breweries Can Slash Wastage and Unlock Growth Margins in 2025',
    date: 'January 15, 2026',
    image: '/How Restaurants, Bars.jpg',
    category: 'Inventory',
  },
];

interface LatestStoriesProps {
  selectedCategory?: string;
  searchQuery?: string;
}

export default function LatestStories({
  selectedCategory = 'All Articles',
  searchQuery = '',
}: LatestStoriesProps) {
  const [visibleCount, setVisibleCount] = useState(12);

  const allStories = [
    mainArticle,
    ...topSideArticles,
    ...mediumGridArticles,
    ...smallGridArticles,
  ];

  const matchesFilter = (article: Article) => {
    const matchesCategory =
      selectedCategory === 'All Articles' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All Articles';
  const filteredStories = allStories.filter(matchesFilter);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Section Header: Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div>
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-widest text-[#FF4F18] block mb-2">
            Blog & Articles
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] dark:text-white leading-[1.15]">
            Latest <span className="text-[#FF4F18]">Stories</span>
          </h2>
        </div>
      </div>

      {/* Filtered Results */}
      {isFiltering ? (
        <div>
          {filteredStories.length === 0 ? (
            <div className="text-center py-16 text-zinc-500 dark:text-zinc-400 font-semibold">
              No stories found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.slice(0, visibleCount).map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] bg-zinc-100 dark:bg-zinc-900 mb-4 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
                    <Image
                      src={encodeURI(article.image)}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-base font-extrabold leading-snug text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-auto">
                    {article.date}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Default Layout matching exact reference image */
        <div className="space-y-12 md:space-y-16">
          {/* Row 1: 3 Equal Top Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <Link
              href={`/blog/${mainArticle.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] bg-zinc-100 dark:bg-zinc-900 mb-4 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
                <Image
                  src={encodeURI(mainArticle.image)}
                  alt={mainArticle.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                  priority
                />
              </div>
              <h3 className="text-base font-extrabold leading-snug text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors mb-2">
                {mainArticle.title}
              </h3>
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-auto">
                {mainArticle.date}
              </p>
            </Link>

            {/* Top Side Articles */}
            {topSideArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] bg-zinc-100 dark:bg-zinc-900 mb-4 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
                  <Image
                    src={encodeURI(article.image)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-extrabold leading-snug text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-auto">
                  {article.date}
                </p>
              </Link>
            ))}
          </div>

          {/* Row 2 & 3: Medium Cards (2 per row grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {mediumGridArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-16/9 w-full overflow-hidden rounded-[24px] bg-zinc-100 dark:bg-zinc-900 mb-4 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
                  <Image
                    src={encodeURI(article.image)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-extrabold leading-snug text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-zinc-400 dark:text-zinc-500">
                  {article.date}
                </p>
              </Link>
            ))}
          </div>

          {/* Row 4 & 5: Small Cards (3 per row grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8">
            {smallGridArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] bg-zinc-100 dark:bg-zinc-900 mb-4 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
                  <Image
                    src={encodeURI(article.image)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-extrabold leading-snug text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                  {article.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Load More Button */}
      <div className="pt-12 md:pt-16 flex justify-center">
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 6)}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF4F18] text-sm font-bold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
        >
          <span>Load More Stories</span>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
