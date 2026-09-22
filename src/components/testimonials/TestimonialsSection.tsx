import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote, ExternalLink, CheckCircle } from "lucide-react";
import testimonialsData from "@/content/testimonials.json";
import { SectionTitleReveal } from "@/components/ui/SectionTitleReveal";
import { ChromaGrid } from "@/components/backgrounds/ChromaGrid";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  handle: string;
  website: string;
  avatar: string;
  rating: number;
  verified: boolean;
  partnership: string;
  quote: string;
  chromaColor: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials = testimonialsData as Testimonial[];

  // Split into Top Row (4 cards) and Bottom Row (4 cards)
  const topRow = testimonials.slice(0, 4);
  const bottomRow = testimonials.slice(4, 8);

  // Duplicate for seamless, jitter-free infinite loop
  const doubleTopRow = [...topRow, ...topRow, ...topRow];
  const doubleBottomRow = [...bottomRow, ...bottomRow, ...bottomRow];

  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="testimonials"
      className="py-32 relative overflow-hidden bg-black text-white"
    >
      {/* 1. ReactBits ChromaGrid with cursor chromatic glow & grid lines (feathered at edges to blend seamlessly) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <ChromaGrid gridSize={42} radius={320} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 mb-14">
        <SectionTitleReveal
          badge="// CLIENT VOICES"
          title="TESTIMONIALS"
          subtitle="Real-world feedback from founders, production leads, and enterprise architecture partners."
          align="left"
        />
      </div>

      {/* 2. Dual-Lane Smooth Rolling Marquees with edge feather masks */}
      <div
        className="relative w-full overflow-hidden flex flex-col gap-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Row 1: Rolling Left */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {doubleTopRow.map((t, index) => (
            <TestimonialCard key={`top-${t.id}-${index}`} item={t} />
          ))}
        </motion.div>

        {/* Row 2: Rolling Right (Opposite Direction) */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 42,
            repeat: Infinity,
          }}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {doubleBottomRow.map((t, index) => (
            <TestimonialCard key={`bottom-${t.id}-${index}`} item={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[340px] sm:w-[380px] h-[270px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/[0.08] bg-[#0c0d12] backdrop-blur-xl transition-all duration-500 overflow-hidden cursor-pointer select-none group"
      style={{
        boxShadow: isHovered
          ? `0 20px 40px -15px ${item.chromaColor}`
          : "0 10px 30px -10px rgba(0,0,0,0.8)",
      }}
      data-cursor="button"
    >
      {/* Dynamic colorful radial glow highlight matching TristanMedia on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${item.chromaColor}, transparent 75%)`,
        }}
      />

      {/* Top subtle hairline rim */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 group-hover:via-white/50 to-transparent transition-all" />

      {/* Card Content Top */}
      <div className="relative z-10">
        {/* Header tags: Partnership Tag + Quote icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-white animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-medium">
              {item.partnership}
            </span>
          </div>
          <Quote
            size={16}
            className="text-neutral-600 group-hover:text-white/60 transition-colors"
          />
        </div>

        {/* Quote text */}
        <p className="text-xs sm:text-sm text-neutral-200 font-normal leading-relaxed line-clamp-4">
          "{item.quote}"
        </p>
      </div>

      {/* Card Content Bottom: Client Info */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-xs text-white">
                {item.name}
              </span>
              {item.verified && (
                <CheckCircle size={12} className="text-white/80 fill-white/20" />
              )}
            </div>
            <p className="text-[10px] text-neutral-400">
              {item.role} • {item.company}
            </p>
          </div>
        </div>

        {/* Handle / link */}
        <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-500 group-hover:text-white transition-colors">
          <span>{item.handle}</span>
          <ExternalLink size={10} className="shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
