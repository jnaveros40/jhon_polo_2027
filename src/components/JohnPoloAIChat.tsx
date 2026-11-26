import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  MessageCircle,
  Trash2,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import {
  CAMPAIGN_INFO,
  PROGRAMMATIC_PILLARS,
  COMUNAS_IBAGUE,
  FINANCIAL_ENGINEERING,
  THEORETICAL_FOUNDATIONS,
  COUNCILOR_COMPETENCES,
  buildWhatsAppUrl
} from '../data/campaignData';
import { openLegalModal } from './LegalPrivacyModal';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const INITIAL_AI_MESSAGE: ChatMessage = {
  id: 'welcome-ai',
  sender: 'ai',
  text:
    '¡Hola! 🤖 Soy el **Asistente de Inteligencia Artificial** de la campaña de **John Fredy Polo Campos («El Gerente Campesino»)** al Concejo de Ibagué 2027–2030. Mis respuestas son generadas automáticamente por IA con base en el Documento Maestro de los 7 Ejes Estratégicos. ¿Sobre qué propuesta, comuna o vereda quieres preguntar?',
  timestamp: 'Ahora'
};

const QUICK_QUESTIONS = [
  '¿Quién es John Polo?',
  '¿Cuáles son los 7 Ejes?',
  '¿Qué propone para el agua y el IBAL?',
  '¿Qué hará por las 144 veredas y la Calle 19?',
  '¿Cómo financiar las obras sin subir impuestos (80-10-10)?',
  '¿Qué propone sobre el SETP, Cable Aéreo y Mirolindo?',
  '¿Qué obra hay para mi Comuna?'
];

