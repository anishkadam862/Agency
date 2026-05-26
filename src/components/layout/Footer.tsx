"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Github, ArrowUpRight } from "lucide-react";

const socials = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Github, href: "#", label: "GitHub" },
];

const footerLinks = [
  {
    title: "Services",
    links: ["Web Design", "App Development", "Branding", "Motion", "UI/UX", "Marketing"],
  },
  {
    title: "Company",
    links: ["About", "Work", "Careers", "Blog", "Press"],
  },
  {
    title: "Connect",
    links: ["Instagram", "Twitter", "LinkedIn", "Dribbble", "Behance"],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-24 pb-12"
      style={{
        background: "linear-gradient(180deg, #050507 0%, #020204 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Mega text background */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <div className="footer-mega-text text-white select-none">
          VRTX
        </div>
      </div>

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(155,109,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Top section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl rotate-12" />
                <div className="absolute inset-0.5 bg-[#020204] rounded-lg rotate-12" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black text-sm text-white">V</span>
                </div>
              </div>
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                VRTX Studio
              </span>
            </div>

            <p className="text-white/30 leading-relaxed max-w-sm mb-8">
              Next-generation creative agency crafting immersive digital
              experiences for brands that dare to be different.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  aria-label={label}
                  data-cursor-hover
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-3 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-mono text-white/30 tracking-widest uppercase mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/40 hover:text-white transition-colors duration-300"
                        data-cursor-hover
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl mb-16"
          style={{
            background: "linear-gradient(135deg, rgba(155,109,255,0.08), rgba(79,142,247,0.08))",
            border: "1px solid rgba(155,109,255,0.15)",
          }}
        >
          <div>
            <h3 className="font-display font-bold text-xl text-white mb-1">
              Ready to start a project?
            </h3>
            <p className="text-white/40 text-sm">
              Let's build something extraordinary together.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary flex-shrink-0"
            data-cursor-hover
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <ArrowUpRight size={15} />
            </span>
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-white/20 text-xs font-mono">
            © {new Date().getFullYear()} VRTX Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <a href="#" className="hover:text-white/50 transition-colors" data-cursor-hover>
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/50 transition-colors" data-cursor-hover>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
