import { useMemo } from 'react';
import { MoodEntry, EmotionType, EMOTIONS } from '@/types/mood';
import { cn } from '@/lib/utils';

interface StatisticsViewProps {
  entries: MoodEntry[];
  stats: Record<EmotionType, number>;
}

const emotionColors: Record<EmotionType, string> = {
  calm: 'hsl(210, 80%, 55%)',
  joy: 'hsl(142, 70%, 55%)',
  energy: 'hsl(45, 95%, 55%)',
  stress: 'hsl(0, 85%, 60%)',
  sadness: 'hsl(280, 75%, 60%)',
};

const emotionBgColors: Record<EmotionType, string> = {
  calm: 'bg-calm',
  joy: 'bg-joy',
  energy: 'bg-energy',
  stress: 'bg-stress',
  sadness: 'bg-sadness',
};

export const StatisticsView = ({ entries, stats }: StatisticsViewProps) => {
  const totalEntries = entries.length;

  // Calculate pie chart segments
  const pieData = useMemo(() => {
    if (totalEntries === 0) return [];
    
    let startAngle = 0;
    const segments: { type: EmotionType; startAngle: number; endAngle: number; percentage: number }[] = [];
    
    EMOTIONS.forEach((emotion) => {
      const count = stats[emotion.type];
      if (count > 0) {
        const percentage = (count / totalEntries) * 100;
        const angle = (count / totalEntries) * 360;
        segments.push({
          type: emotion.type,
          startAngle,
          endAngle: startAngle + angle,
          percentage,
        });
        startAngle += angle;
      }
    });
    
    return segments;
  }, [stats, totalEntries]);

  // Most common emotion
  const dominantEmotion = useMemo(() => {
    if (totalEntries === 0) return null;
    
    let maxCount = 0;
    let dominant: EmotionType | null = null;
    
    (Object.entries(stats) as [EmotionType, number][]).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominant = type;
      }
    });
    
    return dominant ? EMOTIONS.find(e => e.type === dominant) : null;
  }, [stats, totalEntries]);

  // Most active week
  const mostActiveWeek = useMemo(() => {
    if (entries.length === 0) return null;
    
    const weekCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    entries.forEach(entry => {
      const weekNum = Math.ceil(entry.day / 7);
      if (weekNum >= 1 && weekNum <= 5) {
        weekCounts[weekNum]++;
      }
    });
    
    let maxWeek = 1;
    let maxCount = 0;
    
    Object.entries(weekCounts).forEach(([week, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxWeek = parseInt(week);
      }
    });
    
    return maxCount > 0 ? { week: maxWeek, count: maxCount } : null;
  }, [entries]);

  // Longest note
  const longestNote = useMemo(() => {
    if (entries.length === 0) return null;
    
    let longest: MoodEntry | null = null;
    let maxLength = 0;
    
    entries.forEach(entry => {
      if (entry.note && entry.note.length > maxLength) {
        maxLength = entry.note.length;
        longest = entry;
      }
    });
    
    return longest;
  }, [entries]);

  // Generate SVG path for pie segment
  const getSegmentPath = (startAngle: number, endAngle: number, radius: number, cx: number, cy: number) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in space-y-8">
      <h2 className="font-display text-2xl md:text-3xl text-foreground text-center">
        Статистика месяца
      </h2>

      {totalEntries === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p className="text-lg">Пока нет записей</p>
          <p className="text-sm mt-2">Начните отмечать свои эмоции в Галактике или Календаре</p>
        </div>
      ) : (
        <>
          {/* Pie Chart */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <h3 className="font-display text-lg text-foreground mb-6 text-center">
              Распределение эмоций
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* SVG Pie Chart */}
              <div className="relative">
                <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-lg">
                  {pieData.map((segment, index) => (
                    <path
                      key={segment.type}
                      d={getSegmentPath(segment.startAngle, segment.endAngle, 80, 90, 90)}
                      fill={emotionColors[segment.type]}
                      className="transition-all duration-300 hover:opacity-80"
                      style={{ 
                        filter: 'drop-shadow(0 0 8px ' + emotionColors[segment.type] + ')',
                      }}
                    />
                  ))}
                  {/* Center circle */}
                  <circle cx="90" cy="90" r="35" className="fill-card" />
                  <text x="90" y="85" textAnchor="middle" className="fill-foreground font-display text-lg">
                    {totalEntries}
                  </text>
                  <text x="90" y="102" textAnchor="middle" className="fill-muted-foreground text-xs">
                    записей
                  </text>
                </svg>
              </div>
              
              {/* Legend */}
              <div className="space-y-3">
                {EMOTIONS.map((emotion) => {
                  const count = stats[emotion.type];
                  const percentage = totalEntries > 0 ? ((count / totalEntries) * 100).toFixed(0) : 0;
                  
                  return (
                    <div key={emotion.type} className="flex items-center gap-3">
                      <span className={cn(
                        "w-4 h-4 rounded-full",
                        emotionBgColors[emotion.type]
                      )} />
                      <span className="text-sm text-muted-foreground w-24">{emotion.labelRu}</span>
                      <span className="text-sm text-foreground font-medium w-8">{count}</span>
                      <span className="text-xs text-muted-foreground">({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dominant Emotion */}
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">{dominantEmotion?.emoji || '❓'}</div>
              <h4 className="font-display text-sm text-muted-foreground mb-1">
                Эмоция месяца
              </h4>
              <p className="text-lg text-foreground font-medium capitalize">
                {dominantEmotion?.labelRu || 'Нет данных'}
              </p>
            </div>

            {/* Most Active Week */}
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">📅</div>
              <h4 className="font-display text-sm text-muted-foreground mb-1">
                Самая активная неделя
              </h4>
              <p className="text-lg text-foreground font-medium">
                {mostActiveWeek ? `Неделя ${mostActiveWeek.week}` : 'Нет данных'}
              </p>
              {mostActiveWeek && (
                <p className="text-xs text-muted-foreground mt-1">
                  {mostActiveWeek.count} записей
                </p>
              )}
            </div>

            {/* Longest Note */}
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">✍️</div>
              <h4 className="font-display text-sm text-muted-foreground mb-1">
                Длинная запись
              </h4>
              {longestNote ? (
                <>
                  <p className="text-sm text-foreground font-medium">
                    День {longestNote.day}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 truncate max-w-[150px] mx-auto">
                    "{longestNote.note.slice(0, 20)}..."
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Нет заметок</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
