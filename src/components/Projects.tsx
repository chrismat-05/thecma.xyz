import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Package, Globe, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "@/content/projects.json";
import { SectionTitleReveal } from "@/components/ui/SectionTitleReveal";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  featured: boolean;
  tags: string[];
  technologies: string[];
  category: string;
  thumbnail: string;
  images: string[];
  link: string | null;
  github: string | null;
  package: string | null;
}

export const Projects: React.FC = () => {
  // Only the 5 featured projects for the homepage
  const featuredProjects: ProjectItem[] = (projectsData as ProjectItem[]).filter(
    (p) => p.featured
  );

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeThumbnail, setActiveThumbnail] = useState<string>("");

  // Smooth floating cursor tracking
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitleReveal
          badge="// SELECTED CASE STUDIES"
          title="Interactive Projects Showcase."
          subtitle="A curation of high-impact platforms, open-source security utilities, and developer architecture."
          align="left"
        />

        {/* Vertical list layout */}
        <div className="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08] relative">
          {featuredProjects.map((project, index) => {
            const rowNumber = (index + 1).toString().padStart(2, "0");
            const isHovered = activeProject?.id === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  setActiveProject(project);
                  setActiveThumbnail(project.thumbnail);
                }}
                onMouseLeave={() => {
                  setActiveProject(null);
                }}
                className="group relative py-8 md:py-10 px-4 transition-all duration-300 hover:bg-white/[0.03] hover:border-white/20 cursor-pointer"
                data-cursor-text="Explore"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Index + Title */}
                  <div className="flex items-baseline gap-6 md:gap-10 transition-transform duration-300 group-hover:translate-x-4">
                    <span className="font-mono text-sm md:text-base text-neutral-500 font-medium">
                      {rowNumber}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-white transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-neutral-400 mt-1 font-normal">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Tags + Year + Action Arrow */}
                  <div className="flex items-center gap-6 justify-between md:justify-end">
                    <div className="hidden sm:flex flex-wrap gap-2 max-w-xs justify-end">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/[0.05] border border-white/10 text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-neutral-500">{project.year}</span>
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile inline preview card (visible on small screens <768px) */}
                <div className="mt-4 md:hidden block rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/60 p-2">
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-3">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-medium"
                      >
                        <Globe size={14} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-medium"
                      >
                        <Github size={14} /> Source Code
                      </a>
                    )}
                    {project.package && (
                      <a
                        href={project.package}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-medium"
                      >
                        <Package size={14} /> Package
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating cursor preview (Desktop >= 768px) */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden md:block pointer-events-none fixed z-40 w-[340px] h-[220px] rounded-2xl overflow-hidden border border-white/30 shadow-2xl shadow-black/80 bg-neutral-900/90 backdrop-blur-md"
              style={{
                top: 0,
                left: 0,
                x: smoothX,
                y: smoothY,
                translateX: "24px",
                translateY: "-50%",
              }}
            >
              <img
                src={activeThumbnail}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-white font-bold text-sm tracking-wide">
                  {activeProject.title}
                </span>
                <span className="text-neutral-400 text-xs mt-0.5">
                  {activeProject.technologies.slice(0, 4).join(" • ")}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Projects CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              Looking for more experiments & open-source projects?
            </h4>
            <p className="text-neutral-400 text-sm mt-1">
              Browse our complete archive of CLI tools, Python packages, and academic systems.
            </p>
          </div>
          <Link
            to="/projects"
            className="btn-hero-primary whitespace-nowrap"
            data-magnetic="true"
          >
            Explore All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;