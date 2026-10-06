import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { SKILLVERSE_CALL, SKILLVERSE_WHATSAPP_URL } from "@/lib/contact";
import Logo from "./Logo";

const internships = [
  { name: "Robotics Internship", href: "/skillverse/robotics-internship" },
  { name: "Data Analytics & AI", href: "/skillverse/data-analytics-ai-internship" },
  { name: "Mechanical Engineering", href: "/skillverse/mechanical-engineering-internship" },
];

const navigation = [
  { id: "home", name: "Home", href: "/skillverse" },
  { id: "courses", name: "Courses", href: "/skillverse/courses" },
  { id: "workshops", name: "Workshops", href: "/skillverse/workshops" },
  { id: "internships", name: "Internships", dropdown: internships },
  { id: "placement", name: "Placement Accelerator", href: "/skillverse/placement" },
  { id: "study-abroad", name: "Study Abroad", href: "/skillverse/study-abroad" },
  { id: "campus-ambassador", name: "Campus Ambassador", href: "/skillverse/campus-ambassador" },
  { id: "contact", name: "Contact Us", href: "/skillverse/contact" },
];

export const SkillVerseLogo = ({ light = false }) => <Logo light={light} name="SkillVerse" tagline="Learn. Grow. Excel." />;

const SkillVerseHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (href) => location.pathname === href;

  return (
    <header className="site-header">
      <nav className="wrap flex h-16 items-center justify-between gap-6 md:h-[76px]">
        <Link to="/skillverse" className="shrink-0" aria-label="SkillVerse home">
          <SkillVerseLogo />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-5 whitespace-nowrap xl:flex 2xl:gap-7">
          {navigation.map((item) =>
            item.dropdown ? (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-link !text-[11px] ${item.dropdown.some((d) => isActive(d.href)) ? "is-active" : ""}`}
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen((v) => !v)}
                >
                  {item.name}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute -left-4 top-full w-64 pt-3">
                    <div className="rounded border border-line bg-surface py-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className={`block px-4 py-2.5 text-sm transition-colors hover:bg-surface-alt hover:text-ink ${
                            isActive(sub.href) ? "text-ink" : "text-ink-2"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li key={item.id}>
                <Link to={item.href} className={`nav-link !text-[11px] ${isActive(item.href) ? "is-active" : ""}`}>
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a href={`tel:${SKILLVERSE_CALL}`} className="btn btn-secondary btn-sm">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={SKILLVERSE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className="-mr-2 p-2 text-ink xl:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-line bg-canvas xl:hidden">
          <div className="wrap py-6">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.id} className="py-2">
                  <div className="eyebrow pb-2 pt-2">
                    {item.name}
                  </div>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className={`block border-b border-line py-3 pl-4 text-[15px] ${
                        isActive(sub.href) ? "text-ink" : "text-ink-2"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`block border-b border-line py-3.5 font-display text-2xl tracking-[-0.03em] ${
                    isActive(item.href) ? "text-ink" : "text-ink-2"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="mt-8 grid grid-cols-2 gap-2">
              <a href={`tel:${SKILLVERSE_CALL}`} className="btn btn-secondary btn-sm">
                <Phone className="h-4 w-4" /> Call
              </a>
              <a href={SKILLVERSE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SkillVerseHeader;
