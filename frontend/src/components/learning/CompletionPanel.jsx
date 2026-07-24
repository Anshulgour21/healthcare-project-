import React from 'react';
import { Award, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function CompletionPanel({ percentComplete, labels, onReview }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-primary/5 p-8 text-center">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
      <Sparkles className="mx-auto h-10 w-10 text-accent" />
      <h2 className="mt-4 text-3xl font-display font-bold">{labels.courseCompleted}</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        {labels.completionMessage}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label={labels.completion} value={`${percentComplete}%`} />
        <Metric label={labels.assessmentScore} value={labels.recorded} />
        <Metric label={labels.certificate} value={labels.eligible} />
      </div>
      <Button className="mt-6" onClick={onReview}>
        <Award className="h-4 w-4" />
        {labels.reviewCourse}
      </Button>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}
