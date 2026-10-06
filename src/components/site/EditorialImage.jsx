import React from 'react';
import { cn } from '@/lib/utils';

// Rectangular photograph with a technical caption; slightly desaturated so
// photography sits inside the warm editorial palette.
export default function EditorialImage({ src, alt, caption, index = '01', ratio = 'aspect-[4/5]', className }) {
  return (
    <figure className={cn('min-w-0', className)}>
      <div className={cn('overflow-hidden border border-line bg-surface-alt', ratio)}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover [filter:grayscale(0.35)_sepia(0.08)_contrast(1.02)]" />
      </div>
      {caption && (
        <figcaption className="meta mt-3 flex justify-between gap-4">
          <span>IMG. {index} — {caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

export const PHOTOS = {
  lab: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80',
  drawings: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80',
  components: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1600&q=80',
  circuit: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
};
