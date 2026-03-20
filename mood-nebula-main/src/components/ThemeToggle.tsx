import { Moon, Sun } from 'lucide-react';
import { Theme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-full glass transition-all duration-300",
        "hover:scale-105 active:scale-95"
      )}
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
    >
      {theme === 'dark' ? (
        <>
          <Moon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">🌙</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-energy" />
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">☀️</span>
        </>
      )}
    </button>
  );
};
