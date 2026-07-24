import { useEffect, useState } from 'react';

export function useAssessment(question) {
  const [answer, setAnswer] = useState(initialAnswer(question));
  const [result, setResult] = useState(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    setAnswer(initialAnswer(question));
    setResult(null);
    setStartedAt(Date.now());
  }, [question?.id]);

  function submit() {
    const passed = isCorrect(question, answer);
    const next = {
      passed,
      answer,
      score: passed ? 100 : 0,
      timeSpentSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      explanation: question.explanation,
    };
    setResult(next);
    return next;
  }

  return { answer, setAnswer, result, submit };
}

function isCorrect(question, answer) {
  if (!question) return false;
  if (question.type === 'multiple-select') {
    const expected = [...(question.correctAnswer || [])].sort().join('|');
    const actual = [...(answer || [])].sort().join('|');
    return expected === actual;
  }
  if (question.type === 'short-answer') {
    return String(answer || '').trim().toLowerCase() === String(question.correctAnswer || '').trim().toLowerCase();
  }
  if (question.type === 'match-following' || question.type === 'match-the-following') {
    const expected = question.correctAnswer || {};
    const actual = answer || {};
    const expectedKeys = Object.keys(expected);
    return expectedKeys.length > 0
      && expectedKeys.every((key) => String(actual[key] || '').trim() === String(expected[key] || '').trim());
  }
  if (question.type === 'ordering') {
    const expected = normalizeList(question.correctAnswer || []);
    const actual = normalizeList(answer || []);
    return expected.length > 0
      && actual.length === expected.length
      && expected.every((item, index) => actual[index] === item);
  }
  return String(answer) === String(question.correctAnswer);
}

function normalizeList(value) {
  return (Array.isArray(value) ? value : [])
    .map((item) => String(item || '').trim().replace(/\s+/g, ' ').toLowerCase());
}

function initialAnswer(question) {
  if (!question) return '';
  if (question.type === 'multiple-select') return [];
  if (question.type === 'ordering') return question.items || question.options || [];
  if (question.type === 'match-following' || question.type === 'match-the-following') return {};
  return '';
}
