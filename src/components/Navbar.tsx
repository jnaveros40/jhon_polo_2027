import React, { useState } from 'react';
import { Menu, X, MessageCircle, Download, Check } from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';
import { usePWA } from '../hooks/usePWA';
import { CaballoLiberal } from './CaballoLiberal';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isInstalled, installPwa } = usePWA();

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Propuestas 2027', href: '#propuestas' },
    { name: 'Buzón Comunas', href: '#buzon' },
    { name: 'Voluntarios', href: '#voluntarios' },
    { name: 'Orgullo Ibagué', href: '#ibague' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const whatsAppGeneralLink = buildWhatsAppUrl(
    `¡Hola John Polo! Vi tu plataforma oficial para el Concejo de Ibagué 2027 y quiero sumarme a que Ibagué suene más fuerte.`
  );

  return (
    <>
      {/* Barra Tricolor Bandera de Ibagué (Amarillo, Verde, Rojo) */}
      <div className="h-1.5 w-full flag-gradient fixed top-0 left-0 z-50 shadow-sm" />

      <header className="sticky top-1.5 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Emblema y Nombre de Candidato */}
            <a href="#inicio" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-1">
              <div className="relative">
                <img
                  src={CAMPAIGN_INFO.images.logo}
                  alt="Logo John Polo Concejo de Ibagué 2027"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full border-2 border-red-600 shadow-sm group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    // Fallback visual si la imagen tarda en cargar
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-12 h-12 bg-red-600 text-white font-extrabold flex items-center justify-center rounded-full text-lg shadow-sm';
                      fallback.innerText = 'JP';
                      parent.appendChild(fallback);
                    }
                  }}
                />
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-600"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl md:text-2xl text-red-700 tracking-tight leading-none group-hover:text-red-600 transition-colors">
                    JOHN POLO
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    Concejo de Ibagué
                  </span>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-red-200">
                    2027
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-red-700 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full ml-1 shadow-xs">
                    Liberal
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-red-700 hover:bg-red-50/80 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions (PWA + WhatsApp + Partido Liberal) */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Sello Partido Liberal */}
              <div 
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50/80 rounded-xl border border-red-200 shadow-xs cursor-pointer hover:bg-red-100 transition-colors"
                title="Aval Oficial: Partido Liberal Colombiano"
              >
                <CaballoLiberal size="xs" animated={true} interactive={false} />
                <span className="text-xs font-black text-red-700 uppercase tracking-wider">
                  Partido Liberal
                </span>
              </div>
              {/* Botón PWA si no está instalada */}
              {!isInstalled && (
                <button
                  onClick={installPwa}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all shadow-sm"
                  title="Instalar como aplicación en tu dispositivo"
                >
                  <Download className="w-3.5 h-3.5 text-red-600 animate-bounce" />
                  <span>Instalar App</span>
                </button>
              )}

              {isInstalled && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  App Instalada
                </span>
              )}

              {/* Botón WhatsApp */}
              <a
                href={whatsAppGeneralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow transition-all group"
              >
                <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Escríbele a John</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {!isInstalled && (
                <button
                  onClick={installPwa}
                  className="p-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-200"
                  aria-label="Instalar App"
                >
                  <Download className="w-4 h-4 text-red-600" />
                  <span className="hidden xs:inline">App</span>
                </button>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Menú principal"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-red-900">Ibagué merece sonar más fuerte</p>
                  <p className="text-[11px] text-red-700">Concejo de Ibagué 2027</p>
                </div>
                <span className="inline-flex items-center text-xs font-bold bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-full">
                  #EsHoraDeCreer
                </span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:text-red-700 hover:bg-slate-50 transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="text-slate-400 text-xs">→</span>
                </a>
              ))}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href={whatsAppGeneralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                  onClick={handleLinkClick}
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chatea directo por WhatsApp</span>
                </a>

                {!isInstalled && (
                  <button
                    onClick={() => {
                      installPwa();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300"
                  >
                    <Download className="w-4 h-4 text-red-600" />
                    <span>Instalar App en el Celular (Gratis)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};