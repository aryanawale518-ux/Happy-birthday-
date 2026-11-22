import React, { useState } from 'react';
import type { LayerNumber } from './types';
import { BackgroundStars } from './components/BackgroundStars';
import { AudioPlayer } from './components/AudioPlayer';
import { NavigationHeader } from './components/NavigationHeader';
import { SecretEntryLayer } from './components/layers/SecretEntryLayer';
import { BirthdayRevealLayer } from './components/layers/BirthdayRevealLayer';
import { LetterLayer } from './components/layers/LetterLayer';
import { NestedGiftsLayer } from './components/layers/NestedGiftsLayer';
import { FinalLetterLayer } from './components/layers/FinalLetterLayer';
import { SupabaseSetupModal } from './components/SupabaseSetupModal';

export default function App() {
  const [currentLayer, setCurrentLayer] = useState<LayerNumber>(1);
  const [maxUnlockedLayer, setMaxUnlockedLayer] = useState<LayerNumber>(1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);

  const birthdayName = import.meta.env.VITE_BIRTHDAY_PERSON_NAME || 'Srushti';
  const nickname = import.meta.env.VITE_BIRTHDAY_PERSON_NICKNAME || 'Susti';
  const videoId = import.meta.env.VITE_YOUTUBE_VIDEO_ID || 'dIVpJEKYNq4';

  const unlockNextLayer = (next: LayerNumber) => {
    setCurrentLayer(next);
    if (next > maxUnlockedLayer) {
      setMaxUnlockedLayer(next);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitialSecretUnlock = () => {
    setIsUnlocked(true);
    unlockNextLayer(2);
  };

  const handleReplay = () => {
    setCurrentLayer(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Secret developer keyboard shortcut (Shift+U) to open photo uploader without showing any UI to Srushti
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'U' || e.key === 'u')) {
        setIsSupabaseModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0312] text-slate-100 relative flex flex-col justify-between selection:bg-amber-400/30 selection:text-amber-200">
      {/* Ambient Celestial Stars & Deep Aubergine / Marigold Glow */}
      <BackgroundStars />

      {/* Navigation Header */}
      <NavigationHeader
        currentLayer={currentLayer}
        maxUnlockedLayer={maxUnlockedLayer}
        onSelectLayer={(l) => {
          setCurrentLayer(l);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Main Interactive Stage Container */}
      <main className="relative z-10 flex-grow flex flex-col justify-center">
        {currentLayer === 1 && (
          <SecretEntryLayer onUnlock={handleInitialSecretUnlock} />
        )}

        {currentLayer === 2 && (
          <BirthdayRevealLayer
            birthdayName={birthdayName}
            nickname={nickname}
            onContinue={() => unlockNextLayer(3)}
          />
        )}

        {currentLayer === 3 && (
          <LetterLayer onContinue={() => unlockNextLayer(4)} />
        )}

        {currentLayer === 4 && (
          <NestedGiftsLayer onContinue={() => unlockNextLayer(5)} />
        )}

        {currentLayer === 5 && (
          <FinalLetterLayer
            birthdayName={birthdayName}
            nickname={nickname}
            onReplay={handleReplay}
          />
        )}
      </main>

      {/* Hidden Background Audio (Unlocked on Layer 1 success) */}
      <AudioPlayer unlocked={isUnlocked} videoId={videoId} />

      {/* Supabase Manager / Deployment Modal (Accessible via Shift+U or clicking heart) */}
      <SupabaseSetupModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onPhotoUploaded={() => setUploadKey((prev) => prev + 1)}
      />

      {/* Subtle Ambient Footer */}
      <footer className="relative z-10 border-t border-purple-900/30 py-4 px-6 text-center text-xs text-rose-200/40 flex items-center justify-center gap-1.5">
        <span>A private world crafted with love for Srushti</span>
        <button
          onClick={() => setIsSupabaseModalOpen(true)}
          title="Secret photo manager (Shift+U)"
          className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
        >
          💗
        </button>
      </footer>
    </div>
  );
}
