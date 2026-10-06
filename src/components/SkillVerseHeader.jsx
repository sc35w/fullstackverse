import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, GraduationCap, Menu, MessageCircle, Phone, X } from "lucide-react";
import { SKILLVERSE_CALL, SKILLVERSE_WHATSAPP_URL } from "@/lib/contact";

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

export const SkillVerseLogo = ({ light = false }) => (
  <span className="flex items-center gap-2">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-nb-blue text-white">
      <GraduationCap className="h-5 w-5" />
    </span>
    <span className="leading-tight">
      <span className={`block text-xl font-bold tracking-tight ${light ? "text-white" : "text-nb-text"}`}>SkillVerse</span>
      <span className={`block text-[11px] font-medium ${light ? "text-slate-400" : "text-slate-500"}`}>
        Learn. Grow. Excel.
      </span>
    </span>
  </span>
);

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
    <header className="nb-header">
      <nav className="nb-container flex h-16 items-center justify-between gap-4 md:h-[72px] xl:max-w-[1320px]">
        <Link to="/skillverse" className="shrink-0" aria-label="SkillVerse home">
          <SkillVerseLogo />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-3.5 whitespace-nowrap xl:flex 2xl:gap-5">
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
                  className={`nb-nav-link !text-[14px] ${item.dropdown.some((d) => isActive(d.href)) ? "is-active" : ""}`}
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen((v) => !v)}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full w-60 pt-2">
                    <div className="rounded-xl border border-nb-line bg-white p-2 shadow-lg">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className={`block rounded-lg px-3 py-2 text-sm font-medium hover:bg-nb-soft hover:text-nb-blue ${
                            isActive(sub.href) ? "bg-nb-soft text-nb-blue" : "text-nb-text"
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
                <Link to={item.href} className={`nb-nav-link !text-[14px] ${isActive(item.href) ? "is-active" : ""}`}>
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a href={`tel:${SKILLVERSE_CALL}`} className="btn-outline btn-sm !px-3">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={SKILLVERSE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid btn-sm !px-3"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className="-mr-2 rounded-lg p-2 text-nb-text hover:bg-nb-soft xl:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-nb-line bg-white xl:hidden">
          <div className="nb-container py-4">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.id} className="py-2">
                  <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {item.name}
                  </div>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className={`block rounded-lg px-2 py-2.5 text-[15px] font-medium ${
                        isActive(sub.href) ? "bg-nb-soft text-nb-blue" : "text-nb-text"
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
                  className={`block rounded-lg px-2 py-2.5 text-[15px] font-medium ${
                    isActive(item.href) ? "bg-nb-soft text-nb-blue" : "text-nb-text"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-nb-line pt-4">
              <a href={`tel:${SKILLVERSE_CALL}`} className="btn-outline btn-sm">
                <Phone className="h-4 w-4" /> Call
              </a>
              <a href={SKILLVERSE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-solid btn-sm">
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
