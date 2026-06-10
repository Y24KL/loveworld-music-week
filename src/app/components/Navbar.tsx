"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Resource", href: "/resources" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex items-center justify-between max-w-7xl px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/LOVEWORLD_MUSIC_WEEK_LOGO-removebg-preview.jpg"
            alt="LoveWorld Music Week Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-gray-300 hover:text-brand-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/give" 
            className="px-6 py-2.5 bg-brand-gold text-black rounded-full hover:bg-brand-gold-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Give
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white relative z-50 p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col items-center py-8 gap-6 shadow-2xl z-40"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg text-gray-200 hover:text-brand-gold transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/give" 
            className="px-8 py-3 bg-brand-gold text-black rounded-full font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Give
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}