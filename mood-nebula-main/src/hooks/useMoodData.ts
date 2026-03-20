import { useState, useEffect } from 'react';
import { MoodEntry, EmotionType } from '@/types/mood';

const STORAGE_KEY = 'mood-planet-data';

export const useMoodData = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse mood data:', e);
      }
    }
  }, []);

  const saveEntry = (day: number, emotion: EmotionType, note: string) => {
    const now = new Date();
    const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
    
    const newEntry: MoodEntry = { day, emotion, note, date };
    
    setEntries(prev => {
      const filtered = prev.filter(e => e.day !== day);
      const updated = [...filtered, newEntry];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getEntry = (day: number): MoodEntry | undefined => {
    return entries.find(e => e.day === day);
  };

  const getStats = (): Record<EmotionType, number> => {
    const stats: Record<EmotionType, number> = {
      calm: 0,
      joy: 0,
      energy: 0,
      stress: 0,
      sadness: 0,
    };

    entries.forEach(entry => {
      stats[entry.emotion]++;
    });

    return stats;
  };

  return { entries, saveEntry, getEntry, getStats };
};
