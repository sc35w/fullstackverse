import React from 'react';
import { Code } from 'lucide-react';

// Fullstackverse wordmark: navy code glyph + name.
const Logo = ({ light = false }) => (
  <span className="flex items-center gap-2">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-nb-blue text-white">
      <Code className="h-5 w-5" strokeWidth={2.5} />
    </span>
    <span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-nb-text'}`}>
      Fullstackverse
    </span>
  </span>
);

export default Logo;
