import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { SkillVerseLogo } from './SkillVerseHeader';
import { EMAIL, PHONE } from '@/lib/contact';

const courses = [
  { name: 'Data Analytics', href: '/skillverse/data-analytics-crash-course' },
  { name: 'Artificial Intelligence', href: '/skillverse/course' },
  { name: 'Web Development', href: '/skillverse/course' },
  { name: 'Data Science', href: '/skillverse/course' },
  { name: 'Cyber Security', href: '/skillverse/course' },
];

const workshops = [
  { name: 'USA Study Webinar', href: '/skillverse/usa-webinar' },
  { name: 'Agent AI Workshop', href: '/skillverse/agent-ai-workshop' },
  { name: 'Robotics Workshop', href: '/skillverse/robotics-workshop' },
  { name: 'Competitive Exam Webinar', href: '/skillverse/competitive-exam-webinar' },
];

const internships = [
  { name: 'Robotics Internship', href: '/skillverse/robotics-internship' },
  { name: 'Data Analytics & AI', href: '/skillverse/data-analytics-ai-internship' },
  { name: 'Mechanical Engineering', href: '/skillverse/mechanical-engineering-internship' },
];

const explore = [
  { name: 'About SkillVerse', href: '/skillverse' },
  { name: 'All Courses', href: '/skillverse/courses' },
  { name: 'All Workshops', href: '/skillverse/workshops' },
  { name: 'Placement Accelerator', href: '/skillverse/placement' },
  { name: 'Study Abroad', href: '/skillverse/study-abroad' },
];

const support = [
  { name: 'Contact Us', href: '/skillverse/contact' },
  { name: 'FAQ', href: '/skillverse#faq' },
  { name: 'Terms & Conditions', href: '#' },
  { name: 'Privacy Policy', href: '/skillverse/privacypolicy' },
];

const columns = [
  { title: 'Courses', links: courses },
  { title: 'Workshops', links: workshops },
  { title: 'Internships', links: internships },
  { title: 'Explore', links: explore },
  { title: 'Support', links: support },
];

const SkillVerseFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nb-footer text-white">
      <div className="nb-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(5,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <SkillVerseLogo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              India's #1 Career Accelerator. Industry-leading & career-focused training to enhance your skills.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-3 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0" /> Call Us: {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-white [overflow-wrap:anywhere]">
                  <Mail className="h-4 w-4 shrink-0" /> {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918296548156?text=Hello%20SkillVerse,%20I%27d%20like%20to%20learn%20more"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-base font-semibold text-white">{col.title}</h2>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="nb-container py-5 text-sm text-slate-400">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} SkillVerse by Fullstackverse. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link to="#" className="hover:text-white">Terms of Service</Link>
              <Link to="/skillverse/privacypolicy" className="hover:text-white">Privacy Policy</Link>
              <Link to="#" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">22,000+ Students Assisted | 100+ Industry Experts | 500+ University Partners</p>
        </div>
      </div>
    </footer>
  );
};

export default SkillVerseFooter;
