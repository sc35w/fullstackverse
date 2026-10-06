import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { ContactDialogButton, CtaBand, PageHero, Section } from '@/components/site/blocks';
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
        title="Our"
        highlight="Portfolio"
        lead="Product concepts designed by the Fullstackverse team across AI, e-commerce, mobile apps, enterprise software and websites. Each one shows how we would solve a real business problem, and we can build any of them for you."
        actions={
          <ContactDialogButton>
            Discuss Your Project <ArrowRight className="h-4 w-4" />
          </ContactDialogButton>
        }
      />

      <Section>
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects by category">
          {PORTFOLIO_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? 'border-nb-blue bg-nb-blue text-white'
                  : 'border-nb-line bg-white text-nb-muted hover:border-nb-blue hover:text-nb-blue'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <CtaBand title="Have a similar idea?" lead="Tell us what you want to build and we'll turn it into a working product.">
        <ContactDialogButton className="btn-light">
          Start Your Project <ArrowRight className="h-4 w-4" />
        </ContactDialogButton>
      </CtaBand>
    </>
  );
};

export default PortfolioPage;
