// Layout building blocks for the nextbrain-style design system.
import React, { useState } from 'react';
import { ArrowUpRight, ImageOff, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { cn } from '@/lib/utils';

const toneClass = {
  white: '',
  soft: 'nb-section--soft',
  dark: 'nb-section--dark',
};

export function Section({ tone = 'white', id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn('nb-section', toneClass[tone], className)}>
      <div className={cn('nb-container', containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead, align = 'center', className }) {
  const centered = align === 'center';
  return (
    <div className={cn('mb-10 md:mb-12', centered && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow && <div className="nb-eyebrow mb-3">{eyebrow}</div>}
      <h2 className="nb-h2">{title}</h2>
      {lead && <p className={cn('nb-lead mt-4', centered && 'mx-auto max-w-2xl')}>{lead}</p>}
    </div>
  );
}

// Page hero. "light" is the soft peach-to-lilac wash used on the homepage;
// "dark" is the ink band used on service pages.
export function PageHero({ variant = 'light', eyebrow, title, highlight, lead, actions, aside, note }) {
  const dark = variant === 'dark';
  const centered = !aside;
  return (
    <section className={dark ? 'nb-hero--dark' : 'nb-hero'}>
      <div
        className={cn(
          'nb-container py-16 md:py-24',
          aside && 'grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]'
        )}
      >
        <div className={cn(centered && 'mx-auto max-w-4xl text-center')}>
          {eyebrow && <div className={cn('nb-eyebrow mb-4', dark && 'nb-eyebrow--light')}>{eyebrow}</div>}
          <h1 className={cn('nb-h1', dark && '!text-white')}>
            {title}
            {highlight && (
              <>
                {' '}
                <span className="nb-gradient-text inline-block">{highlight}</span>
              </>
            )}
          </h1>
          {lead && (
            <p
              className={cn(
                'mt-5 text-base md:text-lg leading-relaxed',
                dark ? 'text-slate-300' : 'text-nb-muted',
                centered && 'mx-auto max-w-2xl'
              )}
            >
              {lead}
            </p>
          )}
          {note && (
            <p className={cn('mt-4 text-sm font-medium', dark ? 'text-slate-200' : 'text-nb-blue')}>{note}</p>
          )}
          {actions && (
            <div className={cn('mt-8 flex flex-col gap-3 sm:flex-row', centered && 'sm:justify-center')}>
              {actions}
            </div>
          )}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </section>
  );
}

// Button that opens the business requirement form in a dialog.
export function ContactDialogButton({ children, className = 'btn-solid', title, type }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={className}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <ContactForm title={title} type={type} embedded />
      </DialogContent>
    </Dialog>
  );
}

export function FeatureCard({ icon: Icon, title, description, children, className }) {
  return (
    <div className={cn('nb-card h-full', className)}>
      {Icon && (
        <span className="nb-icon mb-4">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <h3 className="text-lg font-semibold text-nb-text">{title}</h3>
      {description && <p className="mt-2 text-sm leading-relaxed text-nb-muted">{description}</p>}
      {children}
    </div>
  );
}

export function FeatureGrid({ items, columns = 3 }) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];
  return (
    <div className={cn('grid gap-5', cols)}>
      {items.map((item) => (
        <FeatureCard key={item.title} {...item} />
      ))}
    </div>
  );
}

// Service card with an "Explore More" link, as on the nextbrain homepage.
export function ServiceLinkCard({ icon: Icon, title, description, href, LinkComponent }) {
  return (
    <LinkComponent to={href} className="nb-card group flex h-full flex-col">
      {Icon && (
        <span className="nb-icon mb-4">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <h3 className="text-lg font-semibold text-nb-text">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-nb-muted">{description}</p>
      <span className="nb-link-arrow mt-5 group-hover:text-nb-blue">
        Explore More <ArrowUpRight className="h-4 w-4" />
      </span>
    </LinkComponent>
  );
}

// Dark "proof of impact" band with stat tiles.
export function StatsBand({ eyebrow, title, lead, stats }) {
  return (
    <Section tone="dark">
      {(eyebrow || title) && (
        <div className="mb-10 max-w-2xl">
          {eyebrow && <div className="nb-eyebrow mb-3">{eyebrow}</div>}
          {title && <h2 className="nb-h2">{title}</h2>}
          {lead && <p className="nb-lead mt-3">{lead}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="nb-card--dark">
            <div className="text-3xl font-semibold md:text-4xl">{stat.value}</div>
            <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function TestimonialCard({ quote, name, role }) {
  return (
    <figure className="nb-card flex h-full flex-col">
      <div className="mb-3 flex gap-0.5" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-nb-muted">{quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-nb-line pt-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6ECF8] text-sm font-semibold text-nb-blue">
          {name.replace(/^(Dr\.|Prof\.)\s*/, '').charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-nb-text">{name}</span>
          <span className="block text-xs text-slate-500">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialGrid({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((t) => (
        <TestimonialCard key={t.name + t.quote} {...t} />
      ))}
    </div>
  );
}

const mediaAspect = {
  landscape: 'aspect-video',
  portrait: 'aspect-[9/16]',
  square: 'aspect-square',
};

// Portfolio / demo card. Accepts the item shape used in src/lib/demos.js.
export function PortfolioCard({ item, shape = 'landscape', fallbackImage }) {
  const { title, description, url, media, badges, category, genre, platform, status } = item;
  const meta = [category, genre, platform].filter(Boolean);
  // Some demo images are hosted externally; show a neutral panel if one fails.
  const [imageFailed, setImageFailed] = useState(false);
  const Wrapper = url ? 'a' : 'div';
  const wrapperProps = url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper {...wrapperProps} className="group block h-full overflow-hidden rounded-2xl border border-nb-line bg-white transition-shadow hover:shadow-lg">
      <div className={cn('relative overflow-hidden bg-nb-soft', mediaAspect[shape])}>
        {media?.type === 'video' ? (
          <video
            src={media.src}
            poster={media.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : imageFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
            <ImageOff className="h-7 w-7" />
            <span className="px-4 text-center text-xs font-medium">{title}</span>
          </div>
        ) : (
          <img
            onError={() => setImageFailed(true)}
            src={media?.src || fallbackImage}
            alt={media?.alt || `${title} preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {status && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-nb-blue">
            {status}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-nb-text group-hover:text-nb-blue">{title}</h3>
        {meta.length > 0 && <p className="mt-1 text-xs text-slate-500">{meta.join(' · ')}</p>}
        {description && <p className="mt-2 text-sm leading-relaxed text-nb-muted">{description}</p>}
        {badges?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {badges.map((b) => (
              <span key={b} className="nb-chip">
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
}

export function PortfolioGrid({ items, shape = 'landscape', fallbackImage }) {
  const cols = {
    landscape: 'sm:grid-cols-2 lg:grid-cols-3',
    portrait: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
    square: 'sm:grid-cols-2 lg:grid-cols-4',
  }[shape];
  return (
    <div className={cn('grid gap-5', cols)}>
      {items.map((item, i) => (
        <PortfolioCard key={`${item.title}-${i}`} item={item} shape={shape} fallbackImage={fallbackImage} />
      ))}
    </div>
  );
}

// Closing call-to-action band.
export function CtaBand({ title, lead, children }) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl rounded-2xl bg-nb-ink px-6 py-12 text-center md:px-12 md:py-14">
        <h2 className="nb-h2 !text-white">{title}</h2>
        {lead && <p className="mx-auto mt-4 max-w-xl text-slate-300">{lead}</p>}
        {children && <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">{children}</div>}
      </div>
    </Section>
  );
}
