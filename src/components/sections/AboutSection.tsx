"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { number: 200, suffix: "+", label: "Projects Shipped" },
  { number: 50, suffix: "+", label: "Happy Clients" },
  { number: 8, suffix: "+", label: "Years Active" },
  { number: 99, suffix: "%", label: "Client Retention" },
];

const pillars = [
  {
    title: "Strategy",
    desc: "Deep-dive discovery sessions to uncover your brand's core truth and competitive advantage.",
    num: "01",
  },
  {
    title: "Design",
    desc: "Visually arresting interfaces built on systematic design thinking and emotional resonance.",
    num: "02",
  },
  {
    title: "Build",
    desc: "Cutting-edge development with performance-first engineering and immersive interactions.",
    num: "03",
  },
  {
    title: "Launch",
    desc: "Strategic go-to-market execution with continuous optimization and growth systems.",
    num: "04",
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.5], [-40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ background: "#050507" }}
    >
      {/* Background accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateY(-50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="mb-20"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-mono text-white/30 flex items-center gap-3">
            <motion.span
              className="block h-px bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ width: "40px", scaleX: lineScale, transformOrigin: "left" }}
            />
            About Us
          </span>
        </motion.div>

        {/* Main text */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-28">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="font-display font-black leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              We don't just build
              <br />
              <span className="gradient-text italic">websites.</span>
              <br />
              We architect
              <br />
              <span className="text-white/30">experiences.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="text-white/50 text-lg leading-relaxed"
            >
              VRTX Studio is a next-generation creative agency at the
              intersection of design, technology, and storytelling. We partner
              with visionary brands to create digital experiences that don't
              just look stunning — they convert, captivate, and endure.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="text-white/30 leading-relaxed"
            >
              From brand identity to immersive 3D web experiences, motion
              graphics to strategic marketing — we craft every pixel with
              intent.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              href="#services"
              className="inline-flex items-center gap-2 text-sm font-display font-semibold text-white/60 hover:text-white transition-colors mt-4 group"
              data-cursor-hover
            >
              Explore our services
              <span className="w-8 h-px bg-white/30 group-hover:w-16 group-hover:bg-purple-400 transition-all duration-500" />
            </motion.a>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="glass rounded-2xl p-6 text-center glass-hover"
            >
              <div className="stat-number mb-2">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-white/30 text-sm tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-mono text-white/30">
            Our Process
          </span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className="service-card group"
              data-cursor-hover
            >
              <div className="flex justify-between items-start mb-8">
                <span
                  className="text-xs font-mono text-white/20 tracking-widest"
                >
                  {pillar.num}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/40 transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-purple-400 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:gradient-text transition-all">
                {pillar.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
