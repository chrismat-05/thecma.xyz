import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionTitleReveal } from "@/components/ui/SectionTitleReveal";
import { CursorGridBackground } from "@/components/backgrounds/CursorGridBackground";

interface ServiceItem {
  id: string;
  number: string;
  verticalTitle: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  image: string;
  accentGlow: string;
}

export const WhatWeCreateSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: "webgl",
      number: "01",
      verticalTitle: "3D & WEBGL PLATFORMS",
      category: "CORE PRODUCTION DISCIPLINE",
      title: "3D & WEBGL PLATFORMS",
      tagline: "Ultra-fluid WebGL shaders, Three.js physics kinetics, and immersive digital realms.",
      description:
        "High-performance interactive 3D web applications, particle simulations, dynamic camera choreography, and custom GLSL shader pipelines engineered at locked 60–120fps.",
      specs: [
        "THREE.JS & SHADERS",
        "GPU OPTIMIZATION",
        "PHYSICS ENGINES",
        "CINEMATIC CAMERA PATHS",
      ],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      accentGlow: "rgba(255, 255, 255, 0.4)",
    },
    {
      id: "fullstack",
      number: "02",
      verticalTitle: "FULL-STACK WEB APPS",
      category: "ENTERPRISE & PRODUCT SUITE",
      title: "FULL-STACK WEB APPS",
      tagline: "Scalable reactive applications with lightning-fast cloud backend synchronization.",
      description:
        "End-to-end web platforms built with React, Next.js, TypeScript, FastAPI, and Firebase/Supabase. Featuring robust authorization, realtime data streaming, and elegant micro-interactions.",
      specs: [
        "REACT & NEXT.JS",
        "TYPESCRIPT ARCHITECTURE",
        "REST & GRAPHQL",
        "SERVERLESS CLOUD",
      ],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      accentGlow: "rgba(255, 255, 255, 0.35)",
    },
    {
      id: "cybersecurity",
      number: "03",
      verticalTitle: "CYBERSECURITY & AUDITING",
      category: "THREAT TELEMETRY & HARDENING",
      title: "CYBERSECURITY & AUDITING",
      tagline: "Zero-knowledge encryption, attack-surface minimization, and protocol defense.",
      description:
        "Comprehensive web and network penetration testing, automated HTTP security header audits, credential entropy verification, and defensive policy architecture.",
      specs: [
        "PENETRATION TESTING",
        "HTTP SECURITY HEADERS",
        "ZERO-KNOWLEDGE AUTH",
        "VULNERABILITY ASSESSMENT",
      ],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      accentGlow: "rgba(255, 255, 255, 0.45)",
    },
    {
      id: "design-systems",
      number: "04",
      verticalTitle: "UI/UX & DESIGN SYSTEMS",
      category: "CREATIVE ENGINEERING",
      title: "UI/UX & DESIGN SYSTEMS",
      tagline: "Precision dark-mode design systems, typography hierarchy, and fluid UX patterns.",
      description:
        "Bespoke visual identities, Figma component tokens, accessible WCAG color scales, and motion choreography that turn complex digital products into intuitive works of art.",
      specs: [
        "ACCESSIBLE WCAG AAA",
        "COMPONENT ARCHITECTURE",
        "FIGMA TOKENS",
        "MICRO-INTERACTIONS",
      ],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
      accentGlow: "rgba(255, 255, 255, 0.35)",
    },
    {
      id: "creative-media",
      number: "05",
      verticalTitle: "CREATIVE DIRECTION & MEDIA",
      category: "VISUAL STORYTELLING",
      title: "CREATIVE DIRECTION & MEDIA",
      tagline: "Cinematic videography, sound design, and editorial brand aesthetics.",
      description:
        "Fusing technical software mastery with cinematic visual direction, video post-production, high-impact sound design, and narrative brand storytelling.",
      specs: [
        "CINEMATIC VIDEOGRAPHY",
        "SOUND DESIGN",
        "NARRATIVE PACING",
        "COLOR GRADING",
      ],
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80",
      accentGlow: "rgba(255, 255, 255, 0.4)",
    },
  ];

  // Default active bar is the 1st item (or whichever is hovered)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-black text-white">
      {/* Subtle interactive dot grid background */}
      <CursorGridBackground opacity={0.35} spacing={40} />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionTitleReveal
          title="WHAT WE CREATE"
          subtitle="An accordion of specialized creative and engineering disciplines. Hover over any bar to explore capabilities."
          align="left"
        />

        {/* Desktop Expanding Bars Accordion (>= 1024px) */}
        <div className="hidden lg:flex items-stretch gap-4 h-[580px] w-full mt-12">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.id}
                layout
                onMouseEnter={() => setActiveIndex(index)}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 32,
                }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer select-none transition-colors duration-300 ${isActive
                    ? "flex-[5] border-2 border-white/40 shadow-2xl shadow-white/[0.06] bg-[#0c0d12]"
                    : "flex-[0.8] border border-white/[0.1] bg-[#090a0d] hover:border-white/25 hover:bg-[#0e0f14]"
                  }`}
              >
                {/* Background image preview with darkened gradient overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${isActive
                        ? "opacity-30 scale-105"
                        : "opacity-15 grayscale scale-100"
                      }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                </div>

                {/* Subtle top inner glow rim when active */}
                {isActive && (
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10 pointer-events-none" />
                )}

                {/* INACTIVE STATE: Sleek Vertical Bar View */}
                {!isActive && (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-8 px-2">
                    <span className="font-mono text-xs text-neutral-500 font-bold">
                      // {service.number}
                    </span>

                    {/* Rotated Vertical Title */}
                    <div className="flex-1 flex items-center justify-center my-4">
                      <span
                        className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {service.verticalTitle}
                      </span>
                    </div>

                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  </div>
                )}

                {/* ACTIVE STATE: Expanded Full Showcase Card */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="relative z-10 w-full h-full p-8 sm:p-12 flex flex-col justify-between"
                  >
                    {/* Top Metadata */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-white/70 font-bold tracking-wider">
                            // {service.number}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                            • {service.category}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80">
                          <Sparkles size={14} />
                        </div>
                      </div>

                      {/* Headline Title */}
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-3 font-serif">
                        {service.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-neutral-300 text-sm sm:text-base font-medium mt-3 max-w-2xl leading-relaxed">
                        {service.tagline}
                      </p>

                      {/* In-depth description */}
                      <p className="text-neutral-400 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Deliverables Specs & CTA */}
                    <div className="space-y-6 pt-6 border-t border-white/[0.1]">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2.5">
                          KEY DELIVERABLES &amp; TECHNICAL SPECS:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.specs.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3 py-1.5 text-[11px] font-mono rounded-full bg-white/[0.05] border border-white/15 text-neutral-200 backdrop-blur-md"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Link
                          to="/projects"
                          className="btn-hero-primary !py-3 !px-6 text-xs font-bold inline-flex items-center gap-2"
                          data-cursor="button"
                          data-magnetic="true"
                        >
                          <span>EXPLORE CASE STUDIES</span>
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / Tablet Accordion (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-4 mt-8">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={service.id}
                onClick={() => setActiveIndex(index)}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isActive
                    ? "border-white/35 bg-[#0c0d12] p-6 shadow-xl"
                    : "border-white/10 bg-[#090a0d] p-5 hover:border-white/20"
                  }`}
              >
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-500 font-bold">
                      // {service.number}
                    </span>
                    <h4 className="text-lg font-bold text-white tracking-wide">
                      {service.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {isActive ? "▲" : "▼"}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 space-y-4"
                  >
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {service.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {service.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-white/[0.05] border border-white/10 text-neutral-300"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2">
                      <Link
                        to="/projects"
                        className="btn-hero-primary !py-2 !px-4 text-xs font-semibold inline-flex items-center gap-1.5"
                      >
                        Explore Case Studies <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeCreateSection;
