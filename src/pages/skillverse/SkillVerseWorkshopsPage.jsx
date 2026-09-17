import React from "react";
import { Link } from "react-router-dom";
import { Rocket, Users, Calendar, MapPin, Mic } from "lucide-react";
import { Button } from "../../components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Workshops & Webinars</h1>
          <p className="text-xl text-gray-600">Interactive sessions to boost your skills and knowledge</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className={`bg-white border rounded-xl shadow-lg hover:shadow-xl transition-all p-8 ${workshop.highlight ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-gray-200'}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-4 rounded-lg bg-gradient-to-br ${workshop.highlight ? 'from-yellow-400 to-yellow-600 text-black' : 'from-red-500 to-red-700 text-white'}`}>
                  {workshop.id === 'speak-english' ? <Mic className="h-8 w-8" /> : <Rocket className="h-8 w-8" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{workshop.title}</h3>
                  <p className="text-gray-600">{workshop.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className={`h-5 w-5 ${workshop.highlight ? 'text-yellow-600' : 'text-red-600'}`} />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className={`h-5 w-5 ${workshop.highlight ? 'text-yellow-600' : 'text-red-600'}`} />
                  <span>Duration: {workshop.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className={`h-5 w-5 ${workshop.highlight ? 'text-yellow-600' : 'text-red-600'}`} />
                  <span>Mode: {workshop.mode}</span>
                </div>
              </div>

              <Link to={workshop.link}>
                <Button className={`w-full bg-gradient-to-r ${workshop.highlight ? 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black' : 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'}`}>
                  Register Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

