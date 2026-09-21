import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, Phone, MessageSquareMore, Handshake, ArrowDown } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { LanyardHeroScene } from "@/components/hero/LanyardHeroScene";
import { HeroWaveBackground } from "@/components/backgrounds/HeroWaveBackground";

export const Hero: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/chrismat-05", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/chrismaje/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:chrismaje63@gmail.com", label: "Email" },
    { icon: MessageSquareMore, href: "https://wa.me/+918848914245", label: "WhatsApp" },
    { icon: Phone, href: "tel:+918848914245", label: "Call" },
    { icon: Handshake, href: "https://www.fiverr.com/s/zWgryod", label: "Fiverr" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* 1. Fluid Ambient Shader Wave in Background */}
      <HeroWaveBackground />

      {/* 2. Interactive 3D Physics Lanyard with Volumetric Light Rays */}
      <LanyardHeroScene />

      {/* 3. Foreground Content Layer */}
      <div className="container mx-auto px-4 relative z-20 max-w-6xl pointer-events-none">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto pointer-events-auto">
          {/* Top Access Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-xs font-mono text-neutral-300"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>INTERACTIVE STUDIO // 2025 PORTFOLIO</span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-2"
          >
            <span className="block text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-neutral-400">
              Creative Technologist &amp; Engineer
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
              Chris Mathew Aje.
            </h1>
          </motion.div>

          {/* Kinetic Typing Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-2xl font-mono text-neutral-300 h-10 flex items-center justify-center"
          >
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
          </motion.div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center"
          >
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
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-5 pt-6"
          >
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
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-neutral-500 font-mono text-[10px] tracking-widest uppercase pointer-events-none">
        <span>Scroll to Reveal</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;