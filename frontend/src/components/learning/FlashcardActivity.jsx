import React, { useState, useEffect } from 'react';
import { CheckCircle2, RotateCw } from 'lucide-react';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const CARD_COLORS = [
  { front: 'bg-[#14b8a6]', back: 'bg-[#0f766e]' }, // Emerald
  { front: 'bg-[#a855f7]', back: 'bg-[#7e22ce]' }, // Purple
  { front: 'bg-[#f97316]', back: 'bg-[#c2410c]' }, // Orange
  { front: 'bg-[#3b82f6]', back: 'bg-[#1d4ed8]' }, // Blue
  { front: 'bg-[#ec4899]', back: 'bg-[#be185d]' }, // Pink
  { front: 'bg-[#22c55e]', back: 'bg-[#15803d]' }, // Green
];

export default function FlashcardActivity({ section, onComplete, onFlippedAll }) {
  const cards = section.flashcards || [];
  const [flippedStates, setFlippedStates] = useState({});
  const [flippedIndices, setFlippedIndices] = useState(new Set());

  // Reset state when section changes
  useEffect(() => {
    setFlippedStates({});
    setFlippedIndices(new Set());
  }, [section]);

  if (!cards.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No flashcards found for this activity.</p>
      </div>
    );
  }

  const isCompleted = flippedIndices.size === cards.length;

  useEffect(() => {
    if (isCompleted && onFlippedAll) {
      onFlippedAll();
    }
  }, [isCompleted, onFlippedAll]);

  const handleFlip = (index) => {
    setFlippedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setFlippedIndices((prev) => new Set([...prev, index]));
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-2">
      {/* Title Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
          Interactive Activity
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-display">
          Interactive Flip Card Learning
        </h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-xl">
          Test your knowledge — click each card to flip and reveal the answer.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-secondary h-2.5 rounded-full mb-8 overflow-hidden relative">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(flippedIndices.size / cards.length) * 100}%` }}
        />
        <div className="absolute right-2 top-[-14px] text-[10px] font-bold text-muted-foreground">
          Flipped {flippedIndices.size}/{cards.length}
        </div>
      </div>

      {/* Grid of Flashcards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
        {cards.map((card, index) => {
          const colorSet = CARD_COLORS[index % CARD_COLORS.length];
          const isFlipped = !!flippedStates[index];

          return (
            <div
              key={index}
              className="aspect-[1.15] min-h-[230px] w-full perspective-1000 cursor-pointer"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`w-full h-full relative transform-style-3d transition-transform duration-500 rounded-xl shadow-md border border-black/5 ${isFlipped ? 'rotate-y-180' : ''
                  }`}
              >
                {/* Front Side */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-4 rounded-xl text-white ${colorSet.front}`}
                >
                  {/* Card ID Badge */}
                  <div className="flex justify-between items-start">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/15 text-xs font-bold">
                      Q{index + 1}
                    </span>
                  </div>

                  {/* Question Text */}
                  <div className="flex-1 flex items-center justify-center text-center px-2">
                    <h4 className="text-sm sm:text-base font-bold leading-snug">
                      {card.front}
                    </h4>
                  </div>

                  {/* Flip Action Indicator */}
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/15 hover:bg-black/25 text-[11px] font-medium transition-colors">
                      Click to flip <RotateCw className="h-3 w-3" />
                    </div>
                  </div>
                </div>

                {/* Back Side (Explanation) */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col justify-between p-4 rounded-xl text-white ${colorSet.back}`}
                >
                  {/* Card ID Badge */}
                  <div className="flex justify-between items-start">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/20 text-xs font-bold">
                      A{index + 1}
                    </span>
                  </div>

                  {/* Answer Text */}
                  <div className="flex-1 flex items-center justify-center text-center overflow-y-auto px-2 my-2 scrollbar-thin scrollbar-thumb-white/20">
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {card.back}
                    </p>
                  </div>

                  {/* Flip Back Action Indicator */}
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 hover:bg-black/30 text-[11px] font-medium transition-colors">
                      Click to flip back <RotateCw className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Panel */}
      <div className="w-full border-t pt-8 flex flex-col items-center">
        {!isCompleted ? (
          <p className="text-xs text-muted-foreground text-center animate-pulse">
            * Please flip all cards to review the answers and complete the activity.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center w-full"
          >
            <div className="inline-flex items-center justify-center p-2.5 bg-primary/10 text-primary rounded-full mb-3">
              <CheckCircle2 className="h-6 w-6 animate-bounce" />
            </div>
            <h4 className="text-lg font-bold text-foreground">Activity Completed!</h4>
            <p className="text-xs text-muted-foreground mt-0.5 mb-5 max-w-sm">
              Great job! You have explored and completed all the interactive flashcards.
            </p>
            <Button onClick={onComplete} className="w-full sm:w-auto px-8 gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Restart
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
