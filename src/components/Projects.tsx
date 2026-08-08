import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Folder, Package, Globe, Zap } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: 'forms.thecma.xyz',
      description: 'Built with HTML, CSS, JavaScript, and formBuilder.js, the platform enables users to create, preview, and share customizable forms with themes, analytics, and export options. Data is securely handled using Firebase Auth and Firestore.',
      tags: [
        { label: '🗂️ Major Project', color: 'primary' },
        { label: '🧪 Testing', color: 'secondary' },
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Firestore', 'TypeScript', 'Handlebars', 'Resend'],
      images: ['../../media/forms.thecma.xyz/forms.thecma (1).png', '../../media/forms.thecma.xyz/forms.thecma (2).png', '../../media/forms.thecma.xyz/forms.thecma (3).png', '../../media/forms.thecma.xyz/forms.thecma (4).png', '../../media/forms.thecma.xyz/forms.thecma (5).png', '../../media/forms.thecma.xyz/forms.thecma (6).png', '../../media/forms.thecma.xyz/forms.thecma (7).png'],
      link: 'https://forms.thecma.xyz/',
      github: null,
      category: 'major'
    },
    {
      title: 'IsItSecure?',
      description: 'A comprehensive password security scanner that analyzes password strength and checks breach exposure using privacy-preserving techniques.',
      tags: [
        { label: '📄 Minor Project', color: 'muted' },
        { label: '📦 Package', color: 'accent' },
        { label: '🌐 Open Source', color: 'primary' },
      ],
      technologies: ['Python', 'CLI', 'PyPi'],
      images: ['../../media/IsItSecure/IsItSecure1.png', '../../media/IsItSecure/IsItSecure2.png', '../../media/IsItSecure/IsItSecure3.png', '../../media/IsItSecure/IsItSecure4.png', '../../media/IsItSecure/IsItSecure5.png'],
      link: null,
      github: 'https://github.com/chrismat-05/IsItSecure',
      package: 'https://pypi.org/project/isitsecure/',
      category: 'minor'
    },
    {
      title: 'ScanThePolicy',
      description: 'ScanThePolicy helps users quickly understand complex privacy policies and terms of service. Paste text or a URL, and get highlights, breakdowns, and a privacy risk score. The app features a modern Vite/React frontend and a FastAPI backend powered by NLP.',
      tags: [
        { label: '📄 Minor Project', color: 'primary' },
        { label: '🟢 Live', color: 'success' },
        { label: '🌐 Open Source', color: 'primary' },
      ],
      technologies: ['React', 'Javascript', 'Python'],
      images: ['../../media/ScanThePolicy/home.png', '../../media/ScanThePolicy/text_input.png', '../../media/ScanThePolicy/url_input.png'],
      link: null,
      github: 'https://github.com/chrismat-05/ScanThePolicy',
      category: 'minor'
    },
    {
      title: 'Quotzy',
      description: 'Quotzy is a fully open-source quote generator built as both a CLI tool and a JS module. It features handpicked quotes across six diverse categories. Published to npm and GitHub Packages.',
      tags: [
        { label: '📄 Minor Project', color: 'muted' },
        { label: '📦 Package', color: 'accent' },
        { label: '🌐 Open Source', color: 'primary' },
      ],
      technologies: ['Node.js', 'CLI', 'npm'],
      images: ['../../media/Quotzy/quotzy(1).png', '../../media/Quotzy/quotzy(2).png', '../../media/Quotzy/quotzy(3).png'],
      link: null,
      github: 'https://github.com/chrismat-05/quotzy',
      package: 'https://www.npmjs.com/package/quotzy',
      category: 'minor'
    },
    {
      title: 'SecuriHeader',
      description: 'A tool that analyzes the HTTP response headers of any website and checks for missing or misconfigured security-related headers. Ideal for developers and security-conscious users.',
      tags: [
        { label: '📄 Minor Project', color: 'muted' },
        { label: '🟢 Live', color: 'success' },
        { label: '🌐 Open Source', color: 'primary' },
      ],
      technologies: ['React', 'Security Analysis', 'Docker'],
      images: ['../../media/scrihdr/scrihdr1.png', '../../media/scrihdr/scrihdr2.png', '../../media/scrihdr/scrihdr3.png'],
      link: 'https://scrihdr.thecma.xyz/',
      github: 'https://github.com/chrismat-05/SecuriHeader',
      category: 'minor'
    },
    {
      title: 'Req API',
      description: 'A lightweight, developer-friendly API request debugger built using React, Tailwind CSS, Axios, and Framer Motion. Allows users to test HTTP methods with instant formatted responses.',
      tags: [
        { label: '📄 Minor Project', color: 'muted' },
        { label: '🟢 Live', color: 'success' },
        { label: '🌐 Open Source', color: 'primary' },
      ],
      technologies: ['React', 'Tailwind CSS', 'Axios', 'Framer Motion'],
      images: ['../../media/reqapi/reqapi1.png', '../../media/reqapi/reqapi2.png'],
      link: 'https://reqapi.thecma.xyz/',
      github: 'https://github.com/chrismat-05/Req-API',
      category: 'minor'
    },
    {
      title: 'IPLocator',
      description: 'A professional IP address lookup and analysis tool. Instantly discover detailed information about any IP address, including location, ISP details, security insights, and network information',
      tags: [
        { label: '📄 Minor Project', color: 'muted' },
        { label: '🟢 Live', color: 'success' },
        { label: '🌐 Open Source', color: 'primary' },
      ],
      technologies: ['React JS', 'Vite', 'Framer', 'Tailwind CSS', 'Framer'],
      images: ['../../media/IPLocator/1.png', '../../media/IPLocator/2.png'],
      link: 'https://iplocator.thecma.xyz/',
      github: 'https://github.com/chrismat-05/IPLocator',
      category: 'minor'
    },
    {
      title: 'AMC',
      description: 'A user-friendly Annual Maintenance Contract (AMC) Management System built using VB.NET and SQL Server 2022. Streamlines contract, client, asset, and service request management.',
      tags: [
        { label: '🟢 Live', color: 'success' },
        { label: '🌐 Open Source', color: 'primary' },
        { label: '🎓 College Project', color: 'accent' },
      ],
      technologies: ['VB.NET', 'SQL Server 2022', 'Windows Forms'],
      images: ['../../media/AMC/AMC1.png', '../../media/AMC/AMC2.png', '../../media/AMC/AMC3.png', '../../media/AMC/AMC4.png', '../../media/AMC/AMC5.png', '../../media/AMC/AMC6.png', '../../media/AMC/AMC7.png', '../../media/AMC/AMC8.png'],
      link: null,
      github: 'https://github.com/chrismat-05/AMC',
      category: 'college'
    },
  ];

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'major': return Package;
      case 'college': return Folder;
      default: return Zap;
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text leading-[1.8] pb-2">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const CategoryIcon = getIconForCategory(project.category);

              const autoplayRef = useRef<any>(null);
              const [isPaused, setIsPaused] = useState(false);

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="project-card"
                >
                  <div className="relative">
                    <Carousel
                      opts={{ loop: true }}
                      plugins={[
                        Autoplay({
                          delay: 3000,
                          stopOnInteraction: false,
                          stopOnMouseEnter: true,
                        }),
                      ]}
                      onMouseEnter={() => {
                        setIsPaused(true);
                        if (autoplayRef.current) autoplayRef.current.stop();
                      }}
                      onMouseLeave={() => {
                        setIsPaused(false);
                        if (autoplayRef.current) autoplayRef.current.play();
                      }}
                    >
                      <CarouselContent>
                        {project.images.map((image, imageIndex) => (
                          <CarouselItem key={imageIndex}>
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-xl overflow-hidden">
                              <img
                                src={image}
                                alt={`${project.title} screenshot ${imageIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {project.images.length > 1 && (
                        <>
                          <CarouselPrevious className="absolute left-2 top-1/2" />
                          <CarouselNext className="absolute right-2 top-1/2" />
                        </>
                      )}
                    </Carousel>
                  </div>

                  <div className="p-6 border-b border-border/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CategoryIcon className="text-primary" size={24} />
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            <Github size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Built with:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-muted/50 text-grey-300 rounded border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {project.link && project.github && project.package ? (
                        <>
                          <div className="flex gap-3">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
                            >
                              <Globe size={16} />
                              Visit Site
                            </a>
                          </div>
                          <div className="flex gap-3">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                            >
                              <Github size={16} />
                              View Code
                            </a>
                            <a
                              href={project.package}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                            >
                              <Package size={16} />
                              View Package
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-3">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
                            >
                              <Globe size={16} />
                              Visit Site
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                            >
                              <Github size={16} />
                              View Code
                            </a>
                          )}
                          {project.package && (
                            <a
                              href={project.package}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                            >
                              <Package size={16} />
                              View Package
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-lg text-muted-foreground mb-6">
              Interested in collaborating on a project?
            </p>
            <a
              href="https://github.com/chrismat-05"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary inline-flex items-center gap-2"
            >
              <Github size={20} />
              View All Projects on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;