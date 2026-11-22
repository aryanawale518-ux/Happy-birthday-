import React, { useState, useEffect } from 'react';
import type { Memory } from '../../types';
import { fetchMemories } from '../../lib/supabase';
import { Maximize2, X, ArrowRight, Calendar, Tag } from 'lucide-react';
import scrapbookCover from '../../assets/images/polaroid_scrapbook_cover_1792781291960.jpg';

interface MemoriesLayerProps {
  onContinue: () => void;
  onOpenUpload: () => void;
}

export const MemoriesLayer: React.FC<MemoriesLayerProps> = ({ onContinue }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState<Memory | null>(null);

  useEffect(() => {
    loadMemories();
  }, [selectedCategory]);

  const loadMemories = async () => {
    setLoading(true);
    const res = await fetchMemories(selectedCategory);
    setMemories(res.memories);
    setLoading(false);
  };

  const categories = [
    { id: 'all', label: 'All Scrapbook Keepsakes' },
    { id: 'her_photos', label: 'Susti Photos' },
    { id: 'both_of_us', label: 'Both of Us' },
    { id: 'school_days', label: 'School Days' },
  ];

  return (
    <div className="min-h-[85vh] px-4 py-8 max-w-6xl mx-auto flex flex-col justify-center perspective-1000">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
          Layer 03 · 3D Polaroids & Moments
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 mb-3">
          Our Cherished Memories
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 max-w-xl mx-auto leading-relaxed">
          From the two golden school years to endless reels and late-night debriefs.
          Every picture holds a thousand unsaid feelings.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-950/40'
                : 'bg-[#1e0c35]/80 hover:bg-[#2b1049] text-slate-300 border border-slate-400/25'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3D Interactive Polaroid Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-[#18092a]/70 border border-slate-400/20 rounded-2xl p-4 animate-pulse h-80 flex flex-col justify-between"
            >
              <div className="w-full h-52 bg-[#2a0e46]/40 rounded-xl" />
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-[#2a0e46]/60 rounded w-3/4" />
                <div className="h-3 bg-[#2a0e46]/40 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {memories.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              style={{
                transform: `rotate(${((idx % 3) - 1) * 2}deg)`,
              }}
              className="group cursor-pointer bg-[#fcfbfa] text-slate-800 p-3.5 pb-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.05] hover:rotate-0 hover:z-20 relative flex flex-col border border-slate-300/80 hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)]"
            >
              {/* Metallic Silver clip and Marigold washi tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-18 h-6 bg-gradient-to-r from-amber-200/90 via-amber-300/90 to-amber-200/90 backdrop-blur-xs border border-amber-400/50 rotate-1 shadow-sm rounded-xs flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-400/40 rounded-full" />
              </div>

              {/* Photo Canvas */}
              <div className="w-full aspect-4/3 bg-slate-900/10 rounded-xl overflow-hidden relative mb-3 shadow-inner">
                <img
                  src={item.photo_url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = scrapbookCover;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-2 bg-slate-950/70 rounded-full text-amber-300 border border-slate-300/40 backdrop-blur-xs shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="px-1 flex flex-col justify-between flex-grow">
                <h4 className="font-handwriting text-2xl text-slate-900 font-bold tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-serif italic">
                  "{item.caption}"
                </p>
                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.date_label || 'Cherished Memory'}</span>
                  <span className="capitalize text-amber-700 font-medium">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3D Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#180829] border-2 border-slate-300/40 rounded-3xl overflow-hidden shadow-2xl animate-scaleUp text-slate-100 silver-metallic-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-4/3 w-full bg-black/60">
              <img
                src={activePhoto.photo_url}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span>{activePhoto.category.replace('_', ' ')}</span>
                <span>·</span>
                <Calendar className="w-3.5 h-3.5" />
                <span>{activePhoto.date_label || 'Golden Time'}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-serif italic">
                "{activePhoto.caption}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue CTA */}
      <div className="flex justify-center pb-8">
        <button
          onClick={onContinue}
          className="py-3.5 px-8 rounded-xl font-semibold text-sm md:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl shadow-amber-950/40 hover:brightness-110 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer group"
        >
          <span>Things I Never Say Out Loud</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
