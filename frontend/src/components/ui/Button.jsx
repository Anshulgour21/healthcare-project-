import React from 'react';
import clsx from 'clsx';

const variants = {
  default: 'bg-primary text-white hover:bg-primary/90',
  outline: 'border border-border bg-surface hover:bg-surface-secondary',
  ghost: 'hover:bg-surface-secondary',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  default: 'h-10 px-4 py-2',
  lg: 'h-11 px-8 text-base',
};

export default function Button({
  as: Comp = 'button',
  variant = 'default',
  size = 'default',
  className,
  ...props
}) {
  return (
    <Comp
      className={clsx(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className,
      )}
      {...props}
    />
  );
}
