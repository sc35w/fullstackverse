import React from 'react';

const Logo = () => {
  return (
    <svg
      width="220"
      height="40"
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-auto"
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary-h) var(--primary-s) calc(var(--primary-l) - 5%))" />
          <stop offset="100%" stopColor="hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) + 4%))" />
        </linearGradient>
      </defs>
      <text
        x="-6"
        y="28"
        fontFamily="Inter, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="url(#textGradient)"
      >
        Fullstackverse
      </text>
    </svg>
  );
};

export default Logo;