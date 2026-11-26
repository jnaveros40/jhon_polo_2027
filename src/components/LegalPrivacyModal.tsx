import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Trash2,
  Scale,
  CheckCircle2,
  MessageCircle,
  Lock,
  ExternalLink
} from 'lucide-react';
import { CAMPAIGN_INFO, buildWhatsAppUrl } from '../data/campaignData';

export type LegalTab = 'terminos' | 'privacidad' | 'responsable' | 'borrar-datos';

export const openLegalModal = (tab: LegalTab = 'privacidad') => {
  window.dispatchEvent(new CustomEvent('jp-open-legal-modal', { detail: { tab } }));
};

export const clearAllLocalUserData = (): number => {
  let removedCount = 0;
  try {
    const keys = ['jp_reports', 'jp_cookie_consent', 'jp_chat_history'];
    keys.forEach((k) => {
      if (localStorage.getItem(k) !== null) {
        removedCount++;
        localStorage.removeItem(k);
      }
    });
  } catch {
    // ignore storage errors
  }
  window.dispatchEvent(new CustomEvent('jp-user-data-cleared'));
  return removedCount;
};

export const LegalPrivacyModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LegalTab>('privacidad');
  const [dataClearedMsg, setDataClearedMsg] = useState<string | null>(null);
  const [storedReportsCount, setStoredReportsCount] = useState<number>(0);

  const refreshCounts = () => {
    try {
      const rep = JSON.parse(localStorage.getItem('jp_reports') || '[]');
      setStoredReportsCount(Array.isArray(rep) ? rep.length : 0);
    } catch {
      setStoredReportsCount(0);
    }
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ tab?: LegalTab }>;
      if (custom.detail?.tab) {
        setActiveTab(custom.detail.tab);
      }
      refreshCounts();
      setDataClearedMsg(null);
      setIsOpen(true);
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('jp-open-legal-modal', handler);
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('jp-open-legal-modal', handler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDeleteLocalData = () => {
    clearAllLocalUserData();
    refreshCounts();
    setDataClearedMsg(
      '¡Listo! Se eliminaron todos tus reportes locales, preferencias de cookies e historial de chat de este navegador.'
    );
  };

  const habeasDataWhatsAppUrl = buildWhatsAppUrl(
    `⚖️ *SOLICITUD DE SUPRESIÓN DE DATOS (HABEAS DATA - LEY 1581 DE 2012)*\n\n` +
      `Solicito formalmente la eliminación y supresión de mis datos personales (nombre y número telefónico) de las bases de contacto ciudadano y listas de difusión de la campaña de John Fredy Polo Campos al Concejo de Ibagué 2027-2030.`
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Barra superior tricolor */}
        <div className="h-2 w-full flag-gradient" />

        {/* Cabecera */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-700 text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-yellow-400 block">
                Cumplimiento Legal Colombia • Ley 1581 de 2012 & Ley 1475 de 2011
              </span>
              <h2 id="legal-modal-title" className="text-lg sm:text-xl font-display font-black">
                Centro de Privacidad, Habeas Data y Términos Legales
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Cerrar ventana legal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas */}
        <div
          className="flex flex-wrap gap-1.5 p-3 bg-slate-100 border-b border-slate-200"
          role="tablist"
          aria-label="Secciones legales"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'privacidad'}
            onClick={() => setActiveTab('privacidad')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'privacidad'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Política de Privacidad (Ley 1581)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'terminos'}
            onClick={() => setActiveTab('terminos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'terminos'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Términos y Condiciones</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'responsable'}
            onClick={() => setActiveTab('responsable')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'responsable'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Responsable, Integraciones y Licencias</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'borrar-datos'}
            onClick={() => setActiveTab('borrar-datos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'borrar-datos'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Borrar Mis Datos (Derecho de Supresión)</span>
          </button>
        </div>

        {/* Contenido de la Pestaña Activa */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
          {activeTab === 'privacidad' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-display font-black text-slate-900 mb-1">
                  Política de Tratamiento de Datos Personales (Ley 1581 de 2012 y Decreto 1377 de 2013)
                </h3>
                <p className="text-xs text-slate-600">
                  En cumplimiento del Régimen General de Protección de Datos Personales de Colombia (Ley Estatutaria 1581 de 2012, Decreto Reglamentario 1377 de 2013 y título V de la Circular Única de la Superintendencia de Industria y Comercio - SIC), informamos a los ciudadanos de Ibagué y Colombia nuestras condiciones de privacidad.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-extrabold text-slate-900">
                  1. ¿Qué datos recopilamos y bajo qué principio de minimización?
                </h4>
                <p>
                  Aplicamos estrictamente el principio de minimización de datos: <strong>no creamos cuentas con contraseñas en servidores ocultos ni exigimos cédula, dirección domiciliaria exacta ni datos financieros</strong>. Únicamente solicitamos:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>En el Buzón Territorial:</strong> Nombre o Junta de Acción Comunal (obligatorio), Comuna/Corregimiento (obligatorio), descripción de la problemática barrial (obligatorio) y teléfono/WhatsApp (<strong>opcional</strong>).
                  </li>
                  <li>
                    <strong>En el Registro de Voluntariado:</strong> Nombre completo, número de WhatsApp (necesario para coordinar la red territorial), comuna y rol de voluntariado.
                  </li>
                  <li>
                    <strong>En la Tarjeta Digital de Apoyo y Chat Interactivo:</strong> Se procesan localmente en el navegador del dispositivo (`Canvas 2D` y memoria local) sin almacenarse en bases de datos en la nube.
                  </li>
                </ul>

                <h4 className="font-display font-extrabold text-slate-900">
                  2. Finalidad del tratamiento de los datos
                </h4>
                <p>
                  Los datos suministrados voluntariamente mediante consentimiento previo, expreso e informado se utilizan exclusivamente para: (a) sistematizar problemáticas barriales y veredales para insumos de control político y proyectos de Acuerdo Municipal rumbo al Concejo de Ibagué 2027–2030; y (b) contactar a los ciudadanos mayores de 18 años que deseen participar como voluntarios o recibir información programática.
                </p>

                <h4 className="font-display font-extrabold text-slate-900">
                  3. Prohibición de tratamiento de datos de menores de edad (Art. 7 Ley 1581/2012)
                </h4>
                <p>
                  Esta plataforma cívica y política está dirigida <strong>exclusivamente a ciudadanos mayores de dieciocho (18) años</strong> habilitados para el ejercicio de derechos políticos en Colombia. No recolectamos intencionalmente datos de niños, niñas o adolescentes. Cada formulario exige declaración expresa de mayoría de edad antes de su envío.
                </p>

                <h4 className="font-display font-extrabold text-slate-900">
                  4. Derechos de los Titulares (ARCO / Habeas Data - Art. 8 Ley 1581/2012)
                </h4>
                <p>
                  Como titular de tus datos tienes derecho gratuito y en cualquier momento a: <strong>Conocer, Actualizar, Rectificar y Suprimir (Borrar)</strong> tus datos, así como a <strong>Revocar la autorización</strong> otorgada o darte de baja en un solo clic escribiendo la palabra <strong>«BAJA»</strong> o <strong>«ELIMINAR DATOS»</strong> en nuestro canal oficial de WhatsApp o desde la pestaña <em>«Borrar Mis Datos»</em> de esta ventana.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terminos' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-display font-black text-slate-900 mb-1">
                  Términos y Condiciones de Uso de la Plataforma Ciudadana
                </h3>
                <p className="text-xs text-slate-600">
                  Última actualización: Noviembre de 2026 • Jurisdicción aplicable: República de Colombia (Ibagué, Tolima).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-extrabold text-slate-900">
                  1. Naturaleza gratuita y no comercial del sitio (Sin pagos ni costos ocultos)
                </h4>
                <p>
                  La plataforma <strong>{CAMPAIGN_INFO.website}</strong> es un portal informativo, programático y de participación ciudadana de acceso <strong>100% gratuito</strong>. En esta aplicación <strong>NO se realizan ventas en línea, NO se cobran suscripciones, NO se reciben donaciones monetarias por pasarelas de pago y NO existen costos ocultos</strong>. En consecuencia, no resultan aplicables cargos de envío, políticas de devolución comercial ni botón de retracto de compra (Art. 47 Ley 1480 de 2011).
                </p>

                <h4 className="font-display font-extrabold text-slate-900">
                  2. Uso del Buzón Territorial, Generador de Tarjetas y Asistente IA
                </h4>
                <p>
                  El usuario se compromete a utilizar los formularios y el asistente interactivo de buena fe, absteniéndose de remitir información falsa, difamatoria o que vulnere derechos de terceros. Al pulsar los botones de envío por WhatsApp, la aplicación abre la ventana oficial de WhatsApp (`wa.me`) para que el propio usuario revise y confirme manualmente el envío de su mensaje.
                </p>

                <h4 className="font-display font-extrabold text-slate-900">
                  3. Alcance de las propuestas programáticas (Promesas comprobables y competencia legal)
                </h4>
                <p>
                  Todas las cifras diagnósticas citadas en el sitio (como pérdidas técnicas de agua en el IBAL, inventario de vías terciarias en las 144 veredas, parque automotor de Ibagué y servicio de la deuda según el Marco Fiscal de Mediano Plazo MFMP 2026–2035) corresponden a estimaciones técnicas documentadas en el <strong>Documento Maestro 2027–2030</strong>. Las propuestas se enmarcan estrictamente dentro de las competencias constitucionales de un Concejal Municipal (<strong>Art. 313 de la Constitución Política de Colombia y Ley 136 de 1994</strong>: iniciativa de Acuerdos Municipales, debate de control político y aprobación del presupuesto y Plan de Desarrollo).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'responsable' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-display font-black text-slate-900">
                  Identificación del Responsable y Transparencia Electoral (Ley 1475 de 2011 / CNE)
                </h3>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>
                    <strong>Responsable del Tratamiento y Candidato:</strong> {CAMPAIGN_INFO.candidateFullName} («{CAMPAIGN_INFO.candidateShortName}»).
                  </li>
                  <li>
                    <strong>Organización Política / Aval:</strong> {CAMPAIGN_INFO.party.name} — Aspiración al {CAMPAIGN_INFO.campaignTitle}.
                  </li>
                  <li>
                    <strong>Domicilio y Jurisdicción:</strong> Municipio de Ibagué, Departamento del Tolima, República de Colombia.
                  </li>
                  <li>
                    <strong>Canal Oficial de Contacto y Habeas Data (Ley 1581/2012):</strong> Línea WhatsApp Oficial +{CAMPAIGN_INFO.whatsappNumber} ({CAMPAIGN_INFO.phoneDisplay}) • Web: {CAMPAIGN_INFO.website}.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-extrabold text-slate-900">
                  Transparencia sobre Integraciones de Terceros (Punto 10)
                </h4>
                <p>
                  Esta aplicación web progresiva (PWA) opera con arquitectura de privacidad por diseño (<em>Privacy by Design</em>):
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Sin píxeles publicitarios ocultos:</strong> No cargamos Meta Pixel, Google Analytics ni scripts de rastreo comportamental de terceros en el código fuente.
                  </li>
                  <li>
                    <strong>Google Fonts (`fonts.googleapis.com`):</strong> Se utiliza únicamente para cargar las tipografías de código abierto <em>Montserrat</em> e <em>Inter</em> (bajo licencia <strong>SIL Open Font License 1.1</strong>).
                  </li>
                  <li>
                    <strong>API de Enlace a WhatsApp (`wa.me`):</strong> Solo se abre cuando el usuario hace clic voluntariamente en un botón de contacto o envío de formulario, tras marcar la casilla de consentimiento.
                  </li>
                  <li>
                    <strong>Hosting en Vercel Inc.:</strong> Registra únicamente logs técnicos estándar de red (dirección IP y cabeceras HTTP) por seguridad y disponibilidad del servicio.
                  </li>
                </ul>

                <h4 className="font-display font-extrabold text-slate-900 pt-2">
                  Licencias de Tipografías, Iconos e Imágenes (Punto 4)
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Tipografías:</strong> <em>Montserrat</em> e <em>Inter</em> — Licencia abierta comercial y política <strong>SIL Open Font License (OFL 1.1)</strong>.
                  </li>
                  <li>
                    <strong>Iconografía:</strong> Librería <code>lucide-react</code> — Licencia abierta <strong>ISC / MIT License</strong>.
                  </li>
                  <li>
                    <strong>Fotografías e Ilustraciones de Campaña:</strong> Fotografías propias del candidato {CAMPAIGN_INFO.candidateFullName}, emblemas vectoriales de campaña e ilustraciones generadas para el equipo de comunicaciones.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'borrar-datos' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h3 className="text-base font-display font-black text-emerald-950 mb-1">
                  Ejercicio Inmediato del Derecho de Supresión y Revocatoria (Art. 8 Ley 1581 de 2012)
                </h3>
                <p className="text-xs text-emerald-900">
                  Aquí puedes eliminar en un solo clic cualquier dato guardado en el almacenamiento local de tu navegador y solicitar la baja o eliminación inmediata de tu contacto en nuestra red ciudadana.
                </p>
              </div>

              {dataClearedMsg && (
                <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{dataClearedMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-red-700 tracking-wider">
                      1. Datos en tu Navegador (LocalStorage)
                    </span>
                    <h4 className="text-base font-display font-black text-slate-900 mt-1">
                      Borrar Reportes Locales, Chat y Cookies
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Actualmente tienes <strong>{storedReportsCount} reporte(s)</strong> guardados localmente en este dispositivo (`jp_reports`), además de tus preferencias de cookies e historial del asistente IA.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteLocalData}
                    className="w-full py-3 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Borrar Todos Mis Datos Locales Ahora</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase text-emerald-700 tracking-wider">
                      2. Baja de Listas de Contacto / WhatsApp
                    </span>
                    <h4 className="text-base font-display font-black text-slate-900 mt-1">
                      Solicitar Supresión por Habeas Data
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Si enviaste un reporte o te inscribiste como voluntario por WhatsApp y deseas que eliminemos tu número y nombre de nuestra lista de difusión ciudadana, haz clic abajo:
                    </p>
                  </div>
                  <a
                    href={habeasDataWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enviar Solicitud de Baja por WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-4">
          <span className="text-[11px] text-slate-500 font-medium">
            Presiona <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-bold">Esc</kbd> para cerrar esta ventana
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs transition-all"
          >
            Entendido y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
