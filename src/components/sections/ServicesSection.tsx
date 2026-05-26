"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Globe,
  Palette,
  PenTool,
  Film,
  Video,
  Camera,
  Share2,
  MessageSquare,
  Layout,
  FileText,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "App Design & Dev",
    icon: Smartphone,
    tag: "Mobile",
    color: "#9B6DFF",
    desc: "Native and cross-platform apps that blend performance with stunning interfaces. From concept to App Store.",
    highlights: ["React Native", "iOS / Android", "Flutter", "WebApp"],
  },
  {
    id: 2,
    title: "Website Design & Dev",
    icon: Globe,
    tag: "Web",
    color: "#4F8EF7",
    desc: "Award-worthy web experiences built on Next.js, Three.js, and cutting-edge animation stacks.",
    highlights: ["Next.js", "Three.js", "GSAP", "Framer"],
  },
  {
    id: 3,
    title: "Branding",
    icon: Palette,
    tag: "Identity",
    color: "#FF6B9D",
    desc: "Complete brand systems — from vision and voice to visual identity and brand guidelines.",
    highlights: ["Brand Strategy", "Visual System", "Guidelines", "Assets"],
  },
  {
    id: 4,
    title: "Logo Design",
    icon: PenTool,
    tag: "Identity",
    color: "#FFB347",
    desc: "Timeless, versatile logomarks crafted with precision and symbolic depth.",
    highlights: ["Logomark", "Wordmark", "Emblem", "Symbol"],
  },
  {
    id: 5,
    title: "Motion Graphics",
    icon: Film,
    tag: "Motion",
    color: "#0CF2F2",
    desc: "Cinematic motion design for brands, social content, and product storytelling.",
    highlights: ["After Effects", "Cinema 4D", "Lottie", "WebGL"],
  },
  {
    id: 6,
    title: "Videography",
    icon: Video,
    tag: "Video",
    color: "#FF4757",
    desc: "High-production commercial video direction, editing, and color grading.",
    highlights: ["Commercial", "Product", "Brand Film", "Reels"],
  },
  {
    id: 7,
    title: "Photography",
    icon: Camera,
    tag: "Visual",
    color: "#A8E6CF",
    desc: "Professional photography for brands, products, and editorial campaigns.",
    highlights: ["Product", "Editorial", "Lifestyle", "Event"],
  },
  {
    id: 8,
    title: "Social Media",
    icon: Share2,
    tag: "Growth",
    color: "#DDA0DD",
    desc: "Full-service social media creative direction, content calendars, and community management.",
    highlights: ["Instagram", "LinkedIn", "YouTube", "TikTok"],
  },
  {
    id: 9,
    title: "Consultation",
    icon: MessageSquare,
    tag: "Strategy",
    color: "#98D8C8",
    desc: "Expert creative consulting to align your vision, team, and execution strategy.",
    highlights: ["Audit", "Roadmap", "Advisory", "Workshop"],
  },
  {
    id: 10,
    title: "UI/UX Design",
    icon: Layout,
    tag: "Product",
    color: "#9B6DFF",
    desc: "Research-backed, beautiful product design. Flows, wireframes, and pixel-perfect UI.",
    highlights: ["Research", "Wireframes", "Prototype", "Design System"],
  },
  {
    id: 11,
    title: "Content Production",
    icon: FileText,
    tag: "Content",
    color: "#4F8EF7",
    desc: "Strategy-led content creation — blogs, scripts, copy, and creative direction.",
    highlights: ["Copywriting", "Scripts", "Blogs", "SEO"],
  },
  {
    id: 12,
    title: "Marketing Strategy",
    icon: TrendingUp,
    tag: "Growth",
    color: "#FFB347",
    desc: "Data-driven marketing strategies combining paid, organic, and brand channels.",
    highlights: ["Performance", "SEO", "Email", "Paid Ads"],
  },
];

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      layout
      className="service-card group cursor-none"
      onClick={() => setExpanded(!expanded)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      data-cursor-hover
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${service.color}18 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
          >
            <Icon size={22} style={{ color: service.color }} />
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-mono tracking-widest uppercase"
              style={{
                color: service.color,
                background: `${service.color}12`,
                border: `1px solid ${service.color}20`,
              }}
            >
              {service.tag}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed mb-4">{service.desc}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="pt-4 border-t border-white/5">
                <span className="text-xs text-white/30 tracking-widest uppercase mb-3 block">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: `${service.color}10`,
                        border: `1px solid ${service.color}20`,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider line */}
        <motion.div
          className="h-px mt-4"
          style={{
            background: `linear-gradient(90deg, ${service.color}40, transparent)`,
            scaleX: expanded ? 1 : 0,
            transformOrigin: "left",
          }}
          animate={{ scaleX: expanded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-32 lg:py-48"
      style={{ background: "linear-gradient(180deg, #050507 0%, #080810 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: "50%",
          height: "50%",
          background: "radial-gradient(circle at 80% 20%, rgba(155,109,255,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.4em] uppercase font-mono text-white/30 mb-6 block"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="font-display font-black leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Full-spectrum
              <br />
              <span className="gradient-text">creative services</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 max-w-sm leading-relaxed"
          >
            From brand identity to immersive digital products — we handle every
            creative touchpoint under one roof.
          </motion.p>
        </div>

        {/* Services grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-white/30 mb-6 text-sm">
            Not seeing what you need?
          </p>
          <a href="#contact" className="btn-outline" data-cursor-hover>
            Let's talk about your project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
