import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { ContactDialogButton, CtaBand, PageHero } from '@/components/site/blocks';
import ProjectCard from '@/components/site/ProjectCard';
import { PORTFOLIO_CATEGORIES, projects } from '@/lib/portfolio';

const PortfolioPage = () => {
  const [category, setCategory] = useState('All');
  const shown = category === 'All' ? projects : projects.filter((p) => p.category === category);

  return (
    <>
      <Helmet>
        <title>Portfolio - Fullstackverse</title>
        <meta
          name="description"
          content="Explore Fullstackverse concept projects across AI, e-commerce, mobile apps, enterprise software and websites, and see what we can build for your business."
        />
      </Helmet>

      <PageHero
        eyebrow="Work"
        title="Our"
        highlight="Portfolio"
        lead="Product concepts designed by the Fullstackverse team across AI, e-commerce, mobile apps, enterprise software and websites. Each one shows how we would solve a real business problem, and we can build any of them for you."
        spec={[
          ['Projects', String(projects.length).padStart(2, '0')],
          ['Categories', String(PORTFOLIO_CATEGORIES.length - 1).padStart(2, '0')],
          ['Type', 'Concept projects'],
          ['Interactive demos', String(projects.length).padStart(2, '0')],
        ]}
        actions={
          <ContactDialogButton>
            Discuss Your Project <ArrowRight className="h-4 w-4" />
          </ContactDialogButton>
        }
      />

      <section className="section section--rule !pt-0">
        <div className="wrap">
          <div className="sticky top-16 z-20 -mx-[var(--gutter)] mb-14 border-b border-line bg-canvas/95 px-[var(--gutter)] md:top-[76px]">
            <div className="flex gap-7 overflow-x-auto py-4" role="tablist" aria-label="Filter projects by category">
              {PORTFOLIO_CATEGORIES.map((c) => {
                const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={category === c}
                    onClick={() => setCategory(c)}
                    className={`nav-link shrink-0 ${category === c ? 'is-active' : ''}`}
                  >
                    {c} <span className="mono !text-[10px] text-ink-3">{String(count).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
            {shown.map((project, i) => (
              <div key={project.slug} className={i % 4 === 1 || i % 4 === 2 ? 'md:pt-0' : ''}>
                <ProjectCard project={project} size={i % 3 === 0 ? 'lg' : 'md'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand index="02" title="Have a similar idea?" lead="Tell us what you want to build and we'll turn it into a working product.">
        <ContactDialogButton className="btn btn-inverse">
          Start Your Project <ArrowRight className="h-4 w-4" />
        </ContactDialogButton>
      </CtaBand>
    </>
  );
};

export default PortfolioPage;
