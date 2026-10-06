import React from "react";
import { Link } from "react-router-dom";
import { EMAIL, PHONE } from "../../lib/contact";
import SkillVerseQuickApply from "../../components/SkillVerseQuickApply";
import {
  Rocket,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Target,
  Globe,
  Star,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

const courses = [
  {
    title: "Artificial Intelligence",
    instructor: "Shruthi Ganta",
    rating: 4.7,
    reviews: 4143,
    trending: true,
    description:
      "AI focuses on creating smart systems that mimic human intelligence. Dive into neural networks, deep learning to lead in the AI revolution",
  },
  {
    title: "Web Development",
    instructor: "Amrit Raj",
    rating: 4.9,
    reviews: 3897,
    trending: true,
    description:
      "Web Development focuses on designing and building websites using modern technologies. Learn to create responsive, user-friendly web applications",
  },
  {
    title: "Data Science",
    instructor: "Meghana Gowda V",
    rating: 4.5,
    reviews: 2465,
    trending: true,
    description:
      "Data Science blends programming with analytical skills to extract insights from data. Learn to manipulate, visualize, and model data effectively",
  },
  {
    title: "Cyber Security",
    instructor: "Rohit Mukherjee",
    rating: 4.8,
    reviews: 1675,
    trending: true,
    description:
      "Cyber Security focuses on protecting systems from digital threats. Gain expertise in encryption, ethical hacking, and risk management",
  },
  {
    title: "Data Analytics",
    instructor: "Meghana Gowda V",
    rating: 4.9,
    reviews: 2626,
    trending: true,
    description:
      "Data Analytics combines programming and statistics to extract insights. Master Python, SQL, and visualization tools",
  },
  {
    title: "Machine Learning",
    instructor: "Shruthi Ganta",
    rating: 4.4,
    reviews: 2376,
    trending: true,
    description:
      "Machine Learning combines programming and AI to develop intelligent systems. Master Python libraries and algorithms",
  },
];

const testimonials = [
  {
    name: "Megha T",
    role: "AI Automation Graduate",
    text: "SkillVerse's AI Automation program helped me streamline workflows and boost efficiency. I now lead automation projects at my company.",
  },
  {
    name: "Aditya R",
    role: "AI Graduate",
    text: "The AI program gave me a strong foundation in machine learning and NLP. I landed an AI research role after completing it.",
  },
  {
    name: "Neha S",
    role: "Web Development Graduate",
    text: "SkillVerse's web dev course taught me full-stack skills through real projects. I'm now working as a front-end developer.",
  },
  {
    name: "Siddharth M",
    role: "Machine Learning Graduate",
    text: "The ML program covered model building, tuning, and deployment. I used it to land an ML engineer role.",
  },
  {
    name: "Ritika D",
    role: "Data Science Graduate",
    text: "From data wrangling to predictive models, the course covered it all. I'm now a data scientist making real impact.",
  },
];

const benefits = [
  { icon: Target, title: "Career Launchpad", text: "Mentorship and tools to fast-track your growth" },
  { icon: BookOpen, title: "Professional Courses", text: "Industry-aligned curriculum with hands-on projects" },
  { icon: Globe, title: "Study Abroad", text: "500+ Universities across the globe" },
  { icon: Award, title: "Industry Experts", text: "100+ experienced mentors from top companies" },
  { icon: TrendingUp, title: "Placement Support", text: "100% job assistance and interview preparation" },
  { icon: CheckCircle2, title: "Certification", text: "Industry-recognized certificates upon completion" },
];

const stats = [
  { number: "22K+", label: "Students Assisted" },
  { number: "30+", label: "Years of Combined Experience" },
  { number: "100+", label: "Industry Experts" },
  { number: "500+", label: "Universities" },
];

export default function SkillVerseHomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="nb-hero">
        <div className="nb-container py-16 text-center md:py-24">
          <div className="nb-eyebrow mb-4">
            <Rocket className="h-4 w-4" /> Exclusively Curated Programs
          </div>
          <h1 className="nb-h1 mx-auto max-w-3xl">
            India's #1 <span className="nb-gradient-text inline-block">Career Accelerator</span>
          </h1>
          <p className="nb-lead mx-auto mt-5 max-w-2xl md:text-lg">
            We offer industry-leading & career-focused training to enhance your skill, secure a meaningful career, and bring your study-abroad dream to reality.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/skillverse/courses" className="btn-solid">
              <GraduationCap className="h-4 w-4" />
              Explore Courses
            </Link>
            <Link to="/skillverse/workshops" className="btn-outline">
              <BookOpen className="h-4 w-4" />
              View Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="nb-section nb-section--dark">
        <div className="nb-container grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="nb-card--dark">
              <div className="text-3xl font-semibold md:text-4xl">{stat.number}</div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="nb-section nb-section--soft">
        <div className="nb-container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="nb-h2">Mentorship Courses</h2>
            <p className="nb-lead mt-4">Unlock your potential with the right mentor</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, i) => (
              <div key={i} className="nb-card flex flex-col">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="nb-icon">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  {course.trending && <span className="nb-chip">Trending 2025</span>}
                </div>
                <h3 className="text-lg font-semibold text-nb-text">{course.title}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-slate-500">({course.reviews.toLocaleString()})</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-nb-muted">{course.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
                  <Users className="h-4 w-4" />
                  {course.instructor}
                </div>
                <Link to="/skillverse/courses" className="btn-solid btn-sm mt-5 w-full">Enroll Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="nb-section">
        <div className="nb-container">
          <h2 className="nb-h2 mb-12 text-center">Why Choose SkillVerse?</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="nb-card">
                <span className="nb-icon mb-4">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-nb-text">{title}</h3>
                <p className="mt-2 text-sm text-nb-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="nb-section nb-section--soft">
        <div className="nb-container">
          <h2 className="nb-h2 mb-12 text-center">Loved by thousands of students</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <figure key={i} className="nb-card flex flex-col">
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-nb-muted">"{testimonial.text}"</blockquote>
                <figcaption className="mt-5 border-t border-nb-line pt-4">
                  <div className="text-sm font-semibold text-nb-text">{testimonial.name}</div>
                  <div className="text-xs text-slate-500">{testimonial.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Apply Form */}
      <section id="contact" className="nb-section">
        <div className="nb-container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="nb-eyebrow mb-3">Get started</div>
            <h2 className="nb-h2">Quick Apply</h2>
            <p className="nb-lead mt-4">Your journey starts here!</p>
          </div>
          <SkillVerseQuickApply />
        </div>
      </section>

      {/* CTA */}
      <section className="nb-section pt-0">
        <div className="nb-container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-nb-ink px-6 py-12 text-center md:px-12">
            <h2 className="nb-h2 !text-white">Ready to Transform Your Career?</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Join 22,000+ students who have already started their journey with SkillVerse
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`tel:${PHONE}`} className="btn-light">
                <Phone className="h-4 w-4" />
                Call: {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="btn-outline-light">
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
