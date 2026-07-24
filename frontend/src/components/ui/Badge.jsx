import React from 'react';
import clsx from 'clsx';

export default function Badge({ children, variant, outline, className }){
  const base = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors';
  const styles = outline || variant === 'outline'
    ? 'border-border bg-background/80 text-foreground backdrop-blur'
    : 'border-transparent bg-secondary text-secondary-foreground';
  return <span className={clsx(base, styles, className)}>{children}</span>;
}
