import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flag } from 'lucide-react';
import { CAMPAIGN_INFO } from '../data/campaignData';

interface CaballoLiberalProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'red' | 'tricolor' | 'sello' | 'card';
  showBadge?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CaballoLiberal: React.FC<CaballoLiberalProps> = ({
  size = 'md',
  variant = 'red',
  showBadge = false,
  interactive = true,
  className = '',
  onClick
}) => {
  const [isExcited, setIsExcited] = useState(false);

  const isSello = variant === 'sello';

  const sizeClasses = isSello
    ? {
        xs: 'w-10 h-10',
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
        xl: 'w-32 h-32',
        hero: 'w-44 h-44 sm:w-52 sm:h-52'
      }
    : {
        xs: 'w-9 h-14',
        sm: 'w-12 h-18',
        md: 'w-16 h-24',
        lg: 'w-24 h-36',
        xl: 'w-32 h-48',
        hero: 'w-44 h-64 sm:w-52 sm:h-72'
      };

  const getGifSrc = () => {
    switch (variant) {
      case 'tricolor':
        return CAMPAIGN_INFO.party.gifTricolor;
      case 'sello':
        return CAMPAIGN_INFO.party.gifSello;
      case 'card':
        return CAMPAIGN_INFO.party.gifCard;
      case 'red':
      default:
        return CAMPAIGN_INFO.party.gif;
    }
  };

  const handleInteraction = () => {
    if (!interactive) return;

    setIsExcited(true);
    setTimeout(() => setIsExcited(false), 1800);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFD600', '#2E7D32', '#D32F2F', '#FFFFFF']
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
      title="Caballo Animado Galopando con Bandera en Movimiento - John Polo Concejo 2027"
    >
      <div className="relative flex items-center justify-center">
        {/* Halo resplandeciente al interactuar o en hover */}
        <div
          className={`absolute -inset-2 rounded-full bg-red-600/20 blur-md pointer-events-none transition-all duration-500 ${
            isExcited ? 'opacity-100 scale-125 bg-red-600/40' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* GIF con Galope Esquelético de Patas y Bandera en Movimiento 3D */}
        <div
          className={`relative transition-transform duration-300 ${
            isExcited ? 'scale-110' : ''
          } ${interactive ? 'group-hover:scale-105 active:scale-95' : ''}`}
        >
          <img
            src={getGifSrc()}
            alt="Caballo Galopando con Bandera Ondulante - John Polo Concejo 2027"
            className={`${sizeClasses[size]} object-contain ${
              isSello
                ? 'rounded-full shadow-md border border-red-200'
                : 'drop-shadow-[0_4px_10px_rgba(211,47,47,0.4)]'
            }`}
          />
        </div>

        {isExcited && (
          <span className="absolute -top-2 -right-2 text-yellow-400 animate-ping">
            <Sparkles className="w-5 h-5 fill-current" />
          </span>
        )}
      </div>

      {showBadge && (
        <div className="mt-1.5 text-center">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100/90 border border-red-300 text-red-800 text-[11px] font-black uppercase tracking-wider shadow-xs group-hover:bg-red-700 group-hover:text-white transition-colors">
            <Flag className="w-3 h-3 fill-current text-red-600 group-hover:text-yellow-300" />
            <span>Partido Liberal</span>
          </div>
        </div>
      )}
    </div>
  );
};
