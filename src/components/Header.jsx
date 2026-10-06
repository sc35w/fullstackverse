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
  { id: "portfolio", name: "Portfolio", href: "/portfolio" },
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

  const isActive = (href) => location.pathname === href || (href !== "/" && location.pathname.startsWith(`${href}/`));
  const servicesActive = services.some((s) => isActive(s.href));

  return (
    <header className="site-header">
      <nav className="wrap flex h-16 items-center justify-between gap-8 md:h-[76px]">
        <Link to="/" className="shrink-0" aria-label="Fullstackverse home">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-7 whitespace-nowrap lg:flex xl:gap-10">
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
                  className={`nav-link ${servicesActive ? "is-active" : ""}`}
                  aria-expanded={isServicesOpen}
                  onClick={() => setIsServicesOpen((v) => !v)}
                >
                  {item.name}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {isServicesOpen && (
                  <div className="absolute -left-4 top-full w-64 pt-3">
                    <div className="rounded border border-line bg-surface py-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-surface-alt ${
                            isActive(sub.href) ? "text-ink" : "text-ink-2 hover:text-ink"
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
                <Link to={item.href} className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}>
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <a href={`tel:${PHONE}`} className="mono hidden whitespace-nowrap text-ink-2 transition-colors hover:text-ink xl:inline">
            +91 {PHONE}
          </a>
          <ContactDialogButton className="btn btn-primary btn-sm">Contact us</ContactDialogButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className="-mr-2 p-2 text-ink lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-line bg-canvas lg:hidden">
          <div className="wrap py-6">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.id} className="py-2">
                  <div className="eyebrow pb-2 pt-2">{item.name}</div>
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
            <div className="mt-8 grid grid-cols-3 gap-2">
              <a href={`tel:${PHONE}`} className="btn btn-primary btn-sm">
                <Phone className="h-4 w-4" /> Call
              </a>
              <a href={`mailto:${EMAIL}`} className="btn btn-secondary btn-sm">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
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
