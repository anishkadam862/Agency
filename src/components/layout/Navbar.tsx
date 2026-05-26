"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setScrolled(y > 50);
    });
    return unsub;
  }, [scrollY]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5"
        style={{
          backgroundColor: scrolled ? "rgba(5,5,7,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
          transition: "background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" data-cursor-hover>
            <div className="w-9 h-9 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg rotate-12 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-0.5 bg-[#050507] rounded-md rotate-12 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-black text-sm text-white">V</span>
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-widest text-white/90 group-hover:text-white transition-colors">
              VRTX
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wider uppercase font-medium relative group"
                data-cursor-hover
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-white/50 hover:text-white transition-colors tracking-wide"
              data-cursor-hover
            >
              Client Login
            </Link>
            <a
              href="#contact"
              className="btn-primary text-sm py-2.5 px-6"
              data-cursor-hover
            >
              <span className="relative z-10">Start Project</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor-hover
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-[#050507]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-10"
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          clipPath: menuOpen ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: menuOpen ? "all" : "none" }}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: menuOpen ? 1 : 0,
              y: menuOpen ? 0 : 30,
            }}
            transition={{ delay: menuOpen ? i * 0.08 + 0.2 : 0 }}
            className="font-display font-bold text-4xl text-white/70 hover:text-white transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-white/40 hover:text-white transition-colors text-sm tracking-widest uppercase"
          >
            Client Login
          </Link>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
          >
            <span className="relative z-10">Start a Project</span>
          </a>
        </motion.div>
      </motion.div>
    </>
  );
}
