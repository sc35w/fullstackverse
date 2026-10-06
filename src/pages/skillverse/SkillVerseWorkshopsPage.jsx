import React from "react";
import { Link } from "react-router-dom";
import { Rocket, Users, Calendar, MapPin, Mic } from "lucide-react";

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
    <div className="bg-white">
      <section className="nb-hero">
        <div className="nb-container py-14 text-center md:py-20">
          <h1 className="nb-h1">Workshops & Webinars</h1>
          <p className="nb-lead mx-auto mt-4 max-w-2xl md:text-lg">Interactive sessions to boost your skills and knowledge</p>
        </div>
      </section>

      <section className="nb-section nb-section--soft">
        <div className="nb-container grid gap-5 md:grid-cols-2">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className={`nb-card flex flex-col md:p-8 ${workshop.highlight ? "!border-nb-orange ring-1 ring-nb-orange" : ""}`}
            >
              <div className="mb-6 flex items-start gap-4">
                <span className="nb-icon">
                  {workshop.id === "speak-english" ? <Mic className="h-5 w-5" /> : <Rocket className="h-5 w-5" />}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-nb-text">{workshop.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-nb-muted">{workshop.description}</p>
                </div>
              </div>

              <ul className="mb-6 flex-1 space-y-2.5 text-sm text-nb-muted">
                <li className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-nb-blue" />
                  {workshop.date}
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-nb-blue" />
                  Duration: {workshop.duration}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-nb-blue" />
                  Mode: {workshop.mode}
                </li>
              </ul>

              <Link to={workshop.link} className="btn-solid btn-sm w-full">
                Register Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
