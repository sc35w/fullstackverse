import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail, MessageCircle, Code } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearDropdownTimeout = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownClick = (id) => {
    setActiveDropdown(id);
    setIsDropdownClicked(true);
    clearDropdownTimeout();
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
      setIsDropdownClicked(false);
    }, 5000);
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = (id) => {
    setActiveDropdown(id);
    clearDropdownTimeout();
  };

  const handleDropdownMouseLeave = (id) => {
    if (!isDropdownClicked) {
      clearDropdownTimeout();
      const timeout = setTimeout(() => {
        setActiveDropdown((current) => (current === id ? null : current));
      }, 300);
      setDropdownTimeout(timeout);
    }
  };

  const handlePanelMouseEnter = () => {
    clearDropdownTimeout();
  };

  const handlePanelMouseLeave = () => {
    setActiveDropdown(null);
    setIsDropdownClicked(false);
    clearDropdownTimeout();
  };

  const handleContact = (type) => {
    if (type === "phone") {
      // use plain local display number for dialing links per request
      window.open("tel:8296548156", "_self");
    } else if (type === "email") {
      window.open("mailto:fullstackverse2021@gmail.com", "_self");
    } else if (type === "whatsapp") {
      // Updated WhatsApp number: +918296548156 (use wa.me format without '+')
      window.open(
        "https://wa.me/918296548156?text=Hello%20Fullstackverse,%20I%27d%20like%20to%20discuss%20my%20project%20idea.",
        "_blank"
      );
    }
  };

  const navigation = [
    { id: "home", name: "Home", href: "/" },
    { id: "about", name: "About", href: "/about" },
    {
      id: "services",
      name: "Our Services",
      href: "#",
      dropdown: [
        { name: "Web Development", href: "/web-development" },
        { name: "App Development", href: "/app-development" },
        { name: "Game Development", href: "/game-development" },
        { name: "Software Development", href: "/software-development" },
        { name: "AI Services", href: "/ai-services" }
      ]
    },
    { id: "rfp", name: "Request for Proposal", href: "/rfp" },
  ];

  const headerBg = isScrolled
    ? "header"
    : "header";

  const linkBase =
	"text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors";
  const linkActive = "text-blue-600";

  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <nav className="header-inner">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo - tight to left edge */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex items-center gap-2"
            >
              <Code className="h-10 w-10 text-blue-600" />
              <Logo />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex flex-1 justify-start gap-6">
            {navigation.map((item) => (
              <li key={item.id} className="relative">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownClick(item.id)}
                      onMouseEnter={() => handleDropdownMouseEnter(item.id)}
                      onMouseLeave={() => handleDropdownMouseLeave(item.id)}
                      className={`${linkBase} flex items-center gap-1 ${
                        item.dropdown.some((subItem) => location.pathname === subItem.href) ? linkActive : ""
                      }`}
                    >
                      {item.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        onMouseEnter={handlePanelMouseEnter}
                        onMouseLeave={handlePanelMouseLeave}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors ${
                              location.pathname === subItem.href ? "bg-blue-50 text-blue-600" : ""
                            }`}
                            onClick={() => {
                              handlePanelMouseLeave();
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`${linkBase} ${
                      location.pathname === item.href ? linkActive : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex shrink-0">
            <a
              href="tel:8296548156"
              className="btn"
              style={{ backgroundColor: 'hsl(var(--primary-h) var(--primary-s) var(--primary-l))', color: 'white', textDecoration: 'none' }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call
            </a>
            <button
              onClick={() => handleContact("email")}
              className="btn"
              style={{ backgroundColor: 'hsl(var(--accent-h) var(--accent-s) var(--accent-l))', color: 'white' }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </button>
            <button
              onClick={() => handleContact("whatsapp")}
              className="btn"
              style={{ background: 'linear-gradient(135deg, #25D366, #0EA84A)', color: 'white' }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden shrink-0">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex items-center justify-center p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? 
                <X className="w-9 h-9 text-black shrink-0" strokeWidth={3} /> : 
                <svg 
                  className="w-9 h-9 shrink-0" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path d="M3 5H21" stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M3 10H21" stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M3 15H21" stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M3 20H21" stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute left-0 right-0 top-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mt-2 glass p-1 shadow-xl w-full overflow-x-hidden">
              {navigation.map((item) => (
                item.dropdown ? (
                  <div key={item.id} className="mb-2">
                    <div className="px-2 py-2 text-sm font-medium text-gray-900 border-b border-gray-200">
                      {item.name}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={`block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${
                          location.pathname === subItem.href ? "bg-gray-100 text-blue-600" : ""
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`block rounded-md px-1 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${
                      location.pathname === item.href ? "bg-gray-100 text-blue-600" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="mt-1 flex flex-col sm:flex-row gap-2 px-1 pb-2">
                <a
                  href="tel:8296548156"
                  className="btn flex-1"
                  style={{ backgroundColor: 'hsl(var(--primary-h) var(--primary-s) var(--primary-l))', color: 'white', textDecoration: 'none' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </a>
                <button
                  onClick={() => {
                    handleContact("email");
                    setIsMenuOpen(false);
                  }}
                  className="btn flex-1"
                  style={{ backgroundColor: 'hsl(var(--accent-h) var(--accent-s) var(--accent-l))', color: 'white' }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
