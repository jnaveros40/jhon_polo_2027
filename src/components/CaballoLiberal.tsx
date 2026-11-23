import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flag } from 'lucide-react';
import { CAMPAIGN_INFO } from '../data/campaignData';

interface CaballoLiberalProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showBadge?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CaballoLiberal: React.FC<CaballoLiberalProps> = ({
  size = 'md',
  showBadge = false,
  animated = true,
  interactive = true,
  className = '',
  onClick
}) => {
  const [isExcited, setIsExcited] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-10',
    sm: 'w-8 h-14',
    md: 'w-14 h-24',
    lg: 'w-20 h-32',
    xl: 'w-28 h-44',
    hero: 'w-36 h-56 sm:w-44 sm:h-64'
  };

  const handleInteraction = () => {
    if (!interactive) return;

    setIsExcited(true);
    setTimeout(() => setIsExcited(false), 2000);

    // Confeti rojo y dorado festivo del Partido Liberal y la bandera
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D32F2F', '#EF4444', '#FBC02D', '#FFFFFF']
    });

    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleInteraction}
      className={`inline-flex flex-col items-center select-none ${
        interactive ? 'cursor-pointer group' : ''
      } ${className}`}
      title="Partido Liberal Colombiano - Símbolo Oficial: El Jinete Rojo"
    >
      <div className="relative">
        {/* Halo resplandeciente rojo al interactuar o en hover */}
        <div
          className={`absolute -inset-2 rounded-full bg-red-600/20 blur-md pointer-events-none transition-all duration-500 ${
            isExcited ? 'opacity-100 scale-125 bg-red-600/40' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Gráfico Vectorial del Caballo Liberal */}
        <div
          className={`relative transition-transform duration-300 ${
            animated ? (isExcited ? 'animate-horse-fast' : 'animate-horse-gallop') : ''
          } ${interactive ? 'group-hover:scale-105 active:scale-95' : ''}`}
        >
          <img
            src={CAMPAIGN_INFO.party.svg}
            alt="Caballo y Jinete - Partido Liberal Colombiano"
            className={`${sizeClasses[size]} object-contain drop-shadow-[0_4px_10px_rgba(211,47,47,0.35)]`}
            onError={(e) => {
              // Fallback a JPG si el SVG tuviese algún inconveniente de carga
              const target = e.currentTarget;
              target.src = CAMPAIGN_INFO.party.jpg;
            }}
          />
        </div>

        {/* Micro-destello de energía */}
        {isExcited && (
          <span className="absolute -top-2 -right-2 text-yellow-400 animate-ping">
            <Sparkles className="w-5 h-5 fill-current" />
          </span>
        )}
      </div>

      {/* Badge / Etiqueta Opcional de Identidad Liberal */}
      {showBadge && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100/90 border border-red-300 text-red-800 text-[11px] font-black uppercase tracking-wider shadow-xs group-hover:bg-red-700 group-hover:text-white transition-colors">
            <Flag className="w-3 h-3 fill-current text-red-600 group-hover:text-yellow-300" />
            <span>Partido Liberal</span>
          </div>
        </div>
      )}
    </div>
  );
};

