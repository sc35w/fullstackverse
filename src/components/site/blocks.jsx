// Editorial layout building blocks shared by every page.
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import { cn } from '@/lib/utils';

// Fades content up once it scrolls into view (disabled for reduced motion via CSS).
export function Reveal({ as: Tag = 'div', className, children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn('reveal', shown && 'is-visible', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}

const toneClass = {
  white: 'section--rule',
  soft: 'section--alt section--rule',
  dark: 'section--ink',
};

export function Section({ tone = 'white', id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn('section', toneClass[tone], className)}>
      <div className={cn('wrap', containerClassName)}>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

// "01 — Label" chapter marker.
export function Eyebrow({ index, children, className }) {
  return (
    <div className={cn('eyebrow', className)}>
      {index && <span className="eyebrow__index">{index}</span>}
      {index && <span aria-hidden="true">—</span>}
      <span>{children}</span>
    </div>
  );
}

// Asymmetric editorial heading: chapter label on the left, headline + lead on the right.
export function SectionHeading({ index, eyebrow, title, lead, className }) {
  return (
    <div className={cn('mb-12 grid gap-6 md:mb-16 lg:grid-cols-12', className)}>
      <div className="lg:col-span-3">{(eyebrow || index) && <Eyebrow index={index}>{eyebrow}</Eyebrow>}</div>
      <div className="lg:col-span-9">
        <h2 className="display-2 max-w-4xl">{title}</h2>
        {lead && <p className="lead mt-6">{lead}</p>}
      </div>
    </div>
  );
}

// Page hero: huge left-aligned headline, small eyebrow, short paragraph, one strong CTA.
// `spec` renders a technical metadata list beside the copy.
export function PageHero({ eyebrow, index = '00', title, highlight, lead, actions, aside, note, spec, meta }) {
  return (
    <section className="hero">
      <div className="wrap pb-16 pt-16 md:pb-24 md:pt-28">
        <div className={cn('grid gap-12', (aside || spec) && 'lg:grid-cols-12 lg:items-end')}>
          <div className={cn((aside || spec) && 'lg:col-span-8')}>
            {eyebrow && <Eyebrow index={index} className="mb-8">{eyebrow}</Eyebrow>}
            <h1 className="display-1">
              {title}
              {highlight && (
                <>
                  {' '}
                  <span className="text-emph">{highlight}</span>
                </>
              )}
            </h1>
            {lead && <p className="lead mt-8 md:text-lg">{lead}</p>}
            {note && <p className="mt-4 max-w-xl border-l border-line-dark pl-4 text-sm text-ink-2">{note}</p>}
            {actions && <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>}
          </div>
          {spec && (
            <dl className="spec lg:col-span-4">
              {spec.map(([k, val]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
          )}
          {aside && <div className="min-w-0 lg:col-span-4">{aside}</div>}
        </div>
        {meta && (
          <div className="meta mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-4 md:mt-24">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Opens the business requirement form in a dialog.
export function ContactDialogButton({ children, className = 'btn btn-primary', title, type }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={className}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <ContactForm title={title} type={type} embedded />
      </DialogContent>
    </Dialog>
  );
}

// Numbered editorial entry (replaces icon cards).
export function FeatureCard({ index, title, description, children, className }) {
  return (
    <div className={cn('border-t border-line-dark pt-6', className)}>
      {index && <div className="meta mb-6">{index}</div>}
      <h3 className="display-3">{title}</h3>
      {description && <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-2">{description}</p>}
      {children}
    </div>
  );
}

export function FeatureGrid({ items, columns = 3 }) {
  const cols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];
  return (
    <div className={cn('grid gap-x-10 gap-y-14', cols)}>
      {items.map((item, i) => (
        <FeatureCard key={item.title} index={String(i + 1).padStart(2, '0')} title={item.title} description={item.description}>
          {item.children}
        </FeatureCard>
      ))}
    </div>
  );
}

// Full-width index row linking to a service page.
export function ServiceLinkCard({ index, title, description, href, LinkComponent }) {
  return (
    <LinkComponent
      to={href}
      className="group grid items-baseline gap-3 border-t border-line py-7 transition-colors duration-200 hover:bg-surface md:grid-cols-12 md:gap-6 md:px-3"
    >
      <span className="meta md:col-span-1">{index}</span>
      <h3 className="display-3 md:col-span-5">{title}</h3>
      <p className="text-[15px] text-ink-2 md:col-span-5">{description}</p>
      <span className="hidden justify-end md:col-span-1 md:flex">
        <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
      </span>
    </LinkComponent>
  );
}

// Proof row: large serif figures separated by hairlines.
export function StatsBand({ index, eyebrow, title, lead, stats }) {
  return (
    <Section>
      {title ? (
        <SectionHeading index={index} eyebrow={eyebrow} title={title} lead={lead} />
      ) : (
        eyebrow && <Eyebrow index={index} className="mb-10">{eyebrow}</Eyebrow>
      )}
      <div className="grid grid-cols-2 border-t border-line-dark lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={cn('py-8 md:py-10', i % 2 === 1 ? 'border-l border-line pl-5' : 'pr-5', 'lg:px-8 lg:first:pl-0', i > 0 && 'lg:border-l lg:border-line')}>
            <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-[-0.04em]">{stat.value}</div>
            <div className="meta mt-4">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function TestimonialCard({ quote, name, role }) {
  return (
    <figure className="flex h-full flex-col border-t border-line pt-6">
      <div className="mb-4 flex gap-0.5" aria-label="Rated 5 out of 5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-ink text-ink" />
        ))}
      </div>
      <blockquote className="flex-1 font-display text-[1.15rem] italic leading-snug tracking-[-0.01em] text-ink md:text-[1.25rem]">{quote}</blockquote>
      <figcaption className="mt-6">
        <span className="block text-sm font-medium text-ink">{name}</span>
        <span className="meta mt-1 block">{role}</span>
      </figcaption>
    </figure>
  );
}

export function TestimonialGrid({ items }) {
  return (
    <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
      {items.map((t) => (
        <TestimonialCard key={t.name + t.quote} {...t} />
      ))}
    </div>
  );
}

// Closing chapter on ink: large statement left, action right.
export function CtaBand({ index, title, lead, children }) {
  return (
    <section className="section section--ink">
      <div className="wrap">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {index && <Eyebrow index={index} className="mb-8">Contact</Eyebrow>}
            <h2 className="display-2">{title}</h2>
          </div>
          <div className="lg:col-span-4">
            {lead && <p className="lead mb-8">{lead}</p>}
            {children && <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">{children}</div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
