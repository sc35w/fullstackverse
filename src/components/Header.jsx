import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
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
      // use plain local display number for dialing links per request
      window.open("tel:7042709578", "_self");
    } else if (type === "email") {
      window.open("mailto:contact@fullstackverse.com", "_self");
    } else if (type === "whatsapp") {
      // Updated WhatsApp number: +917042709578 (use wa.me format without '+')
      window.open(
        "https://wa.me/917042709578?text=Hello%20Fullstackverse,%20I%27d%20like%20to%20discuss%20my%20project%20idea.",
        "_blank"
      );
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Web Development", href: "/web-development" },
    { name: "App Development", href: "/app-development" },
    { name: "Game Development", href: "/game-development" },
    { name: "AI Services", href: "/ai-services" },
    { name: "Software Development", href: "/software-development" },
    { name: "About", href: "/about" },
  ];

  const headerBg = isScrolled
    ? "bg-slate-950/85 supports-[backdrop-filter]:bg-slate-900/70 backdrop-blur-md shadow-sm"
    : "bg-slate-900/35 backdrop-blur-md";

  const linkBase =
    "text-sm font-medium text-white/90 hover:text-indigo-300 transition-colors";
  const linkActive = "text-white";

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${headerBg}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.img
              src="/logo.png"               // <- apna path sahi rakho
              alt="Fullstackverse"
              className="h-9 w-auto rounded-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-7 lg:flex ml-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`${linkBase} ${
                    location.pathname === item.href ? linkActive : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleContact("phone")}
              className="text-white/90 hover:text-white"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleContact("email")}
              className="text-white/90 hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleContact("whatsapp")}
              className="text-emerald-300 hover:text-emerald-200"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="text-white/90 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mt-2 rounded-lg border border-white/10 bg-slate-900/90 p-2 shadow-xl backdrop-blur">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-white/10 ${
                    location.pathname === item.href ? "bg-white/10 text-white" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-1 flex gap-2 px-2 pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleContact("phone");
                    setIsMenuOpen(false);
                  }}
                  className="flex-1"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleContact("email");
                    setIsMenuOpen(false);
                  }}
                  className="flex-1"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
