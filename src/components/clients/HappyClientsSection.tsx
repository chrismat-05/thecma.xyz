import React from "react";
import { motion } from "framer-motion";
import { SplitFlapText } from "@/components/ui/SplitFlapText";

export const HappyClientsSection: React.FC = () => {
  const metrics = [
    { label: "Products Shipped", value: "15+" },
    { label: "Client Satisfaction", value: "99.8%" },
    { label: "Security Vulnerabilities", value: "0 Unpatched" },
    { label: "Performance Score", value: "98/100" },
  ];

  const lane1 = [
    { name: "Vercel", category: "Edge Cloud", symbol: "▲" },
    { name: "FastAPI", category: "Microservices", symbol: "⚡" },
    { name: "Firebase", category: "Realtime Data", symbol: "🔥" },
    { name: "React", category: "Client Framework", symbol: "⚛" },
    { name: "Tailwind CSS", category: "Design System", symbol: "≋" },
    { name: "Python", category: "Security & AI", symbol: "🐍" },
    { name: "Docker", category: "Containerization", symbol: "🐳" },
    { name: "Three.js", category: "WebGL 3D", symbol: "◈" },
  ];

  const lane2 = [
    { name: "HackerRank", category: "Problem Solving", symbol: "★" },
    { name: "MongoDB Atlas", category: "Encrypted Storage", symbol: "🍃" },
    { name: "Supabase", category: "Postgres Cloud", symbol: "⚡" },
    { name: "TypeScript", category: "Type Integrity", symbol: "TS" },
    { name: "Framer Motion", category: "Physics Kinetics", symbol: "✦" },
    { name: "Nasscom", category: "Engineering Guild", symbol: "🛡" },
    { name: "Node.js", category: "Runtime Engine", symbol: "⬡" },
    { name: "GitHub", category: "Open Source", symbol: "⌘" },
  ];

  // Duplicated arrays to guarantee zero-jitter seamless wrapping
  const doubleLane1 = [...lane1, ...lane1, ...lane1];
  const doubleLane2 = [...lane2, ...lane2, ...lane2];

  return (
    <section className="py-24 relative overflow-hidden bg-neutral-950/60 border-y border-white/[0.06]">
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-neutral-400 mb-4 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              // Trusted By Innovators Worldwide
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              <SplitFlapText
                text="Engineering with standard-defining technologies."
                onHoverTrigger={true}
              />
            </h3>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-8">
            {metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold font-mono text-white">
                  {m.value}
                </span>
                <span className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Track with edge gradient masks */}
      <div
        className="relative w-full overflow-hidden flex flex-col gap-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Lane 1: Left to right scroll */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {doubleLane1.map((item, index) => (
            <div
              key={`lane1-${index}`}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-neutral-900/50 border border-white/[0.07] backdrop-blur-sm grayscale opacity-45 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:border-white/30 transition-all duration-300 cursor-default select-none"
            >
              <span className="text-lg font-mono text-white/80">{item.symbol}</span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-wide">{item.name}</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Lane 2: Right to left scroll */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {doubleLane2.map((item, index) => (
            <div
              key={`lane2-${index}`}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-neutral-900/50 border border-white/[0.07] backdrop-blur-sm grayscale opacity-45 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:border-white/30 transition-all duration-300 cursor-default select-none"
            >
              <span className="text-lg font-mono text-white/80">{item.symbol}</span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-wide">{item.name}</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
