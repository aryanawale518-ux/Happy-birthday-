import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart, Flame } from 'lucide-react';
import { ThreeGiftBox } from '../3d/ThreeGiftBox';
import cakeImage from '../../assets/images/birthday_cake_candlelight_1792781291476.jpg';

interface BirthdayRevealLayerProps {
  onContinue: () => void;
  birthdayName?: string;
  nickname?: string;
}

export const BirthdayRevealLayer: React.FC<BirthdayRevealLayerProps> = ({
  onContinue,
  birthdayName = 'Srushti',
  nickname = 'Susti',
}) => {
  const [boxOpened, setBoxOpened] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);

  const handleOpenBox = () => {
    if (!boxOpened) {
      setBoxOpened(true);

      // Silver & Marigold multi-stage celebration confetti
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#f8fafc', '#cbd5e1', '#d97706', '#9333ea'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f59e0b', '#fbbf24', '#f8fafc'],
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f59e0b', '#fbbf24', '#f8fafc'],
        });
      }, 350);
    }
  };

  const handleBlowCandle = () => {
    setCandleBlown(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fef08a', '#fbbf24', '#f8fafc'],
    });
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {!boxOpened ? (
          /* Real-time 3D Gift Box Stage */
          <div className="flex flex-col items-center animate-fadeIn w-full">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Layer 02 · 3D Physical Unboxing
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 mb-2">
              Unwrap Your 3D Surprise Box
            </h2>
            <p className="text-sm text-slate-300/80 max-w-md mx-auto mb-6">
              Drag to inspect the gift box in full 3D, then tap to untie the marigold & silver ribbons!
            </p>

            {/* Three.js Real-time 3D Gift Box */}
            <ThreeGiftBox isOpened={boxOpened} onOpen={handleOpenBox} />

            <div className="mt-4">
              <button
                onClick={handleOpenBox}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-slate-200 text-slate-950 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Tap to Open Lid in 3D</span>
              </button>
            </div>
          </div>
        ) : (
          /* Revealed Birthday Celebration Scene with 3D Depth */
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-medium mb-3 shadow-md">
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Happy Birthday!</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-slate-100 to-amber-200 tracking-tight mb-3">
              HAPPY BIRTHDAY, {birthdayName.toUpperCase()}! 🎂
            </h1>

            <p className="text-xl md:text-2xl font-handwriting text-amber-300 mb-6">
              Meri pyaari {nickname} ❤️
            </p>

            <p className="text-sm md:text-base text-slate-200 max-w-xl mx-auto leading-relaxed mb-8">
              To my comfort zone, my permanent drama partner, and my favourite human in
              the entire world. Today is all about celebrating you!
            </p>

            {/* 3D Elevated Candle & Cake Card in Deep Aubergine and Silver */}
            <div className="w-full max-w-lg bg-[#190a2c]/90 border border-slate-300/30 rounded-3xl p-5 shadow-2xl backdrop-blur-md mb-8 relative silver-metallic-glow">
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-4/3 max-h-64 border border-amber-400/30">
                <img
                  src={cakeImage}
                  alt="Birthday candlelight cake"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140624] via-transparent to-transparent opacity-75" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="text-amber-200 font-medium drop-shadow">
                    {candleBlown ? '✨ Wish released into the universe!' : '🔥 Golden candles are glowing'}
                  </span>
                </div>
              </div>

              {/* Interactive Candle Blow Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-slate-100">
                    {candleBlown ? 'Wish Sealed in Silver & Starlight! 💫' : 'Make a Birthday Wish'}
                  </h4>
                  <p className="text-xs text-slate-300/70">
                    {candleBlown
                      ? 'May every secret wish and dream come true for you, Susti.'
                      : 'Close your eyes, think of what you want most, and blow!'}
                  </p>
                </div>

                <button
                  onClick={handleBlowCandle}
                  disabled={candleBlown}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    candleBlown
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                      : 'bg-gradient-to-r from-amber-400 via-amber-300 to-slate-100 text-slate-950 hover:brightness-110 shadow-md font-semibold'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${candleBlown ? 'text-amber-400' : 'fill-slate-950'}`} />
                  <span>{candleBlown ? 'Wish Made ✨' : 'Blow The Candle'}</span>
                </button>
              </div>
            </div>

            {/* Transition to Layer 3 Button */}
            <button
              onClick={onContinue}
              className="py-3.5 px-8 rounded-xl font-semibold text-sm md:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl shadow-amber-950/40 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Things I Never Say Out Loud</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
