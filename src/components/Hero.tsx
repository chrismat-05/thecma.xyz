import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Phone, MessageSquareMore, Handshake, ArrowDown } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { LanyardHeroScene } from "@/components/hero/LanyardHeroScene";
import { LightRays } from "@/components/backgrounds/LightRays";

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

        {/* Phase 2: Revealed Hero Content Section */}
        <motion.div
          style={{
            opacity: heroContentOpacity,
            y: heroContentY,
            scale: heroContentScale,
          }}
          className="container mx-auto px-4 relative z-20 max-w-6xl pointer-events-none flex flex-col items-center justify-center text-center"
        >
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto pointer-events-auto">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/80 backdrop-blur-md text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>INTERACTIVE STUDIO // 2025 PORTFOLIO</span>
            </div>

            {/* Large Editorial Headline */}
            <div className="space-y-2">
              <span className="block text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-neutral-400">
                Creative Technologist &amp; Engineer
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
                Chris Mathew Aje.
              </h1>
            </div>

            {/* Kinetic Typing Subtitle */}
            <div className="text-lg sm:text-2xl font-mono text-neutral-300 h-10 flex items-center justify-center">
              <TypeAnimation
                sequence={[
                  "Creative Web Agency & Systems",
                  2000,
                  "Cybersecurity & Threat Scanner",
                  2000,
                  "Immersive 3D & WebGL Platforms",
                  2000,
                  "High-Velocity Full-Stack Engineering",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center">
              <ScrollLink
                to="projects"
                smooth={true}
                offset={-70}
                duration={500}
                className="btn-hero-primary cursor-pointer"
                data-magnetic="true"
                data-cursor-text="View"
              >
                Explore Selected Work
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth={true}
                offset={-70}
                duration={500}
                className="btn-hero-outline cursor-pointer"
                data-magnetic="true"
              >
                Get In Touch
              </ScrollLink>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 pt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black flex items-center justify-center text-neutral-400 transition-all duration-300 hover:scale-110"
                    title={social.label}
                    data-cursor="button"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;