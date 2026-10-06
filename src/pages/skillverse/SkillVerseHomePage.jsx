import React from "react";
import { Link } from "react-router-dom";
import { EMAIL, PHONE } from "../../lib/contact";
import SkillVerseQuickApply from "../../components/SkillVerseQuickApply";
import { CtaBand, Eyebrow, FeatureGrid, PageHero, Section, SectionHeading, TestimonialGrid } from "../../components/site/blocks";
import { ArrowRight, Award, BookOpen, CheckCircle2, Globe, Mail, Phone, Star, Target, TrendingUp } from "lucide-react";

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
    <div className="bg-canvas">
      <PageHero
        eyebrow="Exclusively Curated Programs"
        title="India's #1"
        highlight="Career Accelerator"
        lead="We offer industry-leading & career-focused training to enhance your skill, secure a meaningful career, and bring your study-abroad dream to reality."
        spec={stats.map((st) => [st.label, st.number])}
        actions={
          <>
            <Link to="/skillverse/courses" className="btn btn-primary">
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/skillverse/workshops" className="link-arrow px-2 py-3">
              View Workshops <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />

      <Section>
        <SectionHeading index="01" eyebrow="Courses" title="Mentorship Courses" lead="Unlock your potential with the right mentor" />
        <ol className="border-b border-line">
          {courses.map((course, i) => (
            <li key={course.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-6">
              <span className="meta md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <div className="md:col-span-4">
                <h3 className="display-3">{course.title}</h3>
                <div className="mono mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-2">
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-ink text-ink" />{course.rating}</span>
                  <span>({course.reviews.toLocaleString()})</span>
                  {course.trending && <span className="tag">Trending 2025</span>}
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-2 md:col-span-4">{course.description}</p>
              <div className="flex flex-col items-start gap-3 md:col-span-3 md:items-end">
                <span className="meta">Mentor · {course.instructor}</span>
                <Link to="/skillverse/courses" className="link-arrow">
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="soft">
        <SectionHeading index="02" eyebrow="Why SkillVerse" title="Why Choose SkillVerse?" />
        <FeatureGrid items={benefits.map((b) => ({ title: b.title, description: b.text }))} />
      </Section>

      <Section>
        <SectionHeading index="03" eyebrow="Students" title="Loved by thousands of students" />
        <TestimonialGrid items={testimonials.map((t) => ({ quote: `"${t.text}"`, name: t.name, role: t.role }))} />
      </Section>

      <Section id="contact">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="04" className="mb-8">Get started</Eyebrow>
            <h2 className="display-2">Quick Apply</h2>
            <p className="lead mt-6">Your journey starts here!</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SkillVerseQuickApply />
          </div>
        </div>
      </Section>

      <CtaBand index="05" title="Ready to Transform Your Career?" lead="Join 22,000+ students who have already started their journey with SkillVerse">
        <a href={`tel:${PHONE}`} className="btn btn-inverse">
          <Phone className="h-4 w-4" />
          Call: {PHONE}
        </a>
        <a href={`mailto:${EMAIL}`} className="btn btn-secondary-inverse">
          <Mail className="h-4 w-4" />
          Email Us
        </a>
      </CtaBand>
    </div>
  );
}
