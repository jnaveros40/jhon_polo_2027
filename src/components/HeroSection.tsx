import React, { useState } from 'react';
import { ArrowRight, Users, Sparkles, CheckCircle2, MessageCircle, MapPin, Flame, Eye, FileText } from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';
import { CaballoLiberal } from './CaballoLiberal';

export const HeroSection: React.FC = () => {
  const [photoVariant, setPhotoVariant] = useState<'creer' | 'territorio' | 'caballo'>('creer');

  const whatsAppHeroLink = buildWhatsAppUrl(
    `¡Hola John Fredy Polo! Leí tu Documento Maestro 2027-2030 ("Ibagué Sostenible, Industrial, Segura y Conectada") y quiero sumarme a tu equipo.`
  );

  return (
    <section id="inicio" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-red-50/20">

      {/* Elementos Gráficos de Fondo */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-red-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 rounded-full bg-yellow-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Columna Izquierda: Mensaje y Titulares */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Badges de Precandidatura, Partido Liberal y Localidad */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-red-700 text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                {CAMPAIGN_INFO.campaignTitle}
              </span>

              {/* Badge Oficial con el Caballo Galopando y la Bandera de Ibagué */}
              <div
                onClick={() => setPhotoVariant('caballo')}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-white text-red-700 border-2 border-red-600/50 shadow-xs hover:border-red-600 hover:bg-red-50 transition-all cursor-pointer group"
                title="Sello Animado: Caballo Galopando con la Bandera de Ibagué"
              >
                <CaballoLiberal size="xs" variant="sello" interactive={false} />
                <span>Partido Liberal • Ibagué</span>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                13 Comunas • 17 Corregimientos • 144 Veredas
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Esquema 80-10-10
              </span>
            </div>

            {/* Identidad Gráfica Oficial de Campaña: Ibagué merece sonar más fuerte */}
            <div className="space-y-2">
              <div className="relative group max-w-xl mx-auto lg:mx-0">
                <div className="absolute -inset-1.5 rounded-3xl flag-gradient opacity-60 blur-xs group-hover:opacity-90 transition-opacity" />

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-slate-900">
                  <img
                    src={CAMPAIGN_INFO.images.bannerLandscape}
                    alt="Ibagué merece sonar más fuerte - John Fredy Polo Campos Concejo de Ibagué 2027-2030"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md text-yellow-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-yellow-400/40 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    CONCEJO 2027 – 2030
                  </div>
                </div>

                <h1 className="sr-only">
                  {CAMPAIGN_INFO.candidateFullName} - {CAMPAIGN_INFO.sloganPrimary} - {CAMPAIGN_INFO.programName}
                </h1>
              </div>
            </div>

            {/* Manifiesto y Subtítulo del Documento Maestro */}
            <div className="space-y-2 max-w-2xl mx-auto lg:mx-0">
              <p className="text-xs sm:text-sm font-display font-black uppercase tracking-wider text-red-700">
                {CAMPAIGN_INFO.candidateFullName} • «{CAMPAIGN_INFO.programName}»
              </p>
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                Plataforma programática con <strong className="text-slate-900">7 Ejes Estratégicos</strong> fundamentados en Max-Neef, Amartya Sen y Mariana Mazzucato: gobernanza agrologística en la Calle 19, renovación de 30 km/año de redes del IBAL sin cartel de valvuleros, INFIBAGUÉ 75/25 como Banca Juvenil, Plaza 28 Modelo Concordia, Viaducto Mirolindo, SETP con 2 Cables Aéreos y Seguridad Cívica.
              </p>
            </div>

            {/* Micro-puntos de valor del Documento Maestro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-w-2xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Acopio Calle 19 (Ex-Carrefour) & 50 km/año Vías Rurales</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">30 km/año Redes IBAL & Fin del 'Cartel Valvuleros'</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">INFIBAGUÉ 75/25 Banca Juvenil + Plaza 28 Concordia</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Av. Cra 13, Cll 103, Puente Mirolindo, SETP y 2 Cables</span>
              </div>
            </div>

            {/* Llamados a la Acción (CTAs) */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#propuestas"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-extrabold text-sm sm:text-base text-white bg-red-700 hover:bg-red-800 shadow-brand hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Ver los 7 Ejes Estratégicos</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={CAMPAIGN_INFO.masterDocPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-display font-bold text-sm text-slate-800 bg-white hover:bg-slate-100 border-2 border-slate-300 shadow-sm transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 text-red-600" />
                <span>PDF Proyecto 2027-2030</span>
              </a>

              <a
                href={whatsAppHeroLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-bold text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all"
                title="Escribir directamente al WhatsApp del candidato"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp Directo</span>
              </a>
            </div>

            {/* Lema Maestro de Cierre */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-600 font-semibold italic">
              <span className="inline-block w-2 h-2 rounded-full bg-red-600 shrink-0" />
              <span>“{CAMPAIGN_INFO.closingMasterQuote}”</span>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica de Alto Impacto */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">

              {/* Marco estilizado con los colores de la bandera de Ibagué */}
              <div className="absolute -inset-2 rounded-3xl flag-gradient opacity-80 blur-sm transform -rotate-1" />

              <div className="relative bg-white p-3 rounded-2xl shadow-2xl border border-slate-200">

                {/* Selector de Fotografía y Símbolo Animado Oficial */}
                <div className="flex flex-wrap items-center justify-between gap-1 pb-2 mb-2 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Identidad Oficial
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPhotoVariant('creer')}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                        photoVariant === 'creer'
                          ? 'bg-red-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Es Hora de Creer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoVariant('territorio')}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                        photoVariant === 'territorio'
                          ? 'bg-red-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>En Territorio</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoVariant('caballo')}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                        photoVariant === 'caballo'
                          ? 'bg-red-700 text-white shadow-xs'
                          : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      }`}
                    >
                      <span>🐎 Galope & Sello</span>
                    </button>
                  </div>
                </div>

                {/* Imagen del Candidato o Símbolo Animado Galopando */}
                <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[4/5] group">
                  <img
                    src={
                      photoVariant === 'creer'
                        ? CAMPAIGN_INFO.images.actionCandidate
                        : photoVariant === 'territorio'
                        ? CAMPAIGN_INFO.images.heroCandidate
                        : CAMPAIGN_INFO.party.gifCard
                    }
                    alt="John Fredy Polo Campos - Concejo de Ibagué 2027-2030"
                    className={`w-full h-full ${
                      photoVariant === 'caballo' ? 'object-contain p-2' : 'object-cover object-top'
                    } group-hover:scale-105 transition-transform duration-500`}
                    loading="eager"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 bg-red-700/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg border border-red-500">
                    JOHN FREDY POLO • CONCEJO
                  </div>

                  <div className="absolute top-3 right-3 bg-yellow-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                    2027–2030
                  </div>

                  {/* Sello Circular con la Bandera de Ibagué y Caballo Galopando Flotante */}
                  <div
                    onClick={() => setPhotoVariant(photoVariant === 'caballo' ? 'creer' : 'caballo')}
                    className="absolute top-12 right-3 z-10 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border-2 border-yellow-400 flex flex-col items-center gap-1 group cursor-pointer hover:scale-105 transition-transform"
                    title="Sello Animado con la Bandera de Ibagué y Caballo Galopando"
                  >
                    <img
                      src={CAMPAIGN_INFO.party.gifSello}
                      alt="Sello Bandera de Ibagué Caballo Galopando"
                      className="w-12 h-12 rounded-full object-contain border border-red-500"
                    />
                    <span className="text-[9px] font-black uppercase text-red-700 leading-none text-center px-1">
                      Liberal • Ibagué
                    </span>
                  </div>

                  {/* Resumen inferior sobre la imagen */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-900">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[11px] uppercase font-bold text-red-700 tracking-wider">
                          Financiación 80-10-10 • Sin Más Deuda
                        </p>
                        <p className="text-sm sm:text-base font-display font-extrabold text-slate-900 leading-snug">
                          “{CAMPAIGN_INFO.closingMasterQuote}”
                        </p>
                      </div>
                      <span className="p-2 rounded-full bg-red-100 text-red-700 shrink-0">
                        <Flame className="w-5 h-5 fill-red-600 text-red-600" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-banner institucional */}
                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center flex items-center justify-between px-3">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-red-600" />
                    <span>Conoce la obra para tu comuna</span>
                  </span>
                  <a
                    href="#buzon"
                    className="text-xs font-extrabold text-red-700 hover:text-red-800 underline"
                  >
                    Ir al Buzón Territorial →
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
