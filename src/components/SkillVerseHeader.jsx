import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail, MessageCircle, GraduationCap } from "lucide-react";

const SkillVerseHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContact = (type) => {
    if (type === "phone") {
      window.open("tel:9398165155", "_self");
    } else if (type === "email") {
      window.open("mailto:contact@fullstackverse.com", "_self");
    } else if (type === "whatsapp") {
      window.open(
        "https://wa.me/919398165155?text=Hello%20SkillVerse,%20I%27d%20like%20to%20learn%20more%20about%20your%20courses.",
        "_blank"
      );
    }
  };

  const navigation = [
    { id: "home", name: "Home", href: "/skillverse" },
    { id: "courses", name: "Courses", href: "/skillverse/courses" },
    { id: "workshops", name: "Workshops", href: "/skillverse/workshops" },    { 
      id: "internships", 
      name: "Internships", 
      href: "/skillverse/internships",
      dropdown: [
        { name: "Robotics Internship", href: "/skillverse/robotics-internship" },
        { name: "Data Analytics & AI", href: "/skillverse/data-analytics-ai-internship" },
        { name: "Mechanical Engineering", href: "/skillverse/mechanical-engineering-internship" },
      ]
    },    { id: "placement", name: "Placement Accelerator", href: "/skillverse/placement" },
    { id: "study-abroad", name: "Study Abroad", href: "/skillverse/study-abroad" },
    { id: "campus-ambassador", name: "Campus Ambassador", href: "/skillverse/campus-ambassador" },
    { id: "contact", name: "Contact Us", href: "/skillverse/contact" },
  ];

  const linkBase = "text-sm font-medium text-gray-700 hover:text-red-500 transition-colors";
  const linkActive = "text-red-500";

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-red-500"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/skillverse" className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-10 w-10 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">SkillVerse</div>
                <div className="text-xs text-red-500">Learn. Grow. Excel.</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex flex-1 justify-center gap-6">
            {navigation.map((item) => (
              <li key={item.id} className={item.dropdown ? "relative group" : ""}>
                {item.dropdown ? (
                  <>
                    <button className={`${linkBase} flex items-center gap-1`}>
                      {item.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 first:rounded-t-md last:rounded-b-md"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
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
              href="tel:7042709578"
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <button
              onClick={() => handleContact("whatsapp")}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? "bg-red-50 text-red-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-2 mt-2">
                <a
                  href="tel:7042709578"
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="inline h-4 w-4 mr-2" />
                  Call
                </a>
                <button
                  onClick={() => {
                    handleContact("whatsapp");
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white"
                >
                  <MessageCircle className="inline h-4 w-4 mr-2" />
                  WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default SkillVerseHeader;
