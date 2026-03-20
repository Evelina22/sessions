import { useState, useEffect } from 'react';
import { EmotionType, EMOTIONS } from '@/types/mood';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface EmotionModalProps {
  isOpen: boolean;
  day: number;
  currentEmotion?: EmotionType;
  currentNote?: string;
  onClose: () => void;
  onSave: (emotion: EmotionType, note: string) => void;
}

const emotionBgColors: Record<EmotionType, string> = {
  calm: 'bg-emotion-calm',
  joy: 'bg-emotion-joy',
  energy: 'bg-emotion-energy',
  stress: 'bg-emotion-stress',
  sadness: 'bg-emotion-sadness',
};

const emotionGlowClasses: Record<EmotionType, string> = {
  calm: 'glow-calm',
  joy: 'glow-joy',
  energy: 'glow-energy',
  stress: 'glow-stress',
  sadness: 'glow-sadness',
};

export const EmotionModal = ({
  isOpen,
  day,
  currentEmotion,
  currentNote,
  onClose,
  onSave,
}: EmotionModalProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedEmotion(currentEmotion || null);
      setNote(currentNote || '');
    }
  }, [isOpen, currentEmotion, currentNote]);

  const handleSave = () => {
    if (selectedEmotion) {
      onSave(selectedEmotion, note);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-space-deep/80 backdrop-blur-sm animate-fade-in" />
      
      {/* Modal */}
      <div 
        className="relative glass rounded-3xl p-8 max-w-md w-full animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl text-foreground mb-2">
            День {day}
          </h2>
          <p className="text-muted-foreground text-sm">
            Выберите ваше настроение
          </p>
        </div>
        
        {/* Emotion palette */}
        <div className="flex justify-center gap-4 mb-8">
          {EMOTIONS.map(emotion => (
            <button
              key={emotion.type}
              onClick={() => setSelectedEmotion(emotion.type)}
              className={cn(
                'w-14 h-14 rounded-full transition-all duration-300',
                'flex items-center justify-center text-2xl',
                'hover:scale-110 active:scale-95',
                emotionBgColors[emotion.type],
                selectedEmotion === emotion.type && [
                  'scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-background',
                  emotionGlowClasses[emotion.type],
                ]
              )}
              title={emotion.labelRu}
            >
              {emotion.emoji}
            </button>
          ))}
        </div>
        
        {/* Selected emotion label */}
        {selectedEmotion && (
          <div className="text-center mb-6 animate-fade-in">
            <span className={cn(
              'font-display text-lg capitalize',
              `text-emotion-${selectedEmotion}`
            )}>
              {EMOTIONS.find(e => e.type === selectedEmotion)?.labelRu}
            </span>
          </div>
        )}
        
        {/* Note textarea */}
        <div className="mb-6">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 100))}
            placeholder="Добавьте заметку о дне... (до 100 символов)"
            className="w-full h-24 px-4 py-3 bg-input rounded-xl text-foreground
                       placeholder:text-muted-foreground resize-none
                       border border-border focus:border-primary focus:ring-1 focus:ring-primary
                       transition-colors outline-none"
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            {note.length}/100
          </div>
        </div>
        
        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!selectedEmotion}
          className={cn(
            'w-full py-3 rounded-xl font-display font-medium text-lg',
            'transition-all duration-300',
            selectedEmotion
              ? 'bg-primary text-primary-foreground hover:brightness-110 active:scale-98'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
