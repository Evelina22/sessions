import { Planet } from './Planet';
import { MoodEntry } from '@/types/mood';

interface SolarSystemProps {
  entries: MoodEntry[];
  onPlanetClick: (day: number) => void;
  getEntry: (day: number) => MoodEntry | undefined;
}

export const SolarSystem = ({ entries, onPlanetClick, getEntry }: SolarSystemProps) => {
  const daysInMonth = 30;
  
  // Distribute planets in concentric orbits
  const orbits = [
    { radius: 80, count: 6 },
    { radius: 140, count: 8 },
    { radius: 200, count: 10 },
    { radius: 260, count: 6 },
  ];
  
  const getPlanetPosition = (day: number) => {
    let currentDay = 0;
    
    for (const orbit of orbits) {
      if (day <= currentDay + orbit.count) {
        const indexInOrbit = day - currentDay - 1;
        const angle = (indexInOrbit / orbit.count) * 2 * Math.PI - Math.PI / 2;
        return { radius: orbit.radius, angle };
      }
      currentDay += orbit.count;
    }
    
    // Fallback for any remaining days
    return { radius: 260, angle: 0 };
  };
  
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Orbit rings */}
      {orbits.map((orbit, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-border/20"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
          }}
        />
      ))}
      
      {/* Center sun */}
      <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-emotion-energy to-emotion-stress animate-pulse-glow z-10">
        <div className="w-full h-full rounded-full"
          style={{
            boxShadow: `
              0 0 30px hsl(var(--emotion-energy) / 0.5),
              0 0 60px hsl(var(--emotion-energy) / 0.3),
              0 0 100px hsl(var(--emotion-stress) / 0.2)
            `
          }}
        />
      </div>
      
      {/* Planets */}
      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const { radius, angle } = getPlanetPosition(day);
        const entry = getEntry(day);
        
        return (
          <Planet
            key={day}
            day={day}
            entry={entry}
            onClick={() => onPlanetClick(day)}
            orbitRadius={radius}
            angle={angle}
          />
        );
      })}
    </div>
  );
};
