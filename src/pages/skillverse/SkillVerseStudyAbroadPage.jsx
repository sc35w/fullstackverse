import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, FileText, Globe, GraduationCap, MapPin, Plane, Users, Wallet } from "lucide-react";
import { FeatureGrid, PageHero, Section, SectionHeading, StatsBand } from "@/components/site/blocks";
import SkillVerseQuickApply from "@/components/SkillVerseQuickApply";

const stats = [
  { value: "22K+", label: "Students Assisted" },
  { value: "30+", label: "Years of Combined Experience" },
  { value: "100+", label: "Industry Experts" },
  { value: "500+", label: "Universities" },
];

const support = [
  { icon: GraduationCap, title: "University Selection", description: "Shortlist the right universities from 500+ options across the globe." },
  { icon: FileText, title: "Applications & SOP Writing", description: "Real-world application and SOP writing support." },
  { icon: Globe, title: "Admission Guidance", description: "Country-specific admission guidance at every step." },
  { icon: Wallet, title: "Scholarships & Post-Study Work", description: "Support with scholarships and post-study work options." },
  { icon: Plane, title: "Visa Assistance", description: "Guidance through the visa process so you are ready to fly." },
];

export default function SkillVerseStudyAbroadPage() {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Study Abroad - SkillVerse</title>
        <meta
          name="description"
          content="Study abroad with SkillVerse: university selection, application and SOP writing, admission guidance, scholarships and visa assistance."
        />
      </Helmet>

      <PageHero
        eyebrow="Study Abroad"
        title="Bring your study-abroad dream"
        highlight="to reality"
        lead="Embark on your global education journey with expert support at every step. From university selection to application strategy and visa assistance, we ensure you're prepared to succeed in top international academic destinations."
        actions={
          <>
            <a href="#apply" className="btn-solid">
              Get Guidance <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/skillverse/usa-webinar" className="btn-outline">
              USA Study Webinar
            </Link>
          </>
        }
      />

      <StatsBand stats={stats} />

      <Section tone="soft">
        <SectionHeading title="How we support you" lead="Expert help from choosing a university to boarding your flight" />
        <FeatureGrid items={support} />
      </Section>

      <Section>
        <div className="nb-card grid items-center gap-8 md:grid-cols-[1.4fr_1fr] md:p-10">
          <div>
            <div className="nb-eyebrow mb-3">Free webinar</div>
            <h2 className="nb-h2">USA Study Webinar</h2>
            <p className="nb-lead mt-4">
              Learn about studying in top US universities. Get insights on admissions, scholarships, and visa process.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-nb-muted">
              <li className="flex items-center gap-2"><Calendar className="h-4 w-4 text-nb-blue" /> Every Weekend</li>
              <li className="flex items-center gap-2"><Users className="h-4 w-4 text-nb-blue" /> Duration: 2 hours</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-nb-blue" /> Mode: Online</li>
            </ul>
          </div>
          <div className="md:text-right">
            <Link to="/skillverse/usa-webinar" className="btn-solid">
              Register Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="soft" id="apply">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="nb-eyebrow mb-3">Get started</div>
            <h2 className="nb-h2">Talk to a study abroad expert</h2>
            <p className="nb-lead mt-4">Share your details and our team will call you to plan your next steps.</p>
          </div>
          <SkillVerseQuickApply defaultService="Study Abroad" />
        </div>
      </Section>
    </div>
  );
}
