import React, { useMemo } from 'react';

export const BackgroundStars: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 55 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.8 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      isMarigold: Math.random() > 0.65,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Aubergine & Marigold Glow Nebulae */}
      <div className="absolute -top-[25%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#2a0e44]/40 via-[#180829]/30 to-transparent blur-3xl" />
      <div className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-[#f59e0b]/10 via-[#230c38]/40 to-transparent blur-3xl" />
      <div className="absolute -bottom-[20%] left-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-t from-[#3b125e]/30 via-[#11051c]/50 to-transparent blur-3xl" />

      {/* Floating 3D Silver and Marigold starlight particles */}
      {stars.map((star) => (
        <span
          key={star.id}
          className={`absolute rounded-full ${
            star.isMarigold ? 'bg-amber-300' : 'bg-slate-100'
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: star.isMarigold
              ? `0 0 ${star.size * 3}px rgba(251, 191, 36, 0.9)`
              : `0 0 ${star.size * 2.5}px rgba(241, 245, 249, 0.8)`,
            animation: `pulseSubtle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
