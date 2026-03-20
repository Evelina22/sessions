import { EmotionType, EMOTIONS } from '@/types/mood';
import { cn } from '@/lib/utils';

interface MoodStatsProps {
  stats: Record<EmotionType, number>;
}

const emotionTextColors: Record<EmotionType, string> = {
  calm: 'text-emotion-calm',
  joy: 'text-emotion-joy',
  energy: 'text-emotion-energy',
  stress: 'text-emotion-stress',
  sadness: 'text-emotion-sadness',
};

export const MoodStats = ({ stats }: MoodStatsProps) => {
  const hasAnyEntries = Object.values(stats).some(count => count > 0);
  
  return (
    <div className="glass rounded-2xl px-6 py-4 inline-flex flex-wrap items-center gap-4 justify-center">
      <span className="text-muted-foreground font-display text-sm">
        В этом месяце:
      </span>
      
      {hasAnyEntries ? (
        EMOTIONS.filter(e => stats[e.type] > 0).map(emotion => (
          <div
            key={emotion.type}
            className={cn(
              'flex items-center gap-2 transition-all duration-300',
              emotionTextColors[emotion.type]
            )}
          >
            <span className="text-lg">{emotion.emoji}</span>
            <span className="font-medium">
              {stats[emotion.type]} {emotion.labelRu}
            </span>
          </div>
        ))
      ) : (
        <span className="text-muted-foreground text-sm">
          Нажмите на планету, чтобы записать настроение
        </span>
      )}
    </div>
  );
};
