import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Users, Calendar, MapPin, Mic } from "lucide-react";
import { PageHero, Section } from "../../components/site/blocks";

const workshops = [
  {
    id: "speak-english",
    title: "Speak English Confidently",
    description: "Master the art of English speaking with our expert instructor. Boost your confidence and communication skills.",
    date: "Upcoming Batches",
    duration: "Self-Paced + Live",
    mode: "Online",
    link: "/skillverse/speak-english",
    highlight: true
  },
  {
    id: "usa-webinar",
    title: "USA Study Webinar",
    description: "Learn about studying in top US universities. Get insights on admissions, scholarships, and visa process.",
    date: "Every Weekend",
    duration: "2 hours",
    mode: "Online",
    link: "/skillverse/usa-webinar"
  },
  {
    id: "agent-ai",
    title: "Agent AI Workshop",
    description: "Hands-on workshop on building AI agents. Learn to create intelligent automation systems.",
    date: "Upcoming Batches",
    duration: "4 hours",
    mode: "Hybrid",
    link: "/skillverse/agent-ai-workshop"
  },
  {
    id: "robotics",
    title: "Robotics Workshop",
    description: "Build and program robots. Perfect for students interested in robotics and automation.",
    date: "Monthly Batches",
    duration: "Full Day",
    mode: "Offline",
    link: "/skillverse/robotics-workshop"
  },
  {
    id: "competitive-exam",
    title: "Competitive Exam Webinar",
    description: "Strategies and tips for cracking competitive exams. Expert guidance and resources.",
    date: "Bi-weekly",
    duration: "1.5 hours",
    mode: "Online",
    link: "/skillverse/competitive-exam-webinar"
  },
];

export default function SkillVerseWorkshopsPage() {
  return (
    <div className="bg-canvas">
      <PageHero
        eyebrow="Workshops"
        title="Workshops &"
        highlight="Webinars"
        lead="Interactive sessions to boost your skills and knowledge"
        spec={[['Sessions', String(workshops.length).padStart(2, '0')]]}
      />

      <Section>
        <ol className="border-b border-line">
          {workshops.map((workshop, i) => (
            <li key={workshop.id} className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-6">
              <span className="meta md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <div className="md:col-span-5">
                <h2 className="display-3 !text-[clamp(1.6rem,2.4vw,2.2rem)]">
                  {workshop.id === 'speak-english' ? <Mic className="mb-3 h-5 w-5" /> : <Rocket className="mb-3 h-5 w-5" />}
                  {workshop.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{workshop.description}</p>
              </div>
              <dl className="spec md:col-span-4">
                <div><dt className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />Schedule</dt><dd>{workshop.date}</dd></div>
                <div><dt className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />Duration</dt><dd>{workshop.duration}</dd></div>
                <div><dt className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />Mode</dt><dd>{workshop.mode}</dd></div>
              </dl>
              <div className="md:col-span-2 md:text-right">
                <Link to={workshop.link} className="btn btn-primary btn-sm">
                  Register Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
