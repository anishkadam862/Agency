"use client";

import { useState } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <main className="relative">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <WorkSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  );
}
