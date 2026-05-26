"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Download,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  Calendar,
  BarChart2,
} from "lucide-react";

// --- DATA ---
const projects = [
  {
    id: 1,
    name: "Brand Identity Refresh",
    status: "In Progress",
    progress: 68,
    due: "Dec 15, 2024",
    phase: "Design Phase",
    color: "#9B6DFF",
  },
  {
    id: 2,
    name: "Website Redesign v2.0",
    status: "Review",
    progress: 92,
    due: "Nov 28, 2024",
    phase: "Final Review",
    color: "#4F8EF7",
  },
  {
    id: 3,
    name: "Social Media Kit",
    status: "Completed",
    progress: 100,
    due: "Nov 10, 2024",
    phase: "Delivered",
    color: "#0CF2F2",
  },
];

const milestones = [
  { label: "Discovery & Strategy", done: true },
  { label: "Wireframes & Concept", done: true },
  { label: "Visual Design", done: true },
  { label: "Development", done: false, active: true },
  { label: "QA & Testing", done: false },
  { label: "Launch", done: false },
];

const tasks = [
  { id: 1, task: "Review homepage mockup", priority: "High", due: "Today", done: false },
  { id: 2, task: "Approve color palette v3", priority: "Medium", due: "Tomorrow", done: false },
  { id: 3, task: "Send logo files", priority: "Low", due: "Dec 5", done: true },
  { id: 4, task: "Content delivery for About page", priority: "High", due: "Dec 8", done: false },
  { id: 5, task: "Social media assets review", priority: "Medium", due: "Dec 10", done: true },
];

const messages = [
  { from: "Alex (Design Lead)", msg: "The new logo concept is ready for review!", time: "2h ago", unread: true },
  { from: "VRTX Team", msg: "Project milestone completed: Visual Design Phase", time: "Yesterday", unread: false },
  { from: "Priya (Dev)", msg: "Web development started. ETA: 12 days.", time: "2d ago", unread: false },
];

const files = [
  { name: "Brand_Identity_v3.pdf", size: "8.2 MB", date: "Nov 20", type: "PDF" },
  { name: "Logo_Files_Final.zip", size: "24.1 MB", date: "Nov 18", type: "ZIP" },
  { name: "Website_Wireframes.fig", size: "12.4 MB", date: "Nov 15", type: "FIG" },
  { name: "Color_Palette.ase", size: "0.8 MB", date: "Nov 10", type: "ASE" },
];

const invoices = [
  { id: "INV-001", desc: "Brand Identity Package", amount: "₹2,50,000", status: "Paid", date: "Oct 15" },
  { id: "INV-002", desc: "Website Design Phase", amount: "₹1,80,000", status: "Paid", date: "Nov 01" },
  { id: "INV-003", desc: "Development Milestone", amount: "₹2,20,000", status: "Due", date: "Dec 01" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: MessageSquare, label: "Messages", id: "messages", badge: 1 },
  { icon: FileText, label: "Files", id: "files" },
  { icon: CreditCard, label: "Invoices", id: "invoices" },
  { icon: Settings, label: "Settings", id: "settings" },
];

