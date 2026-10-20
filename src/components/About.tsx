import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/ContactButton";
import { SplitFlapText } from "@/components/ui/SplitFlapText";

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const narrativeText =
    "I bridge rigorous cybersecurity engineering and full-stack development with cinematic UI/UX and 3D WebGL. I don't just write clean, resilient code—I engineer high-performance digital platforms and brand experiences that captivate users, solve complex problems, and drive real measurable impact.";

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[90vh] bg-[#0C0C0C] text-white flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:px-10 py-20 sm:py-32"
    >
      {/* Stealth Ambient Radial Glow in background (unifying with other sections) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[600px] h-[450px] rounded-full blur-[140px] opacity-25 bg-gradient-to-tr from-purple-800/40 via-blue-700/20 to-transparent" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center">

        {/* Massive font-display Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 sm:mb-12 md:mb-14"
        >
          <h2 className="font-display font-black uppercase leading-none tracking-tight text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] select-none text-white">
            <SplitFlapText text="ABOUT ME" onHoverTrigger={true} className="text-white hover:text-neutral-200 transition-colors" />
          </h2>
        </motion.div>

        {/* Kinetic Character-by-Character Scroll Reveal Narrative */}
        <div className="max-w-[720px] mx-auto mb-10 sm:mb-14 md:mb-16">
          <AnimatedText
            text={narrativeText}
            initialOpacity={0.12}
            className="text-[#D7E2EA] font-normal text-center leading-relaxed text-sm sm:text-xl md:text-2xl"
          />
        </div>

        {/* Bottom CTA Row: Cohesive Luxury ContactButton + Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 justify-center w-full sm:w-auto px-4 sm:px-0"
        >
          <ContactButton label="Contact Me" to="contact" />

          <Link
            to="/about"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-white/60 text-[#D7E2EA] hover:text-white px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-white/[0.05]"
            data-cursor="button"
          >
            <span>Read more About Me</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
