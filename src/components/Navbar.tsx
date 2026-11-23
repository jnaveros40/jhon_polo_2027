import React, { useState } from 'react';
import { Menu, X, MessageCircle, Download, Check, FileText } from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';
import { usePWA } from '../hooks/usePWA';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isInstalled, installPwa } = usePWA();

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: '7 Ejes 2027-2030', href: '#propuestas' },
    { name: 'Matriz & 80-10-10', href: '#matriz-estrategica' },
    { name: 'Buzón Territorial', href: '#buzon' },
    { name: 'Voluntarios', href: '#voluntarios' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const whatsAppGeneralLink = buildWhatsAppUrl(
    `¡Hola John Fredy Polo! Vi tu plataforma oficial "Ibagué Sostenible, Industrial, Segura y Conectada" para el Concejo 2027-2030 y quiero sumarme.`
  );

  return (
    <>
      {/* Barra Tricolor Bandera de Ibagué (Amarillo, Verde, Rojo) */}
      <div className="h-1.5 w-full flag-gradient fixed top-0 left-0 z-50 shadow-sm" />

      <header className="sticky top-1.5 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Emblema Oficial JP y Nombre de Candidato */}
            <a href="#inicio" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-1">
              <div className="relative">
                <img
                  src={CAMPAIGN_INFO.images.logo}
                  alt="Logo John Fredy Polo Campos Concejo de Ibagué 2027-2030"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full border-2 border-red-600 shadow-sm group-hover:scale-105 transition-transform bg-white"
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
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    Concejo Ibagué
                  </span>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-red-200">
                    2027–2030
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-red-700 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full ml-0.5 shadow-xs">
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
                  className="px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold text-slate-700 hover:text-red-700 hover:bg-red-50/80 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions (PDF + PWA + WhatsApp) */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={CAMPAIGN_INFO.masterDocPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all"
                title="Ver Documento Maestro Concejo 2027-2030 (PDF)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF 2027-2030</span>
              </a>

              {!isInstalled && (
                <button
                  onClick={installPwa}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all shadow-sm"
                  title="Instalar como aplicación en tu dispositivo"
                >
                  <Download className="w-3.5 h-3.5 text-red-600 animate-bounce" />
                  <span>App</span>
                </button>
              )}

              {isInstalled && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  Instalada
                </span>
              )}

              <a
                href={whatsAppGeneralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow transition-all group"
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
                  <p className="text-xs font-bold text-red-900">{CAMPAIGN_INFO.candidateFullName}</p>
                  <p className="text-[11px] text-red-700">{CAMPAIGN_INFO.campaignTitle} • {CAMPAIGN_INFO.programName}</p>
                </div>
                <span className="inline-flex items-center text-[10px] font-bold bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-full shrink-0">
                  7 Ejes
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
                  href={CAMPAIGN_INFO.masterDocPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-red-700 bg-red-50 border border-red-200"
                  onClick={handleLinkClick}
                >
                  <FileText className="w-4 h-4" />
                  <span>Descargar Documento Maestro 2027-2030 (PDF)</span>
                </a>

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
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
