import React from 'react';
import { Helmet } from 'react-helmet';
import { ClipboardCheck, IndianRupee, Search } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { PageHero, Section } from '@/components/site/blocks';

const reasons = [
  { icon: Search, title: 'Detailed Analysis', description: "We'll perform an in-depth review of your needs." },
  { icon: IndianRupee, title: 'Accurate Quoting', description: 'Get precise cost and timeline estimates.' },
  { icon: ClipboardCheck, title: 'Tailored Solutions', description: 'Receive a proposal designed specifically for you.' },
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
      title="Request for Proposal"
      lead="Ready to start a big project? Submit your RFP here, and our team will prepare a detailed proposal tailored to your needs."
    />

    <Section tone="soft">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="nb-h2">Why Submit an RFP?</h2>
          <p className="nb-lead mt-4">
            Submitting an RFP allows us to provide you with a comprehensive, accurate, and competitive proposal that
            addresses all your project requirements.
          </p>
          <div className="mt-8 space-y-4">
            {reasons.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-white p-5">
                <span className="nb-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-nb-text">{title}</h3>
                  <p className="mt-1 text-sm text-nb-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ContactForm title="Request for Proposal (RFP) Form" type="rfp" />
      </div>
    </Section>
  </>
);

export default RFPPage;
