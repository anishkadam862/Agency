"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Send } from "lucide-react";

const services = [
  "App",
  "Website",
  "Branding",
  "Logo Design",
  "Motion Graphics",
  "Videography",
  "Photography",
  "Consultation",
  "Social Media",
  "UI/UX",
  "Content",
  "Marketing",
  "Other",
];

const budgets = [
  "₹1–2 Lakhs",
  "₹2–4 Lakhs",
  "₹5–6 Lakhs",
  "₹7+ Lakhs",
];

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = () => {
    if (!name || !email) return;
    setSubmitted(true);
  };

  const canNext1 = selectedServices.length > 0;
  const canNext2 = selectedBudget !== "";

  return (
    <section
      id="contact"
      className="relative py-32 lg:py-48"
      style={{ background: "#050507" }}
    >
      {/* Background */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          right: 0,
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(155,109,255,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase font-mono text-white/30 mb-6 block"
          >
            Let's Create Together
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="font-display font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Ready to build
            <br />
            <span className="gradient-text">something legendary?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-lg"
          >
            Tell us about your project and we'll get back within 24 hours.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="glass rounded-3xl p-8 lg:p-12 border border-white/5"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              // Success state
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                  style={{ background: "rgba(155,109,255,0.15)", border: "1px solid rgba(155,109,255,0.3)" }}
                >
                  <CheckCircle2 size={36} className="text-purple-400" />
                </motion.div>
                <h3 className="font-display font-bold text-3xl text-white mb-4">
                  Message Received! 🎉
                </h3>
                <p className="text-white/50 mb-2">
                  We'll review your project and get back to you within 24 hours.
                </p>
                <p className="text-white/30 text-sm">
                  A confirmation has been sent to{" "}
                  <span className="text-purple-400">{email}</span>
                </p>
              </motion.div>
            ) : (
              <motion.div key="form">
                {/* Step indicators */}
                <div className="flex items-center gap-3 mb-12">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all duration-500"
                        style={{
                          background:
                            step >= s
                              ? "linear-gradient(135deg, #9B6DFF, #4F8EF7)"
                              : "rgba(255,255,255,0.05)",
                          color: step >= s ? "white" : "rgba(255,255,255,0.3)",
                          border:
                            step >= s
                              ? "none"
                              : "1px solid rgba(255,255,255,0.08)",
                          boxShadow:
                            step === s
                              ? "0 0 20px rgba(155,109,255,0.4)"
                              : "none",
                        }}
                      >
                        {step > s ? "✓" : s}
                      </div>
                      {s < 3 && (
                        <div
                          className="h-px w-12 transition-all duration-500"
                          style={{
                            background:
                              step > s
                                ? "linear-gradient(90deg, #9B6DFF, #4F8EF7)"
                                : "rgba(255,255,255,0.08)",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Services */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      I'm looking for help in
                    </h3>
                    <p className="text-white/40 text-sm mb-8">
                      Select all that apply
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                      {services.map((service) => (
                        <button
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`pill-selector ${selectedServices.includes(service) ? "active" : ""}`}
                          data-cursor-hover
                        >
                          {service}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => canNext1 && setStep(2)}
                      className="btn-primary"
                      style={{ opacity: canNext1 ? 1 : 0.4 }}
                      data-cursor-hover
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Continue
                        <ArrowRight size={16} />
                      </span>
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Budget */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      Willing to spend
                    </h3>
                    <p className="text-white/40 text-sm mb-8">
                      Select your approximate budget range
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-10">
                      {budgets.map((budget) => (
                        <button
                          key={budget}
                          onClick={() => setSelectedBudget(budget)}
                          className={`budget-tab ${selectedBudget === budget ? "active" : ""}`}
                          data-cursor-hover
                        >
                          {budget}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="btn-outline"
                        data-cursor-hover
                      >
                        Back
                      </button>
                      <button
                        onClick={() => canNext2 && setStep(3)}
                        className="btn-primary"
                        style={{ opacity: canNext2 ? 1 : 0.4 }}
                        data-cursor-hover
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Continue
                          <ArrowRight size={16} />
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      Tell us about yourself
                    </h3>
                    <p className="text-white/40 text-sm mb-8">
                      Almost there — just a few details
                    </p>

                    <div className="space-y-5 mb-8">
                      <div>
                        <label className="text-xs text-white/40 tracking-widest uppercase mb-2 block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-5 py-4 rounded-xl text-white placeholder-white/20 text-sm outline-none transition-all duration-300 focus:border-purple-500/50"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(155,109,255,0.4)";
                            e.target.style.boxShadow = "0 0 20px rgba(155,109,255,0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 tracking-widest uppercase mb-2 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hello@yourcompany.com"
                          className="w-full px-5 py-4 rounded-xl text-white placeholder-white/20 text-sm outline-none"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(155,109,255,0.4)";
                            e.target.style.boxShadow = "0 0 20px rgba(155,109,255,0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 tracking-widest uppercase mb-2 block">
                          Project Brief
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your vision, goals, and timeline..."
                          rows={4}
                          className="w-full px-5 py-4 rounded-xl text-white placeholder-white/20 text-sm outline-none resize-none"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(155,109,255,0.4)";
                            e.target.style.boxShadow = "0 0 20px rgba(155,109,255,0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255,255,255,0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div
                      className="p-4 rounded-xl mb-8 text-sm"
                      style={{
                        background: "rgba(155,109,255,0.06)",
                        border: "1px solid rgba(155,109,255,0.15)",
                      }}
                    >
                      <div className="text-white/50 mb-2">
                        <span className="text-purple-400 font-semibold">Services:</span>{" "}
                        {selectedServices.join(", ")}
                      </div>
                      <div className="text-white/50">
                        <span className="text-blue-400 font-semibold">Budget:</span>{" "}
                        {selectedBudget}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(2)}
                        className="btn-outline"
                        data-cursor-hover
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="btn-primary"
                        style={{ opacity: name && email ? 1 : 0.4 }}
                        data-cursor-hover
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Send Message
                          <Send size={14} />
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-white/30"
        >
          <a href="mailto:hello@vrtx.studio" className="hover:text-white transition-colors" data-cursor-hover>
            hello@vrtx.studio
          </a>
          <span className="w-px h-4 bg-white/10" />
          <a href="tel:+919999999999" className="hover:text-white transition-colors" data-cursor-hover>
            +91 99999 99999
          </a>
          <span className="w-px h-4 bg-white/10" />
          <span>Response within 24 hrs</span>
        </motion.div>
      </div>
    </section>
  );
}
