import React from 'react';
import clsx from 'clsx';

export function Select({ value, onChange, children, className }){
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={clsx('rounded-md border border-input bg-transparent px-3 py-2 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}
    >
      {children}
    </select>
  );
}

export function Option({ value, children }){ return <option value={value}>{children}</option>; }
