import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Download, Check, FileText, ChevronRight, ShieldCheck } from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';
import { usePWA } from '../hooks/usePWA';
import { openLegalModal } from './LegalPrivacyModal';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isInstalled, installPwa } = usePWA();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: '7 Ejes 2027–2030', href: '#propuestas' },
    { name: 'Matriz & 80-10-10', href: '#matriz-estrategica' },
    { name: 'Buzón Territorial', href: '#buzon' },
    { name: 'Voluntarios & Credencial', href: '#voluntarios' },
    { name: 'Proyectos Insignia', href: '#ibague' },
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

            {/* Solo Icono JP, JOHN POLO y Vigencia */}
            <a
              href="#inicio"
              onClick={handleLinkClick}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-1"
            >
              <div className="relative">
                <img
                  src={CAMPAIGN_INFO.images.logo}
                  alt="Logo John Polo Concejo de Ibagué 2027-2030"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full border-2 border-red-600 shadow-sm group-hover:scale-105 transition-transform bg-white"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-600"></span>
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl md:text-2xl text-red-700 tracking-tight leading-none group-hover:text-red-600 transition-colors">
                  JOHN POLO
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    Concejo Ibagué
                  </span>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                    2027–2030
                  </span>
                </div>
              </div>
            </a>

            {/* Botón de Apertura del Drawer (Todas las opciones adentro) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-red-700 bg-slate-100 hover:bg-red-50 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-bold text-sm"
              aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              aria-expanded={isOpen}
              aria-controls="main-navigation-drawer"
            >
              <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wider">
                Menú
              </span>
              {isOpen ? <X className="w-6 h-6 text-red-700" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Drawer Lateral / Desplegable con Navegación, PDF, Descargar App y WhatsApp */}
        {isOpen && (
          <div className="fixed inset-0 top-[86px] z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
            {/* Click fuera para cerrar */}
            <div className="flex-1" onClick={handleLinkClick} />

            <div
              id="main-navigation-drawer"
              role="dialog"
              aria-label="Menú principal de navegación"
              className="w-full max-w-sm bg-white h-[calc(100vh-86px)] shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto p-5 animate-in slide-in-from-right duration-200"
            >
              <div className="space-y-4">
                {/* Resumen superior del Drawer */}
                <div className="p-3.5 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-extrabold text-red-900">{CAMPAIGN_INFO.candidateFullName}</p>
                    <p className="text-[11px] text-red-700">{CAMPAIGN_INFO.campaignTitle}</p>
                  </div>
                  <span className="inline-flex items-center text-[10px] font-black bg-red-700 text-white px-2.5 py-1 rounded-full shrink-0">
                    Liberal
                  </span>
                </div>

                {/* Enlaces de Navegación */}
                <nav className="space-y-1">
                  <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Secciones de la Plataforma
                  </p>
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 hover:text-red-700 hover:bg-red-50/70 transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Acciones y Herramientas dentro del Drawer */}
              <div className="pt-4 mt-4 border-t border-slate-200 space-y-2.5">
                <p className="px-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Herramientas & Contacto Directo
                </p>

                {/* Botón PDF Documento Maestro */}
                <a
                  href={CAMPAIGN_INFO.masterDocPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Documento Maestro 2027-2030 (PDF)</span>
                </a>

                {/* Botón Descargar / Instalar App (PWA) */}
                {!isInstalled ? (
                  <button
                    onClick={() => {
                      installPwa();
                      handleLinkClick();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
                  >
                    <Download className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Instalar App en tu Celular</span>
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                    <Check className="w-4 h-4" />
                    <span>App Oficial Instalada</span>
                  </div>
                )}

                {/* Botón WhatsApp Directo */}
                <a
                  href={whatsAppGeneralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                  <span>Escríbele a John por WhatsApp</span>
                </a>

                {/* Botón Centro de Privacidad, Habeas Data y Borrar Mis Datos */}
                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    openLegalModal('privacidad');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-slate-600 hover:text-red-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Privacidad (Ley 1581) & Borrar Mis Datos</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