function generateGroundedAIResponse(query: string): string {
  const q = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // 1. Check if asking about a specific Comuna (e.g., "comuna 1", "comuna 8", "boqueron", "salado", "calambeo")
  const comunaMatch = q.match(/comuna\s*(\d{1,2})/);
  if (comunaMatch) {
    const num = parseInt(comunaMatch[1], 10);
    const found = COMUNAS_IBAGUE.find((c) => c.number === num);
    if (found) {
      return (
        `📍 **${found.name}** (Barrios: ${found.barriosPrincipales.join(', ')}):\n` +
        `• **Urgencia diagnosticada:** ${found.urgenciaPrincipal}\n` +
        `• **Proyecto Estratégico 2027–2030:** ${found.proyectoEstrategico2027}\n\n` +
        `*(Respuesta generada por Asistente IA • Fuente: Documento Maestro 2027–2030).*`
      );
    }
  }

  for (const c of COMUNAS_IBAGUE) {
    const matchBarrio = c.barriosPrincipales.some((b) =>
      q.includes(
        b
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )
    );
    if (matchBarrio && q.length > 4) {
      return (
        `📍 Para tu sector en **${c.name}** (${c.barriosPrincipales.join(', ')}):\n` +
        `• **Diagnóstico:** ${c.urgenciaPrincipal}\n` +
        `• **Compromiso en el Concejo 2027–2030:** ${c.proyectoEstrategico2027}\n\n` +
        `*(Respuesta generada por Asistente IA • Fuente: Documento Maestro 2027–2030).*`
      );
    }
  }

  // 2. Who is John Polo / El Gerente Campesino
  if (
    q.includes('quien es') ||
    q.includes('john polo') ||
    q.includes('jhon polo') ||
    q.includes('john pollo') ||
    q.includes('gerente campesino') ||
    q.includes('biografia') ||
    q.includes('partido')
  ) {
    return (
      `👤 **¿Quién es John Fredy Polo Campos («John Polo»)?**\n` +
      `Es líder territorial, conocido como **«El Gerente Campesino»**, candidato al **Concejo de Ibagué 2027–2030** con el aval del **Partido Liberal Colombiano**.\n` +
      `• **Su visión:** Une el orgullo por nuestras raíces campesinas (17 corregimientos y 144 veredas) con rigor técnico, gerencia pública y fundamentos de Manfred Max-Neef, Amartya Sen y Mariana Mazzucato.\n` +
      `• **Su lema:** *«¡Ibagué merece sonar más fuerte! Es hora de creer»*.\n\n` +
      `*(Respuesta generada por Asistente IA).*`
    );
  }

  // 3. Agua / IBAL / Telemetría (Eje 2)
  if (q.includes('agua') || q.includes('ibal') || q.includes('tuberia') || q.includes('telemetria') || q.includes('acueducto')) {
    const p2 = PROGRAMMATIC_PILLARS[1];
    return (
      `💧 **${p2.title}:**\n` +
      `• **Problema:** ${p2.problematicaCentral}\n` +
      `• **Solución de John Polo desde el Concejo:**\n` +
      `  1. **Meta vinculante de 30 km/año** de renovación hidrosanitaria (120 km en el cuatrienio) para recuperar +$8.000 millones/año en agua potable.\n` +
      `  2. **Telemetría digital y válvulas matrices automatizadas** auditables en línea para garantizar presión y continuidad 24/7.\n` +
      `  3. **Acuerdo de Sincronía Hidráulica:** prohibido pavimentar una vía sin certificar antes la red subterránea.\n\n` +
      `*(Respuesta generada por Asistente IA).*`
    );
  }

  // 4. Campo / Veredas / Calle 19 / Plazas / Biofábrica (Ejes 1 y 5)
  if (
    q.includes('campo') ||
    q.includes('vereda') ||
    q.includes('campesin') ||
    q.includes('calle 19') ||
    q.includes('carrefour') ||
    q.includes('acopio') ||
    q.includes('plaza') ||
    q.includes('concordia') ||
    q.includes('biofabrica')
  ) {
    return (
      `🌾 **Ejes 1 y 5 — Campo, 144 Veredas, Acopio Calle 19 y Plazas:**\n` +
      `1. **50 km/año de vías terciarias** convenidas directamente con las Juntas de Acción Comunal (JAC) bajo el esquema 80-10-10.\n` +
      `2. **Central de Acopio y Red de Frío en el antiguo Carrefour de la Calle 19:** Descongestiona la Cra. 4ª y articula las 5 plazas. Los mayoristas participan como socios logísticos con voz técnica pero sin voto para proteger la compra directa (Ley 2046) a nuestras 13.000 familias campesinas.\n` +
      `3. **Plaza de la 28 (Modelo Concordia) y Biofábrica Municipal:** Cocinas campesinas modernas en el 2º piso de la 28 y conversión del Vivero Municipal en Biofábrica que procesa 15-20 ton/día de residuos orgánicos.\n\n` +
      `*(Respuesta generada por Asistente IA).*`
    );
  }

  // 5. Movilidad / SETP / Cable Aéreo / Mirolindo (Eje 6)
  if (
    q.includes('movilidad') ||
    q.includes('trancon') ||
    q.includes('setp') ||
    q.includes('cable') ||
    q.includes('mirolindo') ||
    q.includes('calle 103') ||
    q.includes('transporte')
  ) {
    return (
      `🚡 **Eje 6 — Desembotellamiento Vial, SETP y 2 Cables Aéreos:**\n` +
      `• **Para los +310.000 vehículos en Ibagué:**\n` +
      `  1. **Caja única del SETP + 2 Líneas de Cable Aéreo con tarifa integrada:** Línea 1 Sur-Occidente (Boquerón – Miramar – Jazmín – Ricaurte – Centro) y Línea 2 Noroccidente (Centro – Clarita Botero – Ancón – La Aurora en Comuna 2).\n` +
      `  2. **Grandes Obras Viales:** Viaducto/Puente en la Glorieta de Mirolindo conectado a la Variante Boquerón, Corredor Calle 103, Av. Carrera 13 y Doble Calzada U. Cooperativa–San Bernardo.\n` +
      `  3. **Incentivos sin garrote a ~60.000 vehículos foráneos** para que radiquen su matrícula en Ibagué (+$10.000M a $14.000M/año para malla vial).\n\n` +
      `*(Respuesta generada por Asistente IA).*`
    );
  }

  // 6. Finanzas / Deuda / Impuestos / 80-10-10 / INFIBAGUÉ / Empleo Joven (Eje 4 y Finanzas)
  if (
    q.includes('financi') ||
    q.includes('80-10-10') ||
    q.includes('impuesto') ||
    q.includes('predial') ||
    q.includes('deuda') ||
    q.includes('infibague') ||
    q.includes('joven') ||
    q.includes('empleo')
  ) {
    return (
      `📊 **Ingeniería Financiera 80-10-10 y Empleo Joven (Sin subir Predial ni ICA):**\n` +
      `• Con una deuda municipal de **${FINANCIAL_ENGINEERING.currentDebtAlert}**, John Polo propone financiar el desarrollo sin endeudar más a Ibagué:\n` +
      `  1. **Esquema 80-10-10:** 80% Cooperación Internacional no reembolsable (BID, UE, Fondos Verdes, CIDCA), 10% Cofinanciación Nacional y 10% Contrapartida Local eficiente.\n` +
      `  2. **Reingeniería 75/25 en INFIBAGUÉ:** Sobre el recaudo de $55.000M–$60.000M de Alumbrado Público, destinar 75% a inversión productiva y convertir a INFIBAGUÉ en **Banca de Desarrollo Juvenil** (capital semilla y primer empleo para egresados del SENA y universidades).\n\n` +
      `*(Respuesta generada por Asistente IA).*`
    );
  }

  // 7. Seguridad / Plaza 21 / Microtráfico (Eje 7)
  if (q.includes('seguridad') || q.includes('microtrafico') || q.includes('bronx') || q.includes('plaza 21') || q.includes('robo')) {
    return (
      `🛡️ **Eje 7 — Seguridad Cívica, Plaza de la 21 y Entornos Seguros:**\n` +
      `1. **Recuperación Integral de la Plaza de la 21 y antigua 'Calle del Bronx':** Iluminación LED al 100%, cámaras de reconocimiento facial, gestores de convivencia y traslado del descargue pesado a la Calle 19.\n` +
      `2. **Plan de Choque contra el Microtráfico en las 13 Comunas:** Recuperación de polideportivos con luz LED, escuelas deportivas y culturales nocturnas y oportunidades de empleo joven con INFIBAGUÉ.\n\n` +
      `*(Respuesta generada por Asistente IA).*`
    );
  }

  // 8. Marco teórico o competencias legales del concejal
  if (q.includes('max-neef') || q.includes('amartya') || q.includes('mazzucato') || q.includes('concejal') || q.includes('competencia')) {
    return (
      `⚖️ **Fundamento Teórico y Competencia Legal en el Concejo (Art. 313 C.P. y Ley 136/1994):**\n` +
      `• **3 Pilares Económicos:** ${THEORETICAL_FOUNDATIONS.map((t) => `${t.author} (${t.title})`).join(' • ')}.\n` +
      `• **3 Funciones desde el Concejo:** ${COUNCILOR_COMPETENCES.map((c) => c.title).join(', ')}.\n\n` +
      `*(Respuesta generada por Asistente IA).*`
    );
  }

  // 9. General summary of all 7 Axes
  return (
    `🏛️ **Los 7 Ejes Estratégicos de John Polo al Concejo de Ibagué 2027–2030:**\n` +
    PROGRAMMATIC_PILLARS.map((p) => `**${p.number}.** ${p.shortTitle.replace(/^\d+\.\s*/, '')}: ${p.tagline}`).join('\n') +
    `\n\n💡 *Pregúntame por cualquier eje (ej. "Agua e IBAL", "Campo y Calle 19", "Cable Aéreo", "Esquema 80-10-10") o escribe el número de tu Comuna (ej. "Comuna 8").*`
  );
}

