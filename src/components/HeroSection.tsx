import React from 'react';
import { ArrowRight, Users, Sparkles, CheckCircle2, MessageCircle, MapPin, Flame } from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';

export const HeroSection: React.FC = () => {
  const whatsAppHeroLink = buildWhatsAppUrl(
    `¡Hola John Polo! Quiero sumarme a tu campaña al Concejo de Ibagué 2027 y apoyar tus propuestas por una Ibagué que produce, recibe y crece.`
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
            
            {/* Badges de Precandidatura y Localidad */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-red-700 text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                Concejo de Ibagué 2027
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                13 Comunas & Corregimientos
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                #EsHoraDeCreer
              </span>
            </div>

            {/* Titular Principal de Alto Impacto */}
            <div className="space-y-2">
              <p className="text-sm md:text-base font-bold text-red-600 tracking-wider uppercase font-display">
                Ibagué tiene con qué
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.08]">
                Ibagué merece <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-amber-600 underline decoration-yellow-400 decoration-wavy decoration-from-font">
                  sonar más fuerte
                </span>
              </h1>
            </div>

            {/* Manifiesto y Subtítulo */}
            <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Una ciudad con voz, oportunidades y futuro. Por una Ibagué que produce, recibe con calidez y crece con empleo digno para sus jóvenes.
            </p>

            {/* Micro-puntos de valor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Primer Empleo Joven</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Cultura & Turismo Vivo</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Control Férreo al Agua</span>
              </div>
            </div>

            {/* Llamados a la Acción (CTAs) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a
                href="#propuestas"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-extrabold text-base text-white bg-red-700 hover:bg-red-800 shadow-brand hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Conoce las Propuestas</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#voluntarios"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-bold text-base text-slate-800 bg-white hover:bg-slate-100 border-2 border-slate-300 shadow-sm transition-all active:scale-[0.98]"
              >
                <Users className="w-5 h-5 text-red-600" />
                <span>Súmate al Equipo</span>
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

            {/* Métrica de impacto ciudadano */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
              <div className="flex -space-x-2">
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">JP</span>
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-yellow-500 text-slate-900 font-bold text-[10px] flex items-center justify-center">IB</span>
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">27</span>
              </div>
              <p>
                <strong className="text-slate-800 font-bold">Cientos de ciudadanos</strong> ya sumados en las 13 comunas.
              </p>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica de Alto Impacto */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Marco estilizado con los colores de la bandera de Ibagué */}
              <div className="absolute -inset-2 rounded-3xl flag-gradient opacity-80 blur-sm transform -rotate-1" />

              <div className="relative bg-white p-3 rounded-2xl shadow-2xl border border-slate-200">
                
                {/* Imagen del Candidato */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-[4/5] group">
                  <img
                    src={CAMPAIGN_INFO.images.heroCandidate}
                    alt="John Polo - Candidato al Concejo de Ibagué 2027"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Gradiente inferior para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges Flotantes sobre la Imagen */}
                  <div className="absolute top-3 left-3 bg-red-700/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg border border-red-500">
                    JOHN POLO AL CONCEJO
                  </div>

                  <div className="absolute top-3 right-3 bg-yellow-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                    2027
                  </div>

                  {/* Resumen inferior sobre la imagen */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase font-bold text-red-700 tracking-wider">Liderazgo & Compromiso</p>
                        <p className="text-base font-display font-extrabold text-slate-900">
                          "Por una Ibagué que produce, recibe y crece"
                        </p>
                      </div>
                      <span className="p-2 rounded-full bg-red-100 text-red-700 shrink-0">
                        <Flame className="w-5 h-5 fill-red-600 text-red-600" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-banner institucional */}
                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-xs font-bold text-slate-700">
                    ¿Quieres conocer a John en tu barrio?
                  </p>
                  <a
                    href="#buzon"
                    className="text-xs font-extrabold text-red-700 hover:text-red-800 underline inline-block mt-0.5"
                  >
                    Invítalo a tu comuna o escribe al buzón ciudadano →
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

