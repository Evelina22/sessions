import { cn } from '@/lib/utils';

export type TabType = 'galaxy' | 'calendar' | 'statistics';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; emoji: string; label: string }[] = [
  { id: 'galaxy', emoji: '🌌', label: 'ГАЛАКТИКА' },
  { id: 'calendar', emoji: '📅', label: 'КАЛЕНДАРЬ' },
  { id: 'statistics', emoji: '📊', label: 'СТАТИСТИКА' },
];

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="flex items-center justify-center gap-2 md:gap-4 glass rounded-full px-2 py-2 md:px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-full font-display text-xs md:text-sm transition-all duration-300",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <span className="text-base md:text-lg">{tab.emoji}</span>
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
