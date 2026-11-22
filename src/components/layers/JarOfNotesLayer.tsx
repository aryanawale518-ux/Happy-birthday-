import React, { useState } from 'react';
import type { JarNote } from '../../types';
import confetti from 'canvas-confetti';
import { X, ArrowRight, Star, Check } from 'lucide-react';
import { ThreeJar } from '../3d/ThreeJar';

interface JarOfNotesLayerProps {
  onContinue: () => void;
}

const NOTES: JarNote[] = [
  {
    id: 'note-1',
    title: 'My Human Comfort Zone',
    snippet: 'Bina soche har baat bol sakti hoon...',
    content:
      "Tu woh insaan hai jiske paas main bina soche apne mann ki har baat bol sakti hoon. I don't have to find the perfect words because, somehow, you just get me. And that feeling is priceless.",
    tag: 'Comfort',
    emoji: '🫂',
  },
  {
    id: 'note-2',
    title: 'My Professional Reel Spammer Victim',
    snippet: 'Madam, reels pe reply chahiye! 😂',
    content:
      "Main tujhe reels bhej bhej ke pareshan karti rahungi. Lekin madam, agar uspe reply nahi kiya na, toh dekh phir! 😂 Meri reels deserve at least a little attention, okay?",
    tag: 'Playful',
    emoji: '📱',
  },
  {
    id: 'note-3',
    title: 'Those School-Time Days',
    snippet: 'School ke woh do saal...',
    content:
      "School ke woh do saal will always have a special place in my heart. That's when I found out ki real friendship kya hoti hai, and I'm so glad ki us story mein tu thi.",
    tag: 'Nostalgia',
    emoji: '🎒',
  },
  {
    id: 'note-4',
    title: 'My Favourite Gossip Partner',
    snippet: 'Pending talks & college stories!',
    content:
      'Kitni saari baatein pending hain, madam! Gossip karni hai, college stories batani hain, photos dikhani hain, aur woh sab discuss karna hai jo messages mein explain hi nahi ho sakta.',
    tag: 'Gossip',
    emoji: '☕',
  },
  {
    id: 'note-5',
    title: 'Future Storage-Full Memories',
    snippet: 'Photos aur reels ki baarish...',
    content:
      'Next time milenge na, toh photos aur reels ki baarish hogi. Itni photos click karenge ki storage full ho jayegi, phir Instagram pe apni bachpan wali friendship flaunt karenge. 📸',
    tag: 'Reunion',
    emoji: '📸',
  },
  {
    id: 'note-6',
    title: 'A Place Nobody Can Replace',
    snippet: 'Tu meri favourite hamesha rahegi...',
    content:
      "Life kitni bhi change ho jaaye, distance kitna bhi badh jaaye, tu meri favourite people mein hamesha rahegi. We might not talk every day, but you'll never become just another person to me. ❤️",
    tag: 'Forever',
    emoji: '❤️',
  },
];

export const JarOfNotesLayer: React.FC<JarOfNotesLayerProps> = ({ onContinue }) => {
  const [openedNotes, setOpenedNotes] = useState<Set<string>>(new Set());
  const [activeNote, setActiveNote] = useState<JarNote | null>(null);

  const handleSelectNote = (note: JarNote) => {
    setActiveNote(note);
    if (!openedNotes.has(note.id)) {
      const next = new Set(openedNotes);
      next.add(note.id);
      setOpenedNotes(next);

      if (next.size === NOTES.length) {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#f8fafc', '#cbd5e1'],
        });
      }
    }
  };

  return (
    <div className="min-h-[85vh] px-4 py-8 max-w-5xl mx-auto flex flex-col justify-center perspective-1000">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
          Layer 05 · 3D Jar of Constellations
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 mb-2">
          Little Things I Will Always Love About You ✨
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 max-w-md mx-auto">
          Rotate our 3D glass memory jar and unroll each folded marigold star.
        </p>

        {/* Progress pill in Silver & Marigold */}
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-300 bg-[#250d3f] border border-amber-400/30 px-4 py-1.5 rounded-full shadow-lg">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-medium">
            {openedNotes.size} of {NOTES.length} little memories unwrapped
          </span>
        </div>
      </div>

      {/* Main 3D Stage with Interactive Three.js Jar & Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        {/* Left: 3D Interactive WebGL Glass Jar */}
        <div className="lg:col-span-5 flex justify-center">
          <ThreeJar openedCount={openedNotes.size} />
        </div>

        {/* Right: 6 Interactive Note Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NOTES.map((note) => {
            const isOpened = openedNotes.has(note.id);

            return (
              <div
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={`group cursor-pointer rounded-2xl p-4 border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative flex flex-col justify-between min-h-[130px] ${
                  isOpened
                    ? 'bg-[#1e0a34]/90 border-slate-400/30 shadow-md'
                    : 'bg-gradient-to-br from-[#290d46] to-[#150624] border-amber-400/40 hover:border-amber-300 shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl">{note.emoji}</span>
                  {isOpened ? (
                    <span className="p-1 rounded-full bg-slate-200/10 text-slate-200 text-xs flex items-center gap-1 font-semibold px-2 border border-slate-300/20">
                      <Check className="w-3 h-3 text-amber-400" />
                      Read
                    </span>
                  ) : (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/40 animate-pulse font-semibold">
                      Unroll Star
                    </span>
                  )}
                </div>

                <div className="mt-2">
                  <h4 className="font-serif font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                    {note.title}
                  </h4>
                  <p className="text-xs text-slate-300/70 line-clamp-1 mt-1 font-serif italic">
                    "{note.snippet}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note Reader Modal */}
      {activeNote && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveNote(null)}
        >
          <div
            className="max-w-lg w-full bg-[#fbf9f5] text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative border-4 border-amber-300 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveNote(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">{activeNote.emoji}</span>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {activeNote.tag} · Note from Srushti's 3D Jar
              </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
              {activeNote.title}
            </h3>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 shadow-inner">
              <p className="text-sm md:text-base leading-relaxed text-slate-800 font-serif italic">
                "{activeNote.content}"
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Kept safely in our jar forever</span>
              <button
                onClick={() => setActiveNote(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors cursor-pointer shadow-md"
              >
                Put back in jar
              </button>
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
          <span>The Gift Inside The Gift</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
