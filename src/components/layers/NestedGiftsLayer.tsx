import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Heart, Coffee, ShieldCheck } from 'lucide-react';
import { ThreeNestedGift } from '../3d/ThreeNestedGift';

interface NestedGiftsLayerProps {
  onContinue: () => void;
}

export const NestedGiftsLayer: React.FC<NestedGiftsLayerProps> = ({ onContinue }) => {
  const [currentBox, setCurrentBox] = useState<1 | 2 | 3>(1);
  const [boxState, setBoxState] = useState<{
    box1Opened: boolean;
    box2Opened: boolean;
    box3Opened: boolean;
  }>({
    box1Opened: false,
    box2Opened: false,
    box3Opened: false,
  });

  const handleOpenCurrentBox = (boxNumber: 1 | 2 | 3) => {
    if (boxNumber === 1 && !boxState.box1Opened) {
      setBoxState((prev) => ({ ...prev, box1Opened: true }));
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f8fafc', '#cbd5e1'],
      });
    } else if (boxNumber === 2 && !boxState.box2Opened) {
      setBoxState((prev) => ({ ...prev, box2Opened: true }));
      confetti({
        particleCount: 75,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f8fafc', '#d97706'],
      });
    } else if (boxNumber === 3 && !boxState.box3Opened) {
      setBoxState((prev) => ({ ...prev, box3Opened: true }));
      confetti({
        particleCount: 95,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#f8fafc', '#cbd5e1', '#d97706', '#a855f7'],
      });
    }
  };

  return (
    <div className="min-h-[85vh] px-4 py-8 max-w-4xl mx-auto flex flex-col justify-center perspective-1000">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
          Layer 04 · 3D Nested Gift Experience
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 mb-2">
          The Gift Inside The Gift 🎁
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 max-w-lg mx-auto">
          Rotate each 3D box in physical space, unpack its surprise, and unlock the next
          nested layer.
        </p>

        {/* Step indicator in Silver, Deep Aubergine & Marigold */}
        <div className="flex items-center justify-center gap-3 mt-4 text-xs flex-wrap">
          <span
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              currentBox === 1
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : boxState.box1Opened
                ? 'bg-[#220c3b] text-slate-300 border border-slate-400/30'
                : 'text-slate-500'
            }`}
          >
            1. Aubergine Tease
          </span>
          <span className="text-amber-500 font-bold">→</span>
          <span
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              currentBox === 2
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : boxState.box2Opened
                ? 'bg-[#220c3b] text-slate-300 border border-slate-400/30'
                : 'text-slate-500'
            }`}
          >
            2. Marigold Pass
          </span>
          <span className="text-amber-500 font-bold">→</span>
          <span
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              currentBox === 3
                ? 'bg-gradient-to-r from-amber-400 to-slate-200 text-slate-950 font-bold shadow-md'
                : boxState.box3Opened
                ? 'bg-[#220c3b] text-slate-300 border border-slate-400/30'
                : 'text-slate-500'
            }`}
          >
            3. Liquid Silver Promise
          </span>
        </div>
      </div>

      {/* Main 3D Stage */}
      <div className="bg-[#170929]/90 border-2 border-slate-300/30 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden mb-8 silver-metallic-glow">
        {/* BOX 1: The Playful Tease */}
        {currentBox === 1 && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            {!boxState.box1Opened ? (
              <div className="flex flex-col items-center my-3">
                <ThreeNestedGift
                  currentStage={1}
                  isOpened={boxState.box1Opened}
                  onOpen={() => handleOpenCurrentBox(1)}
                />
                <button
                  onClick={() => handleOpenCurrentBox(1)}
                  className="mt-2 px-6 py-2 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  Click to Unbox Stage 1
                </button>
              </div>
            ) : (
              <div className="w-full max-w-lg bg-[#fdfaf5] text-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-amber-400 animate-scaleUp">
                <div className="flex items-center justify-center gap-2 mb-2 text-amber-700">
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Legal & Emotional Agreement
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-black text-slate-900 mb-3 tracking-tight">
                  OFFICIAL LIFETIME BESTIE CONTRACT 💅
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-4">
                  This contract confirms that you are stuck with me for <b>LIFE</b>. No
                  refunds, no replacements, and absolutely no cancellation allowed!
                </p>

                <div className="text-left bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-5 text-xs md:text-sm space-y-2 text-slate-700 font-sans">
                  <div className="font-semibold text-amber-900 text-xs uppercase tracking-wide mb-1">
                    Your Non-Negotiable Duties Include:
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✨</span>
                    <span>24/7 availability for drama and gossip.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🍕</span>
                    <span>Unlimited food plans (even if we never actually go 😭).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👂</span>
                    <span>Listening to my nonsense without judging me.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>Sending reels and replying before I lose my patience!</span>
                  </div>
                </div>

                <div className="text-xs italic text-slate-500 font-serif mb-6">
                  Signed, sealed, and emotionally blackmailed forever. 😂❤️
                </div>

                <button
                  onClick={() => {
                    setCurrentBox(2);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 px-5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:brightness-110"
                >
                  <span>Okay, lifetime contract accepted 😂</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* BOX 2: The Core Memory Pass */}
        {currentBox === 2 && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            {!boxState.box2Opened ? (
              <div className="flex flex-col items-center my-3">
                <ThreeNestedGift
                  currentStage={2}
                  isOpened={boxState.box2Opened}
                  onOpen={() => handleOpenCurrentBox(2)}
                />
                <button
                  onClick={() => handleOpenCurrentBox(2)}
                  className="mt-2 px-6 py-2 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  Click to Unbox Stage 2
                </button>
              </div>
            ) : (
              <div className="w-full max-w-lg bg-gradient-to-r from-amber-50 to-orange-50 text-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-dashed border-amber-400 animate-scaleUp relative">
                {/* Vintage Ticket Notches */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#170929] border border-amber-400" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#170929] border border-amber-400" />

                <div className="flex items-center justify-center gap-2 mb-2 text-amber-700">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Vip Golden Bestie Pass
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-black text-amber-950 mb-3 tracking-tight">
                  ONE FREE PASS — NO EXPIRY DATE 🎟️
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  This ticket is redeemable for one unlimited late-night chai or coffee
                  session with your favourite person (me, obviously).
                </p>

                <div className="bg-amber-100/70 border border-amber-300/70 rounded-xl p-4 mb-5 text-xs md:text-sm text-left space-y-2 text-slate-800 font-serif">
                  <p>• No time limits.</p>
                  <p>• No awkward silences.</p>
                  <p>• No “I have to go now.”</p>
                  <p className="pt-1 font-sans font-medium text-amber-900">
                    Just us, our endless gossip, our stupid jokes, and all the
                    conversations we still need to catch up on.
                  </p>
                </div>

                <div className="text-xs font-semibold text-amber-900 mb-6 bg-amber-100/90 py-1.5 px-3 rounded-lg border border-amber-300">
                  Valid forever. Distance not accepted as an excuse! 🫂☕
                </div>

                <button
                  onClick={() => {
                    setCurrentBox(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 px-5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:brightness-110"
                >
                  <span>Claim my forever token 💗</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* BOX 3: The Deepest Surprise */}
        {currentBox === 3 && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            {!boxState.box3Opened ? (
              <div className="flex flex-col items-center my-3">
                <ThreeNestedGift
                  currentStage={3}
                  isOpened={boxState.box3Opened}
                  onOpen={() => handleOpenCurrentBox(3)}
                />
                <button
                  onClick={() => handleOpenCurrentBox(3)}
                  className="mt-2 px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-slate-200 to-amber-400 text-slate-950 shadow-lg cursor-pointer transition-transform active:scale-95"
                >
                  Click to Unbox Final Silver Box
                </button>
              </div>
            ) : (
              <div className="w-full max-w-xl bg-[#fffefb] text-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-slate-300 animate-scaleUp text-left">
                <div className="flex items-center gap-2 mb-2 text-amber-600">
                  <Heart className="w-5 h-5 fill-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    A Lifelong Promise
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-black text-slate-900 mb-4 tracking-tight">
                  TO MY FOREVER BESTIE, SUSTI 💌
                </h3>

                <div className="space-y-3.5 text-sm md:text-base leading-relaxed text-slate-700 font-serif">
                  <p>
                    Life might take us to different places. We don't get to meet often
                    and interact mostly in online mode — aur sach bolu toh{' '}
                    <span className="font-bold text-amber-700">
                      main tujhse milne ke liye taras rahi hoon!
                    </span>{' '}
                    We might get busy, talk less, and miss each other more than we say.
                  </p>
                  <p>
                    But one thing will never change: you will always have your No. 1
                    cheerleader in me.
                  </p>
                  <p>
                    I'll celebrate your wins, stand beside you on your difficult days,
                    and remind you of your worth whenever you forget it.
                  </p>
                  <p>
                    You never have to face everything alone, okay? No matter how far
                    apart we are, you'll always have me in your corner.
                  </p>
                  <p className="pt-2 font-bold text-slate-900">
                    Different places, different lives, but forever my best friend. ♾️❤️
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200">
                  <button
                    onClick={onContinue}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm md:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl shadow-amber-950/40 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>One last thing, Susti… 💌</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
