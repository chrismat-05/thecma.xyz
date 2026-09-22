import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SplitFlapText } from "@/components/ui/SplitFlapText";

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
  const [triggerCount, setTriggerCount] = useState<number>(0);

  // Trigger flap cycle on first appearance in view
  useEffect(() => {
    if (isInView) {
      setTriggerCount((prev) => prev + 1);
    }
  }, [isInView]);

  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

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

      {/* Main Split-Flap Mechanical Headline */}
      <HeadingTag className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.12] group/title cursor-default select-none uppercase">
        <SplitFlapText
          text={title}
          triggerKey={triggerCount}
          onHoverTrigger={true}
          className="group-hover/title:text-neutral-200 transition-colors"
        />
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

export default SectionTitleReveal;
