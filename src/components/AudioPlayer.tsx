import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, ExternalLink } from 'lucide-react';

interface AudioPlayerProps {
  unlocked: boolean;
  videoId?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  unlocked,
  videoId = 'dIVpJEKYNq4',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // When unlocked for the first time, initiate playback
  useEffect(() => {
    if (unlocked && !hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      // Send postMessage to YouTube IFrame to play
      sendCommand('playVideo');
    }
  }, [unlocked, hasStarted]);

  const sendCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args,
        }),
        '*'
      );
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand('unMute');
      setIsMuted(false);
    } else {
      sendCommand('mute');
      setIsMuted(true);
    }
  };

  if (!unlocked) {
    return null;
  }

  // Hidden background audio player - no visible UI elements on screen
  return (
    <div
      aria-hidden="true"
      className="fixed -top-96 -left-96 w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
    >
      <iframe
        ref={iframeRef}
        width="200"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${videoId}&origin=${encodeURIComponent(
          typeof window !== 'undefined' ? window.location.origin : ''
        )}`}
        title="Background Music"
        allow="autoplay; encrypted-media"
        onLoad={() => {
          if (unlocked) {
            sendCommand('playVideo');
          }
        }}
      />
    </div>
  );
};

