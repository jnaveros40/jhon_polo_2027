import React from 'react';
import {
  Heart,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  FileText,
  ShieldCheck,
  Scale,
  Trash2
} from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';
import { CaballoLiberal } from './CaballoLiberal';
import { openLegalModal } from './LegalPrivacyModal';

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
                alt="Logo JP John Fredy Polo Campos"
                className="w-12 h-12 rounded-full border border-yellow-400 bg-white p-0.5 object-contain"
              />
              <div>
                <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight block leading-none">
                  {CAMPAIGN_INFO.candidateFullName.toUpperCase()}
                </span>
                <p className="text-xs font-extrabold uppercase text-yellow-400 tracking-wider mt-1">
                  {CAMPAIGN_INFO.campaignTitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {CAMPAIGN_INFO.bioSummary}
            </p>

            <p className="text-xs font-display font-bold text-yellow-300 italic">
              “{CAMPAIGN_INFO.closingMasterQuote}”
            </p>

            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-yellow-400 font-bold">
                #IbaguéSuenaMásFuerte
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                #7EjesEstratégicos
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-red-400 font-bold">
                #Esquema801010
              </span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-display font-extrabold uppercase tracking-wider text-white">
              Plataforma 2027 – 2030
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-medium">
              <li>
                <a href="#inicio" className="hover:text-yellow-400 transition-colors">
                  • Inicio & Manifiesto
                </a>
              </li>
              <li>
                <a href="#propuestas" className="hover:text-yellow-400 transition-colors">
                  • Los 7 Ejes Estratégicos
                </a>
              </li>
              <li>
                <a href="#matriz-estrategica" className="hover:text-yellow-400 transition-colors">
                  • Matriz de Síntesis Estratégica
                </a>
              </li>
              <li>
                <a href="#ingenieria-financiera" className="hover:text-yellow-400 transition-colors">
                  • Ingeniería Financiera 80-10-10
                </a>
              </li>
              <li>
                <a href="#buzon" className="hover:text-yellow-400 transition-colors">
                  • Mapa de 13 Comunas y 144 Veredas
                </a>
              </li>
              <li>
                <a
                  href={CAMPAIGN_INFO.masterDocPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 font-bold inline-flex items-center gap-1 pt-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Descargar Documento Maestro (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto & Redes Oficiales */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-display font-extrabold uppercase tracking-wider text-white">
              Conéctate con John Fredy Polo
            </h4>

            <p className="text-xs text-slate-400">
              Sigue el trabajo técnico y territorial en las 13 comunas, 17 corregimientos y 144 veredas:
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
                href={buildWhatsAppUrl("¡Hola John Fredy Polo! Quiero conversar sobre el Documento Maestro Concejo de Ibagué 2027-2030.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                aria-label="WhatsApp Oficial"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span className="block font-bold text-white mb-0.5">Cobertura Territorial:</span>
              <p className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Ibagué, Tolima (13 Comunas • 17 Corregimientos • 144 Veredas)</span>
              </p>
            </div>
          </div>

        </div>

        {/* Aval Oficial Partido Liberal Colombiano con Caballo Galopando y Bandera de Ibagué */}
        <div className="my-8 p-5 sm:p-6 rounded-3xl bg-slate-900 border border-red-800/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="shrink-0">
              <CaballoLiberal size="md" variant="sello" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 text-[10px] font-black uppercase tracking-wider mb-1">
                <span>Aval Oficial • Partido Liberal Colombiano</span>
              </div>
              <h5 className="text-base sm:text-lg font-display font-black text-white">
                {CAMPAIGN_INFO.candidateFullName} • {CAMPAIGN_INFO.campaignTitle}
              </h5>
              <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                Plataforma «{CAMPAIGN_INFO.programName}» — Desarrollo a Escala Humana (Max-Neef), Capacidades (Sen) y Estado Emprendedor (Mazzucato).
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

        {/* Ficha de Identificación del Responsable Legal, Habeas Data y Transparencia Electoral (Puntos 1, 3, 6, 8, 10, 12) */}
        <div className="my-6 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs text-slate-400">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Identificación del Responsable y Cumplimiento Normativo (República de Colombia)</span>
              </span>
              <p className="text-slate-300 font-semibold">
                Responsable del Sitio y del Tratamiento de Datos: <strong className="text-white">{CAMPAIGN_INFO.candidateFullName}</strong> • Aval: <strong className="text-white">{CAMPAIGN_INFO.party.name}</strong> ({CAMPAIGN_INFO.campaignTitle}).
              </p>
              <p className="text-[11px] text-slate-400">
                Domicilio: Ibagué, Tolima, Colombia • Canal Oficial Habeas Data (Ley 1581 de 2012): WhatsApp +{CAMPAIGN_INFO.whatsappNumber} ({CAMPAIGN_INFO.phoneDisplay}) • Publicidad política programática conforme a la Ley 1475 de 2011 y lineamientos del CNE. Plataforma cívica gratuita (sin pagos en línea) exclusiva para mayores de 18 años.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => openLegalModal('terminos')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
              >
                Términos y Condiciones
              </button>
              <button
                type="button"
                onClick={() => openLegalModal('privacidad')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-400 font-bold text-xs border border-slate-700 flex items-center gap-1 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Política de Privacidad (Ley 1581)</span>
              </button>
              <button
                type="button"
                onClick={() => openLegalModal('responsable')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
              >
                Integraciones y Licencias
              </button>
              <button
                type="button"
                onClick={() => openLegalModal('borrar-datos')}
                className="px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-extrabold text-xs border border-emerald-700/60 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Borrar Mis Datos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Aviso Legal & Créditos */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <div>
            <p className="font-semibold text-slate-400">
              © 2026 - 2030 Plataforma Oficial {CAMPAIGN_INFO.candidateFullName} — Concejo de Ibagué.
            </p>
            <p className="text-[11px] mt-0.5 text-slate-500">
              Material informativo y programático de participación ciudadana rumbo al periodo constitucional 2027 – 2030.
            </p>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 inline" />
            <span>con rigor técnico y carácter por Ibagué</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
