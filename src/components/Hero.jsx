import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center bg-black">
      <div className="max-w-4xl text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-bold text-white"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Chris Mathew
          </span>
        </motion.h1>

        {/* Roles animation */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="role text-lg mt-4 text-orange-200 flex justify-center flex-wrap gap-x-2"
        >
          {['Developer •', 'Student •', 'Public Speaker'].map((role, index) => (
            <motion.span key={index} variants={item}>
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex justify-center gap-6"
        >
          <a
            href="#projects"
            className="px-6 py-3 border-2 border-orange-400 text-white hover:bg-orange-500 transition rounded-lg"
          >
            See Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
