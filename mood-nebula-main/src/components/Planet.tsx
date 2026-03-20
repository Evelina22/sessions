import { useState } from 'react';
import { MoodEntry, EmotionType } from '@/types/mood';
import { cn } from '@/lib/utils';

interface PlanetProps {
  day: number;
  entry?: MoodEntry;
  onClick: () => void;
  orbitRadius: number;
  angle: number;
}

const getEmotionClasses = (emotion?: EmotionType) => {
  if (!emotion) return 'bg-planet-inactive hover:bg-planet-hover';
  
  const classes: Record<EmotionType, string> = {
    calm: 'bg-emotion-calm glow-calm',
    joy: 'bg-emotion-joy glow-joy',
    energy: 'bg-emotion-energy glow-energy',
    stress: 'bg-emotion-stress glow-stress',
    sadness: 'bg-emotion-sadness glow-sadness',
  };
  
  return classes[emotion];
};

export const Planet = ({ day, entry, onClick, orbitRadius, angle }: PlanetProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;
  
  const size = entry ? 40 : 32;
  
  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px - ${size / 2}px)`,
        top: `calc(50% + ${y}px - ${size / 2}px)`,
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'rounded-full transition-all duration-300 ease-out',
          'flex items-center justify-center font-display text-xs font-semibold',
          'hover:scale-125 active:scale-110',
          getEmotionClasses(entry?.emotion),
          entry?.emotion ? 'text-primary-foreground animate-pulse-glow' : 'text-muted-foreground'
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {day}
      </button>
      
      {/* Tooltip */}
      {isHovered && entry && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                     glass rounded-lg min-w-[120px] max-w-[200px] z-50
                     animate-fade-in pointer-events-none"
        >
          <div className="text-xs text-muted-foreground mb-1">{entry.date}</div>
          <div className="text-sm text-foreground line-clamp-2">
            {entry.note || 'Без заметки'}
          </div>
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1
                       border-4 border-transparent border-t-border"
          />
        </div>
      )}
    </div>
  );
};
