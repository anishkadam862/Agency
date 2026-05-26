"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const smoothRingX = useSpring(ringX, ringSpringConfig);
  const smoothRingY = useSpring(ringY, ringSpringConfig);

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".pill-selector") ||
        target.closest(".budget-tab") ||
        target.closest(".service-card") ||
        target.closest("[data-cursor-hover]");
      setHovering(!!isInteractive);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Ring */}
      <motion.div
        className={`cursor-ring ${hovering ? "hovering" : ""} ${clicking ? "clicking" : ""}`}
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
