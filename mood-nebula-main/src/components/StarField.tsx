import { useEffect, useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const StarField = () => {
  const stars = useMemo(() => {
    const starCount = 150;
    return Array.from({ length: starCount }, (_, i): Star => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, hsl(260 50% 12% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, hsl(220 60% 10% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(240 30% 6%) 0%, hsl(240 30% 3%) 100%)
          `
        }}
      />
      
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            boxShadow: star.size > 1.5 ? '0 0 4px hsl(var(--star-color))' : 'none',
          }}
        />
      ))}
    </div>
  );
};
