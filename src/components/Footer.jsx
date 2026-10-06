import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ADDRESS_LINES, EMAIL, PHONE, WHATSAPP_URL } from '@/lib/contact';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Request for Proposal', href: '/rfp' },
  { name: 'SkillVerse', href: '/skillverse' },
];

const services = [
  { name: 'Web Development', href: '/web-development' },
  { name: 'App Development', href: '/app-development' },
  { name: 'Game Development', href: '/game-development' },
  { name: 'AI Services', href: '/ai-services' },
  { name: 'Software Development', href: '/software-development' },
];

const legal = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
];

const heading = 'eyebrow mb-6 block';
const link = 'link-underline text-[15px] text-ink-2 hover:text-ink';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="wrap pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-8 max-w-sm font-display text-2xl leading-snug tracking-[-0.03em] text-ink">
              Your End-to-End Digital Partner. Innovating the Future with AI, Apps & Automation.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7">
            <nav aria-label="Footer">
              <h2 className={heading}>Navigation</h2>
              <ul className="space-y-3">
                {navigation.map((n) => (
                  <li key={n.name}><Link to={n.href} className={link}>{n.name}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Services">
              <h2 className={heading}>Services</h2>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.name}><Link to={s.href} className={link}>{s.name}</Link></li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className={heading}>Contact</h2>
              <ul className="space-y-3 text-[15px] text-ink-2">
                <li><a href={`mailto:${EMAIL}`} className={`${link} [overflow-wrap:anywhere]`}>{EMAIL}</a></li>
                <li><a href={`tel:${PHONE}`} className={link}>{PHONE}</a></li>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp</a></li>
                <li className="pt-2">{ADDRESS_LINES.map((l) => <span key={l} className="block">{l}</span>)}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="meta mt-20 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <span>© {currentYear} Fullstackverse. All rights reserved.</span>
          <span className="flex gap-6">
            {legal.map((l) => (
              <Link key={l.name} to={l.href} className="hover:text-ink">{l.name}</Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
