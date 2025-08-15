import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/chrismat-05', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/chrismaje/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:chrismaje63@gmail.com', label: 'Email' },
    { icon: Phone, href: 'https://wa.me/+918848914245', label: 'WhatsApp' },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left space-y-8">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-4"
            >
              &lt;hello world&gt;
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
            >
              I'm Chris Mathew Aje
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-foreground mb-8"
            >
              Bridging tech & creativity - one step at a time
            </motion.p>

            {/* Type Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg md:text-xl text-primary mb-12 h-8"
            >
              <TypeAnimation
                sequence={[
                  'Aspiring Software Developer',
                  2000,
                  'BCA Student',
                  2000,
                  'Ethical Hacking Explorer',
                  2000,
                  'Videographer',
                  2000,
                  'Tech Enthusiast',
                  2000,
                  'Filmmaker',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                to="projects"
                smooth={true}
                offset={-70}
                duration={500}
                className="btn-hero-primary cursor-pointer"
              >
                View My Work
              </Link>
              <Link
                to="contact"
                smooth={true}
                offset={-70}
                duration={500}
                className="btn-hero-outline cursor-pointer"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex gap-6"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 glow-primary"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Right side - Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              {/* Floating particles */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-primary/30 rounded-full"
                  initial={{
                    x: Math.random() * 400,
                    y: Math.random() * 400,
                  }}
                  animate={{
                    x: Math.random() * 400,
                    y: Math.random() * 400,
                  }}
                  transition={{
                    duration: Math.random() * 8 + 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
              
              {/* Central glow */}
              <motion.div
                className="absolute inset-1/4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Orbiting elements */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-secondary rounded-full transform -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-accent rounded-full transform -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-secondary rounded-full transform -translate-y-1/2" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;