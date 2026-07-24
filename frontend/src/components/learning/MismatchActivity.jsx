import React, { useState, useEffect } from 'react';
import { CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

export default function MismatchActivity({ section, onComplete, onFlippedAll }) {
  const rawPairs = section.pairs || [];
  const [shuffledLeft, setShuffledLeft] = useState([]);
  const [shuffledRight, setShuffledRight] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null); // stores index in shuffledLeft
  const [selectedRight, setSelectedRight] = useState(null); // stores index in shuffledRight
  const [matchedIndices, setMatchedIndices] = useState(new Set()); // stores indexes of rawPairs
  const [wrongMatch, setWrongMatch] = useState(null); // stores { leftIdx, rightIdx } for shaking

  // Shuffle when section changes
  useEffect(() => {
    if (!rawPairs.length) return;

    // Create unique ids for matching
    const leftItems = rawPairs.map((pair, index) => ({ id: index, text: pair.left }));
    const rightItems = rawPairs.map((pair, index) => ({ id: index, text: pair.right }));

    // Simple robust shuffle
    const shuffleArray = (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    setShuffledLeft(shuffleArray(leftItems));
    setShuffledRight(shuffleArray(rightItems));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIndices(new Set());
    setWrongMatch(null);
  }, [section]);

  if (!rawPairs.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No matching pairs found for this activity.</p>
      </div>
    );
  }

  const isCompleted = matchedIndices.size === rawPairs.length;

  // Auto-complete the section when all matched
  useEffect(() => {
    if (isCompleted && onFlippedAll) {
      onFlippedAll();
    }
  }, [isCompleted, onFlippedAll]);

  const handleLeftClick = (index) => {
    if (wrongMatch || isCompleted) return;
    const item = shuffledLeft[index];
    // If already matched, ignore
    if (matchedIndices.has(item.id)) return;

    setSelectedLeft(index);

    // If right was already selected, evaluate match
    if (selectedRight !== null) {
      evaluateMatch(index, selectedRight);
    }
  };

  const handleRightClick = (index) => {
    if (wrongMatch || isCompleted) return;
    const item = shuffledRight[index];
    // If already matched, ignore
    if (matchedIndices.has(item.id)) return;

    setSelectedRight(index);

    // If left was already selected, evaluate match
    if (selectedLeft !== null) {
      evaluateMatch(selectedLeft, index);
    }
  };

  const evaluateMatch = (leftIdx, rightIdx) => {
    const leftItem = shuffledLeft[leftIdx];
    const rightItem = shuffledRight[rightIdx];

    if (leftItem.id === rightItem.id) {
      // Correct Match!
      setMatchedIndices((prev) => new Set([...prev, leftItem.id]));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      // Mismatch / Wrong Match!
      setWrongMatch({ leftIdx, rightIdx });
      // Shake for 600ms, then reset selection
      setTimeout(() => {
        setWrongMatch(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 600); // 600ms
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-2">
      {/* Title Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
          Interactive Matching Activity
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-display">
          Match the Concepts
        </h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-xl">
          Select a concept from the left column, then select its matching definition or action in the right column. Avoid mismatches!
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-md bg-secondary h-2.5 rounded-full mb-8 overflow-hidden relative">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(matchedIndices.size / rawPairs.length) * 100}%` }}
        />
        <div className="absolute right-2 top-[-14px] text-[10px] font-bold text-muted-foreground">
          Matched {matchedIndices.size}/{rawPairs.length}
        </div>
      </div>

      {/* Matching Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-10">
        {/* Left Column - Concepts */}
        <div className="space-y-4">
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider border-b pb-2">
            Concepts / Situations
          </div>
          {shuffledLeft.map((item, index) => {
            const isMatched = matchedIndices.has(item.id);
            const isSelected = selectedLeft === index;
            const isShaking = wrongMatch?.leftIdx === index;

            return (
              <div
                key={`left-${index}`}
                onClick={() => handleLeftClick(index)}
                className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-300 cursor-pointer text-left select-none shadow-sm flex items-center justify-between ${isMatched
                  ? 'bg-primary/5 border-primary/40 text-primary/80 cursor-default'
                  : isShaking
                    ? 'bg-destructive/10 border-destructive text-destructive animate-shake shadow-destructive/10'
                    : isSelected
                      ? 'bg-primary/10 border-primary text-primary scale-[1.02] shadow-primary/10'
                      : 'bg-card border-border hover:border-primary/50 hover:bg-muted/30 text-foreground'
                  }`}
              >
                <span>{item.text}</span>
                {isMatched && <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 ml-2" />}
                {isShaking && <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>

        {/* Right Column - Definitions / Actions */}
        <div className="space-y-4">
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider border-b pb-2">
            Definitions / Actions
          </div>
          {shuffledRight.map((item, index) => {
            const isMatched = matchedIndices.has(item.id);
            const isSelected = selectedRight === index;
            const isShaking = wrongMatch?.rightIdx === index;

            return (
              <div
                key={`right-${index}`}
                onClick={() => handleRightClick(index)}
                className={`p-4 rounded-xl border-2 text-sm font-medium transition-all duration-300 cursor-pointer text-left select-none shadow-sm flex items-center justify-between ${isMatched
                  ? 'bg-primary/5 border-primary/40 text-primary/80 cursor-default'
                  : isShaking
                    ? 'bg-destructive/10 border-destructive text-destructive animate-shake shadow-destructive/10'
                    : isSelected
                      ? 'bg-primary/10 border-primary text-primary scale-[1.02] shadow-primary/10'
                      : 'bg-card border-border hover:border-primary/50 hover:bg-muted/30 text-foreground/90'
                  }`}
              >
                <span>{item.text}</span>
                {isMatched && <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 ml-2" />}
                {isShaking && <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Panel */}
      <div className="w-full border-t pt-8 flex flex-col items-center">
        {!isCompleted ? (
          <p className="text-xs text-muted-foreground text-center animate-pulse">
            * Match all items from both columns to complete the activity.
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
              Excellent! You have successfully matched all terms and definitions correctly.
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
