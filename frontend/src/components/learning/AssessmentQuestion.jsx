import React, { useState } from 'react';
import { CheckSquare, Eye, GripVertical, Layers, ListChecks, MessageSquare, MousePointer2, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import { useAssessment } from '../../hooks/useAssessment';

export default function AssessmentQuestion({ section, savedResult, onSubmit }) {
  const { answer, setAnswer, result, submit } = useAssessment(section.question);
  const visibleResult = result || savedResult;

  function handleSubmit() {
    const next = submit();
    onSubmit(section.sectionId, next);
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <QuestionTypeIcon type={section.question.type} />
          {questionTypeLabel(section.question.type)}
        </div>
        <h2 className="text-2xl font-display font-bold">{section.question.question}</h2>
      </div>

      <QuestionControl question={section.question} answer={answer} setAnswer={setAnswer} />

      <Button onClick={handleSubmit}>Submit Answer</Button>

      {visibleResult && (
        <AssessmentResultPanel question={section.question} result={visibleResult} />
      )}
    </div>
  );
}

function AssessmentResultPanel({ question, result }) {
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  return (
    <div className={`rounded-2xl border p-5 ${result.passed ? 'bg-primary/5 text-primary' : 'bg-destructive/5 text-destructive'}`}>
      <div className="font-semibold">
        {result.passed ? 'Correct answer' : 'Review needed'} - Score {result.score}%
      </div>
      <p className="mt-2 text-sm opacity-90">{result.explanation}</p>

      <div className="mt-4 grid gap-3">
        <AnswerBlock title="Your answer" value={result.answer} type={question.type} />

        {showCorrectAnswer ? (
          <AnswerBlock title="Right answer" value={question.correctAnswer} type={question.type} />
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-fit bg-background/80 text-foreground hover:bg-background"
            onClick={() => setShowCorrectAnswer(true)}
          >
            <Eye className="h-4 w-4" />
            Show right answer
          </Button>
        )}
      </div>

      <div className="mt-3 text-xs opacity-80">Time spent: {result.timeSpentSeconds || 0}s</div>
    </div>
  );
}

function AnswerBlock({ title, value, type }) {
  return (
    <div className="rounded-xl border bg-background/80 p-4 text-foreground">
      <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{title}</div>
      {formatAnswer(value, type)}
    </div>
  );
}

function QuestionControl({ question, answer, setAnswer }) {
  if (question.type === 'multiple-select') {
    const selected = Array.isArray(answer) ? answer : [];
    return (
      <div className="grid gap-2">
        {question.options.map((option) => (
          <label
            key={option}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors cursor-pointer ${
              selected.includes(option) ? 'border-primary bg-primary/5' : 'hover:bg-muted/40'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={(event) => {
                setAnswer(event.target.checked ? [...selected, option] : selected.filter((item) => item !== option));
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === 'short-answer') {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
          Give a short clinical answer. For this POC, the answer is checked against the expected key phrase.
        </div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          className="min-h-32 w-full rounded-xl border bg-background p-4 outline-none focus:ring-2 focus:ring-ring"
          placeholder="Type your response..."
        />
      </div>
    );
  }

  if (question.type === 'match-following' || question.type === 'match-the-following') {
    return <MatchingQuestion question={question} answer={answer} setAnswer={setAnswer} />;
  }

  if (question.type === 'ordering') {
    return <OrderingQuestion question={question} answer={answer} setAnswer={setAnswer} />;
  }

  if (question.type === 'scenario') {
    return (
      <div className="space-y-4">
        {question.scenario && (
          <div className="rounded-xl border bg-muted/40 p-4 text-sm leading-relaxed">{question.scenario}</div>
        )}
        <div className="grid gap-2">
          {question.options.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors cursor-pointer ${
                answer === option ? 'border-primary bg-primary/5' : 'hover:bg-muted/40'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                checked={answer === option}
                onChange={() => setAnswer(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {question.options.map((option) => (
        <label
          key={option}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors cursor-pointer ${
            answer === option ? 'border-primary bg-primary/5' : 'hover:bg-muted/40'
          }`}
        >
          <input
            type="radio"
            name={question.id}
            checked={answer === option}
            onChange={() => setAnswer(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function MatchingQuestion({ question, answer, setAnswer }) {
  const pairs = question.pairs || [];
  const choices = question.choices || pairs.map((pair) => pair.right);
  const assignedChoices = new Set(Object.values(answer || {}).filter(Boolean));
  const availableChoices = choices.filter((choice) => !assignedChoices.has(choice));
  const [draggedChoice, setDraggedChoice] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  function assignChoice(left, choice) {
    if (!choice) return;
    const next = { ...(answer || {}) };
    Object.entries(next).forEach(([key, value]) => {
      if (value === choice && key !== left) delete next[key];
    });
    next[left] = choice;
    setAnswer(next);
    setDraggedChoice(null);
    setSelectedChoice(null);
  }

  function clearChoice(left) {
    const next = { ...(answer || {}) };
    delete next[left];
    setAnswer(next);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MousePointer2 className="h-4 w-4 text-primary" />
            Pick an option
          </div>
          {selectedChoice && (
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Selected: {selectedChoice}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableChoices.map((choice) => (
            <button
              type="button"
              key={choice}
              draggable
              onClick={() => setSelectedChoice(selectedChoice === choice ? null : choice)}
              onDragStart={() => setDraggedChoice(choice)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-lg border bg-background px-3 py-2 text-left text-sm transition-colors ${
                selectedChoice === choice ? 'border-primary ring-2 ring-primary/20' : 'hover:bg-muted'
              }`}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span>{choice}</span>
            </button>
          ))}
          {!availableChoices.length && (
            <div className="rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
              All options are placed. Clear a row to change an answer.
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Drag an option into a row box, or tap an option first and then tap the matching row box.</p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)] border-b bg-muted/30 text-xs font-semibold uppercase text-muted-foreground">
          <div className="px-4 py-3">Fixed row</div>
          <div className="border-l px-4 py-3">Matching box</div>
        </div>

        <div className="divide-y">
          {pairs.map((pair) => {
            const selected = answer?.[pair.left];
            return (
              <div key={pair.left} className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)]">
                <div className="flex items-center px-4 py-4">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">Term</div>
                    <div className="font-semibold">{pair.left}</div>
                  </div>
                </div>

                <div className="border-t px-4 py-4 sm:border-l sm:border-t-0">
                  <button
                    type="button"
                    onClick={() => selectedChoice && assignChoice(pair.left, selectedChoice)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => assignChoice(pair.left, draggedChoice)}
                    className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      selected
                        ? 'border-primary bg-primary/5'
                        : 'border-dashed bg-background hover:bg-muted/40'
                    }`}
                  >
                    <span className={selected ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                      {selected || 'Drop selected option here'}
                    </span>
                    {selected ? (
                      <span
                        role="button"
                        tabIndex={0}
                        className="text-xs font-medium text-primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearChoice(pair.left);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            clearChoice(pair.left);
                          }
                        }}
                      >
                        Clear
                      </span>
                    ) : (
                      <MousePointer2 className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg bg-muted p-3 text-sm">
        <span className="font-medium">Current matching: </span>
        {pairs.map((pair) => `${pair.left}: ${answer?.[pair.left] || '-'}`).join(' | ')}
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm text-primary"
        onClick={() => {
          setAnswer({});
          setDraggedChoice(null);
          setSelectedChoice(null);
        }}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset matching
      </button>
    </div>
  );
}

function OrderingQuestion({ question, answer, setAnswer }) {
  const items = question.items || question.options || [];
  const selected = Array.isArray(answer) && answer.length ? answer : items;
  const [draggedItem, setDraggedItem] = useState(null);

  function moveItem(targetItem) {
    if (!draggedItem || draggedItem === targetItem) return;
    const next = [...selected];
    const fromIndex = next.indexOf(draggedItem);
    const toIndex = next.indexOf(targetItem);
    if (fromIndex === -1 || toIndex === -1) return;
    next.splice(fromIndex, 1);
    next.splice(toIndex, 0, draggedItem);
    setAnswer(next);
    setDraggedItem(null);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Drag and drop the items into the correct order.</p>
      <div className="grid gap-2">
        {selected.map((item, index) => (
          <button
            type="button"
            key={item}
            draggable
            onDragStart={() => setDraggedItem(item)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => moveItem(item)}
            className={`flex items-center gap-3 rounded-xl border bg-background px-3 py-3 text-left transition-colors hover:bg-muted ${
              draggedItem === item ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-xs font-semibold">{index + 1}</span>
            <span className="flex-1">{item}</span>
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-muted p-3 text-sm">
        <span className="font-medium">Current order: </span>
        {selected.length ? selected.join(' -> ') : 'None selected'}
      </div>
      <button type="button" className="inline-flex items-center gap-1 text-sm text-primary" onClick={() => setAnswer(items)}>
        <RotateCcw className="h-3.5 w-3.5" />
        Reset order
      </button>
    </div>
  );
}

function formatAnswer(value, type) {
  if (type === 'match-following' || type === 'match-the-following') {
    const entries = Object.entries(value || {});
    if (!entries.length) return <div className="text-sm text-muted-foreground">No matches selected</div>;
    return (
      <div className="space-y-2">
        {entries.map(([left, right]) => (
          <div key={left} className="grid gap-2 rounded-lg border p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="text-sm font-medium">{left}</div>
            <div className="text-sm text-muted-foreground">{right}</div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'ordering') {
    const items = Array.isArray(value) ? value : [];
    if (!items.length) return <div className="text-sm text-muted-foreground">No order selected</div>;
    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-3 rounded-lg border p-3 text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-semibold">{index + 1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'multiple-select') {
    const items = Array.isArray(value) ? value : [];
    if (!items.length) return <div className="text-sm text-muted-foreground">No options selected</div>;
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border bg-muted/40 px-3 py-1 text-sm">{item}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="text-sm">
      {value || <span className="text-muted-foreground">No answer submitted</span>}
    </div>
  );
}

function questionTypeLabel(type = 'single-choice') {
  const labels = {
    'single-choice': 'Single choice',
    'true-false': 'True / false',
    'multiple-select': 'Multiple select',
    'match-following': 'Drag-drop matching',
    'match-the-following': 'Drag-drop matching',
    ordering: 'Drag-drop ordering',
    scenario: 'Scenario decision',
    'short-answer': 'Short answer',
  };
  return labels[type] || 'Assessment';
}

function QuestionTypeIcon({ type }) {
  if (type === 'multiple-select') return <CheckSquare className="h-3.5 w-3.5" />;
  if (type === 'match-following' || type === 'match-the-following') return <Layers className="h-3.5 w-3.5" />;
  if (type === 'ordering') return <ListChecks className="h-3.5 w-3.5" />;
  if (type === 'scenario' || type === 'short-answer') return <MessageSquare className="h-3.5 w-3.5" />;
  return <MousePointer2 className="h-3.5 w-3.5" />;
}
