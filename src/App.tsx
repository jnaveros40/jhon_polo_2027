import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { CitizenMailbox } from './components/CitizenMailbox';
import { VolunteersSection } from './components/VolunteersSection';
import { IbagueHighlights } from './components/IbagueHighlights';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { Footer } from './components/Footer';
import { LegalPrivacyModal } from './components/LegalPrivacyModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { JohnPoloAIChat } from './components/JohnPoloAIChat';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Enlace de salto por teclado para accesibilidad (WCAG 2.1 AA / NTC 5854 - Punto 9) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-slate-950 focus:text-yellow-400 focus:font-display focus:font-extrabold focus:text-xs focus:shadow-2xl focus:border-2 focus:border-yellow-400"
      >
        Saltar al contenido principal
      </a>

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <HeroSection />
        <PillarsSection />
        <CitizenMailbox />
        <VolunteersSection />
        <IbagueHighlights />
      </main>

      {/* Floating PWA Install Prompt for Mobile Devices */}
      <PwaInstallBanner />

      {/* Interactive AI Assistant with explicit AI Disclosure (Punto 20) */}
      <JohnPoloAIChat />

      {/* Cookie & LocalStorage Consent Banner (Punto 12) */}
      <CookieConsentBanner />

      {/* Legal, Privacy (Ley 1581/2012) & Data Deletion Modal (Puntos 1, 3, 6, 8, 10) */}
      <LegalPrivacyModal />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
};

export default App;
