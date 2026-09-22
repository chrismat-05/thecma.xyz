import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/ContactButton";
import { SplitFlapText } from "@/components/ui/SplitFlapText";

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Four decorative 3D assets from Jack 3D Creator specification
  const decorative3D = [
    {
      id: "moon",
      url: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
      alt: "3D Moon Icon",
      className: "w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]",
      initial: { opacity: 0, x: -80, y: 0 },
      delay: 0.1,
    },
    {
      id: "object",
      url: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
      alt: "3D Geometric Cylinder",
      className: "w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]",
      initial: { opacity: 0, x: -80, y: 0 },
      delay: 0.25,
    },
    {
      id: "lego",
      url: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
      alt: "3D Lego Piece",
      className: "w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]",
      initial: { opacity: 0, x: 80, y: 0 },
      delay: 0.15,
    },
    {
      id: "group",
      url: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
      alt: "3D Torus Group",
      className: "w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]",
      initial: { opacity: 0, x: 80, y: 0 },
      delay: 0.3,
    },
  ];

  const narrativeText =
    "With more than five years of experience in cybersecurity and digital design, I bridge technical resilience with high-impact creative engineering. Driven by zero-knowledge mechanics, interactive systems, and cinematic design to help modern brands stand out. Let's build something unforgettable together!";

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-[#0C0C0C] text-white flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-24 sm:py-32"
    >
      {/* 4 Floating Decorative 3D Corner Artifacts with Entry Physics */}
      {decorative3D.map((item) => (
        <motion.div
          key={item.id}
          initial={item.initial}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: item.delay, ease: [0.25, 0.1, 0.25, 1] }}
          className={`absolute pointer-events-none select-none z-10 ${item.className}`}
        >
          <img
            src={item.url}
            alt={item.alt}
            className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            loading="lazy"
          />
        </motion.div>
      ))}

      <div className="container mx-auto max-w-4xl relative z-20 flex flex-col items-center text-center">
        {/* Massive Jack-style Centered Gradient Heading with SplitFlapText on hover */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 block mb-4">
            // NARRATIVE &amp; ETHOS
          </span>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[140px] select-none">
            <SplitFlapText text="ABOUT ME" onHoverTrigger={true} className="hero-heading" />
          </h2>
        </motion.div>

        {/* Jack-style Character-by-Character Scroll Opacity Reveal Paragraph */}
        <div className="max-w-[620px] mx-auto mb-14 sm:mb-16 md:mb-20">
          <AnimatedText
            text={narrativeText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed text-base sm:text-xl md:text-2xl"
          />
        </div>

        {/* Bottom CTA Row: Jack Signature ContactButton + View Full Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-5 justify-center"
        >
          <ContactButton label="Contact Me" to="contact" />

          <Link
            to="/about"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/40 hover:border-[#D7E2EA] text-[#D7E2EA] hover:text-white px-7 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-white/[0.05]"
            data-cursor="button"
          >
            <span>Full Background &amp; Certs</span>
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
