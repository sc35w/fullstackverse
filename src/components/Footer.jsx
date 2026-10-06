import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Logo from './Logo';
import { ADDRESS_LINES, EMAIL, PHONE, WHATSAPP_URL } from '@/lib/contact';

const services = [
  { name: 'Web Development', href: '/web-development' },
  { name: 'App Development', href: '/app-development' },
  { name: 'Game Development', href: '/game-development' },
  { name: 'AI Services', href: '/ai-services' },
  { name: 'Software Development', href: '/software-development' },
];

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Request for Proposal', href: '/rfp' },
  { name: 'SkillVerse', href: '/skillverse' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
];

const headingClass = 'mb-4 text-base font-semibold text-white';
const linkClass = 'text-sm text-slate-400 transition-colors hover:text-white';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nb-footer text-white">
      <div className="nb-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Your End-to-End Digital Partner. Innovating the Future with AI, Apps & Automation.
            </p>
          </div>

          <div>
            <h2 className={headingClass}>Services</h2>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link to={s.href} className={linkClass}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>Company</h2>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.name}>
                  <Link to={c.href} className={linkClass}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>Contact</h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-3 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0" /> {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-white [overflow-wrap:anywhere]">
                  <Mail className="h-4 w-4 shrink-0" /> {EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
                  <MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{ADDRESS_LINES.map((line) => <span key={line} className="block">{line}</span>)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="nb-container py-5 text-sm text-slate-400">
          © {currentYear} Fullstackverse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
