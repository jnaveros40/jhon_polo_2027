import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';
import { openLegalModal } from './LegalPrivacyModal';

export const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jp_cookie_consent');
      if (!saved) {
        setVisible(true);
      }
    } catch {
      // ignore storage errors
    }

    const handleCleared = () => setVisible(true);
    window.addEventListener('jp-user-data-cleared', handleCleared);
    return () => window.removeEventListener('jp-user-data-cleared', handleCleared);
  }, []);

  const handleChoice = (choice: 'all' | 'essential') => {
    try {
      localStorage.setItem('jp_cookie_consent', choice);
      if (choice === 'essential') {
        localStorage.removeItem('jp_reports');
        localStorage.removeItem('jp_chat_history');
      }
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Aviso de cookies y almacenamiento local"
      className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-slate-950/95 text-white border-t-2 border-yellow-400/70 backdrop-blur-md shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-yellow-400/15 text-yellow-400 border border-yellow-400/30 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            <strong className="text-white font-display font-bold block sm:inline">
              Privacidad y Almacenamiento Local (Ley 1581 de 2012):{' '}
            </strong>
            No utilizamos cookies publicitarias ni píxeles de rastreo de terceros. Solo usamos almacenamiento local (<code>localStorage</code>) para funcionamiento esencial (PWA) y, si lo aceptas, para guardar en tu propio dispositivo el historial de tus reportes barriales. Puedes consultar nuestra{' '}
            <button
              type="button"
              onClick={() => openLegalModal('privacidad')}
              className="text-yellow-400 hover:text-yellow-300 font-bold underline"
            >
              Política de Privacidad
            </button>{' '}
            o{' '}
            <button
              type="button"
              onClick={() => openLegalModal('borrar-datos')}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline"
            >
              borrar tus datos
            </button>{' '}
            en cualquier momento.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            Solo Esenciales (Rechazar opcionales)
          </button>
          <button
            type="button"
            onClick={() => handleChoice('all')}
            className="flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-display font-extrabold bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Aceptar Todo</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
