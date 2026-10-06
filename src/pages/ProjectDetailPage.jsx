import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, ChevronRight, Layers, Lightbulb, MonitorSmartphone, AlertTriangle } from 'lucide-react';
import { ContactDialogButton, CtaBand, Section, SectionHeading } from '@/components/site/blocks';
import ProjectMockup from '@/components/site/ProjectMockup';
import ProjectCard from '@/components/site/ProjectCard';
import { getProject, projects } from '@/lib/portfolio';
import { getDashboard } from '@/dashboards';
import DashboardBoundary from '@/components/dash/DashboardBoundary';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/portfolio" replace />;

  const Dashboard = getDashboard(project.slug);
  const index = projects.indexOf(project);
  const related = [1, 2, 3].map((n) => projects[(index + n) % projects.length]);

  const facts = [
    { icon: Lightbulb, label: 'Project type', value: 'Concept project' },
    { icon: Building2, label: 'Industry', value: project.industry },
    { icon: Layers, label: 'Category', value: project.category },
    { icon: MonitorSmartphone, label: 'Platforms', value: project.platforms.join(', ') },
  ];

  return (
    <>
      <Helmet>
        <title>{`${project.name}: ${project.title} - Fullstackverse Portfolio`}</title>
        <meta name="description" content={project.summary.slice(0, 155)} />
      </Helmet>

      {/* Header */}
      <section className="nb-hero">
        <div className="nb-container pb-12 pt-8 md:pb-16">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-slate-500">
            <Link to="/" className="hover:text-nb-blue">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/portfolio" className="hover:text-nb-blue">Portfolio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-nb-text">{project.name}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="nb-eyebrow mb-4">{project.name}</div>
              <h1 className="nb-h1 !text-[clamp(1.9rem,3.6vw,2.9rem)]">{project.title}</h1>
              <p className="nb-lead mt-5 md:text-lg">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.platforms.map((p) => (
                  <span key={p} className="nb-chip bg-white">{p}</span>
                ))}
              </div>
              <div className="mt-8">
                <ContactDialogButton>
                  Build something like this <ArrowRight className="h-4 w-4" />
                </ContactDialogButton>
              </div>
            </div>
            <ProjectMockup project={project} className="aspect-[4/3] rounded-2xl border border-white bg-white" />
          </div>
        </div>
      </section>

      {/* Facts bar */}
      <div className="nb-container -mt-px">
        <div className="relative z-10 -mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 bg-nb-ink text-white lg:grid-cols-4">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 bg-nb-ink p-5">
              <Icon className="h-5 w-5 shrink-0 text-slate-400" />
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug">{value}</div>
                <div className="text-xs text-slate-400">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive demo dashboard */}
      {Dashboard && (
        <Section className="!pb-0" id="demo">
          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="nb-eyebrow mb-3">Interactive demo</div>
              <h2 className="nb-h2">Try {project.name}</h2>
              <p className="nb-lead mt-3 max-w-3xl">
                A working dashboard prototype with realistic sample data. Switch views, change the date range, filter, and act on records
                the way the real product's users would.
              </p>
            </div>
          </div>
          <DashboardBoundary key={project.slug}>
          <Suspense
            fallback={
              <div className="flex min-h-[640px] items-center justify-center rounded-2xl border border-slate-200 bg-[#F7F8FA] text-sm text-slate-500">
                Loading interactive demo…
              </div>
            }
          >
            <Dashboard project={project} />
          </Suspense>
          </DashboardBoundary>
        </Section>
      )}

      {/* Tech stack */}
      <Section className="!pb-0">
        <div className="nb-eyebrow mb-4">Technology stack</div>
        <div className="flex flex-wrap gap-3">
          {project.stack.map((t) => (
            <span key={t} className="rounded-lg border border-nb-line bg-white px-4 py-2 text-sm font-medium text-nb-text">
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Challenges */}
      <Section>
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="nb-eyebrow mb-3">Challenges</div>
            <h2 className="nb-h2">The problems this product solves</h2>
          </div>
          <p className="nb-lead">
            Before designing {project.name}, we mapped the everyday problems businesses in {project.industry.toLowerCase()} face
            with existing tools and manual processes.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {project.challenges.map((c) => (
            <div key={c.title} className="nb-card">
              <AlertTriangle className="mb-3 h-5 w-5 text-nb-orange" />
              <h3 className="font-semibold text-nb-text">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nb-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Solution */}
      <Section tone="soft">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="nb-eyebrow mb-3">Our solution</div>
            <h2 className="nb-h2">How {project.name} works</h2>
          </div>
          <p className="nb-lead">
            A focused set of capabilities that replaces scattered tools with one simple, reliable product.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {project.solutions.map((s) => (
            <div key={s.title} className="nb-card flex gap-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <h3 className="font-semibold text-nb-text">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-nb-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Key features */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            <div className="nb-eyebrow mb-3">Key features</div>
            <h2 className="nb-h2">Built for everyday use</h2>
            <ProjectMockup project={project} className="mt-8 aspect-[4/3] rounded-2xl" />
          </div>
          <ol className="divide-y divide-nb-line">
            {project.features.map((f, i) => (
              <li key={f.title} className="flex gap-5 py-6 first:pt-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nb-soft text-sm font-bold text-nb-blue">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-nb-text">{f.title}</h3>
                  <p className="mt-1.5 text-nb-muted">{f.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* What it delivers */}
      <section className="bg-nb-blue py-14 text-white md:py-16">
        <div className="nb-container">
          <div className="mb-10 max-w-2xl">
            <h2 className="nb-h2 !text-white">What {project.name} delivers</h2>
            <p className="mt-3 text-blue-100">The value a business can expect from a product like this.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {project.outcomes.map((o) => (
              <div key={o.title} className="bg-nb-blue p-6">
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100">{o.text}</p>
              </div>
            ))}
          </div>
          {project.note && <p className="mt-6 text-sm text-blue-100">{project.note}</p>}
        </div>
      </section>

      {/* More projects */}
      <Section>
        <SectionHeading title="Explore more projects" lead="More product concepts from the Fullstackverse portfolio" />
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/portfolio" className="btn-outline">
            View all projects
          </Link>
        </div>
      </Section>

      <CtaBand
        title={`Want a product like ${project.name}?`}
        lead="Share your requirements and we'll design and build a solution tailored to your business."
      >
        <ContactDialogButton className="btn-light">
          Discuss Your Business Requirement <ArrowRight className="h-4 w-4" />
        </ContactDialogButton>
      </CtaBand>
    </>
  );
};

export default ProjectDetailPage;
