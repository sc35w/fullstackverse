import React from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '@/components/ContactForm';
import { Eyebrow, PageHero, Section } from '@/components/site/blocks';

const reasons = [
  { title: 'Detailed Analysis', description: "We'll perform an in-depth review of your needs." },
  { title: 'Accurate Quoting', description: 'Get precise cost and timeline estimates.' },
  { title: 'Tailored Solutions', description: 'Receive a proposal designed specifically for you.' },
];

const RFPPage = () => (
  <>
    <Helmet>
      <title>Request for Proposal (RFP) - Fullstackverse</title>
      <meta
        name="description"
        content="Submit your Request for Proposal (RFP) to Fullstackverse. Provide your project details and budget, and our team will get back to you with a comprehensive proposal."
      />
    </Helmet>

    <PageHero
      eyebrow="Request for Proposal"
      title="Request for"
      highlight="Proposal"
      lead="Ready to start a big project? Submit your RFP here, and our team will prepare a detailed proposal tailored to your needs."
    />

    <Section>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="01" className="mb-8">Process</Eyebrow>
          <h2 className="display-2">Why Submit an RFP?</h2>
          <p className="lead mt-6">
            Submitting an RFP allows us to provide you with a comprehensive, accurate, and competitive proposal that
            addresses all your project requirements.
          </p>
          <ol className="mt-12 border-t border-line">
            {reasons.map(({ title, description }, i) => (
              <li key={title} className="grid grid-cols-[48px_1fr] gap-4 border-b border-line py-6">
                <span className="meta pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display-3">{title}</h3>
                  <p className="mt-2 text-[15px] text-ink-2">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm title="Request for Proposal (RFP) Form" type="rfp" />
        </div>
      </div>
    </Section>
  </>
);

export default RFPPage;
