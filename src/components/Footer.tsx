import React from 'react';
import {
  Heart,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook
} from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';
import { CaballoLiberal } from './CaballoLiberal';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">

      {/* Borde tricolor de Ibagué */}
      <div className="h-2 w-full flag-gradient absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">

          {/* Columna 1: Identidad del Candidato */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={CAMPAIGN_INFO.images.logo}
                alt="Logo JP John Polo"
                className="w-12 h-12 rounded-full border border-yellow-400 bg-white p-0.5 object-contain"
              />
              <div>
                <span className="font-display font-black text-2xl text-white tracking-tight">
                  JOHN POLO
                </span>
                <p className="text-xs font-extrabold uppercase text-yellow-400 tracking-wider">
                  Concejo de Ibagué 2027
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {CAMPAIGN_INFO.bioSummary}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-yellow-400 font-bold">
                #IbaguéSuenaMásFuerte
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                #EsHoraDeCreer
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-red-400 font-bold">
                #13Comunas
              </span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-display font-extrabold uppercase tracking-wider text-white">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-medium">
              <li>
                <a href="#inicio" className="hover:text-yellow-400 transition-colors">
                  • Inicio & Manifiesto
                </a>
              </li>
              <li>
                <a href="#propuestas" className="hover:text-yellow-400 transition-colors">
                  • Las 3 Grandes Apuestas
                </a>
              </li>
              <li>
                <a href="#buzon" className="hover:text-yellow-400 transition-colors">
                  • Reporta tu Comuna
                </a>
              </li>
              <li>
                <a href="#voluntarios" className="hover:text-yellow-400 transition-colors">
                  • Tarjeta Digital de Apoyo
                </a>
              </li>
              <li>
                <a href="#ibague" className="hover:text-yellow-400 transition-colors">
                  • Orgullo & Identidad Ibaguereña
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto & Redes Oficiales */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-display font-extrabold uppercase tracking-wider text-white">
              Conéctate con la Campaña
            </h4>

            <p className="text-xs text-slate-400">
              Sigue el recorrido barrio a barrio y participa activamente en nuestras redes oficiales:
            </p>

            <div className="flex items-center gap-3">
              <a
                href={CAMPAIGN_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-500 hover:border-pink-500/50 transition-all"
                aria-label="Instagram de John Polo"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={CAMPAIGN_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:border-blue-500/50 transition-all"
                aria-label="Facebook de John Polo"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href={buildWhatsAppUrl("¡Hola John Polo! Quiero conversar sobre el Concejo de Ibagué 2027.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                aria-label="WhatsApp Oficial"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span className="block font-bold text-white mb-0.5">Sede & Territorio:</span>
              <p className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Ibagué, Tolima - Colombia</span>
              </p>
            </div>
          </div>

        </div>

        {/* Aval Oficial Partido Liberal Colombiano con Caballo Animado */}
        <div className="my-8 p-5 sm:p-6 rounded-3xl bg-slate-900 border border-red-800/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <CaballoLiberal size="sm" animated={true} />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 text-[10px] font-black uppercase tracking-wider mb-1">
                <span>Aval Oficial</span>
              </div>
              <h5 className="text-base sm:text-lg font-display font-black text-white">
                Partido Liberal Colombiano • John Polo al Concejo 2027
              </h5>
              <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                Liderazgo con vocación social, impulso al primer empleo para los jóvenes y control riguroso a los servicios públicos de Ibagué.
              </p>
            </div>
          </div>
          <a
            href="#voluntarios"
            className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-display font-bold text-xs rounded-xl shadow-brand transition-all shrink-0 active:scale-95"
          >
            Sumarme al Movimiento
          </a>
        </div>

        {/* Aviso Legal & Créditos */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <div>
            <p className="font-semibold text-slate-400">
              © 2026 - 2027 Plataforma Oficial John Polo al Concejo de Ibagué.
            </p>
            <p className="text-[11px] mt-0.5 text-slate-500">
              Material informativo de precampaña y participación ciudadana rumbo a las Elecciones Regionales 2027.
            </p>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 inline" />
            <span>por Ibaguereños para Ibagué</span>
          </div>
        </div>

      </div>
    </footer>
  );
};