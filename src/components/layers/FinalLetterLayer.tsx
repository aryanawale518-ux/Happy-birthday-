import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  RotateCcw,
  Share2,
  Check,
} from 'lucide-react';
import celestialBg from '../../assets/images/celestial_stars_portrait_1792781292972.jpg';

interface FinalLetterLayerProps {
  onReplay: () => void;
  birthdayName?: string;
  nickname?: string;
}

export const FinalLetterLayer: React.FC<FinalLetterLayerProps> = ({
  onReplay,
  birthdayName = 'Srushti',
  nickname = 'Susti',
}) => {
  const [copied, setCopied] = useState(false);

  const triggerCelebration = () => {
    confetti({
      particleCount: 130,
      spread: 95,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f8fafc', '#cbd5e1', '#d97706', '#9333ea'],
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-[90vh] px-4 py-10 max-w-4xl mx-auto flex flex-col justify-center relative perspective-1000">
      {/* Cinematic Starlight Hero Background Frame in Deep Aubergine & Silver */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-slate-300/40 shadow-2xl mb-10 silver-metallic-glow">
        <div className="w-full h-64 md:h-80 relative">
          <img
            src={celestialBg}
            alt="Dreamy celestial night sky with golden shooting stars"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140624] via-[#200c35]/40 to-transparent" />

          {/* Floating Starlit Title */}
          <div className="absolute bottom-6 inset-x-6 text-center">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 block">
              Layer 05 · The Final Surprise
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
              A Letter for My Forever Best Friend 💌
            </h1>
            <p className="font-handwriting text-amber-300 text-2xl mt-1">
              Happy Birthday, meri pyaari {nickname}! ❤️🎂
            </p>
          </div>
        </div>
      </div>

      {/* Main Letter Card in Deep Aubergine, Silver & Marigold */}
      <div className="bg-[#fffefb] text-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl border-4 border-slate-300 relative mb-10 silver-metallic-glow">
        {/* Decorative Stamps & Marigold Heart */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-300">
              <Heart className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                To: {birthdayName} ({nickname})
              </span>
              <span className="text-xs text-slate-500 font-serif">
                Special Birthday Edition
              </span>
            </div>
          </div>

          <button
            onClick={triggerCelebration}
            className="px-4 py-2 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Rain Confetti</span>
          </button>
        </div>

        {/* Verbatim Letter Content */}
        <div className="space-y-4 font-serif text-sm md:text-base leading-relaxed text-slate-800">
          <p className="font-bold text-xl text-slate-900">
            Happy Birthday, Susti! ❤️🎂
          </p>

          <p>
            I don't even know where to start, because there's so much I want to tell
            you. But first of all, thank you, God, for giving me a best friend like
            her. Someone jiski jagah meri life mein koi nahi le sakta.
          </p>

          <p>
            School ke woh do saal mere liye itne special hain, and I'm so glad ki un
            memories mein tu hai. You became my comfort zone, the person who understands
            me even when I can't explain what's going on in my mind. And honestly, I'm
            so lucky to have you.
          </p>

          <p>
            But yaar, ab tu bhi door chali gayi aur main bhi. We don't even talk every
            day like we used to, and sometimes I really miss that. Phone check karti
            hoon ki shayad tera message aaya hoga. Khair, main hi reels bhej bhej ke
            pareshan karti rahungi tujhe. But agar uspe bhi reply nahi kiya na, toh
            dekh phir! 😂😭
          </p>

          <p>
            I miss you so much, yaar. College mein jab bhi do best friends ko saath
            dekhti hoon na, teri yaad aa jaati hai. Bas ab jaldi milne aa ja. Aur iss
            baar sirf 5–10 minutes ke liye nahi! Proper long visit chahiye, with a
            night-out, endless gossip, photos, reels, aur itni memories ki phone ki
            storage full ho jaaye. Obviously, Instagram pe apni bachpan wali friendship
            flaunt bhi karni hai. 🫂📸
          </p>

          <p>
            On your birthday, I just want you to know that no matter how busy life gets
            or how far apart we live, you'll always be one of the most important
            people in my life. I hope you get all the happiness you deserve, achieve
            everything you dream of, and never forget how special you are to me.
          </p>

          <p>
            And if I could go back to those school days and choose my best friend all
            over again, I'd still choose you. Every single time. ❤️
          </p>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 my-6 text-slate-800 font-sans shadow-inner">
            <p className="font-bold text-amber-900 text-sm md:text-base mb-1">
              Happy Birthday, meri pyaari Susti.
            </p>
            <p className="text-xs md:text-sm text-slate-700">
              I love you, I miss you, and now PLEASE COME MEET ME SOON. Our gossip
              sessions are pending, madam! 😭💗
            </p>
          </div>

          <p className="font-semibold text-slate-900 italic">
            Some friendships don't need daily conversations to stay special. And you,
            Susti, will always be my person. 💌
          </p>
        </div>

        {/* Memorable Closing Line */}
        <div className="mt-10 pt-6 border-t border-amber-200 text-center">
          <p className="font-handwriting text-3xl md:text-4xl text-amber-700 font-bold">
            "This little world was made just for you."
          </p>
          <span className="text-xs text-slate-500 font-serif italic mt-1 block">
            With endless love, forever and always.
          </span>
        </div>
      </div>

      {/* Action Footer Buttons in Silver & Marigold */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-12">
        <button
          onClick={onReplay}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-[#1e0a36] hover:bg-[#2c0e4f] text-slate-200 border border-slate-300/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Replay 3D Experience</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-slate-950" />
              <span>Link Copied! Send to Susti</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-950" />
              <span>Copy Surprise Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
