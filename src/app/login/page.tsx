"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#050507" }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 animated-grid opacity-30 pointer-events-none" />

      {/* Gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "15%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(155,109,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          right: "15%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(79,142,247,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back home */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm"
            data-cursor-hover
          >
            ← Back to VRTX Studio
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl rotate-12" />
            <div className="absolute inset-0.5 bg-[#050507] rounded-lg rotate-12" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-black text-sm text-white">V</span>
            </div>
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              VRTX Studio
            </span>
            <span className="block text-xs text-white/30 tracking-widest">
              Client Portal
            </span>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-3xl p-8 border border-white/5"
        >
          {/* Tab toggle */}
          <div className="flex rounded-xl overflow-hidden mb-8 p-1" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 text-sm font-display font-semibold rounded-lg transition-all duration-300"
                style={{
                  background: tab === t ? "linear-gradient(135deg, #9B6DFF, #4F8EF7)" : "transparent",
                  color: tab === t ? "white" : "rgba(255,255,255,0.3)",
                  boxShadow: tab === t ? "0 4px 20px rgba(155,109,255,0.3)" : "none",
                }}
                data-cursor-hover
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <h2 className="font-display font-bold text-2xl text-white mb-2">
            {tab === "login" ? "Welcome back" : "Join the portal"}
          </h2>
          <p className="text-white/40 text-sm mb-8">
            {tab === "login"
              ? "Sign in to access your project dashboard."
              : "Create your client account to get started."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {tab === "signup" && (
              <div>
                <label className="text-xs text-white/40 tracking-widest uppercase mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
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
            )}

            <div>
              <label className="text-xs text-white/40 tracking-widest uppercase mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-5 py-4 rounded-xl text-white placeholder-white/20 text-sm outline-none"
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

            <div>
              <label className="text-xs text-white/40 tracking-widest uppercase mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-4 rounded-xl text-white placeholder-white/20 text-sm outline-none"
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                  data-cursor-hover
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {tab === "login" && (
              <div className="text-right">
                <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors" data-cursor-hover>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full mt-2"
              data-cursor-hover
              disabled={loading}
            >
              {loading ? (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Authenticating...
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {tab === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div
            className="mt-6 p-4 rounded-xl text-xs text-center"
            style={{
              background: "rgba(79,142,247,0.06)",
              border: "1px solid rgba(79,142,247,0.12)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            <span className="text-blue-400">Demo:</span> Use any email &
            password — or just click Sign In to preview the dashboard.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
