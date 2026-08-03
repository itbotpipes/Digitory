'use client';

import React, { useEffect } from 'react';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';
import ScrollFocusWrapper from '../../components/ScrollFocusWrapper';

import AboutHero from '../../components/about/AboutHero';
import ProblemsSection from '../../components/about/ProblemsSection';
import StorySection from '../../components/about/StorySection';
import LiveQueueSection from '../../components/about/LiveQueueSection';
import BeliefsSection from '../../components/about/BeliefsSection';
import TeamSection from '../../components/about/TeamSection';
import MissionCta from '../../components/about/MissionCta';

export default function AboutPage() {
  // Set document title in client component matching other pages
  useEffect(() => {
    document.title = 'About Us - Digitory';
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Page Content */}
      <main className="flex flex-col flex-1">
        <ScrollFocusWrapper>
          <AboutHero />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <ProblemsSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <StorySection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <LiveQueueSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <BeliefsSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <TeamSection />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <MissionCta />
        </ScrollFocusWrapper>
      </main>

      {/* Page Footer */}
      <FooterPage />
    </div>
  );
}
