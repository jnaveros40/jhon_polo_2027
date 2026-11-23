import React, { useState } from 'react';
import {
  TrendingUp,
  Music,
  ShieldCheck,
  Briefcase,
  Building2,
  GraduationCap,
  Utensils,
  Sparkles,
  Store,
  Droplets,
  Users2,
  Lightbulb,
  CheckCircle,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { PROGRAMMATIC_PILLARS, buildWhatsAppUrl } from '../data/campaignData';
import { Proposal } from '../types';

export const PillarsSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(PROGRAMMATIC_PILLARS[0].id);
  const [expandedProposalId, setExpandedProposalId] = useState<string | null>(null);

  const activePillar = PROGRAMMATIC_PILLARS.find(p => p.id === activePillarId) || PROGRAMMATIC_PILLARS[0];

  const getPillarIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Music': return <Music className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const getProposalIcon = (iconName: string) => {
    const className = "w-5 h-5";
    switch (iconName) {
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Store': return <Store className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Users2': return <Users2 className={className} />;
      case 'Lightbulb': return <Lightbulb className={className} />;
      default: return <CheckCircle className={className} />;
    }
  };

  const toggleProposal = (id: string) => {
    setExpandedProposalId(prev => prev === id ? null : id);
  };

  return (
    <section id="propuestas" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-3">
            <span>Programa de Gobierno para el Concejo 2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
            Las 3 Grandes Apuestas por <span className="text-red-700">Ibagué</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Propuestas claras, realizables y orientadas a resultados concretos. Diseñadas para que el Concejo sea la voz de la gente y no de la politiquería tradicional.
          </p>
        </div>

        {/* Selector de Pestañas / Pilares */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-10">
          {PROGRAMMATIC_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            let activeStyles = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';

            if (isActive) {
              if (pillar.color === 'red') {
                activeStyles = 'bg-red-700 text-white border-red-700 shadow-brand';
              } else if (pillar.color === 'yellow') {
                activeStyles = 'bg-amber-500 text-slate-950 border-amber-500 shadow-md';
              } else {
                activeStyles = 'bg-emerald-700 text-white border-emerald-700 shadow-md';
              }
            }

            return (
              <button
                key={pillar.id}
                onClick={() => {
                  setActivePillarId(pillar.id);
                  setExpandedProposalId(null);
                }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all font-display text-left font-bold sm:w-1/3 ${activeStyles}`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${isActive
                    ? (pillar.color === 'yellow' ? 'bg-amber-400 text-slate-950' : 'bg-white/20 text-white')
                    : 'bg-white text-slate-700 shadow-xs'
                  }`}>
                  {getPillarIcon(pillar.icon)}
                </div>
                <div>
                  <span className={`text-[11px] block uppercase font-extrabold tracking-wider ${isActive ? (pillar.color === 'yellow' ? 'text-amber-950' : 'text-white/80') : 'text-slate-500'
                    }`}>
                    Eje #{pillar.number}
                  </span>
                  <span className="text-sm sm:text-base leading-tight block">
                    {pillar.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detalle del Pilar Activo */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">

          {/* Banner de Introducción del Pilar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-xs mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${activePillar.color === 'red' ? 'bg-red-600' : activePillar.color === 'yellow' ? 'bg-amber-500' : 'bg-emerald-600'
                  }`} />
                {activePillar.badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                {activePillar.title}
              </h3>
              <p className="text-base text-slate-600 font-medium mt-1">
                {activePillar.tagline}
              </p>
            </div>

            <a
              href={buildWhatsAppUrl(`¡Hola John Polo! Me interesa mucho el pilar de "${activePillar.title}" para Ibagué y quiero aportar mis ideas.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Opinar sobre este Eje</span>
            </a>
          </div>

          {/* Lista de Propuestas del Pilar Activo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activePillar.proposals.map((proposal: Proposal) => {
              const isExpanded = expandedProposalId === proposal.id;
              const shareLink = buildWhatsAppUrl(
                `¡Hola! Estuve viendo la propuesta de John Polo para el Concejo de Ibagué 2027: "${proposal.title}". Me parece clave para nuestra ciudad: ${proposal.summary}`
              );

              return (
                <div
                  key={proposal.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header de la tarjeta */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-red-50 text-red-700">
                        {getProposalIcon(proposal.icon)}
                      </div>
                      {proposal.impactMetrics && (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          {proposal.impactMetrics}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-display font-black text-slate-900 leading-snug mb-2">
                      {proposal.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {proposal.summary}
                    </p>

                    {/* Detalle expandible */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-3 rounded-xl mb-4 leading-relaxed animate-in fade-in duration-200">
                        <strong className="block text-slate-900 mb-1 font-bold">¿Cómo lo haremos desde el Concejo?</strong>
                        {proposal.description}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proposal.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Acciones de la propuesta */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleProposal(proposal.id)}
                      className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 focus:outline-none"
                    >
                      <span>{isExpanded ? 'Ver menos' : 'Ver detalle'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <a
                      href={shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                      title="Compartir propuesta por WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner Complementario del Afiche Oficial */}
          <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-red-700 to-red-800 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-brand">
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase font-extrabold text-yellow-300 tracking-wider">
                Manifiesto Comunitario
              </p>
              <h4 className="text-xl sm:text-2xl font-display font-black">
                "Por una Ibagué que produce, recibe y crece"
              </h4>
              <p className="text-xs sm:text-sm text-red-100 mt-0.5">
                Cada turista que llega a Ibagué debería encontrar un joven que lo reciba, lo guíe y le cuente nuestra historia.
              </p>
            </div>
            <a
              href="#buzon"
              className="px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-display font-extrabold text-xs sm:text-sm shrink-0 shadow-md active:scale-95 transition-transform"
            >
              Reporta tu Comuna
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};