import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  ContactDialogButton,
  CtaBand,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  ServiceLinkCard,
  StatsBand,
  TestimonialGrid,
} from '@/components/site/blocks';
import { asset } from '@/lib/utils';
import { projects } from '@/lib/portfolio';
import ProjectCard from '@/components/site/ProjectCard';
import SystemFigure from '@/components/site/SystemFigure';
import { PHONE } from '@/lib/contact';

const stats = [
  { label: 'Clients Served', value: '500+' },
  { label: 'Team Members', value: '25+' },
  { label: 'AI Models Deployed', value: '100+' },
  { label: 'Solutions Delivered', value: '1000+' },
];

const services = [
  {
    title: 'AI Development Services',
    description: 'Cutting-edge AI solutions and machine learning models',
    href: '/ai-services',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications',
    href: '/app-development',
  },
  {
    title: 'Software Development',
    description: 'Custom software solutions for your business',
    href: '/software-development',
  },
  {
    title: 'Web App Development',
    description: 'Modern, responsive web applications',
    href: '/web-development',
  },
  {
    title: 'Website Development',
    description: 'Professional websites that convert',
    href: '/web-development',
  },
  {
    title: 'Game App Development',
    description: 'Engaging games for all platforms',
    href: '/game-development',
  },
];

const brands = [
  'Entrepreneur', 'Economic Times', 'Vedic Exquise', 'Deloitte',
  'TechCrunch', 'Forbes', 'Business Insider', 'Wired',
];

const testimonials = [
  { quote: '"Fullstackverse transformed our entire digital presence. Their AI solutions increased our efficiency by 300%!"', name: 'Rajesh Kumar', role: 'CEO, TechStart Inc.' },
  { quote: '"The mobile app they built for us has over 50k downloads. Professional team with cutting-edge technology."', name: 'Sarah Johnson', role: 'Founder, AppVenture' },
  { quote: '"Outstanding web development! Our e-commerce site now converts 40% better. Highly recommend their services."', name: 'Michael Chen', role: 'Director, EcomPlus' },
  { quote: '"Their AI integration saved us countless hours. The team\'s expertise in automation is unmatched."', name: 'Lisa Rodriguez', role: 'CTO, InnovateCorp' },
  { quote: '"Game development expertise is top-notch. Our mobile game reached top charts within weeks of launch."', name: 'David Park', role: 'CEO, GameForge Studios' },
  { quote: '"From concept to deployment in record time. Their agile methodology and communication were exceptional."', name: 'Anna Thompson', role: 'Product Manager, TechFlow' },
  { quote: '"Comprehensive software solutions that perfectly fit our enterprise needs. ROI was evident within months."', name: 'James Wilson', role: 'VP Operations, EnterpriseCo' },
  { quote: '"Their attention to detail and innovative approach sets them apart. Best development partner we\'ve worked with."', name: 'Emma Davis', role: 'Founder, StartupHub' },
];

const featured = ['vigilo-ai-safety-monitoring', 'dashdrop-same-day-courier-app', 'campusly-school-erp'].map((slug) => projects.find((p) => p.slug === slug));

const HomePage = () => (
  <>
    <Helmet>
      <title>Fullstackverse – Your End-to-End Digital Partner</title>
      <meta
        name="description"
        content="Innovating the Future with AI, Apps & Automation. Professional web development, mobile apps, AI solutions, and digital transformation services."
      />
    </Helmet>

    <PageHero
      eyebrow="Your End-to-End Digital Partner"
      title="Innovating the Future with"
      highlight="AI, Apps & Automation"
      lead="Your End-to-End Digital Partner for transformative technology solutions"
      spec={[
        ['Disciplines', 'Web · Apps · Games · AI · Software'],
        ['Clients served', '500+'],
        ['Base', 'India'],
        ['Contact', `+91 ${PHONE}`],
      ]}
      actions={
        <>
          <ContactDialogButton>
            Start Your Project <ArrowRight className="h-4 w-4" />
          </ContactDialogButton>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="link-arrow px-2 py-3">
                <Play className="h-4 w-4" /> Watch Demo
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2 sm:p-3">
              <video className="aspect-video w-full bg-black" controls autoPlay muted>
                <source src={asset('videos/demo.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </DialogContent>
          </Dialog>
        </>
      }
    />

    <div className="wrap pb-4">
      <Reveal>
        <SystemFigure />
      </Reveal>
    </div>

    <Section>
      <SectionHeading index="01" eyebrow="Services" title="Our Services" lead="Comprehensive digital solutions to transform your business" />
      <div className="border-b border-line">
        {services.map((service, i) => (
          <ServiceLinkCard key={service.title} index={String(i + 1).padStart(2, '0')} {...service} LinkComponent={Link} />
        ))}
      </div>
    </Section>

    <StatsBand index="02" eyebrow="Our Impact" title="Numbers that speak for our success" stats={stats} />

    <Section>
      <SectionHeading
        index="03"
        eyebrow="Work"
        title="Featured projects"
        lead="Product concepts from our portfolio, showing what we can design and build for your business"
      />
      <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ProjectCard project={featured[0]} size="lg" />
        </div>
        <div className="grid gap-y-16 lg:col-span-5">
          {featured.slice(1, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
      <div className="mt-16 flex items-center justify-between border-t border-line pt-6">
        <span className="meta">{projects.length} projects</span>
        <Link to="/portfolio" className="link-arrow">
          View full portfolio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>

    <Section>
      <SectionHeading
        index="04"
        eyebrow="Clients"
        title="What Our Clients Say"
        lead="Trusted by businesses worldwide for delivering exceptional digital solutions"
      />
      <div className="mb-16 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-y border-line py-8">
        <span className="meta w-full md:w-auto">Trusted by leading brands worldwide</span>
        {brands.map((brand) => (
          <span key={brand} className="font-display text-xl tracking-[-0.02em] text-ink-2 md:text-2xl">{brand}</span>
        ))}
      </div>
      <TestimonialGrid items={testimonials} />
    </Section>

    <CtaBand index="05" title="Ready to Transform Your Business?" lead="Let's discuss your project and bring your vision to life">
      <ContactDialogButton className="btn btn-inverse">
        Get Started Today <ArrowRight className="h-4 w-4" />
      </ContactDialogButton>
    </CtaBand>
  </>
);

export default HomePage;
