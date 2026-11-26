import React, { useState } from 'react';
import {
  Send,
  MapPin,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Droplets,
  Briefcase,
  Utensils,
  Store,
  Compass,
  ShieldCheck,
  Building2,
  MessageCircle,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMUNAS_IBAGUE, buildWhatsAppUrl } from '../data/campaignData';
import { openLegalModal, clearAllLocalUserData } from './LegalPrivacyModal';

interface FormState {
  nombre: string;
  telefono: string;
  comunaId: string;
  tema: string;
  mensaje: string;
}

export const CitizenMailbox: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    telefono: '',
    comunaId: '1',
    tema: 'Eje 2: Agua, IBAL (30 km/año) y Telemetría Digital',
    mensaje: ''
  });

  // Consentimiento explícito sin casilla premarcada (Puntos 1, 5, 8 y 14 - Ley 1581 de 2012)
  const [acceptConsent, setAcceptConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataDeletedBanner, setDataDeletedBanner] = useState(false);

  const selectedComuna = COMUNAS_IBAGUE.find(c => String(c.number) === form.comunaId) || COMUNAS_IBAGUE[0];

  const TEMAS = [
    { label: 'Eje 1: Campo, 144 Veredas, Vías Terciarias y Acopio Cll 19', icon: Store, color: 'text-emerald-600' },
    { label: 'Eje 2: Agua, IBAL (30 km/año) y Telemetría Digital', icon: Droplets, color: 'text-blue-600' },
    { label: 'Eje 3: Cargas Urbanísticas, Licencias y Cuenca Combeima', icon: Building2, color: 'text-amber-600' },
    { label: 'Eje 4: INFIBAGUÉ 75/25, Alumbrado LED y Banca Juvenil', icon: Briefcase, color: 'text-red-600' },
    { label: 'Eje 5: Plaza 28 (Modelo Concordia) y Biofábrica Municipal', icon: Utensils, color: 'text-purple-600' },
    { label: 'Eje 6: Movilidad, Puente Mirolindo, SETP y Cable Aéreo', icon: Compass, color: 'text-emerald-700' },
    { label: 'Eje 7: Seguridad, Plaza 21 (Bronx) y Microtráfico', icon: ShieldCheck, color: 'text-red-700' }
  ];

  const formatReportText = () => {
    return `🏛️ *REPORTE TERRITORIAL - JOHN FREDY POLO CONCEJO 2027-2030*\n\n` +
      `👤 *Ciudadano:* ${form.nombre || 'Anónimo'}\n` +
      `📱 *Contacto:* ${form.telefono || 'No especificado'}\n` +
      `📍 *Comuna / Corregimiento:* ${selectedComuna.name}\n` +
      `🏷️ *Eje Programático:* ${form.tema}\n` +
      `🏗️ *Proyecto Estratégico de Zona:* ${selectedComuna.proyectoEstrategico2027}\n\n` +
      `📝 *Reporte / Propuesta Ciudadana:*\n"${form.mensaje}"\n\n` +
      `_Enviado desde la plataforma oficial: Ibagué Sostenible, Industrial, Segura y Conectada._`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError('Por favor indica tu nombre.');
      return;
    }
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10) {
      setError('Por favor describe tu problemática o propuesta con al menos 10 caracteres.');
      return;
    }
    if (!acceptConsent) {
      setError('Debes confirmar que eres mayor de 18 años y aceptar la Política de Privacidad (Ley 1581 de 2012) y Términos de Uso.');
      return;
    }

    setError(null);
    setSubmitted(true);

    try {
      const cookieChoice = localStorage.getItem('jp_cookie_consent');
      if (cookieChoice !== 'essential') {
        const existing = JSON.parse(localStorage.getItem('jp_reports') || '[]');
        existing.unshift({
          ...form,
          comunaNombre: selectedComuna.name,
          date: new Date().toLocaleDateString('es-CO')
        });
        localStorage.setItem('jp_reports', JSON.stringify(existing.slice(0, 10)));
      }
    } catch {
      // storage quota or private browsing
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const whatsappUrl = buildWhatsAppUrl(formatReportText());
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="buzon" className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>13 Comunas • 17 Corregimientos • 144 Veredas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
            Mapa Territorial y <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-amber-600">
              Buzón de Control Político
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Selecciona tu comuna o sector rural para conocer el <strong className="text-slate-900">Proyecto Estratégico 2027–2030</strong> asignado a tu territorio y envíanos tu reporte sobre fugas y cortes del IBAL, vías, microtráfico o empleo juvenil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Formulario Principal */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card">

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-black text-slate-900">
                  ¡Reporte Territorial Preparado con Éxito!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Gracias <strong>{form.nombre}</strong>. Tu reporte para <strong>{selectedComuna.name}</strong> ha sido radicado para control político en el Concejo 2027–2030.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl(formatReportText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Enviar por WhatsApp</span>
                  </a>

                  <button
                    onClick={copyToClipboard}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        nombre: '',
                        telefono: '',
                        comunaId: '1',
                        tema: TEMAS[0].label,
                        mensaje: ''
                      });
                    }}
                    className="w-full sm:w-auto text-xs font-bold text-red-700 hover:text-red-800 py-3"
                  >
                    Nuevo reporte
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Comuna Selector */}
                <div>
                  <label htmlFor="comuna" className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-1.5">
                    1. Selecciona tu Comuna (1 a 13) o Sector Rural (17 Corregimientos / 144 Veredas) *
                  </label>
                  <select
                    id="comuna"
                    value={form.comunaId}
                    onChange={(e) => setForm({ ...form, comunaId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all text-sm"
                  >
                    {COMUNAS_IBAGUE.map((comuna) => (
                      <option key={comuna.number} value={String(comuna.number)}>
                        {comuna.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ficha de Obra y Diagnóstico de la Comuna Seleccionada */}
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">
                        Sectores / Barrios de referencia:
                      </strong>
                      <p className="mt-0.5 text-amber-900">
                        {selectedComuna.barriosPrincipales.join(', ')}.
                      </p>
                      <p className="mt-1 text-[11px] text-amber-800">
                        <strong>Problemática identificada:</strong> {selectedComuna.urgenciaPrincipal}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-extrabold uppercase tracking-wide text-emerald-800">
                        Compromiso del Documento Maestro 2027–2030 en esta zona:
                      </strong>
                      <p className="mt-0.5 font-semibold text-slate-900">
                        {selectedComuna.proyectoEstrategico2027}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tema Selector: Los 7 Ejes */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-2">
                    2. Selecciona el Eje Estratégico de tu Reporte o Propuesta *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TEMAS.map((item) => {
                      const Icon = item.icon;
                      const isSelected = form.tema === item.label;
                      return (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => setForm({ ...form, tema: item.label })}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'bg-red-700 text-white border-red-700 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-yellow-300' : item.color}`} />
                          <span className="leading-tight">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Campos de Nombre y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-1.5">
                      Tu Nombre o JAC *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Ej. Carlos Mendoza / JAC Barrio..."
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all text-sm font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-1.5">
                      WhatsApp o Teléfono (Opcional)
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      placeholder="Ej. 302 509 1063"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-1.5">
                    3. Describe el punto crítico o propuesta para el Concejo *
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    placeholder="Indica dirección o vereda, fugas de agua del IBAL, cierres de válvulas, huecos, luminarias apagadas de INFIBAGUÉ o entorno inseguro..."
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all text-sm font-medium resize-none"
                    required
                  />
                </div>

                {/* Casilla de Consentimiento Explícito y Mayoría de Edad (Puntos 1, 5, 8 y 14 - Sin premarcar) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      id="buzon-consent"
                      type="checkbox"
                      checked={acceptConsent}
                      onChange={(e) => setAcceptConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-red-700 focus:ring-red-600 cursor-pointer shrink-0"
                      required
                    />
                    <label htmlFor="buzon-consent" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                      Declaro que soy <strong>mayor de 18 años</strong> y autorizo de manera libre, previa, expresa e informada el tratamiento de mis datos personales conforme a la <strong>Ley 1581 de 2012 (Habeas Data)</strong>, aceptando la{' '}
                      <button
                        type="button"
                        onClick={() => openLegalModal('privacidad')}
                        className="text-red-700 hover:text-red-800 font-extrabold underline"
                      >
                        Política de Privacidad
                      </button>{' '}
                      y los{' '}
                      <button
                        type="button"
                        onClick={() => openLegalModal('terminos')}
                        className="text-red-700 hover:text-red-800 font-extrabold underline"
                      >
                        Términos y Condiciones
                      </button>
                      . *
                    </label>
                  </div>
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-extrabold text-base text-white bg-red-700 hover:bg-red-800 shadow-brand active:scale-[0.99] transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Radicar en Buzón & Enviar por WhatsApp</span>
                </button>

                {/* Botón Directo para Borrar Mis Datos (Punto 3 - Derecho de Supresión Art. 8 Ley 1581/2012) */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span>¿Deseas eliminar los reportes guardados en tu navegador o darte de baja?</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        clearAllLocalUserData();
                        setDataDeletedBanner(true);
                        setTimeout(() => setDataDeletedBanner(false), 4000);
                      }}
                      className="inline-flex items-center gap-1 font-extrabold text-red-700 hover:text-red-800 underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Borrar mis datos locales</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openLegalModal('borrar-datos')}
                      className="font-bold text-slate-700 hover:text-slate-900 underline"
                    >
                      Centro Habeas Data
                    </button>
                  </div>
                </div>

                {dataDeletedBanner && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                    ✓ Se eliminaron todos tus datos locales de este navegador.
                  </div>
                )}

              </form>
            )}

          </div>

          {/* Columna Derecha: Vista Previa y Compromiso */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Ficha de Control Político
                  </span>
                </div>
                <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded-full font-bold">
                  Concejo 2027–2030
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <p className="text-yellow-400 font-bold">
                  🏛️ RADICADO CIUDADANO IBAGUÉ
                </p>
                <p>👤 <span className="text-slate-400">Reporta:</span> {form.nombre || '...'}</p>
                <p>📍 <span className="text-slate-400">Territorio:</span> {selectedComuna.name}</p>
                <p>🏷️ <span className="text-slate-400">Eje:</span> {form.tema}</p>
                <p className="text-emerald-300 text-[11px]">
                  🏗️ <span className="text-slate-400">Obra 2027-2030:</span> {selectedComuna.proyectoEstrategico2027}
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">📝 Detalle:</span>
                  <p className="text-white italic">
                    "{form.mensaje || 'Escribe tu reporte para previsualizarlo en tiempo real...'}"
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Canal Oficial:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  Equipo Técnico John Fredy Polo
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-base font-display font-black text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>De la Queja al Debate de Control Político</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                En cumplimiento del <strong>Art. 313 de la Constitución y la Ley 136 de 1994</strong>, cada reporte alimenta las citaciones a gerentes del IBAL, INFIBAGUÉ y el Ente Gestor del SETP para exigir soluciones con rigor técnico y carácter.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
