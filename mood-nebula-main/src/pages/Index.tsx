import { useState } from 'react';
import { StarField } from '@/components/StarField';
import { SolarSystem } from '@/components/SolarSystem';
import { MoodStats } from '@/components/MoodStats';
import { EmotionModal } from '@/components/EmotionModal';
import { TabNavigation, TabType } from '@/components/TabNavigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CalendarView } from '@/components/CalendarView';
import { StatisticsView } from '@/components/StatisticsView';
import { useMoodData } from '@/hooks/useMoodData';
import { useTheme } from '@/hooks/useTheme';
import { EmotionType } from '@/types/mood';

const Index = () => {
  const { entries, saveEntry, getEntry, getStats } = useMoodData();
  const { theme, toggleTheme } = useTheme();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('galaxy');
  
  const handlePlanetClick = (day: number) => {
    setSelectedDay(day);
  };
  
  const handleCloseModal = () => {
    setSelectedDay(null);
  };
  
  const handleSave = (emotion: EmotionType, note: string) => {
    if (selectedDay !== null) {
      saveEntry(selectedDay, emotion, note);
    }
  };
  
  const selectedEntry = selectedDay ? getEntry(selectedDay) : undefined;
  
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Animated star background */}
      <StarField />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen py-6 px-4">
        {/* Header with theme toggle */}
        <header className="w-full max-w-4xl flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex-1" />
          <div className="text-center">
            <h1 className="font-display text-2xl md:text-4xl text-foreground mb-1 text-glow">
              Планета настроений
            </h1>
            <p className="text-muted-foreground text-sm md:text-base hidden sm:block">
              Ваша космическая карта эмоций
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>
        
        {/* Tab Navigation */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 w-full max-w-4xl flex flex-col items-center">
          {activeTab === 'galaxy' && (
            <div className="animate-fade-in w-full">
              {/* Stats */}
              <div className="mb-6 flex justify-center">
                <MoodStats stats={getStats()} />
              </div>
              
              {/* Solar System */}
              <div className="flex-1 flex items-center justify-center w-full">
                <SolarSystem
                  entries={entries}
                  onPlanetClick={handlePlanetClick}
                  getEntry={getEntry}
                />
              </div>
              
              {/* Footer hint */}
              <footer className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Нажмите на планету, чтобы записать настроение дня
                </p>
              </footer>
            </div>
          )}
          
          {activeTab === 'calendar' && (
            <div className="animate-fade-in w-full py-4">
              <CalendarView
                entries={entries}
                onDayClick={handlePlanetClick}
                getEntry={getEntry}
              />
            </div>
          )}
          
          {activeTab === 'statistics' && (
            <div className="animate-fade-in w-full py-4">
              <StatisticsView
                entries={entries}
                stats={getStats()}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Emotion selection modal */}
      <EmotionModal
        isOpen={selectedDay !== null}
        day={selectedDay || 1}
        currentEmotion={selectedEntry?.emotion}
        currentNote={selectedEntry?.note}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;
