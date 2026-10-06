// Shared layout for the service pages (web, app, game, software, AI).
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { getProject } from '@/lib/portfolio';
import {
  ContactDialogButton,
  CtaBand,
  FeatureGrid,
  PageHero,
  Section,
  SectionHeading,
  StatsBand,
  TestimonialGrid,
} from './blocks';

export default function ServicePage({ meta, hero, features, technologies, portfolio, stats, testimonials, cta }) {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <PageHero
        variant="dark"
        eyebrow="Our Services"
        title={hero.title}
        highlight={hero.highlight}
        lead={hero.lead}
        note={hero.note}
        actions={
          <ContactDialogButton className="btn-light">
            {hero.cta} <ArrowRight className="h-4 w-4" />
          </ContactDialogButton>
        }
      />

      <Section tone="soft">
        <SectionHeading title={features.title} lead={features.lead} />
        <FeatureGrid items={features.items} columns={features.columns || 3} />
      </Section>

      {technologies && (
        <Section tone="dark">
          <SectionHeading title={technologies.title} lead={technologies.lead} />
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {technologies.items.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-nb-ink2 px-4 py-2 text-sm font-medium text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading title={portfolio.title} lead={portfolio.lead} />
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((slug) => (
            <ProjectCard key={slug} project={getProject(slug)} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/portfolio" className="btn-outline">
            View full portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {stats && <StatsBand stats={stats} />}

      <Section tone="soft">
        <SectionHeading title={testimonials.title} lead={testimonials.lead} />
        <TestimonialGrid items={testimonials.items} />
      </Section>

      <CtaBand title={cta.title} lead={cta.lead}>
        <ContactDialogButton className="btn-light">
          Discuss Your Business Requirement <ArrowRight className="h-4 w-4" />
        </ContactDialogButton>
      </CtaBand>
    </>
  );
}