// --- COMPONENTS ---
function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="progress-bar mt-2">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  delta,
}: {
  label: string;
  value: string;
  icon: any;
  color: string;
  delta: string;
}) {
  return (
    <div className="dashboard-card">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}20` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <span
          className="text-xs font-mono px-2 py-1 rounded-full"
          style={{ background: `${color}12`, color }}
        >
          {delta}
        </span>
      </div>
      <div className="font-display font-bold text-2xl text-white mb-1">{value}</div>
      <div className="text-white/40 text-xs tracking-wider uppercase">{label}</div>
    </div>
  );
}

// --- VIEWS ---
function OverviewView() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Projects" value="3" icon={FolderOpen} color="#9B6DFF" delta="+1" />
        <StatCard label="Tasks Pending" value="8" icon={Zap} color="#4F8EF7" delta="-2" />
        <StatCard label="Messages" value="12" icon={MessageSquare} color="#0CF2F2" delta="New" />
        <StatCard label="Completion" value="87%" icon={TrendingUp} color="#FFB347" delta="+5%" />
      </div>

      {/* Active project */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display font-bold text-lg text-white">Active Projects</h3>
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-display font-semibold text-white mb-1">{p.name}</h4>
                  <span className="text-xs text-white/40 font-mono">{p.phase}</span>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full font-mono"
                  style={{
                    background:
                      p.status === "Completed"
                        ? "rgba(12,242,242,0.1)"
                        : p.status === "Review"
                        ? "rgba(255,179,71,0.1)"
                        : "rgba(155,109,255,0.1)",
                    color:
                      p.status === "Completed"
                        ? "#0CF2F2"
                        : p.status === "Review"
                        ? "#FFB347"
                        : "#9B6DFF",
                    border: `1px solid ${
                      p.status === "Completed"
                        ? "rgba(12,242,242,0.2)"
                        : p.status === "Review"
                        ? "rgba(255,179,71,0.2)"
                        : "rgba(155,109,255,0.2)"
                    }`,
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                <span>{p.progress}% complete</span>
                <span>Due {p.due}</span>
              </div>
              <ProgressBar value={p.progress} color={p.color} />
            </motion.div>
          ))}
        </div>

        {/* Milestones */}
        <div className="dashboard-card">
          <h3 className="font-display font-bold text-base text-white mb-6">Project Timeline</h3>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: m.done
                      ? "rgba(12,242,242,0.15)"
                      : m.active
                      ? "rgba(155,109,255,0.15)"
                      : "rgba(255,255,255,0.04)",
                    border: m.done
                      ? "1px solid rgba(12,242,242,0.3)"
                      : m.active
                      ? "1px solid rgba(155,109,255,0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {m.done ? (
                    <CheckCircle2 size={12} className="text-cyan-400" />
                  ) : m.active ? (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-purple-400"
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/15" />
                  )}
                </div>
                <span
                  className="text-sm"
                  style={{
                    color: m.done
                      ? "rgba(255,255,255,0.6)"
                      : m.active
                      ? "white"
                      : "rgba(255,255,255,0.25)",
                    fontWeight: m.active ? 600 : 400,
                  }}
                >
                  {m.label}
                </span>
                {m.active && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full ml-auto"
                    style={{
                      background: "rgba(155,109,255,0.15)",
                      color: "#9B6DFF",
                      border: "1px solid rgba(155,109,255,0.25)",
                    }}
                  >
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-base text-white">Upcoming Tasks</h3>
          <span className="text-xs text-white/30 font-mono">
            {tasks.filter((t) => !t.done).length} pending
          </span>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 p-3 rounded-xl transition-all"
              style={{
                background: "rgba(255,255,255,0.02)",
                opacity: task.done ? 0.4 : 1,
              }}
            >
              <div
                className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: task.done ? "rgba(12,242,242,0.4)" : "rgba(255,255,255,0.15)",
                  background: task.done ? "rgba(12,242,242,0.1)" : "transparent",
                }}
              >
                {task.done && <CheckCircle2 size={12} className="text-cyan-400" />}
              </div>
              <span
                className="flex-1 text-sm"
                style={{
                  color: task.done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)",
                  textDecoration: task.done ? "line-through" : "none",
                }}
              >
                {task.task}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono"
                style={{
                  color:
                    task.priority === "High"
                      ? "#FF6B9D"
                      : task.priority === "Medium"
                      ? "#FFB347"
                      : "rgba(255,255,255,0.3)",
                  background:
                    task.priority === "High"
                      ? "rgba(255,107,157,0.1)"
                      : task.priority === "Medium"
                      ? "rgba(255,179,71,0.1)"
                      : "rgba(255,255,255,0.04)",
                }}
              >
                {task.priority}
              </span>
              <span className="text-xs text-white/25 font-mono w-16 text-right">{task.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessagesView() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full">
      {/* Thread list */}
      <div className="dashboard-card">
        <h3 className="font-display font-bold text-base text-white mb-5">Messages</h3>
        <div className="space-y-2">
          {messages.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="w-full text-left p-3 rounded-xl transition-all"
              style={{
                background: selected === i ? "rgba(155,109,255,0.08)" : "rgba(255,255,255,0.02)",
                border: selected === i ? "1px solid rgba(155,109,255,0.2)" : "1px solid transparent",
              }}
              data-cursor-hover
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white">{m.from}</span>
                {m.unread && <span className="w-2 h-2 rounded-full bg-purple-400" />}
              </div>
              <p className="text-xs text-white/40 truncate">{m.msg}</p>
              <span className="text-xs text-white/20 font-mono mt-1 block">{m.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message body */}
      <div className="lg:col-span-2 dashboard-card flex flex-col">
        <div className="border-b border-white/5 pb-4 mb-6">
          <h4 className="font-display font-semibold text-white">{messages[selected].from}</h4>
          <span className="text-xs text-white/30 font-mono">{messages[selected].time}</span>
        </div>
        <div className="flex-1">
          <div
            className="p-4 rounded-xl text-sm text-white/70 leading-relaxed"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {messages[selected].msg}
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Type a reply..."
            className="flex-1 px-4 py-3 rounded-xl text-white placeholder-white/20 text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <button className="btn-primary py-3 px-5" data-cursor-hover>
            <span className="relative z-10">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FilesView() {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-base text-white">Shared Files</h3>
        <button className="btn-outline py-2 px-5 text-sm flex items-center gap-2" data-cursor-hover>
          <Upload size={14} /> Upload
        </button>
      </div>
      <div className="space-y-3">
        {files.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/[0.03]"
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
              style={{
                background: "rgba(155,109,255,0.1)",
                border: "1px solid rgba(155,109,255,0.2)",
                color: "#9B6DFF",
              }}
            >
              {f.type}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{f.name}</p>
              <p className="text-xs text-white/30 font-mono">{f.size} · {f.date}</p>
            </div>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
              data-cursor-hover
            >
              <Download size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvoicesView() {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-base text-white">Invoices & Payments</h3>
        <span
          className="text-xs px-3 py-1.5 rounded-full font-mono"
          style={{ background: "rgba(12,242,242,0.08)", color: "#0CF2F2", border: "1px solid rgba(12,242,242,0.15)" }}
        >
          ₹6,50,000 paid
        </span>
      </div>
      <div className="space-y-3">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono text-white/30">{inv.id}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{
                    background: inv.status === "Paid" ? "rgba(12,242,242,0.1)" : "rgba(255,179,71,0.1)",
                    color: inv.status === "Paid" ? "#0CF2F2" : "#FFB347",
                  }}
                >
                  {inv.status}
                </span>
              </div>
              <p className="text-sm text-white/80">{inv.desc}</p>
              <p className="text-xs text-white/30 font-mono">{inv.date}</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-white">{inv.amount}</p>
              <button className="text-xs text-white/30 hover:text-white transition-colors mt-1" data-cursor-hover>
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN DASHBOARD ---
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeNav) {
      case "overview": return <OverviewView />;
      case "messages": return <MessagesView />;
      case "files": return <FilesView />;
      case "invoices": return <InvoicesView />;
      default: return (
        <div className="dashboard-card text-center py-20">
          <p className="text-white/30">Section coming soon</p>
        </div>
      );
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#050507" }}
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-64 flex-shrink-0 border-r border-white/[0.05] flex flex-col"
        style={{ background: "rgba(255,255,255,0.01)" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3" data-cursor-hover>
            <div className="w-8 h-8 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg rotate-12" />
              <div className="absolute inset-0.5 bg-[#050507] rounded-md rotate-12" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-black text-xs text-white">V</span>
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white">VRTX Studio</span>
              <span className="block text-xs text-white/30">Client Portal</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group"
                style={{
                  background: active ? "rgba(155,109,255,0.1)" : "transparent",
                  color: active ? "white" : "rgba(255,255,255,0.35)",
                  border: active ? "1px solid rgba(155,109,255,0.2)" : "1px solid transparent",
                }}
                data-cursor-hover
              >
                <Icon size={17} />
                {item.label}
                {item.badge && (
                  <span
                    className="ml-auto text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "#9B6DFF", color: "white" }}
                  >
                    {item.badge}
                  </span>
                )}
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                    style={{ background: "linear-gradient(180deg, #9B6DFF, #4F8EF7)" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #9B6DFF, #4F8EF7)", color: "white" }}
            >
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">John Doe</p>
              <p className="text-xs text-white/30 truncate">Premium Client</p>
            </div>
            <Link href="/" data-cursor-hover>
              <LogOut size={15} className="text-white/20 hover:text-white/60 transition-colors" />
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className="flex items-center justify-between px-8 py-5 border-b border-white/[0.05]"
          style={{ background: "rgba(255,255,255,0.01)" }}
        >
          <div>
            <h1 className="font-display font-bold text-lg text-white capitalize">
              {activeNav === "overview" ? "Project Overview" : activeNav}
            </h1>
            <p className="text-xs text-white/30 mt-0.5">
              Welcome back, John — Here's your project status
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Search size={14} className="text-white/30" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-white placeholder-white/20 text-sm w-32"
              />
            </div>
            {/* Notifications */}
            <button
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              data-cursor-hover
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-400" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
