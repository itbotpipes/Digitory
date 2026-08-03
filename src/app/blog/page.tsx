'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import BlogHero from '../../components/blog/BlogHero';
import LatestStories from '../../components/blog/LatestStories';
import FooterPage from '../../components/Footer';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full text-zinc-900 dark:text-zinc-100">
        <BlogHero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <LatestStories
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
