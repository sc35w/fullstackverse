
import { cn } from '@/lib/utils';
import React from 'react';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[110px] w-full rounded-sm border border-line-dark bg-surface px-3.5 py-3 text-[15px] text-ink transition-colors placeholder:text-ink-3 focus-visible:border-ink focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
