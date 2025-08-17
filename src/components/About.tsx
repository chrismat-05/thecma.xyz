import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, Calendar, Code, Database, Palette, Globe } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    {
      year: '2023 - Present',
      institution: 'Kristu Jayanti College',
      degree: 'Bachelor of Computer Applications'
    },
    {
      year: '2023',
      institution: 'The Indian School, Kingdom of Bahrain',
      degree: 'Higher Secondary Education',
      description: 'Commerce stream with Computer Science. Achieved 79% in final examinations.',
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
      title: 'Salesforce Administrator Explorer',
      issuer: 'Nasscom',
      date: 'July 2025',
      status: 'No Expiration',
      link: 'https://fsp-assessment-certificates.s3.ap-southeast-1.amazonaws.com/%27/s3/buckets/fsp-assessment-certificates%27/CHRIS%2BMATHEW%2BAJE_148550316.pdf.pdf'
    },
    {
      title: 'Problem Solving',
      issuer: 'HackerRank',
      date: 'May 2025',
      status: 'No Expiration',
      link: 'https://www.hackerrank.com/certificates/fbca630d6812'
    },
    {
      title: 'REST API',
      issuer: 'HackerRank',
      date: 'May 2025',
      status: 'No Expiration',
      link: 'https://www.hackerrank.com/certificates/7067cb8f76d2'
    },
    {
      title: 'Securing MongoDB Atlas: Authentication & Authorization',
      issuer: 'MongoDB',
      date: 'May 2025',
      status: 'No Expiration',
      link: 'https://www.credly.com/badges/d42ba4a5-27fa-4bbb-ae5f-5b87323f3b2e/linked_in_profile'
    },
    {
      title: 'Securing MongoDB Self-Managed: Authentication & Authorization ',
      issuer: 'MongoDB',
      date: 'May 2025',
      status: 'No Expiration',
      link: 'https://www.credly.com/badges/f0b99dd0-aabf-48a3-8eed-02a0b1ec833a/linked_in_profile'
    },
    {
      title: 'Ethical Hacking',
      issuer: 'NSDC Academy & Internshala',
      date: 'March 2025',
      status: 'No Expiration',
      link: 'https://trainings.internshala.com/s/v/3610844/1c4beaba'
    },
    {
      title: 'Digital Engineering',
      issuer: 'Nasscom',
      date: 'October 2023',
      status: 'No Expiration',
      link: 'https://fsp-assessment-certificates.s3-ap-southeast-1.amazonaws.com/ChrisMathewAje-124647283.pdf'
    },
    {
      title: 'Get started with Figma',
      issuer: 'Coursera',
      date: 'October 2023',
      status: 'No Expiration',
      link: 'https://www.coursera.org/account/accomplishments/verify/KG4BZ57MXM64'
    },
    {
      title: 'Work with Components in Figma',
      issuer: 'Coursera',
      date: 'October 2023',
      status: 'No Expiration',
      link: 'https://www.coursera.org/account/accomplishments/verify/JPM7L2GU3CGM'
    },
    {
      title: 'HTML',
      issuer: 'University of Michigan',
      date: 'April 2023',
      status: 'No Expiration',
      link: 'https://www.coursera.org/account/accomplishments/verify/45YW8F3CQXG2'
    },
  ];

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      skills: ['JavaScript', 'TypeScript', 'Python', 'VB.Net', 'CSS', 'HTML'],
    },
    {
      title: 'Frameworks',
      icon: Globe,
      skills: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', '.NET'],
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['Supabase', 'Firebase', 'SQL Plus', 'SQL Lite', 'MySQL', 'PostgreSQL'],
    },
    {
      title: 'Creative',
      icon: Palette,
      skills: ['Videography', 'Direction', 'Graphic Design', 'Sound Design'],
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skill}
                          className="inline-block px-4 py-2 bg-muted/30 text-gray-300 text-sm rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

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
                  className="project-card relative p-4"
                >
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
                      title="Open certificate in new tab"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <h4 className="text-[17px] font-semibold text-foreground mb-2">{cert.title}</h4>
                  <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-300 mb-1">Issued {cert.date}</p>
                  <p className="text-sm text-muted-foreground">{cert.status}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

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