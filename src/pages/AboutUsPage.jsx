import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { ContactDialogButton, CtaBand, Eyebrow, PageHero, Section, SectionHeading, StatsBand } from '@/components/site/blocks';
import EditorialImage, { PHOTOS } from '@/components/site/EditorialImage';

const services = [
  'Apps', 'Web Apps', 'IoT Projects', 'Websites', 'AI & Data Services',
  'Software Development', 'Design & Branding', '3D Modeling & Sculpting',
  'Digital Marketing & Growth', 'Workplace Automation', 'AI-Native Solutions',
  'Business Automation', 'Lead Generation Automation', 'Agentic AI Solutions',
];

const stats = [
  { label: 'Happy Clients', value: '500+' },
  { label: 'Projects Completed', value: '1000+' },
  { label: 'Countries Served', value: '25+' },
  { label: 'AI Models Deployed', value: '100+' },
];

const AboutUsPage = () => (
  <>
    <Helmet>
      <title>About Us - Fullstackverse</title>
      <meta
        name="description"
        content="Learn about Fullstackverse team, our mission to innovate with AI, apps & automation. Discover our comprehensive digital services."
      />
    </Helmet>

    <PageHero
      eyebrow="About"
      title="About"
      highlight="Fullstackverse"
      lead="Your End-to-End Digital Partner, innovating the future with AI, Apps & Automation"
    />

    <Section>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow index="01">Purpose</Eyebrow>
        </div>
        <div className="space-y-16 lg:col-span-5">
          <div>
            <h2 className="display-2">Our Mission</h2>
            <p className="lead mt-6">
              To empower businesses with cutting-edge digital solutions that drive growth, efficiency, and
              innovation. We believe in transforming ideas into reality through the power of technology.
            </p>
          </div>
          <div className="border-t border-line pt-10">
            <h2 className="display-2">Our Vision</h2>
            <p className="lead mt-6">
              To be the leading digital transformation partner, helping businesses worldwide harness the full
              potential of AI, automation, and modern technology.
            </p>
          </div>
        </div>
        <div className="lg:col-span-4">
          <EditorialImage src={PHOTOS.lab} alt="Fullstackverse team working on innovative technology solutions" caption="Engineering in practice" />
        </div>
      </div>
    </Section>

    <StatsBand index="02" eyebrow="Our Impact" title="Numbers that speak for our success" stats={stats} />

    <Section>
      <SectionHeading index="03" eyebrow="Services" title="Our Services" lead="Comprehensive digital solutions for every need" />
      <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
        {services.map((service, i) => (
          <li key={service} className="flex items-baseline gap-5 border-b border-line py-5">
            <span className="meta w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-display text-xl tracking-[-0.02em] text-ink">{service}</span>
          </li>
        ))}
      </ol>
    </Section>

    <div className="wrap pb-20 md:pb-28">
      <EditorialImage src={PHOTOS.drawings} alt="Engineer reviewing technical drawings" caption="From drawing board to production" index="02" ratio="aspect-[16/9] md:aspect-[21/9]" />
    </div>

    <CtaBand
      index="04"
      title="Ready to Work With Us?"
      lead="Let's discuss how we can help transform your business with innovative digital solutions"
    >
      <ContactDialogButton className="btn btn-inverse">
        Get In Touch <ArrowRight className="h-4 w-4" />
      </ContactDialogButton>
    </CtaBand>
  </>
);

export default AboutUsPage;
