"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Nexus Finance",
    category: "Web App · Branding",
    year: "2024",
    metric: "+340% conversions",
    color: "#9B6DFF",
    bgColor: "rgba(155,109,255,0.08)",
    description: "Complete digital overhaul for a fintech platform. Interactive dashboards, real-time data viz, and premium brand identity.",
  },
  {
    id: 2,
    title: "Aura Wellness",
    category: "Mobile App · UI/UX",
    year: "2024",
    metric: "4.9★ App Store",
    color: "#4F8EF7",
    bgColor: "rgba(79,142,247,0.08)",
    description: "Meditative health app with biometric integrations, custom 3D animations, and an award-winning user journey.",
  },
  {
    id: 3,
    title: "Kulture Kode",
    category: "Branding · Motion",
    year: "2023",
    metric: "2× Awwwards",
    color: "#0CF2F2",
    bgColor: "rgba(12,242,242,0.06)",
    description: "Experimental streetwear brand launch. Immersive web experience with WebGL scenes and kinetic typography.",
  },
  {
    id: 4,
    title: "Elevate Capital",
    category: "Website · Strategy",
    year: "2023",
    metric: "+5x lead gen",
    color: "#FF6B9D",
    bgColor: "rgba(255,107,157,0.06)",
    description: "High-converting investor relations platform with scroll storytelling, animated metrics, and case study modules.",
  },
  {
    id: 5,
    title: "Solaris Events",
    category: "Branding · Video",
    year: "2024",
    metric: "100K+ views",
    color: "#FFB347",
    bgColor: "rgba(255,179,71,0.06)",
    description: "Premium event brand with cinematic launch video, dynamic identity system, and immersive event site.",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      className="relative flex-shrink-0 group"
      style={{ width: "clamp(300px, 38vw, 520px)" }}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Card */}
      <div
        className="relative rounded-3xl overflow-hidden border border-white/5 group-hover:border-white/10 transition-all duration-500"
        style={{ background: project.bgColor }}
        data-cursor-hover
      >
        {/* Visual area */}
        <div
          className="relative h-64 lg:h-80 flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}20 0%, transparent 70%)`,
          }}
        >
          {/* Animated grid */}
          <div className="absolute inset-0 animated-grid opacity-30" />

          {/* Center emblem */}
          <motion.div
            className="relative z-10 w-28 h-28 rounded-2xl flex items-center justify-center"
            style={{
              background: `${project.color}18`,
              border: `1px solid ${project.color}30`,
              backdropFilter: "blur(10px)",
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="font-display font-black text-4xl"
              style={{ color: project.color }}
            >
              {project.title.charAt(0)}
            </span>
          </motion.div>

          {/* Floating badge */}
          <div
            className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-mono"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}25`,
              color: project.color,
            }}
          >
            {project.year}
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-7">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-xs text-white/30 font-mono tracking-widest uppercase mb-2 block">
                {project.category}
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                {project.title}
              </h3>
            </div>
            <motion.div
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight size={16} className="text-white/30 group-hover:text-white transition-colors" />
            </motion.div>
          </div>

          <p className="text-white/40 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Metric */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: `${project.color}12`,
              border: `1px solid ${project.color}25`,
              color: project.color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
            {project.metric}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-32 lg:py-48"
      style={{ background: "#050507" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.4em] uppercase font-mono text-white/30 mb-6 block"
            >
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="font-display font-black leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Work that
              <br />
              <span className="gradient-text-cyan">speaks volumes</span>
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#contact"
            className="btn-outline self-start"
            data-cursor-hover
          >
            View All Projects
          </motion.a>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="px-6 lg:px-12">
        <div
          ref={trackRef}
          className="horizontal-scroll-track overflow-x-auto pb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.horizontal-scroll-track::-webkit-scrollbar { display: none; }`}</style>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee text */}
      <div className="mt-20 overflow-hidden py-8 border-t border-b border-white/5">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mr-12">
              {["Strategy", "Design", "Development", "Motion", "Branding", "3D", "AI", "Growth"].map((word) => (
                <span
                  key={word}
                  className="font-display font-bold text-4xl lg:text-6xl uppercase tracking-tight whitespace-nowrap"
                  style={{ color: "rgba(255,255,255,0.05)" }}
                >
                  {word}
                  <span style={{ color: "rgba(155,109,255,0.3)", marginLeft: "1.5rem" }}>
                    ×
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
