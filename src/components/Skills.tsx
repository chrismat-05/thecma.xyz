import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Globe, Shield, Palette, Video } from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'VB.Net'],
    },
    {
      title: 'Frameworks',
      icon: Globe,
      skills: ['React', 'Node.js', 'Framer Motion'],
    },
    {
      title: 'Styling',
      icon: Palette,
      skills: ['CSS3', 'Tailwind CSS', 'Responsive Design'],
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['SQL Server', 'Firebase', 'Firestore'],
    },
    {
      title: 'Security',
      icon: Shield,
      skills: ['Ethical Hacking', 'Security Headers', 'Web Security'],
    },
    {
      title: 'Creative',
      icon: Video,
      skills: ['Videography', 'Filmmaking', 'Content Creation'],
    },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A diverse skill set spanning development, security, and creative technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              // Only apply pill flex-wrap to selected categories
              const pillCategories = ['Languages', 'Frameworks', 'Databases', 'Creative'];
              const isPillCategory = pillCategories.includes(category.title);
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.4 + categoryIndex * 0.1, duration: 0.6 }}
                  className="skill-card group"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  {isPillCategory ? (
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{
                            delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.05,
                            duration: 0.4
                          }}
                          className="inline-flex items-center px-4 py-2 bg-card/70 border border-border rounded-full 
                                    text-muted-foreground group-hover:text-foreground 
                                    group-hover:bg-card/90 transition-colors duration-300 font-medium"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ 
                            delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.05, 
                            duration: 0.4 
                          }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Currently Mastering</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Ethical Hacking'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:scale-105 transition-transform duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;