import React, { useState } from 'react';
import {
  Send,
  MapPin,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Droplets,
  Briefcase,
  Music,
  Store,
  Compass,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMUNAS_IBAGUE, buildWhatsAppUrl } from '../data/campaignData';

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
    tema: 'Agua y Servicios Públicos',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedComuna = COMUNAS_IBAGUE.find(c => String(c.number) === form.comunaId) || COMUNAS_IBAGUE[0];

  const TEMAS = [
    { label: 'Agua y Servicios Públicos', icon: Droplets, color: 'text-blue-600' },
    { label: 'Empleo Juvenil & Emprendimiento', icon: Briefcase, color: 'text-amber-600' },
    { label: 'Turismo, Cultura & Folclor', icon: Music, color: 'text-purple-600' },
    { label: 'Plazas de Mercado & Campesinado', icon: Store, color: 'text-emerald-600' },
    { label: 'Vías, Huecos & Alumbrado', icon: Compass, color: 'text-red-600' },
    { label: 'Otro Tema Comunitario', icon: MessageSquare, color: 'text-slate-600' }
  ];

  const formatReportText = () => {
    return `🏛️ *REPORTE CIUDADANO - JOHN POLO CONCEJO 2027*\n\n` +
      `👤 *Ciudadano:* ${form.nombre || 'Anónimo'}\n` +
      `📱 *Contacto:* ${form.telefono || 'No especificado'}\n` +
      `📍 *Ubicación:* ${selectedComuna.name}\n` +
      `🏷️ *Tema:* ${form.tema}\n\n` +
      `📝 *Mensaje / Problemática:*\n"${form.mensaje}"\n\n` +
      `_Enviado desde la plataforma oficial de John Polo - Ibagué merece sonar más fuerte._`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError('Por favor indica tu nombre.');
      return;
    }
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10) {
      setError('Por favor describe tu problemática o idea con al menos 10 caracteres.');
      return;
    }

    setError(null);
    setSubmitted(true);

    // Save in localStorage as history
    try {
      const existing = JSON.parse(localStorage.getItem('jp_reports') || '[]');
      existing.unshift({
        ...form,
        comunaNombre: selectedComuna.name,
        date: new Date().toLocaleDateString('es-CO')
      });
      localStorage.setItem('jp_reports', JSON.stringify(existing.slice(0, 10)));
    } catch {
      // storage quota or private browsing
    }

    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Automatically open WhatsApp with the formatted report
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
            <span>Participación Ciudadana Activa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
            Reporta tu Comuna: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-amber-600">
              El Buzón de Ibagué
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            ¿Falta de agua en tu barrio? ¿Vías abandonadas? ¿Ideas para los jóvenes? Escríbelo aquí y envíalo directamente al equipo de John Polo. Tu voz será escuchada en el Concejo de Ibagué.
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
                  ¡Reporte Preparado con Éxito!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Gracias <strong>{form.nombre}</strong>. Tu mensaje para <strong>{selectedComuna.name}</strong> está listo para ser enviado a nuestro canal oficial.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl(formatReportText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Reenviar por WhatsApp</span>
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
                        tema: 'Agua y Servicios Públicos',
                        mensaje: ''
                      });
                    }}
                    className="w-full sm:w-auto text-xs font-bold text-red-700 hover:text-red-800 py-3"
                  >
                    Enviar otro reporte
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
                    1. Selecciona tu Comuna o Corregimiento *
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

                {/* Tarjeta de Contexto de la Comuna Seleccionada */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-amber-950">
                      Barrios principales de esta zona:
                    </strong>
                    <p className="mt-0.5 text-amber-800">
                      {selectedComuna.barriosPrincipales.join(', ')}.
                    </p>
                    <p className="mt-1 text-[11px] text-amber-700 italic">
                      Prioridad sentida: {selectedComuna.urgenciaPrincipal}
                    </p>
                  </div>
                </div>

                {/* Tema Selector */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-2">
                    2. ¿Sobre qué tema es tu reporte o idea? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TEMAS.map((item) => {
                      const Icon = item.icon;
                      const isSelected = form.tema === item.label;
                      return (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => setForm({ ...form, tema: item.label })}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex flex-col gap-1.5 ${isSelected
                              ? 'bg-red-700 text-white border-red-700 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-yellow-300' : item.color}`} />
                          <span className="line-clamp-2 leading-tight">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Campos de Nombre y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-1.5">
                      Tu Nombre *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Ej. Carlos Mendoza"
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
                      placeholder="Ej. 312 000 0000"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-xs font-extrabold uppercase text-slate-700 tracking-wider mb-1.5">
                    3. Describe la problemática o tu propuesta *
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    placeholder="Cuéntanos con detalle: calle, barrio, cuántos días llevan sin agua o qué propuesta tienes para los jóvenes..."
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all text-sm font-medium resize-none"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Mínimo 10 caracteres. Todo reporte será sistematizado para los debates en el Concejo.
                  </p>
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-extrabold text-base text-white bg-red-700 hover:bg-red-800 shadow-brand active:scale-[0.99] transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar al Buzón & Abrir WhatsApp</span>
                </button>

              </form>
            )}

          </div>

          {/* Columna Derecha: Vista Previa y Compromiso */}
          <div className="lg:col-span-5 space-y-6">

            {/* Tarjeta de Vista Previa en Vivo */}
            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Vista Previa del Reporte
                  </span>
                </div>
                <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded-full font-bold">
                  Concejo 2027
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <p className="text-yellow-400 font-bold">
                  🏛️ REPORTE CIUDADANO IBAGUÉ
                </p>
                <p>👤 <span className="text-slate-400">Ciudadano:</span> {form.nombre || '...'}</p>
                <p>📍 <span className="text-slate-400">Comuna:</span> {selectedComuna.name}</p>
                <p>🏷️ <span className="text-slate-400">Tema:</span> {form.tema}</p>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">📝 Mensaje:</span>
                  <p className="text-white italic">
                    "{form.mensaje || 'Tu mensaje aparecerá aquí en tiempo real...'}"
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Destino oficial:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  WhatsApp Campaña John Polo
                </span>
              </div>
            </div>

            {/* Compromiso de Respuesta */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-base font-display font-black text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>¿Por qué es importante tu reporte?</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ningún político puede solucionar lo que no conoce desde la raíz. Cada reporte registrado en esta plataforma alimenta la agenda de control político que John Polo llevará a los debates de acueducto, malla vial y presupuesto en el Concejo Municipal.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};