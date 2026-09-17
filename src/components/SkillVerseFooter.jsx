import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, GraduationCap, BookOpen, Users, Globe } from 'lucide-react';

const SkillVerseFooter = () => {
  const currentYear = new Date().getFullYear();

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

  const company = [
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

  return (
    <footer className="bg-white text-gray-900 border-t-4 border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">SkillVerse</div>
                <div className="text-xs text-red-500">Learn. Grow. Excel.</div>
              </div>
            </motion.div>
            <p className="text-gray-600 text-sm">
              India's #1 Career Accelerator. Industry-leading & career-focused training to enhance your skills.
            </p>
            <div className="flex space-x-4">
              <a
                href="tel:9398165155"
                className="text-gray-600 hover:text-red-500 transition-colors"
                title="Call us"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@fullstackverse.com"
                className="text-gray-600 hover:text-red-500 transition-colors"
                title="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/919398165155?text=Hello%20SkillVerse,%20I%27d%20like%20to%20learn%20more"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <BookOpen className="h-5 w-5 text-red-500" />
              <span>Courses</span>
            </div>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    to={course.href}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm block"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Workshops */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Users className="h-5 w-5 text-red-500" />
              <span>Workshops</span>
            </div>
            <ul className="space-y-2">
              {workshops.map((workshop) => (
                <li key={workshop.name}>
                  <Link
                    to={workshop.href}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm block"
                  >
                    {workshop.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Internships */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <GraduationCap className="h-5 w-5 text-red-500" />
              <span>Internships</span>
            </div>
            <ul className="space-y-2">
              {internships.map((internship) => (
                <li key={internship.name}>
                  <Link
                    to={internship.href}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm block"
                  >
                    {internship.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Globe className="h-5 w-5 text-red-500" />
              <span>Explore</span>
            </div>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-900">Support</span>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-4 space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 mt-0.5 text-red-500" />
                <div>
                  <div className="font-semibold text-gray-900">Call Us</div>
                  <a href="tel:9398165155" className="hover:text-red-500">9398165155</a>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 mt-0.5 text-red-500" />
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <a href="mailto:contact@fullstackverse.com" className="hover:text-orange-500">
                    contact@fullstackverse.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} SkillVerse by Fullstackverse. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link to="#" className="hover:text-red-500 transition-colors">Terms of Service</Link>
              <Link to="/skillverse/privacypolicy" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-orange-500 transition-colors">Cookie Policy</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>22,000+ Students Assisted | 100+ Industry Experts | 500+ University Partners</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SkillVerseFooter;
