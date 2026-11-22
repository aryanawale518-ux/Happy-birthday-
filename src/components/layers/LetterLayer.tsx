import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, FastForward } from 'lucide-react';

interface LetterLayerProps {
  onContinue: () => void;
}

const FULL_LETTER = `Dear Susti, ❤️

I think, first of all, I should thank God for giving me such a supportive best friend like you. Out of all the people I could have met in this world, somehow I got you, and honestly, I don't think I could ever ask for a better person to have in my life.

You are someone jiski jagah koi nahi le sakta meri life mein. And I really mean it. People can come and go, friendships can change, and life can take us in completely different directions, but the place you have in my heart is something nobody else can ever fill.

You are the only one who somehow knows what's going on inside my head, even when I don't know how to explain it myself. You know what I'm thinking, what I like, what I don't like, what hurts me, and sometimes even those things that I try so hard to hide from everyone else.

With you, I never feel like I have to pretend to be okay when I'm not. I can tell you things without worrying about being judged. I can be emotional, dramatic, stupid, confused, or completely silent, and somehow, you still understand me.

You have given me emotional support and clarity during times when my own thoughts felt too complicated to understand. Sometimes, you don't even realise how much your words help me, how much better I feel after talking to you, or how a simple conversation with you can make a difficult day feel a little easier.

I think that's what makes you so special to me. You are not just my best friend; you are my comfort zone. The person I want to tell things to, the person whose opinion matters to me, and the person I instinctively think of whenever something happens in my life.

And maybe I don't tell you all this every day. Maybe I hide it behind jokes, random reels, stupid conversations, and my constant bakbak. But somewhere beneath all that, there's a girl who is genuinely grateful that she got you as her best friend.

School ke woh do saal mere liye itne special hain, and not just because of the memories we made, but because that's when I realised what having a real best friend actually feels like.

Baki sab friends toh the, but with you, it was different. You became that one person jiske saath friendship sirf naam ki nahi thi. It was real, comfortable, and something I could trust.

And if there's one thing I wish you never forget, it's this: no matter how busy life gets, no matter how far apart we live, and no matter how often we talk, you will always be one of the most important people in my life.

You have a place in my heart that belongs only to you. And I'm so, so thankful that it's you. 🫶🏻

— Your forever bakbak partner. 💗`;

export const LetterLayer: React.FC<LetterLayerProps> = ({ onContinue }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < FULL_LETTER.length) {
        setDisplayedText(FULL_LETTER.slice(0, index + 3));
        index += 3;
      } else {
        setDisplayedText(FULL_LETTER);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleSkipTyping = () => {
    setDisplayedText(FULL_LETTER);
    setIsTyping(false);
  };

  return (
    <div className="min-h-[85vh] px-4 py-8 max-w-4xl mx-auto flex flex-col justify-center perspective-1000">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
          Layer 03 · From The Deepest Corner of My Heart
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 mb-2">
          If You Only Knew…
        </h2>
        <p className="text-sm text-slate-300/80">
          The thoughts I usually hide behind random reels and non-stop bakbak.
        </p>
      </div>

      {/* Main Parchment Letter & Photo Card with Silver Sheen and Marigold Lighting */}
      <div className="bg-[#170929]/90 border-2 border-slate-300/30 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden mb-10 silver-metallic-glow">
        {/* Subtle marigold glow accent */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Aesthetic Vintage Letter & Pen Picture Frame */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col items-center">
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-amber-400/40 shadow-xl relative group">
              <img
                src="/assets/aistudio/d3ba5ee290750c4fcb42a7d7207548d3_48230c42.jpg"
                alt="Two best friends holding hands in golden sunlight"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120521] via-transparent to-transparent opacity-60" />
            </div>
            <span className="mt-3 text-amber-300 font-handwriting text-xl">
              Written with all my heart ✍️
            </span>

            {/* Skip animation button */}
            {isTyping && (
              <button
                onClick={handleSkipTyping}
                className="mt-4 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-200 hover:text-white bg-[#260e42] hover:bg-[#341459] border border-slate-300/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <FastForward className="w-3.5 h-3.5 text-amber-400" />
                <span>Show full letter</span>
              </button>
            )}
          </div>

          {/* Handwritten Style Letter Text Area */}
          <div className="flex-grow w-full">
            <div className="bg-[#fffefb] text-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl border border-amber-300/80 relative">
              <div className="absolute top-4 right-5 text-amber-500">
                <Heart className="w-5 h-5 fill-amber-500" />
              </div>

              <div className="whitespace-pre-line font-serif text-sm md:text-base leading-relaxed text-slate-800">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-amber-500 ml-1 animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue CTA */}
      <div className="flex justify-center pb-8">
        <button
          onClick={onContinue}
          className="py-3.5 px-8 rounded-xl font-semibold text-sm md:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-slate-200 text-slate-950 shadow-xl shadow-amber-950/40 hover:brightness-110 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer group"
        >
          <span>The Gift Inside The Gift</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
