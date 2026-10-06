// Shared editorial layout for the service pages (web, app, game, software, AI).
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { getProject } from '@/lib/portfolio';
import { ContactDialogButton, CtaBand, FeatureGrid, PageHero, Section, SectionHeading, StatsBand, TestimonialGrid } from './blocks';

export default function ServicePage({ meta, hero, features, technologies, portfolio, stats, testimonials, cta }) {
  const work = portfolio.projects.map(getProject);
  let n = 0;
  const next = () => String(++n).padStart(2, '0');

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <PageHero
        eyebrow="Our Services"
        title={hero.title}
        highlight={hero.highlight}
        lead={hero.lead}
        note={hero.note}
        spec={[
          ['Discipline', hero.title],
          ['Capabilities', String(features.items.length).padStart(2, '0')],
          ['Related projects', String(work.length).padStart(2, '0')],
          ...(technologies ? [['Technologies', String(technologies.items.length).padStart(2, '0')]] : []),
        ]}
        actions={
          <ContactDialogButton>
            {hero.cta} <ArrowRight className="h-4 w-4" />
          </ContactDialogButton>
        }
      />

      <Section>
        <SectionHeading index={next()} eyebrow="Capabilities" title={features.title} lead={features.lead} />
        <FeatureGrid items={features.items} columns={features.columns === 4 ? 4 : 3} />
      </Section>

      {technologies && (
        <Section tone="soft">
          <SectionHeading index={next()} eyebrow="Technology" title={technologies.title} lead={technologies.lead} />
          <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-8">
            {technologies.items.map((tech, i) => (
              <li key={tech} className="flex min-h-[96px] flex-col justify-between border-b border-r border-line p-4">
                <span className="meta">T-{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] text-ink">{tech}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section>
        <SectionHeading index={next()} eyebrow="Work" title={portfolio.title} lead={portfolio.lead} />
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {work.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-line pt-6">
          <span className="meta">Concept projects</span>
          <Link to="/portfolio" className="link-arrow">
            View full portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {stats && <StatsBand index={next()} eyebrow="Proof" stats={stats} />}

      <Section>
        <SectionHeading index={next()} eyebrow="Clients" title={testimonials.title} lead={testimonials.lead} />
        <TestimonialGrid items={testimonials.items} />
      </Section>

      <CtaBand index={next()} title={cta.title} lead={cta.lead}>
        <ContactDialogButton className="btn btn-inverse">
          Discuss Your Business Requirement <ArrowRight className="h-4 w-4" />
        </ContactDialogButton>
      </CtaBand>
    </>
  );
}
