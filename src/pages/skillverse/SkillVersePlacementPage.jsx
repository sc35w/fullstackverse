import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Award, FileText, Linkedin, Map, MessagesSquare, Users } from "lucide-react";
import { FeatureGrid, PageHero, Section, SectionHeading } from "@/components/site/blocks";
import SkillVerseQuickApply from "@/components/SkillVerseQuickApply";

const support = [
  { icon: FileText, title: "ATS-Friendly Resume", description: "Resume template (ATS-friendly) to get past screening and in front of recruiters." },
  { icon: Linkedin, title: "LinkedIn Optimization", description: "LinkedIn profile optimization guide to get noticed by hiring teams." },
  { icon: MessagesSquare, title: "Interview Preparation", description: "Interview preparation sessions so you walk in confident." },
  { icon: Map, title: "Placement Roadmap", description: "Placement roadmap: how to apply, and where to apply." },
  { icon: Users, title: "Industry Mentors", description: "100+ experienced mentors from top companies to guide your career." },
  { icon: Award, title: "Certification", description: "Industry-recognized certificates upon completion." },
];

const programs = [
  { title: "Data Analytics Course", note: "100% Placement Support", href: "/skillverse/data-analytics-crash-course" },
  { title: "Data Science & AI Internship", note: "Dedicated placement support and interview preparation", href: "/skillverse/course" },
  { title: "Data Analytics & AI Internship", note: "Resume + Placement Guide · ₹9,999", href: "/skillverse/data-analytics-ai-internship" },
  { title: "Robotics Internship", note: "Resume + Placement Guide · ₹9,999", href: "/skillverse/robotics-internship" },
  { title: "Mechanical Engineering Internship", note: "Resume + Placement Guide · ₹9,999", href: "/skillverse/mechanical-engineering-internship" },
];

export default function SkillVersePlacementPage() {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Placement Accelerator - SkillVerse</title>
        <meta
          name="description"
          content="SkillVerse Placement Accelerator: 100% job assistance and interview preparation with resume, LinkedIn, interview and placement roadmap support."
        />
      </Helmet>

      <PageHero
        eyebrow="Placement Accelerator"
        title="Launch your career with"
        highlight="placement support"
        lead="100% job assistance and interview preparation. Mentorship and tools to fast-track your growth, from your resume to your first offer."
        actions={
          <>
            <a href="#apply" className="btn-solid">
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/skillverse/courses" className="btn-outline">
              Explore Courses
            </Link>
          </>
        }
      />

      <Section tone="soft">
        <SectionHeading title="What placement support includes" lead="Everything you need to go from learner to hired" />
        <FeatureGrid items={support} />
      </Section>

      <Section>
        <SectionHeading title="Programs with placement support" lead="Choose a program and get career support built in" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link key={p.href} to={p.href} className="nb-card group flex h-full flex-col">
              <h3 className="text-lg font-semibold text-nb-text group-hover:text-nb-blue">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-nb-muted">{p.note}</p>
              <span className="nb-link-arrow mt-5 group-hover:text-nb-blue">
                View Program <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="soft" id="apply">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="nb-eyebrow mb-3">Get started</div>
            <h2 className="nb-h2">Join the Placement Accelerator</h2>
            <p className="nb-lead mt-4">Share your details and our team will call you to plan your path to placement.</p>
          </div>
          <SkillVerseQuickApply defaultService="Placement Accelerator" />
        </div>
      </Section>
    </div>
  );
}
