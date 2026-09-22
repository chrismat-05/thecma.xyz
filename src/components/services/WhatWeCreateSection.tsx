import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Sparkles, Smartphone, Cpu, ShieldCheck, Terminal, Palette, ArrowRight } from "lucide-react";
import { SectionTitleReveal } from "@/components/ui/SectionTitleReveal";
import { CursorGridBackground } from "@/components/backgrounds/CursorGridBackground";

export const WhatWeCreateSection: React.FC = () => {
  // Mini interactive state for Card 2 (Color Palette Generator)
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(0);
  const palettes = [
    ["#FFFFFF", "#737373", "#171717", "#0A0A0A"],
    ["#E2E8F0", "#64748B", "#1E293B", "#0F172A"],
    ["#F4F4F5", "#A1A1AA", "#27272A", "#18181B"],
    ["#D4D4D8", "#71717A", "#3F3F46", "#09090B"],
  ];

  // Mini interactive state for Card 3 (AI Response Terminal)
  const [promptInput, setPromptInput] = useState("Generate security audit report...");
  const [isTyping, setIsTyping] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("Status: [Audit Clean] - 0 Vulnerabilities found across 24 endpoints.");

  const runTerminalDemo = () => {
    setIsTyping(true);
    setTerminalOutput("Analyzing codebase...");
    setTimeout(() => {
      setTerminalOutput("Audit complete: Encryption AES-256-GCM enforced. Memory safe.");
      setIsTyping(false);
    }, 1200);
  };

  // Radial spotlight mouse coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-black text-white">
      {/* Subtle interactive dot grid background scoped exclusively to this section */}
      <CursorGridBackground opacity={0.5} spacing={40} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <SectionTitleReveal
          badge="// CAPABILITIES & SERVICES"
          title="What We Engineer & Design."
          subtitle="A multidisciplinary creative agency combining precision engineering, digital platform architecture, and cybersecurity."
          align="left"
        />

        {/* 4-column asymmetrical bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {/* Card 1: Flagship Service - 3D & Digital Platforms (Spans 2 cols, 2 rows) */}
          <div
            onMouseMove={handleMouseMove}
            className="lg:col-span-2 lg:row-span-2 rounded-3xl p-8 bg-[#0e0e11] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all duration-300"
            style={{
              backgroundImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.06), transparent 70%)`,
            }}
          >
            {/* Top info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <Sparkles size={24} />
                </div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                  Flagship
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                3D & Digital Platforms
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-md leading-relaxed">
                Immersive WebGL environments, dynamic physics mechanics, and full-stack cloud web apps built with 60fps performance and buttery kinetic motion.
              </p>
            </div>

            {/* Interactive 3D Sphere / Wireframe Orbit Simulation */}
            <div className="my-6 w-full h-44 rounded-2xl bg-neutral-950/70 border border-white/[0.06] flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-all">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/20 border-dashed"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-white/40"
                  animate={{ rotateX: [0, 180, 360], rotateY: [0, 180, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-white to-neutral-500 shadow-xl shadow-white/20"
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-[10px] text-neutral-500">
                // Real-time Canvas Mesh
              </div>
            </div>

            {/* Bottom pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["WebGL / Three.js", "React & Next.js", "Framer Physics", "High-Load Architecture"].map((s, i) => (
                <span
                  key={i}
                  className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Brand Identity & Systems (Spans 2 cols, 1 row) */}
          <div
            className="lg:col-span-2 lg:row-span-1 rounded-3xl p-8 bg-[#0e0e11] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-3">
                  <Palette size={20} />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Design Systems & UI Engineering
                </h4>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-sm">
                  Tailored design systems, accessible color spaces, and micro-component hierarchies.
                </p>
              </div>

              {/* Interactive Color Palette Switcher */}
              <button
                onClick={() =>
                  setCurrentPaletteIndex((prev) => (prev + 1) % palettes.length)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-neutral-200 transition-colors"
                data-cursor="button"
              >
                <span>Cycle</span>
                <div className="flex gap-1">
                  {palettes[currentPaletteIndex].map((c, idx) => (
                    <span
                      key={idx}
                      className="w-2.5 h-2.5 rounded-full border border-white/20"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <span className="font-mono text-xs text-neutral-500">
                WCAG AAA Compliant • Precision Typography
              </span>
              <span className="text-xs font-medium text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Learn more <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Card 3: AI & Security Integrations (1 col, 1 row) */}
          <div
            className="lg:col-span-1 lg:row-span-1 rounded-3xl p-6 bg-[#0e0e11] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-3">
                <Terminal size={20} />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                AI & Cyber Telemetry
              </h4>
              <p className="text-neutral-400 text-xs mt-1">
                Zero-knowledge encryption, LLM legal policy scanning, and security auditing.
              </p>
            </div>

            {/* Mini Terminal Demo */}
            <div
              onClick={runTerminalDemo}
              className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-[10px] text-neutral-300 cursor-pointer hover:border-white/30 transition-colors"
              title="Click to run interactive test"
            >
              <div className="text-neutral-500 mb-1">$ {promptInput}</div>
              <div className={isTyping ? "text-amber-400 animate-pulse" : "text-emerald-400"}>
                &gt; {terminalOutput}
              </div>
            </div>
          </div>

          {/* Card 4: Mobile & Web Applications (1 col, 1 row) */}
          <div
            className="lg:col-span-1 lg:row-span-1 rounded-3xl p-6 bg-[#0e0e11] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-3">
                <Smartphone size={20} />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                Responsive Applications
              </h4>
              <p className="text-neutral-400 text-xs mt-1">
                Fluid cross-device experiences engineered for high conversion and gesture responsiveness.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-neutral-400">iOS • Android • Desktop</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeCreateSection;
