import React, { useState, useRef } from 'react';
import {
  Users,
  Share2,
  Download,
  CheckCircle,
  Flame,
  MapPin,
  Shield,
  Award,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VOLUNTEER_ROLES, COMUNAS_IBAGUE, CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';

export const VolunteersSection: React.FC = () => {
  // Estado para el registro de voluntario
  const [volNombre, setVolNombre] = useState('');
  const [volTelefono, setVolTelefono] = useState('');
  const [volComuna, setVolComuna] = useState('Comuna 1');
  const [selectedRole, setSelectedRole] = useState(VOLUNTEER_ROLES[0].id);
  const [volSubmitted, setVolSubmitted] = useState(false);

  // Estado para la Tarjeta Digital de Apoyo
  const [cardName, setCardName] = useState('Ciudadano Ibaguereño');
  const [cardComuna, setCardComuna] = useState('Comuna 1');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeRoleObj = VOLUNTEER_ROLES.find(r => r.id === selectedRole) || VOLUNTEER_ROLES[0];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volNombre.trim() || !volTelefono.trim()) return;

    setVolSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });

    const msg = `🤝 *NUEVO VOLUNTARIO - CONCEJO 2027*\n\n` +
      `👤 *Nombre:* ${volNombre}\n` +
      `📱 *WhatsApp:* ${volTelefono}\n` +
      `📍 *Comuna:* ${volComuna}\n` +
      `🎯 *Rol de Apoyo:* ${activeRoleObj.title}\n\n` +
      `¡Cuenten conmigo para que Ibagué suene más fuerte con John Polo!`;

    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  // Generador de Imagen PNG en Canvas para Descargar
  const generateAndDownloadCard = () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // Dimensiones de tarjeta para estados (1080x1350 o 800x1000)
    canvas.width = 900;
    canvas.height = 1125;

    // Fondo degradado elegante
    const bgGradient = ctx.createLinearGradient(0, 0, 900, 1125);
    bgGradient.addColorStop(0, '#0F172A');
    bgGradient.addColorStop(0.5, '#1E293B');
    bgGradient.addColorStop(1, '#0B0F19');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 900, 1125);

    // Borde Tricolor de Ibagué
    ctx.fillStyle = '#FBC02D'; // Amarillo
    ctx.fillRect(0, 0, 900, 18);
    ctx.fillStyle = '#2E7D32'; // Verde
    ctx.fillRect(0, 18, 900, 18);
    ctx.fillStyle = '#D32F2F'; // Rojo
    ctx.fillRect(0, 36, 900, 18);

    // Resplandor decorativo rojo y dorado
    const glow = ctx.createRadialGradient(450, 400, 50, 450, 400, 450);
    glow.addColorStop(0, 'rgba(211, 47, 47, 0.25)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 900, 1125);

    // Marco interior
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 80, 820, 985);

    // Encabezado
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FBC02D';
    ctx.font = 'bold 24px Montserrat, sans-serif';
    ctx.fillText('CREDENCIAL CIUDADANA OFICIAL 2027', 450, 140);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px Montserrat, sans-serif';
    ctx.fillText('YO CREO EN IBAGUÉ', 450, 205);

    ctx.fillStyle = '#EF4444';
    ctx.font = '900 48px Montserrat, sans-serif';
    ctx.fillText('CON JOHN POLO', 450, 260);

    // Línea separadora
    ctx.strokeStyle = '#D32F2F';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(300, 290);
    ctx.lineTo(600, 290);
    ctx.stroke();

    // Slogan
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'italic 24px Inter, sans-serif';
    ctx.fillText('«Ibagué merece sonar más fuerte»', 450, 335);

    // Tarjeta del Ciudadano
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.fillRect(100, 380, 700, 440);
    ctx.strokeStyle = 'rgba(251, 192, 45, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 380, 700, 440);

    // Nombre del ciudadano
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText('CIUDADANO(A) MULTIPLICADOR(A):', 450, 440);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 42px Montserrat, sans-serif';
    const displayName = cardName.trim() || 'Ciudadano Ibaguereño';
    ctx.fillText(displayName.toUpperCase(), 450, 510);

    // Comuna
    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText(`📍 ${cardComuna}`, 450, 570);

    // Compromiso
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillText('Por el Empleo Juvenil • El Turismo Productivo', 450, 640);
    ctx.fillText('El Agua Continua • El Control Político Firme', 450, 680);

    // Badge de Verificación
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('✓ REGISTRO CIUDADANO VERIFICADO', 450, 760);

    // Footer de la Tarjeta
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 26px Montserrat, sans-serif';
    ctx.fillText('JOHN POLO AL CONCEJO DE IBAGUÉ 2027', 450, 910);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 18px Inter, sans-serif';
    ctx.fillText('www.johnpolo2027.com • #IbaguéSuenaMásFuerte • #EsHoraDeCreer', 450, 960);

    // Borde inferior tricolor
    ctx.fillStyle = '#D32F2F';
    ctx.fillRect(0, 1071, 900, 18);
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(0, 1089, 900, 18);
    ctx.fillStyle = '#FBC02D';
    ctx.fillRect(0, 1107, 900, 18);

    // Descargar imagen
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `tarjeta-apoyo-john-polo-${cardName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      alert('Tu navegador no permite descarga automática. Puedes hacer captura de pantalla de la tarjeta.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareCardWhatsApp = () => {
    const text = `¡Hola! Ya tengo mi tarjeta de apoyo oficial a John Polo para el Concejo de Ibagué 2027.\n\n` +
      `Soy ${cardName || 'un ciudadano'} de la ${cardComuna} y creo firmemente que Ibagué merece sonar más fuerte.\n` +
      `Genera tu tarjeta tú también y conoce sus propuestas aquí: https://johnpolo2027.com`;

    window.open(buildWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="voluntarios" className="py-16 md:py-24 bg-white relative overflow-hidden">

      {/* Canvas oculto para renderizado y descarga */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Red de Ciudadanos & Voluntarios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
            Súmate a que Ibagué <br className="hidden sm:inline" />
            <span className="text-red-700">Suene Más Fuerte</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Las campañas tradicionales se mueven con maquinarias. Nosotros nos movemos con el corazón, la berraquera de los jóvenes y la dignidad de cada ibaguereño.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Columna Izquierda: Formulario de Voluntariado */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card">

            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 rounded-xl bg-red-100 text-red-700">
                <Flame className="w-5 h-5 fill-red-600" />
              </span>
              <div>
                <h3 className="text-xl font-display font-black text-slate-900">
                  Inscripción de Voluntarios
                </h3>
                <p className="text-xs text-slate-500">
                  Elige cómo te gustaría aportar en tu comuna
                </p>
              </div>
            </div>

            {volSubmitted ? (
              <div className="text-center py-8 space-y-4 bg-white p-6 rounded-2xl border border-emerald-200">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-display font-extrabold text-slate-900">
                  ¡Bienvenido al Equipo, {volNombre}!
                </h4>
                <p className="text-xs text-slate-600">
                  Tu registro ha sido enviado. Uno de nuestros coordinadores de la <strong>{volComuna}</strong> te escribirá pronto al WhatsApp.
                </p>
                <button
                  onClick={() => setVolSubmitted(false)}
                  className="text-xs font-bold text-red-700 hover:text-red-800 underline"
                >
                  Registrar a otra persona
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">

                {/* Nombre */}
                <div>
                  <label htmlFor="volNombre" className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    id="volNombre"
                    type="text"
                    required
                    placeholder="Ej. Valentina Morales"
                    value={volNombre}
                    onChange={(e) => {
                      setVolNombre(e.target.value);
                      if (!cardName || cardName === 'Ciudadano Ibaguereño') {
                        setCardName(e.target.value);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none font-medium"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="volTelefono" className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                    Número de WhatsApp *
                  </label>
                  <input
                    id="volTelefono"
                    type="tel"
                    required
                    placeholder="Ej. 315 123 4567"
                    value={volTelefono}
                    onChange={(e) => setVolTelefono(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none font-medium"
                  />
                </div>

                {/* Comuna */}
                <div>
                  <label htmlFor="volComuna" className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                    Tu Comuna o Sector *
                  </label>
                  <select
                    id="volComuna"
                    value={volComuna}
                    onChange={(e) => {
                      setVolComuna(e.target.value);
                      setCardComuna(e.target.value);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none font-semibold"
                  >
                    {COMUNAS_IBAGUE.map((c) => (
                      <option key={c.number} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector de Rol */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-2">
                    ¿Cómo deseas apoyar? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {VOLUNTEER_ROLES.map((role) => {
                      const isSelected = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${isSelected
                              ? 'bg-red-700 text-white border-red-700 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                          <p className="text-xs font-bold leading-tight">{role.title}</p>
                          <p className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-red-100' : 'text-slate-500'}`}>
                            {role.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-extrabold text-sm text-white bg-red-700 hover:bg-red-800 shadow-brand active:scale-[0.99] transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Unirme a la Red por WhatsApp</span>
                </button>

              </form>
            )}

          </div>

          {/* Columna Derecha: Generador Interactivo de Tarjeta Digital de Apoyo */}
          <div className="lg:col-span-6 space-y-4">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-yellow-100 text-yellow-800">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl font-display font-black text-slate-900">
                    Tarjeta Digital de Apoyo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Crea tu credencial ciudadana y compártela en tus estados
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-yellow-400 text-slate-950 px-2.5 py-1 rounded-full shadow-xs">
                Exclusivo
              </span>
            </div>

            {/* Controles rápidos de personalización de la tarjeta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Tu nombre en la tarjeta:
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Tu nombre aquí..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Tu Comuna:
                </label>
                <select
                  value={cardComuna}
                  onChange={(e) => setCardComuna(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                >
                  {COMUNAS_IBAGUE.map((c) => (
                    <option key={c.number} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Componente Visual de la Tarjeta (Renderizado en Pantalla) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-7">

              {/* Barra superior tricolor */}
              <div className="absolute top-0 left-0 right-0 h-2 flag-gradient" />

              {/* Marca de agua / resplandor */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Cabecera de la Tarjeta */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <img
                    src={CAMPAIGN_INFO.images.logo}
                    alt="Logo JP"
                    className="w-10 h-10 rounded-full border border-yellow-400 bg-white p-0.5 object-contain"
                  />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-yellow-400">
                      Concejo de Ibagué 2027
                    </p>
                    <p className="font-display font-black text-lg text-white leading-none">
                      JOHN POLO
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    OFICIAL
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5">#EsHoraDeCreer</span>
                </div>
              </div>

              {/* Cuerpo de la Tarjeta */}
              <div className="text-center py-4 px-2 relative z-10 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Yo Creo en Ibagué
                </p>
                <h4 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-red-400 tracking-tight">
                  {cardName.trim() || 'Ciudadano Ibaguereño'}
                </h4>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/30 text-red-200 border border-red-500/40 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{cardComuna}</span>
                </div>

                <p className="text-xs text-slate-300 italic mt-3 font-serif">
                  «Por una Ibagué que produce, recibe y crece. ¡Ibagué merece sonar más fuerte!»
                </p>
              </div>

              {/* Pie de la Tarjeta */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10 relative z-10">
                <span className="flex items-center gap-1 text-yellow-400 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  Voluntario Oficial
                </span>
                <span>www.johnpolo2027.com</span>
              </div>

            </div>

            {/* Botones de Acción de la Tarjeta */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={generateAndDownloadCard}
                disabled={isGenerating}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'Generando imagen...' : 'Descargar Mi Tarjeta'}</span>
              </button>

              <button
                onClick={shareCardWhatsApp}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir en WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};