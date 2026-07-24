import React from 'react';
import clsx from 'clsx';

export default function Input(props){
  return (
    <input
      {...props}
      className={clsx(
        'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.className,
      )}
    />
  );
}
