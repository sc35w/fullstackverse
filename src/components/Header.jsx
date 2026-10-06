import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { ContactDialogButton } from "@/components/site/blocks";
import { EMAIL, PHONE, WHATSAPP_URL } from "@/lib/contact";

const services = [
  { name: "Web Development", href: "/web-development" },
  { name: "App Development", href: "/app-development" },
  { name: "Game Development", href: "/game-development" },
  { name: "Software Development", href: "/software-development" },
  { name: "AI Services", href: "/ai-services" },
];

const navigation = [
  { id: "home", name: "Home", href: "/" },
  { id: "about", name: "About", href: "/about" },
  { id: "services", name: "Our Services", dropdown: services },
  { id: "rfp", name: "Request for Proposal", href: "/rfp" },
  { id: "skillverse", name: "SkillVerse", href: "/skillverse" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const location = useLocation();

  // Close menus on navigation.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  // Close the services dropdown when clicking elsewhere.
  useEffect(() => {
    const onClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setIsServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href) => location.pathname === href;
  const servicesActive = services.some((s) => isActive(s.href));

  return (
    <header className="nb-header">
      <nav className="nb-container flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link to="/" className="shrink-0" aria-label="Fullstackverse home">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-6 whitespace-nowrap lg:flex xl:gap-8">
          {navigation.map((item) =>
            item.dropdown ? (
              <li
                key={item.id}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  type="button"
                  className={`nb-nav-link ${servicesActive ? "is-active" : ""}`}
                  aria-expanded={isServicesOpen}
                  onClick={() => setIsServicesOpen((v) => !v)}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isServicesOpen && (
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
                <Link to={item.href} className={`nb-nav-link ${isActive(item.href) ? "is-active" : ""}`}>
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <a href={`tel:${PHONE}`} className="nb-nav-link hidden gap-2 whitespace-nowrap xl:inline-flex">
            <Phone className="h-4 w-4" />
            {PHONE}
          </a>
          <ContactDialogButton className="btn-outline btn-sm uppercase tracking-wide">Contact us</ContactDialogButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className="-mr-2 rounded-lg p-2 text-nb-text hover:bg-nb-soft lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-nb-line bg-white lg:hidden">
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
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-nb-line pt-4">
              <a href={`tel:${PHONE}`} className="btn-solid btn-sm">
                <Phone className="h-4 w-4" /> Call
              </a>
              <a href={`mailto:${EMAIL}`} className="btn-outline btn-sm">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
