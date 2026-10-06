import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code2, Gamepad2, Globe, LayoutTemplate, Play, Smartphone } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  ContactDialogButton,
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
  ServiceLinkCard,
  StatsBand,
  TestimonialGrid,
} from '@/components/site/blocks';
import { asset } from '@/lib/utils';
import { projects } from '@/lib/portfolio';
import ProjectCard from '@/components/site/ProjectCard';

const stats = [
  { label: 'Clients Served', value: '500+' },
  { label: 'Team Members', value: '25+' },
  { label: 'AI Models Deployed', value: '100+' },
  { label: 'Solutions Delivered', value: '1000+' },
];

const services = [
  {
    icon: Brain,
    title: 'AI Development Services',
    description: 'Cutting-edge AI solutions and machine learning models',
    href: '/ai-services',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications',
    href: '/app-development',
  },
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom software solutions for your business',
    href: '/software-development',
  },
  {
    icon: LayoutTemplate,
    title: 'Web App Development',
    description: 'Modern, responsive web applications',
    href: '/web-development',
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Professional websites that convert',
    href: '/web-development',
  },
  {
    icon: Gamepad2,
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
      title="Innovating the Future with"
      highlight="AI, Apps & Automation"
      lead="Your End-to-End Digital Partner for transformative technology solutions"
      actions={
        <>
          <ContactDialogButton>
            Start Your Project <ArrowRight className="h-4 w-4" />
          </ContactDialogButton>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="btn-outline">
                <Play className="h-4 w-4" /> Watch Demo
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2 sm:p-3">
              <video className="aspect-video w-full rounded-lg bg-black" controls autoPlay muted>
                <source src={asset('videos/demo.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </DialogContent>
          </Dialog>
        </>
      }
    />

    {/* Brands */}
    <Section>
      <h2 className="mb-8 text-center text-lg font-semibold text-nb-text">Trusted by leading brands worldwide</h2>
      <div className="grid grid-cols-2 border-l border-t border-nb-line sm:grid-cols-4">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex h-20 items-center justify-center border-b border-r border-nb-line px-3 text-center text-base font-bold text-slate-400 md:h-24 md:text-lg"
          >
            {brand}
          </div>
        ))}
      </div>
    </Section>

    <StatsBand eyebrow="Our Impact" title="Numbers that speak for our success" stats={stats} />

    <Section tone="soft">
      <SectionHeading title="Our Services" lead="Comprehensive digital solutions to transform your business" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceLinkCard key={service.title} {...service} LinkComponent={Link} />
        ))}
      </div>
    </Section>

    <Section>
      <SectionHeading
        title="Featured projects"
        lead="Product concepts from our portfolio, showing what we can design and build for your business"
      />
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {['vigilo-ai-safety-monitoring', 'casaloom-home-decor-store', 'dashdrop-same-day-courier-app', 'campusly-school-erp'].map((slug) => (
          <ProjectCard key={slug} project={projects.find((p) => p.slug === slug)} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/portfolio" className="btn-outline">
          View full portfolio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>

    <Section tone="soft">
      <SectionHeading
        title="What Our Clients Say"
        lead="Trusted by businesses worldwide for delivering exceptional digital solutions"
      />
      <TestimonialGrid items={testimonials} />
    </Section>

    <CtaBand title="Ready to Transform Your Business?" lead="Let's discuss your project and bring your vision to life">
      <ContactDialogButton className="btn-light">
        Get Started Today <ArrowRight className="h-4 w-4" />
      </ContactDialogButton>
    </CtaBand>
  </>
);

export default HomePage;