export const JohnPoloAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_AI_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jp_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }

    const handleCleared = () => setMessages([INITIAL_AI_MESSAGE]);
    window.addEventListener('jp-user-data-cleared', handleCleared);
    return () => window.removeEventListener('jp-user-data-cleared', handleCleared);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const saveHistoryIfAllowed = (nextMessages: ChatMessage[]) => {
    try {
      const consent = localStorage.getItem('jp_cookie_consent');
      if (consent !== 'essential') {
        localStorage.setItem('jp_chat_history', JSON.stringify(nextMessages.slice(-20)));
      }
    } catch {
      // ignore
    }
  };

  const handleSend = (customQuery?: string) => {
    const q = (customQuery ?? input).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    };

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: generateGroundedAIResponse(q),
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg, aiMsg];
    setMessages(updated);
    saveHistoryIfAllowed(updated);
    if (!customQuery) {
      setInput('');
    }
  };

  const handleClearChat = () => {
    try {
      localStorage.removeItem('jp_chat_history');
    } catch {
      // ignore
    }
    setMessages([INITIAL_AI_MESSAGE]);
  };

  const humanWhatsAppUrl = buildWhatsAppUrl(
    `¡Hola John Fredy Polo! Estuve consultando el Asistente IA de tu plataforma web y quiero conversar directamente con tu equipo humano sobre el Plan 2027-2030.`
  );

  return (
    <>
      {/* Botón Flotante para Abrir el Asistente con IA */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir asistente interactivo con Inteligencia Artificial sobre John Polo"
            className="group flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-800 hover:to-red-700 text-white shadow-2xl border-2 border-yellow-400 transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-yellow-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-black uppercase tracking-wider text-yellow-300 leading-none">
                🤖 Asistente IA • 24/7
              </span>
              <span className="block text-xs sm:text-sm font-display font-extrabold leading-tight">
                Pregúntale sobre John Polo
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Ventana del Chat Interactivo con IA */}
      {isOpen && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-chat-title"
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[430px] max-h-[85vh] z-50 bg-white rounded-3xl shadow-2xl border-2 border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Barra tricolor */}
          <div className="h-2 w-full flag-gradient" />

          {/* Cabecera del Chat */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <img
                src={CAMPAIGN_INFO.images.logo}
                alt="Logo John Polo Asistente IA"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 bg-white object-contain"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="ai-chat-title" className="text-sm font-display font-black text-white">
                    Asistente IA • John Polo 2027
                  </h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950">
                    IA
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Entrenado con el Documento Maestro de los 7 Ejes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                title="Borrar historial de conversación"
                aria-label="Borrar historial de conversación"
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Cerrar chat (Esc)"
                aria-label="Cerrar asistente de IA"
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Aviso Permanente de Transparencia de IA (Punto 20 de Auditoría Legal) */}
          <div className="px-3.5 py-2 bg-amber-50 border-b border-amber-200 flex items-start gap-2 text-[11px] text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Aviso de Transparencia IA:</strong> Te responde un asistente automatizado con Inteligencia Artificial, no una persona en vivo.{' '}
              <button
                type="button"
                onClick={() => openLegalModal('privacidad')}
                className="underline font-bold text-red-700"
              >
                Ver privacidad
              </button>
              .
            </div>
          </div>

          {/* Lista de Mensajes */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 max-h-[340px]"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-red-700 text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {m.sender === 'ai' && (
                    <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-red-700 mb-1">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Respuesta generada por IA</span>
                    </div>
                  )}
                  <div>{m.text}</div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias Rápidas de Preguntas */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200">
            <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-slate-500 mb-1.5">
              <HelpCircle className="w-3 h-3 text-red-600" />
              <span>Preguntas frecuentes sobre John Polo:</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {QUICK_QUESTIONS.map((qq) => (
                <button
                  key={qq}
                  type="button"
                  onClick={() => handleSend(qq)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-300 text-[11px] font-bold whitespace-nowrap transition-colors shrink-0"
                >
                  {qq}
                </button>
              ))}
            </div>
          </div>

          {/* Formulario de Entrada de Pregunta */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 space-y-2"
          >
            <div className="flex items-center gap-2">
              <label htmlFor="ai-chat-input" className="sr-only">
                Escribe tu pregunta sobre John Polo y sus propuestas
              </label>
              <input
                id="ai-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ej: ¿Qué propone para el agua o la Comuna 8?"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                aria-label="Enviar pregunta al asistente IA"
                className="p-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5">
              <span className="text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>¿Prefieres atención humana?</span>
              </span>
              <a
                href={humanWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 underline"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Hablar con persona en WhatsApp</span>
              </a>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
