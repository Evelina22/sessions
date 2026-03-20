export type EmotionType = 'calm' | 'joy' | 'energy' | 'stress' | 'sadness';

export interface MoodEntry {
  day: number;
  emotion: EmotionType;
  note: string;
  date: string;
}

export interface EmotionConfig {
  type: EmotionType;
  emoji: string;
  label: string;
  labelRu: string;
}

export const EMOTIONS: EmotionConfig[] = [
  { type: 'calm', emoji: '🔵', label: 'Calm', labelRu: 'спокойствие' },
  { type: 'joy', emoji: '🟢', label: 'Joy', labelRu: 'радость' },
  { type: 'energy', emoji: '🟡', label: 'Energy', labelRu: 'энергия' },
  { type: 'stress', emoji: '🔴', label: 'Stress', labelRu: 'стресс' },
  { type: 'sadness', emoji: '🟣', label: 'Sadness', labelRu: 'грусть' },
];
