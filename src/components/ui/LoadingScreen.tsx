"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let start: number;
    const duration = 2200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(p));

      if (p < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 animated-grid opacity-30" />

          {/* Glowing orbs */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(155,109,255,0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 mb-16 text-center"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg rotate-45" />
                <div className="absolute inset-1 bg-black rounded-md rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-display">V</span>
                </div>
              </div>
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                VRTX
              </span>
            </div>
            <p
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Studio
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 w-48"
          >
            <div className="loading-bar mb-4">
              <motion.div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-space-mono)" }}
              >
                Loading
              </span>
              <span
                className="text-xs"
                style={{
                  color: "rgba(155,109,255,0.8)",
                  fontFamily: "var(--font-space-mono)",
                }}
              >
                {progress}%
              </span>
            </div>
          </motion.div>

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="w-full h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(12,242,242,0.3), transparent)",
              }}
              animate={{ y: [-2, "100vh"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
