import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { KeyRound, Lock, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import envelopeImage from '../../assets/images/envelope_magical_seal_1792781289715.jpg';

interface SecretEntryLayerProps {
  onUnlock: () => void;
}

export const SecretEntryLayer: React.FC<SecretEntryLayerProps> = ({ onUnlock }) => {
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const SECRET_KEY = (import.meta.env.VITE_SECRET_ENTRY_KEY || 'virat kohli')
    .trim()
    .toLowerCase();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();

    if (!cleanInput) {
      setErrorMsg('Please enter the secret key to break the seal.');
      triggerShake();
      return;
    }

    if (cleanInput === SECRET_KEY) {
      setErrorMsg('');
      setIsUnlocking(true);

      // Silver & Marigold confetti celebration
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f8fafc', '#cbd5e1', '#d97706'],
      });

      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      setErrorMsg('Oops! That is not the secret phrase. Think of your favourite legend... 😉');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 16,
      y: (x / rect.width) * 16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 relative perspective-1000">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
        {/* 3D Interactive Sealed Envelope with Silver & Marigold lighting */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative mb-6 group cursor-pointer"
        >
          {/* Ambient 3D Rim Glow in Marigold and Deep Aubergine */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/25 via-[#4a1677]/40 to-slate-200/20 rounded-3xl blur-2xl -z-10 group-hover:opacity-100 opacity-70 transition-opacity" />

          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-300/30 bg-[#160829] transform-style-3d">
            <img
              src={envelopeImage}
              alt="Sealed velvet envelope with golden wax stamp"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isUnlocking ? 'scale-110 brightness-125' : 'group-hover:scale-105'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0419] via-transparent to-transparent opacity-65" />

            {/* Glowing Marigold & Silver Wax Seal Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isUnlocking ? 'opacity-0 scale-150' : 'opacity-100'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-slate-100 p-0.5 shadow-2xl animate-pulse-subtle">
                <div className="w-full h-full rounded-full bg-[#1e0a36] flex items-center justify-center border border-amber-300/50">
                  <Lock className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>

            {/* Silver Sheen Highlight Overlay */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          </div>

          <span className="text-[11px] text-slate-300/70 mt-2 block font-medium">
            3D Interactive Envelope · Move cursor to tilt
          </span>
        </div>

        {/* Section Header */}
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
          Private Surprise Box
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 tracking-tight mb-3">
          A Little Surprise, Just for You.
        </h1>
        <p className="text-sm md:text-base text-slate-300/80 max-w-md mx-auto mb-8 leading-relaxed">
          Crafted in deep aubergine, silver, and marigold for someone truly irreplaceable.
          Enter your secret phrase to break the wax seal.
        </p>

        {/* Form Input */}
        <form
          onSubmit={handleVerify}
          className={`w-full max-w-md space-y-4 ${
            isShaking ? 'animate-[wiggle_0.4s_ease-in-out]' : ''
          }`}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-4 h-4 text-amber-400" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter secret phrase..."
              disabled={isUnlocking}
              className="w-full pl-11 pr-4 py-3.5 bg-[#170929]/90 border border-slate-400/30 focus:border-amber-400 rounded-xl text-white placeholder-slate-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-300 font-medium text-left px-1 flex items-center gap-1.5 animate-fadeIn">
              <span>⚠️</span> {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isUnlocking}
            className="w-full py-3.5 px-6 rounded-xl font-medium text-sm md:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl shadow-amber-950/40 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer font-semibold"
          >
            {isUnlocking ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                <span>Breaking The Wax Seal...</span>
              </>
            ) : (
              <>
                <span>Unlock My Surprise</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Playful Hint Option */}
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-slate-300/70 hover:text-amber-300 transition-colors flex items-center gap-1.5 underline decoration-slate-400/30 underline-offset-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Need a clue?</span>
          </button>

          {showHint && (
            <div className="mt-3 p-3 bg-[#200c38]/90 border border-amber-400/30 rounded-xl text-xs text-slate-200 max-w-sm animate-fadeIn shadow-lg">
              Jersey #18, King of the cricket field, RCB heartthrob... You know exactly who! 🏏✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
