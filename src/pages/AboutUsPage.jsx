import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, Check } from 'lucide-react';
import { ContactDialogButton, CtaBand, PageHero, Section, SectionHeading, StatsBand } from '@/components/site/blocks';

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
      title="About"
      highlight="Fullstackverse"
      lead="Your End-to-End Digital Partner, innovating the future with AI, Apps & Automation"
    />

    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-10">
          <div>
            <div className="nb-eyebrow mb-3">Mission</div>
            <h2 className="nb-h2">Our Mission</h2>
            <p className="nb-lead mt-4">
              To empower businesses with cutting-edge digital solutions that drive growth, efficiency, and
              innovation. We believe in transforming ideas into reality through the power of technology.
            </p>
          </div>
          <div>
            <div className="nb-eyebrow mb-3">Vision</div>
            <h2 className="nb-h2">Our Vision</h2>
            <p className="nb-lead mt-4">
              To be the leading digital transformation partner, helping businesses worldwide harness the full
              potential of AI, automation, and modern technology.
            </p>
          </div>
        </div>
        <img
          className="h-72 w-full rounded-2xl object-cover sm:h-96"
          alt="Fullstackverse team working on innovative technology solutions"
          src="https://images.unsplash.com/photo-1681184025442-1517cb9319c1?auto=format&fit=crop&w=1200&q=80"
          loading="lazy"
        />
      </div>
    </Section>

    <StatsBand eyebrow="Our Impact" title="Numbers that speak for our success" stats={stats} />

    <Section tone="soft">
      <SectionHeading title="Our Services" lead="Comprehensive digital solutions for every need" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div key={service} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5">
            <Check className="h-4 w-4 shrink-0 text-nb-blue" strokeWidth={3} />
            <span className="text-sm font-medium text-nb-text">{service}</span>
          </div>
        ))}
      </div>
    </Section>

    <CtaBand
      title="Ready to Work With Us?"
      lead="Let's discuss how we can help transform your business with innovative digital solutions"
    >
      <ContactDialogButton className="btn-light">
        Get In Touch <ArrowRight className="h-4 w-4" />
      </ContactDialogButton>
    </CtaBand>
  </>
);

export default AboutUsPage;
