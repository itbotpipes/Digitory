import React from 'react';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';
import ScrollFocusWrapper from '../../components/ScrollFocusWrapper';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'solutions', {
    title: 'Solutions | Digitory',
    description: 'Explore our restaurant operating system solutions.',
  });
}

import RestaurantOSHero from '../../components/solutions/RestaurantOSHero';
import RadialCommandCenter from '../../components/solutions/RadialCommandCenter';
import Capabilities from '../../components/solutions/Capabilities';
import ChainControlDeck from '../../components/solutions/ChainControlDeck';
import RestaurantTypes from '../../components/solutions/RestaurantTypes';
import RoiCalculator from '../../components/solutions/RoiCalculator';
import ToolIntegrations from '../../components/solutions/ToolIntegrations';
import SolutionsCta from '../../components/solutions/SolutionsCta';

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col">
        <ScrollFocusWrapper>
          <RestaurantOSHero />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <RadialCommandCenter />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <Capabilities />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <ChainControlDeck />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <RestaurantTypes />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <RoiCalculator />
        </ScrollFocusWrapper>

        <ScrollFocusWrapper>
          <ToolIntegrations />
        </ScrollFocusWrapper>

        {/* <ScrollFocusWrapper>
          <SolutionsCta />
        </ScrollFocusWrapper> */}
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
