// "FIG. 00" schematic: the five service disciplines arranged around the client's
// business, drawn as a thin-line system diagram with technical labels.
import React from 'react';

const NODES = [
  { id: 'S-01', label: 'Web', x: 120, y: 70 },
  { id: 'S-02', label: 'Mobile apps', x: 120, y: 230 },
  { id: 'S-03', label: 'Games', x: 600, y: 300 },
  { id: 'S-04', label: 'AI & automation', x: 1080, y: 70 },
  { id: 'S-05', label: 'Software', x: 1080, y: 230 },
];

export default function SystemFigure() {
  return (
    <figure className="border-y border-line">
      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 1200 360" className="h-auto w-full min-w-[760px]" role="img" aria-label="Diagram: web, mobile apps, games, AI and software services connected to your business">
          <defs>
            <pattern id="fig-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="#211F1A" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width="1200" height="360" fill="url(#fig-grid)" />
          {/* connectors */}
          {NODES.map((n) => {
            const mx = n.x < 600 ? 360 : n.x > 600 ? 840 : 600;
            return (
              <path
                key={n.id}
                d={n.x === 600 ? `M600 ${n.y - 22} V 214` : `M${n.x + (n.x < 600 ? 92 : -92)} ${n.y} H ${mx} V 180 H ${n.x < 600 ? 498 : 702}`}
                fill="none"
                stroke="#211F1A"
                strokeOpacity="0.55"
                strokeWidth="1"
              />
            );
          })}
          {/* core */}
          <rect x="498" y="146" width="204" height="68" fill="#FAF8F4" stroke="#211F1A" />
          <text x="600" y="176" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fill="#211F1A">Your business</text>
          <text x="600" y="198" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5" fill="#8A837A">CORE · END-TO-END</text>
          {/* nodes */}
          {NODES.map((n) => (
            <g key={n.id}>
              <rect x={n.x - 92} y={n.y - 22} width="184" height="44" fill="#FAF8F4" stroke="#211F1A" strokeOpacity="0.7" />
              <text x={n.x - 80} y={n.y + 5} fontFamily="Inter, sans-serif" fontSize="14" fill="#211F1A">{n.label}</text>
              <text x={n.x + 80} y={n.y + 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#8A837A">{n.id}</text>
            </g>
          ))}
          {/* dimension ticks */}
          <path d="M28 340 H 1172" stroke="#211F1A" strokeOpacity="0.3" />
          {[...Array(13)].map((_, i) => (
            <path key={i} d={`M${28 + i * 95.33} 336 V 344`} stroke="#211F1A" strokeOpacity="0.3" />
          ))}
        </svg>
      </div>
      <figcaption className="meta flex justify-between gap-4 py-3">
        <span>FIG. 00 — Delivery system</span>
        <span className="hidden sm:inline">Strategy · Design · Engineering · Launch</span>
      </figcaption>
    </figure>
  );
}
