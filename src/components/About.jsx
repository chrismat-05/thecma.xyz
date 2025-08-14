import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Lightbulb, Mic } from 'lucide-react';

const softSkills = [
  { icon: <Lightbulb />, label: 'Problem Solver' },
  { icon: <Mic />, label: 'Public Speaking' },
  { icon: <Award />, label: 'Team Player' },
];

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h2>

        <motion.p
          className="text-lg mb-12 text-center text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          I'm a BCA student, builder of privacy-focused tools, passionate about tech, and often found giving speeches at church or coding late into the night.
        </motion.p>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {softSkills.map((skill, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="text-orange-400">{skill.icon}</div>
              <div className="text-white text-lg">{skill.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
