import React from 'react';

// Typographic wordmark: a small ink square and the name set in the display serif.
const Logo = ({ light = false, name = 'Fullstackverse', tagline }) => (
  <span className="flex items-center gap-2.5">
    <span className={`block h-2.5 w-2.5 ${light ? 'bg-canvas' : 'bg-ink'}`} aria-hidden="true" />
    <span className="leading-none">
      <span className={`block font-display text-[21px] tracking-[-0.035em] ${light ? 'text-canvas' : 'text-ink'}`}>{name}</span>
      {tagline && <span className={`meta mt-1 block !text-[9px] ${light ? '!text-line-dark' : ''}`}>{tagline}</span>}
    </span>
  </span>
);

export default Logo;
