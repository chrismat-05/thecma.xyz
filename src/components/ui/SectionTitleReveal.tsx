import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionTitleRevealProps {
  title: string;
  subtitle?: string;
  tag?: "h1" | "h2" | "h3";
  align?: "left" | "center" | "right";
  badge?: string;
  className?: string;
}

export const SectionTitleReveal: React.FC<SectionTitleRevealProps> = ({
  title,
  subtitle,
  tag = "h2",
  align = "center",
  badge,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = title.split(" ");

  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "120%",
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const HeadingTag = tag;

  return (
    <div ref={ref} className={`flex flex-col mb-16 ${alignClass} ${className}`}>
      {/* Animated accent pill tag with pulsating indicator dot */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-medium">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Main Kinetic Headline */}
      <HeadingTag className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white perspective-[1000px] leading-[1.15]">
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-flex flex-wrap gap-x-3 gap-y-1"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </HeadingTag>

      {/* Subtitle with soft fade-in */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-base md:text-lg max-w-2xl mt-5 font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
