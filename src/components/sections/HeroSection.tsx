"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Play } from "lucide-react";

const ThreeScene = dynamic(() => import("@/components/three/ThreeScene"), {
  ssr: false,
  loading: () => null,
});

const words = ["Brands.", "Products.", "Experiences.", "Futures."];

function AnimatedHeadline() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden h-[1.1em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={wordIndex}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="block gradient-text"
        >
          {words[wordIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function CharReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex flex-wrap gap-0">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.025,
            ease: [0.25, 1, 0.5, 1],
          }}
          className={char === " " ? "mr-3" : ""}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050507" }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 animated-grid opacity-40 pointer-events-none" />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "15%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(155,109,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          transition: "transform 0.8s ease",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          left: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(79,142,247,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          transition: "transform 1s ease",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "60%",
          right: "30%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(12,242,242,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* 3D Canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div className="three-canvas-wrapper w-full h-full">
          <ThreeScene mouseX={mousePos.x} mouseY={mousePos.y} />
        </div>
      </div>

      {/* Floating status badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2.5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs tracking-widest uppercase text-white/50 font-mono">
            Available for projects
          </span>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-20"
      >
        {/* Agency label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-mono text-white/30">
            Creative Agency — Est. 2024
          </span>
        </motion.div>

        {/* Main headline */}
        <h1
          className="font-display font-black mb-6"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            lineHeight: "0.95",
            letterSpacing: "-0.03em",
          }}
        >
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            >
              <span className="text-white">We Design</span>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
            >
              <span className="text-white">Digital</span>{" "}
              <span className="italic font-light text-white/30">Dreams</span>
            </motion.div>
          </div>
          <div className="overflow-hidden flex justify-center">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
            >
              <span className="text-white">Into </span>
              <AnimatedHeadline />
            </motion.div>
          </div>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed mb-12 font-light"
        >
          Award-winning creative studio crafting immersive digital experiences
          for visionary brands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-primary" data-cursor-hover>
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <ArrowRight size={16} />
            </span>
          </a>
          <a href="#work" className="btn-outline group" data-cursor-hover>
            <Play size={15} className="group-hover:text-purple-400 transition-colors" />
            View Our Work
          </a>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-white/5"
        >
          {[
            { num: "200+", label: "Projects Delivered" },
            { num: "50+", label: "Global Clients" },
            { num: "8+", label: "Years of Excellence" },
            { num: "99%", label: "Client Retention" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-2xl text-white mb-1">
                {stat.num}
              </div>
              <div className="text-xs text-white/30 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <div className="scroll-indicator" />
        <span className="text-xs tracking-widest uppercase text-white/20 font-mono">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
