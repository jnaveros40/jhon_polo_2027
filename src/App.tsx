import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { CitizenMailbox } from './components/CitizenMailbox';
import { VolunteersSection } from './components/VolunteersSection';
import { IbagueHighlights } from './components/IbagueHighlights';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <PillarsSection />
        <CitizenMailbox />
        <VolunteersSection />
        <IbagueHighlights />
      </main>

      {/* Floating PWA Install Prompt for Mobile Devices */}
      <PwaInstallBanner />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
};

export default App;

