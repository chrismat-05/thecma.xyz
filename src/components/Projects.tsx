import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github, Package, Globe, Layers } from "lucide-react";
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

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  range: [number, number];
  targetScale: number;
  progress: MotionValue<number>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  range,
  targetScale,
  progress,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Progressive scale-down as subsequent cards stack over it
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Stacking offset: each card stops slightly further down to create the layered deck rim
  // Sticky top positioning at ~90px + index * 24px
  const topOffset = 90 + index * 24;

  const rowNumber = (index + 1).toString().padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className="sticky w-full flex items-center justify-center"
      style={{
        top: `${topOffset}px`,
        marginBottom: `${(total - index - 1) * 30}px`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-5xl rounded-[32px] sm:rounded-[36px] bg-[#0c0d12] border border-white/[0.14] shadow-2xl shadow-black/90 overflow-hidden relative group p-6 sm:p-10 lg:p-12 transition-all duration-300"
      >
        {/* Ambient subtle top inner light rim */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Ambient background glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Project Details (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Top Meta: Number + Category badge + Year */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm text-neutral-500 font-bold tracking-wider">
                    // {rowNumber}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-neutral-300">
                    {project.category.toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-xs sm:text-sm text-neutral-400">
                  {project.year}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-medium mt-2">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-4">
                {project.description}
              </p>
            </div>

            {/* Tags & Tech */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-black/60 text-neutral-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-primary !py-2.5 !px-5 text-xs font-semibold flex items-center gap-2"
                    data-cursor="button"
                    data-magnetic="true"
                  >
                    <Globe size={14} />
                    <span>Visit Platform</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-outline !py-2.5 !px-5 text-xs font-medium flex items-center gap-2"
                    data-cursor="button"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                )}
                {project.package && (
                  <a
                    href={project.package}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-outline !py-2.5 !px-5 text-xs font-medium flex items-center gap-2"
                    data-cursor="button"
                  >
                    <Package size={14} />
                    <span>Package Registry</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Card Visual Preview (6 cols) */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950/80 shadow-2xl relative group/preview">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />

              {/* Floating Tag */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-neutral-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Featured Project
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const featuredProjects: ProjectItem[] = (projectsData as ProjectItem[]).filter(
    (p) => p.featured
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 relative overflow-visible"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitleReveal
          badge="// SELECTED CASE STUDIES"
          title="Featured Projects Stack."
          subtitle="A curation of high-impact platforms, open-source security tools, and interactive web architectures."
          align="left"
        />

        {/* Stack of Cards Container */}
        <div className="relative flex flex-col items-center w-full space-y-16 pb-20">
          {featuredProjects.map((project, index) => {
            // Target scale decreases as card gets layered under upcoming cards
            const targetScale = 1 - (featuredProjects.length - index) * 0.04;
            const step = 1 / featuredProjects.length;
            const range: [number, number] = [index * step, 1];

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={featuredProjects.length}
                range={range}
                targetScale={targetScale}
                progress={scrollYProgress}
              />
            );
          })}
        </div>

        {/* Bottom CTA to View All Projects */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              Looking for more experiments &amp; open-source tools?
            </h4>
            <p className="text-neutral-400 text-sm mt-1">
              Browse the complete repository archive of CLI utilities, packages, and academic systems.
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