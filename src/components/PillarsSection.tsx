import React, { useState } from 'react';
import {
  TrendingUp,
  Music,
  ShieldCheck,
  Briefcase,
  Building2,
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
  Share2,
  Compass,
  FileText,
  BookOpen,
  Scale,
  Landmark,
  Table2,
  Download
} from 'lucide-react';
import {
  PROGRAMMATIC_PILLARS,
  THEORETICAL_FOUNDATIONS,
  COUNCILOR_COMPETENCES,
  STRATEGIC_MATRIX,
  FINANCIAL_ENGINEERING,
  CAMPAIGN_INFO,
  buildWhatsAppUrl
} from '../data/campaignData';
import { Proposal } from '../types';

export const PillarsSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(PROGRAMMATIC_PILLARS[0].id);
  const [expandedProposalId, setExpandedProposalId] = useState<string | null>(null);
  const [showAllPillars, setShowAllPillars] = useState<boolean>(false);
  const [showMethodology, setShowMethodology] = useState<boolean>(false);

  const activePillar = PROGRAMMATIC_PILLARS.find(p => p.id === activePillarId) || PROGRAMMATIC_PILLARS[0];
  const displayedPillars = showAllPillars ? PROGRAMMATIC_PILLARS : [activePillar];

  const getPillarIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Music': return <Music className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Store': return <Store className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const getProposalIcon = (iconName: string) => {
    const className = "w-5 h-5";
    switch (iconName) {
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Store': return <Store className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Users2': return <Users2 className={className} />;
      case 'Lightbulb': return <Lightbulb className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      default: return <CheckCircle className={className} />;
    }
  };

  const toggleProposal = (id: string) => {
    setExpandedProposalId(prev => prev === id ? null : id);
  };

  return (
    <section id="propuestas" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Encabezado del Documento Maestro Integral y Programático 2027 - 2030 */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Documento Maestro Integral y Programático • Concejo 2027 – 2030</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Ibagué Sostenible, Industrial, <br className="hidden sm:inline" />
            <span className="text-red-700">Segura y Conectada</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed">
            Plataforma de Gestión, Control Político y Desarrollo Territorial de <strong className="text-slate-900">John Fredy Polo Campos</strong>. Fundamentada en rigor técnico, gobernanza agrologística, ingeniería vial y sostenibilidad financiera sin agravar el endeudamiento municipal.
          </p>

          {/* Botones de Descarga del PDF Maestro y Despliegue de Marco Metodológico */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CAMPAIGN_INFO.masterDocPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="DOCUMENTO_PROYECTO_CONCEJO_2027_2030_JOHN_POLO.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-extrabold text-xs sm:text-sm text-white bg-red-700 hover:bg-red-800 shadow-brand transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Documento Maestro Oficial (PDF)</span>
            </a>

            <button
              type="button"
              onClick={() => setShowMethodology(!showMethodology)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
            >
              <BookOpen className="w-4 h-4 text-red-700" />
              <span>{showMethodology ? 'Ocultar Marco Teórico y Competencias' : 'Ver Marco Teórico (Max-Neef, Sen, Mazzucato) y Alcance Legal'}</span>
              {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* SECCIÓN I & II: Marco Metodológico y Económico + Competencia Funcional del Concejal */}
        {showMethodology && (
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-10 animate-in fade-in duration-300">
            
            {/* I. Marco Metodológico y Económico */}
            <div>
              <div className="flex items-center gap-2 text-yellow-400 text-xs font-extrabold uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>I. Marco Metodológico y Económico de la Propuesta</span>
              </div>
              <h3 className="text-2xl font-display font-black text-white mb-6">
                Tres Pilares del Pensamiento Económico Contemporáneo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {THEORETICAL_FOUNDATIONS.map((tf) => (
                  <div key={tf.id} className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-yellow-400 uppercase tracking-wider block mb-1">
                        {tf.author}
                      </span>
                      <h4 className="text-lg font-display font-black text-white mb-2">
                        {tf.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {tf.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                      {tf.pillars.map((p, i) => (
                        <span key={i} className="text-[10px] font-bold bg-red-950/90 text-red-300 border border-red-800/60 px-2 py-0.5 rounded-md">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* II. Competencia Funcional del Concejal */}
            <div className="pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-2">
                <Scale className="w-4 h-4" />
                <span>II. Competencia Funcional del Concejal: El Alcance de la Credencial</span>
              </div>
              <h3 className="text-2xl font-display font-black text-white mb-6">
                Ejecución del Mandato Constitucional (Art. 313 C.P. y Ley 136 de 1994)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COUNCILOR_COMPETENCES.map((comp) => (
                  <div key={comp.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-700/50 px-2.5 py-0.5 rounded-full">
                      {comp.legalBasis}
                    </span>
                    <h4 className="text-lg font-display font-black text-white mt-3 mb-2">
                      {comp.title}
                    </h4>
                    <p className="text-xs text-slate-300 mb-3">
                      {comp.description}
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {comp.actions.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-yellow-400 font-bold">▪</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SECCIÓN III: Los 7 Ejes Estratégicos de Transformación Territorial */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-700 block">
                III. Plan Integral de Acción desde el Concejo
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                Los 7 Ejes Estratégicos de Transformación Territorial
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowAllPillars(!showAllPillars)}
              className="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-extrabold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs"
            >
              {showAllPillars ? 'Ver Eje por Pestaña' : 'Desplegar los 7 Ejes Completos'}
            </button>
          </div>

          {/* Selector de los 7 Ejes */}
          {!showAllPillars && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
              {PROGRAMMATIC_PILLARS.map((pillar) => {
                const isActive = pillar.id === activePillarId;
                let activeStyles = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';

                if (isActive) {
                  if (pillar.color === 'red') {
                    activeStyles = 'bg-red-700 text-white border-red-700 shadow-brand';
                  } else if (pillar.color === 'yellow') {
                    activeStyles = 'bg-amber-400 text-slate-950 border-amber-500 shadow-md';
                  } else {
                    activeStyles = 'bg-emerald-700 text-white border-emerald-700 shadow-md';
                  }
                }

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => {
                      setActivePillarId(pillar.id);
                      setExpandedProposalId(null);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 transition-all font-display text-left font-bold ${activeStyles}`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isActive
                        ? (pillar.color === 'yellow' ? 'bg-amber-300 text-slate-950' : 'bg-white/20 text-white')
                        : 'bg-white text-slate-700 shadow-xs'
                    }`}>
                      {getPillarIcon(pillar.icon, "w-4 h-4")}
                    </div>
                    <div className="min-w-0">
                      <span className={`text-[10px] block uppercase font-extrabold tracking-wider ${
                        isActive ? (pillar.color === 'yellow' ? 'text-amber-950' : 'text-white/80') : 'text-slate-500'
                      }`}>
                        Eje #{pillar.number}
                      </span>
                      <span className="text-xs leading-tight block line-clamp-2">
                        {pillar.shortTitle.replace(/^\d+\.\s*/, '')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Contenedor de Eje(s) Activo(s) */}
          <div className="space-y-10">
            {displayedPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card space-y-8"
              >
                {/* Cabecera del Eje */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-xs mb-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        pillar.color === 'red' ? 'bg-red-600' : pillar.color === 'yellow' ? 'bg-amber-500' : 'bg-emerald-600'
                      }`} />
                      <span>{pillar.badge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                      {pillar.tagline}
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppUrl(`¡Hola John Fredy Polo! Estuve leyendo en el Documento Maestro 2027-2030 el "${pillar.title}" y quiero sumar propuestas desde mi comuna.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Respaldar Eje #{pillar.number}</span>
                  </a>
                </div>

                {/* Ficha Técnica del Eje: Problemática Central | Solución Normativa | Entidad Ejecutora */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50/70 p-4 rounded-2xl border border-red-200/80">
                    <span className="text-[11px] font-extrabold uppercase text-red-800 tracking-wider block mb-1">
                      🚨 Problemática Central
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {pillar.problematicaCentral}
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
                    <span className="text-[11px] font-extrabold uppercase text-emerald-800 tracking-wider block mb-1">
                      ⚖️ Solución Normativa / Propuesta
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {pillar.solucionNormativa}
                    </p>
                  </div>

                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
                    <span className="text-[11px] font-extrabold uppercase text-amber-900 tracking-wider block mb-1">
                      🏛️ Entidad Ejecutora / Aliado
                    </span>
                    <p className="text-xs sm:text-sm text-slate-900 font-bold leading-relaxed">
                      {pillar.entidadEjecutora}
                    </p>
                  </div>
                </div>

                {/* Tarjetas de Proyectos y Acciones del Eje */}
                <div className={`grid grid-cols-1 ${pillar.proposals.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                  {pillar.proposals.map((proposal: Proposal) => {
                    const isExpanded = expandedProposalId === proposal.id || showAllPillars;
                    const shareLink = buildWhatsAppUrl(
                      `¡Mira esta propuesta del Documento Maestro 2027-2030 de John Polo al Concejo de Ibagué! "${proposal.title}": ${proposal.summary}`
                    );

                    return (
                      <div
                        key={proposal.id}
                        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
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

                          <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4">
                            {proposal.summary}
                          </p>

                          {isExpanded && (
                            <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 bg-slate-50/90 p-3.5 rounded-xl mb-4 leading-relaxed">
                              <strong className="block text-slate-900 mb-1 font-bold">
                                Rigor Técnico y Ejecución (2027–2030):
                              </strong>
                              {proposal.description}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proposal.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => toggleProposal(proposal.id)}
                            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 focus:outline-none"
                          >
                            <span>{isExpanded ? 'Ocultar detalle técnico' : 'Ver detalle técnico completo'}</span>
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
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN IV: Matriz de Síntesis Estratégica por Ejes (Tabla Oficial del Documento Maestro) */}
        <div id="matriz-estrategica" className="bg-white rounded-3xl border-2 border-slate-200 shadow-card overflow-hidden">
          <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-extrabold uppercase tracking-wider mb-1">
                <Table2 className="w-4 h-4" />
                <span>IV. Matriz de Síntesis Estratégica por Ejes</span>
              </div>
              <h3 className="text-2xl font-display font-black">
                Hoja de Ruta Normativa y Ejecutora (Concejo 2027 – 2030)
              </h3>
            </div>
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
              7 Ejes Verificables
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50 text-emerald-950 border-b border-emerald-200 text-xs font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Eje Temático</th>
                  <th className="py-3.5 px-4 sm:px-6">Problemática Central</th>
                  <th className="py-3.5 px-4 sm:px-6">Solución Normativa / Propuesta</th>
                  <th className="py-3.5 px-4 sm:px-6">Entidad Ejecutora / Aliado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {STRATEGIC_MATRIX.map((row) => (
                  <tr
                    key={row.ejeNumber}
                    onClick={() => {
                      const targetPillar = PROGRAMMATIC_PILLARS.find(p => p.number === row.ejeNumber);
                      if (targetPillar) {
                        setActivePillarId(targetPillar.id);
                        setShowAllPillars(false);
                        document.getElementById('propuestas')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:bg-amber-50/50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4 sm:px-6 font-display font-bold text-slate-900 whitespace-nowrap">
                      {row.ejeTematico}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-700">
                      {row.problematicaCentral}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-900 font-semibold">
                      {row.solucionPropuesta}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-emerald-800 font-bold">
                      {row.entidadAliado}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECCIÓN V: Ingeniería Financiera: Sostenibilidad sin Más Endeudamiento (Esquema 80-10-10) */}
        <div id="ingenieria-financiera" className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-extrabold uppercase tracking-wider mb-1">
                <Landmark className="w-4 h-4" />
                <span>V. Ingeniería Financiera • Sostenibilidad Fiscal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                ¿Cómo se Financia Sin Endeudar Más a Ibagué?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                {FINANCIAL_ENGINEERING.summary}
              </p>
            </div>
            <div className="bg-red-950/90 border border-red-700/70 px-4 py-3 rounded-2xl text-center shrink-0">
              <span className="text-[10px] font-bold uppercase text-red-300 block">
                Alerta Deuda Consolidada Actual
              </span>
              <span className="text-lg sm:text-xl font-display font-black text-yellow-400">
                {FINANCIAL_ENGINEERING.currentDebtAlert}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FINANCIAL_ENGINEERING.mechanisms.map((mech) => (
              <div key={mech.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-yellow-400 tracking-wider">
                    {mech.subtitle}
                  </span>
                  <h4 className="text-xl font-display font-black text-white mt-0.5">
                    {mech.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {mech.description}
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                  {mech.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* VI. Discurso Maestro de Cierre */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-red-800 via-red-700 to-red-800 rounded-2xl border-2 border-yellow-400/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-brand">
            <div className="text-center md:text-left space-y-1">
              <span className="text-xs uppercase font-extrabold text-yellow-300 tracking-widest">
                VI. Compromiso de John Fredy Polo Campos • Concejo 2027 – 2030
              </span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white italic">
                “{CAMPAIGN_INFO.closingMasterQuote}”
              </h4>
              <p className="text-xs sm:text-sm text-red-100">
                Ibagué necesita gerencia, autoridad y visión humana. Sin endeudar más al municipio, transformaremos la ciudad desde el Concejo.
              </p>
            </div>
            <a
              href="#buzon"
              className="px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-display font-extrabold text-xs sm:text-sm shrink-0 shadow-md active:scale-95 transition-transform"
            >
              Reporta tu Comuna / Vereda →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
