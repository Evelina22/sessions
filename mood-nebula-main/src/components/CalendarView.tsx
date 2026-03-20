import { useMemo } from 'react';
import { MoodEntry, EmotionType } from '@/types/mood';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  entries: MoodEntry[];
  onDayClick: (day: number) => void;
  getEntry: (day: number) => MoodEntry | undefined;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const getEmotionColor = (emotion: EmotionType): string => {
  const colors: Record<EmotionType, string> = {
    calm: 'bg-calm',
    joy: 'bg-joy',
    energy: 'bg-energy',
    stress: 'bg-stress',
    sadness: 'bg-sadness',
  };
  return colors[emotion];
};

export const CalendarView = ({ entries, onDayClick, getEntry }: CalendarViewProps) => {
  const calendarData = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get day of week for first day (0 = Sunday, convert to Monday-based)
    let startDayOfWeek = firstDay.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    return {
      daysInMonth,
      startDayOfWeek,
      monthName: monthNames[month],
      year,
    };
  }, []);

  const renderCalendarCells = () => {
    const cells = [];
    const { daysInMonth, startDayOfWeek } = calendarData;
    
    // Empty cells before first day
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(
        <div key={`empty-${i}`} className="aspect-square" />
      );
    }
    
    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const entry = getEntry(day);
      const hasEntry = !!entry;
      
      cells.push(
        <button
          key={day}
          onClick={() => onDayClick(day)}
          className={cn(
            "aspect-square rounded-lg flex flex-col items-center justify-center",
            "transition-all duration-300 cursor-pointer group relative",
            "hover:scale-105 hover:z-10",
            hasEntry 
              ? `${getEmotionColor(entry.emotion)} text-white shadow-lg` 
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          )}
        >
          <span className={cn(
            "font-display text-sm md:text-base",
            hasEntry && "font-semibold"
          )}>
            {day}
          </span>
          {hasEntry && entry.note && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/60 rounded-full" />
          )}
          
          {/* Tooltip on hover */}
          {hasEntry && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 glass rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 min-w-max">
              <div className="text-foreground font-medium">{entry.date}</div>
              {entry.note && (
                <div className="text-muted-foreground mt-1">
                  {entry.note.length > 30 ? entry.note.slice(0, 30) + '...' : entry.note}
                </div>
              )}
            </div>
          )}
        </button>
      );
    }
    
    return cells;
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      {/* Month header */}
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl md:text-3xl text-foreground">
          {calendarData.monthName} {calendarData.year}
        </h2>
      </div>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm text-muted-foreground font-medium py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarCells()}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-calm"></span> спокойствие
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-joy"></span> радость
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-energy"></span> энергия
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-stress"></span> стресс
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-sadness"></span> грусть
        </span>
      </div>
    </div>
  );
};
