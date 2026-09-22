import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Phone, MessageSquareMore, Handshake, ArrowDown } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { LanyardHeroScene } from "@/components/hero/LanyardHeroScene";
import { LightRays } from "@/components/backgrounds/LightRays";
import { WarpText } from "@/components/ui/WarpText";
import { Magnet } from "@/components/ui/Magnet";
import { ContactButton } from "@/components/ui/ContactButton";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking across the 250vh Hero & Lanyard sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Initial State (Progress 0.0 -> 0.45):
  // You see ONLY the lanyard card hanging with ReactBits light rays casting from top center down to it.
  // Introductory prompt invites the user to scroll to zoom in.
  const lanyardIntroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 0.8, 0]);

  // 2. Zoom in progression (Progress 0.0 -> 0.7):
  // As user scrolls down, lanyard zooms in towards camera
  const [zoomProgress, setZoomProgress] = React.useState(0);
  React.useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Map 0 to 0.7 scroll into 0 to 1 zoom
      const val = Math.min(Math.max(latest / 0.65, 0), 1);
      setZoomProgress(val);
    });
  }, [scrollYProgress]);

  // 3. Lanyard fades away as it completes zoom into the hero reveal (Progress 0.55 -> 0.85)
  const lanyardSceneOpacity = useTransform(scrollYProgress, [0, 0.55, 0.8], [1, 1, 0]);
  const lanyardScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.8]);

  // 4. Hero Content Section emerges as the lanyard zooms past into the screen (Progress 0.5 -> 0.85)
  const heroContentOpacity = useTransform(scrollYProgress, [0.45, 0.7, 1], [0, 0.85, 1]);
  const heroContentY = useTransform(scrollYProgress, [0.45, 0.75], [80, 0]);
  const heroContentScale = useTransform(scrollYProgress, [0.45, 0.75], [0.92, 1]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/chrismat-05", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/chrismaje/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:chrismaje63@gmail.com", label: "Email" },
    { icon: MessageSquareMore, href: "https://wa.me/+918848914245", label: "WhatsApp" },
    { icon: Phone, href: "tel:+918848914245", label: "Call" },
    { icon: Handshake, href: "https://www.fiverr.com/s/zWgryod", label: "Fiverr" },
  ];

  return (
    <div
      ref={containerRef}
      id="hero-track"
      className="relative h-[240vh] w-full bg-black text-white"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* ReactBits Light Rays coming from TOP CENTER downwards towards the lanyard - only active while lanyard is visible */}
        <motion.div
          style={{ opacity: lanyardSceneOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <LightRays className="opacity-90" />
        </motion.div>

        {/* 3D Lanyard Scene with Interactive Physics & Zoom */}
        <motion.div
          style={{ opacity: lanyardSceneOpacity, scale: lanyardScale }}
          className="absolute inset-0 z-10 pointer-events-auto"
        >
          <LanyardHeroScene scrollProgress={zoomProgress} />
        </motion.div>

        {/* Phase 1 Overlay: Intro Prompt when opening website */}
        <motion.div
          style={{ opacity: lanyardIntroOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none text-center"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/15 bg-black/70 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-neutral-300">
            Scroll to zoom in &amp; enter
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/70"
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>

        {/* Phase 2: Revealed Hero Content Section (Jack 3D Creator Style) */}
        <motion.div
          style={{
            opacity: heroContentOpacity,
            y: heroContentY,
            scale: heroContentScale,
          }}
          className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between px-6 md:px-10 py-6 md:py-8 pointer-events-auto"
        >
          {/* Top Navbar Row */}
          <nav aria-label="Hero Navigation" className="w-full flex items-center justify-between text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.15rem] pt-2 relative z-30">
            <ScrollLink
              to="about"
              smooth={true}
              offset={-70}
              duration={600}
              className="cursor-pointer hover:text-white transition-colors duration-200 py-2 px-1"
              data-cursor="button"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="projects"
              smooth={true}
              offset={-70}
              duration={600}
              className="cursor-pointer hover:text-white transition-colors duration-200 py-2 px-1"
              data-cursor="button"
            >
              Projects
            </ScrollLink>
            <ScrollLink
              to="services"
              smooth={true}
              offset={-70}
              duration={600}
              className="cursor-pointer hover:text-white transition-colors duration-200 py-2 px-1"
              data-cursor="button"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              offset={-70}
              duration={600}
              className="cursor-pointer hover:text-white transition-colors duration-200 py-2 px-1"
              data-cursor="button"
            >
              Contact
            </ScrollLink>
          </nav>

          {/* Center Area: Massive Hero Heading + Elegantly Integrated Magnetic Portrait */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
            {/* Massive Hero Heading with crisp high-contrast silver gradient */}
            <div className="w-full text-center overflow-hidden relative z-20 pointer-events-auto">
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[12.5vw] sm:text-[13.5vw] md:text-[14vw] lg:text-[14.5vw] select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                <WarpText
                  text="HI, I'M CHRIS"
                  as="span"
                  intensity={1.1}
                  radius={220}
                  className="hero-heading"
                />
              </h1>
            </div>

            {/* Centered Magnetic Portrait: Scaled and framed with a luxury arch silhouette behind the bottom of the letters */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 pointer-events-auto">
              <Magnet padding={120} strength={3}>
                <div className="relative w-[160px] sm:w-[210px] md:w-[260px] lg:w-[290px] h-[220px] sm:h-[280px] md:h-[330px] lg:h-[370px] rounded-t-[100px] sm:rounded-t-[140px] md:rounded-t-[160px] overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 via-neutral-900/60 to-black shadow-[0_20px_50px_rgba(0,0,0,0.95)] group/portrait">
                  <img
                    src="/media/chris.png"
                    alt="Chris Mathew Aje"
                    className="w-full h-full object-cover object-top select-none filter contrast-105 group-hover/portrait:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle inner shadow and rim light */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>
              </Magnet>
            </div>
          </div>

          {/* Bottom Bar: Left Fluid Descriptor + Right Jack Signature ContactButton */}
          <div className="w-full flex items-end justify-between pb-4 sm:pb-6 md:pb-8 relative z-20">
            {/* Left: Jack-style fluid uppercase descriptor */}
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[170px] sm:max-w-[230px] md:max-w-[280px] text-xs sm:text-sm md:text-base lg:text-[1.1rem]">
              a creative engineer driven by crafting striking, resilient &amp; unforgettable digital systems
            </p>

            {/* Right: Jack signature multi-layered gradient ContactButton */}
            <div>
              <ContactButton label="Contact Me" to="contact" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;