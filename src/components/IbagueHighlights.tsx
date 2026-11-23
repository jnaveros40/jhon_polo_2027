import React from 'react';
import { Sparkles, Mountain, Music, Utensils, Store, Compass, ArrowRight } from 'lucide-react';
import { IBAGUE_HIGHLIGHTS, CAMPAIGN_INFO } from '../data/campaignData';

export const IbagueHighlights: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Mountain className="w-6 h-6 text-emerald-600" />;
      case 1: return <Music className="w-6 h-6 text-red-600" />;
      case 2: return <Utensils className="w-6 h-6 text-amber-600" />;
      case 3: return <Store className="w-6 h-6 text-emerald-700" />;
      default: return <Compass className="w-6 h-6 text-slate-700" />;
    }
  };

  return (
    <section id="ibague" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Resplandor decorativo */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Misión Territorial 2027 – 2030 • Obras y Soluciones Estructurales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white">
            Proyectos Insignia para <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-red-400">
              Devolver la Dignidad a Ibagué
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium">
            De las 144 veredas y la Central de Acopio en la Calle 19 hasta los 2 Cables Aéreos, la Plaza 28 Modelo Concordia y la renovación de 30 km/año con telemetría digital en el IBAL.
          </p>
        </div>

        {/* Banner Fotográfico Oficial */}
        <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl group">
          <img
            src={CAMPAIGN_INFO.images.bannerLandscape}
            alt="Ibagué merece sonar más fuerte - John Polo"
            className="w-full h-64 sm:h-80 md:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-400 mb-1">
              Capital Musical de Colombia
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white max-w-2xl">
              "Una ciudad con voz, oportunidades y futuro."
            </h3>
            <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-xl">
              Desde el Cañón del Combeima hasta las comunas del sur: Ibagué late fuerte cuando su gente se une.
            </p>
          </div>
        </div>

        {/* Tarjetas de Hitos Culturales y Naturales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IBAGUE_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/10">
                    {getIcon(idx)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-yellow-300 border border-white/15">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-400 mb-0.5">
                  {item.subtitle}
                </p>
                <h4 className="text-lg font-display font-black text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <a
                  href="#propuestas"
                  className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
                >
                  <span>Ver propuesta asociada</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

