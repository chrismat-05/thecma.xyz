import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { LanyardHeroScene } from "@/components/hero/LanyardHeroScene";
import { LightRays } from "@/components/backgrounds/LightRays";
import { Waves } from "@/components/backgrounds/Waves";
import { ThreadsBackground } from "@/components/backgrounds/ThreadsBackground";
import { WarpText } from "@/components/ui/WarpText";
import { Magnet } from "@/components/ui/Magnet";
import { ContactButton } from "@/components/ui/ContactButton";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking across the 240vh Hero & Lanyard sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Initial State (Progress 0.0 -> 0.45):
  // Introductory prompt invites the user to scroll to zoom in.
  const lanyardIntroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 0.8, 0]);

  // 2. Zoom in progression (Progress 0.0 -> 0.7):
  const [zoomProgress, setZoomProgress] = React.useState(0);
  React.useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const val = Math.min(Math.max(latest / 0.65, 0), 1);
      setZoomProgress(val);
    });
  }, [scrollYProgress]);

  // 3. Lanyard fades away as it completes zoom into the hero reveal (Progress 0.55 -> 0.8)
  const lanyardSceneOpacity = useTransform(scrollYProgress, [0, 0.55, 0.8], [1, 1, 0]);
  const lanyardScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.8]);

  // 4. Hero Content Section emerges as the lanyard zooms past into the screen (Progress 0.45 -> 0.85)
  const heroContentOpacity = useTransform(scrollYProgress, [0.45, 0.7, 1], [0, 0.85, 1]);
  const heroContentY = useTransform(scrollYProgress, [0.45, 0.75], [80, 0]);
  const heroContentScale = useTransform(scrollYProgress, [0.45, 0.75], [0.92, 1]);

  return (
    <div
      ref={containerRef}
      id="hero-track"
      className="relative h-[240vh] w-full bg-black text-white"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 1: Ambient Perlin Noise Waves with interactive cursor displacement */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-35">
          <Waves
            lineColor="rgba(215, 226, 234, 0.14)"
            backgroundColor="transparent"
            waveSpeedX={0.012}
            waveSpeedY={0.005}
            waveAmpX={36}
            waveAmpY={18}
            xGap={14}
            yGap={34}
            friction={0.925}
            tension={0.005}
            maxCursorMove={90}
            showCursorDot={false}
          />
        </div>

        {/* Layer 2: Subtle Silk Mathematical Threads for depth */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-25">
          <ThreadsBackground
            threadsCount={14}
            accentColor="rgba(187, 204, 215, 0.22)"
          />
        </div>

        {/* Layer 3: Dynamic Radial Center Vignette & Ambient Crimson Stage Glow */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
          style={{
            background:
              "radial-gradient(circle 540px at 50% 46%, rgba(229, 9, 20, 0.22), rgba(185, 28, 28, 0.08) 48%, transparent 75%), radial-gradient(ellipse 70% 55% at 50% 18%, rgba(229, 9, 20, 0.16), transparent 65%), radial-gradient(ellipse 85% 70% at 50% 50%, rgba(187, 204, 215, 0.05), transparent 70%)",
          }}
        />

        {/* Layer 4: ReactBits Light Rays shining from TOP CENTER down onto the lanyard */}
        <motion.div
          style={{ opacity: lanyardSceneOpacity }}
          className="absolute inset-0 z-[3] pointer-events-none"
        >
          <LightRays className="opacity-40" />
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
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-12 z-20 flex items-center gap-3 pointer-events-none whitespace-nowrap"
        >
          <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full border border-red-500/30 bg-black/80 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-widest uppercase text-neutral-200 shadow-[0_0_20px_rgba(229,9,20,0.25)]">
            <span className="sm:hidden">Swipe down to explore</span>
            <span className="hidden sm:inline">Scroll to enter</span>
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-brand-red p-1.5 sm:p-2 rounded-full border border-brand-red/35 bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(229,9,20,0.25)]"
          >
            <ArrowDown size={14} className="sm:w-4 sm:h-4" />
          </motion.div>
        </motion.div>

        {/* Phase 2: Revealed Hero Content Section (Jack 3D Creator Style) */}
        <motion.div
          style={{
            opacity: heroContentOpacity,
            y: heroContentY,
            scale: heroContentScale,
          }}
          className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 pointer-events-auto"
        >
          {/* Top Navbar Row */}
          <nav
            aria-label="Hero Navigation"
            className="w-full flex items-center justify-between text-[#D7E2EA] font-medium uppercase tracking-wider text-[11px] sm:text-xs md:text-base lg:text-[1.15rem] pt-2 relative z-30"
          >
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
            <Link
              to="/projects"
              className="cursor-pointer hover:text-white transition-colors duration-200 py-2 px-1"
              data-cursor="button"
            >
              Projects
            </Link>
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

            {/* Centered Magnetic Portrait: Scaled and framed with a luxury arch silhouette behind the bottom of the letters with ruby back-glow */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 pointer-events-auto">
              <Magnet padding={120} strength={3}>
                <div className="relative group/portrait">
                  {/* Subtle ruby ambient back-glow */}
                  <div className="absolute -inset-2 rounded-t-[100px] sm:rounded-t-[140px] md:rounded-t-[160px] bg-brand-red/20 blur-xl pointer-events-none group-hover/portrait:bg-brand-red/35 transition-all duration-700" />

                  <div className="relative w-[160px] sm:w-[210px] md:w-[260px] lg:w-[290px] h-[220px] sm:h-[280px] md:h-[330px] lg:h-[370px] rounded-t-[100px] sm:rounded-t-[140px] md:rounded-t-[160px] overflow-hidden border border-white/20 group-hover/portrait:border-brand-red/60 bg-gradient-to-b from-white/10 via-neutral-900/60 to-black shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(229,9,20,0.25)] transition-all duration-500">
                    <img
                      src="/media/chris.png"
                      alt="Chris Mathew Aje"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top select-none filter contrast-105 group-hover/portrait:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle inner shadow and rim light */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  </div>
                </div>
              </Magnet>
            </div>
          </div>

          {/* Bottom Bar: Left Fluid Descriptor + Right Jack Signature ContactButton */}
          <div className="w-full flex items-end justify-between pb-24 sm:pb-20 md:pb-8 relative z-20">
            {/* Left: Jack-style fluid uppercase descriptor */}
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[170px] sm:max-w-[230px] md:max-w-[280px] text-xs sm:text-sm md:text-base lg:text-[1.1rem]">
              bridging creative visual design with performant, modern web development
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