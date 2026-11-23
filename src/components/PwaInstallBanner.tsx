import React, { useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const PwaInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, installPwa } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || !isInstallable || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border-2 border-red-600/60 backdrop-blur-md relative overflow-hidden">

        {/* Borde superior tricolor de Ibagué */}
        <div className="absolute top-0 left-0 right-0 h-1 flag-gradient" />

        <div className="flex items-start justify-between gap-3">
          <div className="p-2.5 rounded-xl bg-red-700 text-white shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-display font-black text-white">
                Instala la App de John Polo
              </span>
              <span className="text-[10px] bg-yellow-400 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              Accede a las propuestas, reporta tu comuna y genera tu tarjeta sin gastar datos y con acceso rápido en tu celular.
            </p>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={installPwa}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Instalar Ahora</span>
              </button>

              <button
                onClick={() => setDismissed(true)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Quizás luego
              </button>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};