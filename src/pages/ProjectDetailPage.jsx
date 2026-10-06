import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ContactDialogButton, CtaBand, Eyebrow, Reveal, Section, SectionHeading } from '@/components/site/blocks';
import ProjectMockup from '@/components/site/ProjectMockup';
import ProjectCard from '@/components/site/ProjectCard';
import { getProject, projects } from '@/lib/portfolio';
import { getDashboard } from '@/dashboards';
import DashboardBoundary from '@/components/dash/DashboardBoundary';

const pad = (n) => String(n).padStart(2, '0');

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/portfolio" replace />;

  const Dashboard = getDashboard(project.slug);
  const index = projects.indexOf(project);
  const related = [1, 2, 3].map((n) => projects[(index + n) % projects.length]);

  return (
    <>
      <Helmet>
        <title>{`${project.name}: ${project.title} - Fullstackverse Portfolio`}</title>
        <meta name="description" content={project.summary.slice(0, 155)} />
      </Helmet>

      {/* Header */}
      <section className="hero">
        <div className="wrap pb-16 pt-10 md:pb-24 md:pt-14">
          <nav aria-label="Breadcrumb" className="meta mb-14 flex flex-wrap items-center gap-2 md:mb-20">
            <Link to="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/portfolio" className="hover:text-ink">Portfolio</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{project.name}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow index={`P-${pad(index + 1)}`} className="mb-8">{project.category}</Eyebrow>
              <h1 className="display-1">{project.name}</h1>
              <p className="mt-6 max-w-3xl font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15] tracking-[-0.03em] text-ink-2">{project.title}</p>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <dl className="spec">
                <div><dt>Project type</dt><dd>Concept project</dd></div>
                <div><dt>Industry</dt><dd>{project.industry}</dd></div>
                <div><dt>Platforms</dt><dd>{project.platforms.join(' · ')}</dd></div>
                <div><dt>Stack</dt><dd>{project.stack.slice(0, 3).join(' · ')}</dd></div>
              </dl>
            </div>
          </div>
        </div>
        <div className="wrap">
          <Reveal>
            <ProjectMockup project={project} className="aspect-[4/3] md:aspect-[21/9]" />
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="wrap">
          <Reveal className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow index="01">Overview</Eyebrow>
            </div>
            <div className="lg:col-span-6">
              <p className="font-display text-[clamp(1.35rem,2vw,1.85rem)] leading-[1.35] tracking-[-0.02em] text-ink">{project.summary}</p>
              <div className="mt-10">
                <ContactDialogButton>
                  Build something like this <ArrowRight className="h-4 w-4" />
                </ContactDialogButton>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="eyebrow mb-4">Technology</div>
              <ul className="border-t border-line">
                {project.stack.map((t, i) => (
                  <li key={t} className="flex justify-between gap-3 border-b border-line py-2.5 text-sm">
                    <span className="text-ink">{t}</span>
                    <span className="meta">T-{pad(i + 1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive demo dashboard */}
      {Dashboard && (
        <Section id="demo">
          <SectionHeading
            index="02"
            eyebrow="Interactive demo"
            title={`Try ${project.name}`}
            lead="A working dashboard prototype with realistic sample data. Switch views, change the date range, filter, and act on records the way the real product's users would."
          />
          <DashboardBoundary key={project.slug}>
            <Suspense
              fallback={
                <div className="flex min-h-[640px] items-center justify-center border border-line bg-surface">
                  <span className="meta">Loading interactive demo…</span>
                </div>
              }
            >
              <Dashboard project={project} />
            </Suspense>
          </DashboardBoundary>
        </Section>
      )}

      {/* Challenges */}
      <Section>
        <SectionHeading
          index="03"
          eyebrow="Challenges"
          title="The problems this product solves"
          lead={`Before designing ${project.name}, we mapped the everyday problems businesses in ${project.industry.toLowerCase()} face with existing tools and manual processes.`}
        />
        <ol className="grid gap-x-10 border-t border-line md:grid-cols-2 lg:grid-cols-3">
          {project.challenges.map((c, i) => (
            <li key={c.title} className="border-b border-line py-8">
              <span className="meta">C-{pad(i + 1)}</span>
              <h3 className="display-3 mt-4">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Solution */}
      <Section tone="soft">
        <SectionHeading
          index="04"
          eyebrow="Solution"
          title={`How ${project.name} works`}
          lead="A focused set of capabilities that replaces scattered tools with one simple, reliable product."
        />
        <ol className="grid gap-x-16 md:grid-cols-2">
          {project.solutions.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[56px_1fr] gap-4 border-t border-line-dark py-8">
              <span className="font-display text-3xl leading-none text-ink-3">{pad(i + 1)}</span>
              <div>
                <h3 className="display-3">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Key features */}
      <Section>
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Eyebrow index="05" className="mb-8">Key features</Eyebrow>
            <h2 className="display-2">Built for everyday use</h2>
            <ProjectMockup project={project} className="mt-10 aspect-[4/3]" />
          </div>
          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {project.features.map((f, i) => (
              <li key={f.title} className="grid grid-cols-[56px_1fr] gap-4 border-b border-line py-8">
                <span className="meta pt-2">F-{pad(i + 1)}</span>
                <div>
                  <h3 className="display-3">{f.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-2">{f.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* What it delivers */}
      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <div className="mb-14 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <Eyebrow index="06">Outcomes</Eyebrow>
              </div>
              <div className="lg:col-span-9">
                <h2 className="display-2">What {project.name} delivers</h2>
                <p className="lead mt-6">The value a business can expect from a product like this.</p>
              </div>
            </div>
            <div className="grid border-t border-[rgba(244,241,235,0.2)] sm:grid-cols-2 lg:grid-cols-4">
              {project.outcomes.map((o, i) => (
                <div key={o.title} className="border-b border-[rgba(244,241,235,0.2)] py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
                  <span className="meta !text-line-dark">O-{pad(i + 1)}</span>
                  <h3 className="display-3 mt-4 text-canvas">{o.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-line-dark">{o.text}</p>
                </div>
              ))}
            </div>
            {project.note && <p className="mt-10 max-w-2xl border-l border-line-dark pl-4 text-sm text-line-dark">{project.note}</p>}
          </Reveal>
        </div>
      </section>

      {/* More projects */}
      <Section>
        <SectionHeading index="07" eyebrow="More work" title="Explore more projects" lead="More product concepts from the Fullstackverse portfolio" />
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-line pt-6">
          <span className="meta">{projects.length} projects</span>
          <Link to="/portfolio" className="link-arrow">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBand
        index="08"
        title={`Want a product like ${project.name}?`}
        lead="Share your requirements and we'll design and build a solution tailored to your business."
      >
        <ContactDialogButton className="btn btn-inverse">
          Discuss Your Business Requirement <ArrowRight className="h-4 w-4" />
        </ContactDialogButton>
      </CtaBand>
    </>
  );
};

export default ProjectDetailPage;
