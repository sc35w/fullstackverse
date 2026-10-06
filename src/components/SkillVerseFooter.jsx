import React from 'react';
import { Link } from 'react-router-dom';
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

const link = 'link-underline text-[15px] text-ink-2 hover:text-ink';

const SkillVerseFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="wrap pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SkillVerseLogo />
            <p className="mt-8 max-w-sm font-display text-2xl leading-snug tracking-[-0.03em] text-ink">
              India's #1 Career Accelerator. Industry-leading & career-focused training to enhance your skills.
            </p>
            <ul className="mt-8 space-y-2 text-[15px] text-ink-2">
              <li><a href={`tel:${PHONE}`} className={link}>Call Us: {PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} className={`${link} [overflow-wrap:anywhere]`}>{EMAIL}</a></li>
              <li>
                <a href="https://wa.me/918296548156?text=Hello%20SkillVerse,%20I%27d%20like%20to%20learn%20more" target="_blank" rel="noopener noreferrer" className={link}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="eyebrow mb-6 block">{col.title}</h2>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      <Link to={l.href} className={link}>{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="meta mt-20 flex flex-col gap-3 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <span>© {currentYear} SkillVerse by Fullstackverse. All rights reserved.</span>
          <span>22,000+ Students Assisted | 100+ Industry Experts | 500+ University Partners</span>
          <span className="flex flex-wrap gap-6">
            <Link to="#" className="hover:text-ink">Terms of Service</Link>
            <Link to="/skillverse/privacypolicy" className="hover:text-ink">Privacy Policy</Link>
            <Link to="#" className="hover:text-ink">Cookie Policy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SkillVerseFooter;
