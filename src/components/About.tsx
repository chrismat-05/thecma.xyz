import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, Calendar, Code, Database, Palette, Globe } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    {
      year: '2023 - Present',
      institution: 'Kristu Jayanti College',
      degree: 'Bachelor of Computer Applications',
      description: 'Coursework includes Data Structures, Database Systems, Programming languages and Software Engineering.',
    },
    {
      year: '2023',
      institution: 'The Indian School, Kingdom of Bahrain',
      degree: 'Higher Secondary Education',
      description: 'Focus on Commerce stream with Computer Science as elective. Achieved 79% in final examinations.',
    },
    {
      year: '2021',
      institution: 'The Indian School, Kingdom of Bahrain',
      degree: 'Secondary Education',
      description: 'Achieved 81% in final examinations.',
    },
  ];

  const certifications = [
    {
      title: 'Ethical Hacking',
      issuer: 'NSDC Academy & Internshala',
      date: 'March 2025',
      status: 'No Expiration',
    },
    {
      title: 'Digital Engineering',
      issuer: 'Nasscom',
      date: 'Oct 2023',
      status: 'No Expiration',
    },
    {
      title: 'HTML',
      issuer: 'University of Michigan',
      date: 'Apr 2023',
      status: 'No Expiration',
    },
  ];

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'VB.Net'],
    },
    {
      title: 'Frameworks',
      icon: Globe,
      skills: ['React', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['Firebase', 'Firestore', 'SQL Server'],
    },
    {
      title: 'Creative',
      icon: Palette,
      skills: ['Video Editing', 'Filmmaking', 'UI/UX Design'],
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-glow-pulse"></div>
                <div className="absolute inset-2 bg-background rounded-full overflow-hidden">
                  <img src='../../media/cover.png'></img>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6 lg:ml-[-200px] lg:w-[calc(100%+200px)]"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Hi, I'm Chris.
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a BCA student passionate about technology, problem-solving and innovation. Eager to learn and apply skills in a professional setting while continuously expanding knowledge in the field.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From Cybersecurity to videography, I love exploring new things and trying them out while trying to bridge the gap between technical expertise and creative expression, always seeking new technologies and opportunities to grow.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Code className="text-primary" size={32} />
              Skills & Expertise
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 1 + categoryIndex * 0.1, duration: 0.6 }}
                    className="skill-card"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <CategoryIcon className="text-primary" size={24} />
                      <h4 className="text-lg font-semibold text-foreground">{category.title}</h4>
                    </div>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className="px-3 py-1 bg-muted/30 text-muted-foreground text-sm rounded-md"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Award className="text-primary" size={32} />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/80 hover:border-primary/50 hover:scale-105 transition-all duration-300"
                >
                  <h4 className="text-xl font-semibold text-foreground mb-2">{cert.title}</h4>
                  <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mb-1">Issued {cert.date}</p>
                  <p className="text-sm text-muted-foreground">{cert.status}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline - Horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <GraduationCap className="text-primary" size={32} />
              Education
            </h3>
            <div className="relative">
              {/* Horizontal timeline line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 transform -translate-y-1/2"></div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
                     className="relative"
                   >
                     {/* Timeline dot */}
                     <div className="hidden md:block absolute -top-8 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10"></div>
                     
                     {/* Content */}
                     <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/80 hover:border-primary/50 hover:scale-105 transition-all duration-300 mt-8 md:mt-12">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Calendar size={16} className="text-primary" />
                        <span className="text-primary font-semibold text-center">{edu.year}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2 text-center">{edu.degree}</h4>
                      <h5 className="text-md text-muted-foreground mb-3 text-center">{edu.institution}</h5>
                      <p className="text-sm text-muted-foreground text-center">{edu.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;