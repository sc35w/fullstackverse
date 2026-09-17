import React from "react";
import { Shield, Lock, Globe, Database, Clock, Mail } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    icon: Database,
    items: [
      "Contact details such as name, email, phone number, and communication preferences.",
      "Account and enrollment data including course selections, payment confirmations, and progress records.",
      "Technical data like IP address, device identifiers, browser type, and usage analytics collected through cookies and similar technologies.",
      "Support interactions, feedback, and content you submit through forms, chat, or email.",
    ],
  },
  {
    title: "How We Use Data",
    icon: Shield,
    items: [
      "Provide, personalize, and improve our programs, workshops, and internship experiences.",
      "Process enrollments, payments, and deliver certificates or placement assistance.",
      "Communicate updates, service notices, marketing offers (with opt-out), and respond to your requests.",
      "Protect platform security, prevent fraud, comply with legal obligations, and enforce our terms.",
    ],
  },
  {
    title: "Lawful Bases",
    icon: Globe,
    items: [
      "Your consent (e.g., marketing communications or optional cookies).",
      "Performance of a contract (providing enrolled services).",
      "Legitimate interests (service improvement and security) balanced with your rights.",
      "Legal obligations (tax, accounting, and compliance reporting).",
    ],
  },
  {
    title: "Data Sharing",
    icon: Mail,
    items: [
      "Trusted vendors for payments, communications, analytics, and cloud hosting under confidentiality and data-protection terms.",
      "Industry mentors or recruiters to facilitate placements or career services with your consent where required.",
      "Compliance with law, regulation, valid legal process, or to protect rights, safety, and security.",
      "Business transfers in the event of a merger, acquisition, or restructuring, subject to continued protections.",
    ],
  },
  {
    title: "International Transfers",
    icon: Globe,
    items: [
      "Data may be processed in jurisdictions outside your country. We implement safeguards such as standard contractual clauses, vendor due diligence, and access controls to maintain equivalent protection levels.",
    ],
  },
  {
    title: "Data Retention",
    icon: Clock,
    items: [
      "We retain personal data only as long as necessary for the purposes described, including legal, accounting, and reporting requirements.",
      "When data is no longer needed, we securely delete, anonymize, or archive it in line with our retention schedule.",
    ],
  },
  {
    title: "Your Rights",
    icon: Lock,
    items: [
      "Access, correct, update, or delete your personal data, subject to applicable law.",
      "Object to or restrict certain processing, and withdraw consent where processing relies on consent.",
      "Opt out of marketing at any time via unsubscribe links or by contacting us.",
      "Request portability of data you provided in a structured, commonly used format where applicable.",
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      "We use administrative, technical, and physical safeguards such as encryption in transit, access controls, and regular monitoring to protect data against unauthorized access, alteration, or loss.",
      "No system is completely secure; please use unique, strong credentials and notify us immediately of any suspected compromise.",
    ],
  },
  {
    title: "Cookies & Preferences",
    icon: Database,
    items: [
      "We use cookies and similar technologies for authentication, preferences, analytics, and performance.",
      "You can manage cookies via browser settings; disabling some cookies may affect site functionality.",
    ],
  },
  {
    title: "Children’s Data",
    icon: Shield,
    items: [
      "Our services are intended for individuals 16+ (or the age required by your jurisdiction). We do not knowingly collect data from children below this age and will delete such data if identified.",
    ],
  },
  {
    title: "Updates to This Policy",
    icon: Clock,
    items: [
      "We may update this policy to reflect changes in our practices or legal requirements. Material updates will be posted here with a revised “Last updated” date.",
    ],
  },
];

const SectionCard = ({ title, icon: Icon, items }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 text-red-600" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function SkillVersePrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
            <Shield className="h-4 w-4" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">SkillVerse Privacy Policy</h1>
          <p className="text-lg text-white/90 max-w-3xl">
            We respect your privacy and process personal data in line with globally recognized standards, including transparency, accountability, and user control.
          </p>
          <p className="text-sm text-white/80">Last updated: February 13, 2026</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <SectionCard key={section.title} title={section.title} icon={section.icon} items={section.items} />
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="h-5 w-5 text-red-600" />
              Contact Us
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              For privacy requests or questions (including access, corrections, or opt-outs), contact us at
              <a href="mailto:contact@fullstackverse.com" className="text-red-600 font-semibold ml-1">
                contact@fullstackverse.com
              </a>
              .
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              If you are in a jurisdiction with specific data protection rights, you may also contact your local data protection authority. We respond to verified requests in accordance with applicable law.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
