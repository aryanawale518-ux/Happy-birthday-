import React from 'react';
import type { LayerNumber } from '../types';

interface NavigationHeaderProps {
  currentLayer: LayerNumber;
  maxUnlockedLayer: LayerNumber;
  onSelectLayer: (layer: LayerNumber) => void;
  onOpenSupabaseModal: () => void;
}

const LAYER_TITLES = [
  { num: 1 as LayerNumber, label: '01. Secret Entry' },
  { num: 2 as LayerNumber, label: '02. 3D Reveal' },
  { num: 3 as LayerNumber, label: '03. If You Only Knew' },
  { num: 4 as LayerNumber, label: '04. 3D Nested Gifts' },
  { num: 5 as LayerNumber, label: '05. Forever Letter' },
];

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentLayer,
  maxUnlockedLayer,
  onSelectLayer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0417]/90 backdrop-blur-md border-b border-slate-300/15 px-4 md:px-8 py-3 flex items-center justify-between gap-8 transition-colors">
      {/* Zone 1: Single text element brand wordmark */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onSelectLayer(1)}
          className="text-base md:text-lg font-serif font-bold tracking-tight text-slate-100 hover:text-amber-300 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <span>For Srushti</span>
          <span className="text-amber-400">✨</span>
        </button>
      </div>

      {/* Zone 2: Clean single-line text links */}
      <nav className="hidden lg:flex items-center gap-5 text-xs text-slate-300/70 overflow-x-auto py-1">
        {LAYER_TITLES.map((layer) => {
          const isUnlocked = layer.num <= maxUnlockedLayer;
          const isActive = layer.num === currentLayer;

          return (
            <button
              key={layer.num}
              onClick={() => isUnlocked && onSelectLayer(layer.num)}
              disabled={!isUnlocked}
              className={`whitespace-nowrap shrink-0 transition-all font-medium ${
                isActive
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5'
                  : isUnlocked
                  ? 'text-slate-200 hover:text-amber-300'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              {layer.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Clean end spacing without Supabase details */}
      <div className="hidden sm:block w-8" />
    </header>
  );
};
