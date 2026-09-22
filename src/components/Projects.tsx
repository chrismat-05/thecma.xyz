import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github, Package, Globe } from "lucide-react";
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
  themeColor: string;
  ambientGradient?: string;
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

  // Top offset for stacked deck rim: starts at ~75px + index * 22px
  const topOffset = 75 + index * 22;
  const rowNumber = (index + 1).toString().padStart(2, "0");

  const color = project.themeColor || "#ffffff";

  return (
    <div
      ref={containerRef}
      className="sticky w-full flex items-center justify-center"
      style={{
        top: `${topOffset}px`,
        marginBottom: `${(total - index - 1) * 45}px`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-6xl min-h-[560px] lg:min-h-[620px] rounded-[36px] sm:rounded-[44px] bg-[#0b0c10] border border-white/[0.12] shadow-2xl shadow-black/95 overflow-hidden relative group p-8 sm:p-12 lg:p-14 flex flex-col justify-between transition-colors duration-500"
      >
        {/* Project-specific colored ambient backdrop bloom in card corner */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[90px] opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        {/* Top hairline border glowing with project theme color */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${color}99, transparent)`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1">
          {/* Left Column: Project Details (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
            <div className="space-y-4">
              {/* Top Meta: Index + Category Pill + Year */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-neutral-400">
                    // {rowNumber}
                  </span>
                  <span
                    className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold border backdrop-blur-md"
                    style={{
                      borderColor: `${color}40`,
                      backgroundColor: `${color}15`,
                      color: color,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                <span className="font-mono text-xs sm:text-sm text-neutral-400">
                  {project.year}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] pt-1">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 font-medium leading-relaxed">
                {project.subtitle}
              </p>

              {/* Detailed Description */}
              <p className="text-sm text-neutral-400 leading-relaxed pt-1">
                {project.description}
              </p>
            </div>

            {/* Tags, Technologies & CTAs */}
            <div className="space-y-6 pt-4 border-t border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2.5">
                  CORE TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 text-xs font-mono rounded-xl bg-black/70 text-neutral-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-primary !py-3.5 !px-6 text-xs font-bold inline-flex items-center gap-2"
                    data-cursor="button"
                    data-magnetic="true"
                    style={{
                      boxShadow: `0 0 25px ${color}40`,
                    }}
                  >
                    <Globe size={15} />
                    <span>Explore Live Site</span>
                    <ArrowUpRight size={15} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-outline !py-3.5 !px-6 text-xs font-medium inline-flex items-center gap-2 hover:border-white/40"
                    data-cursor="button"
                  >
                    <Github size={15} />
                    <span>View Repository</span>
                  </a>
                )}
                {project.package && (
                  <a
                    href={project.package}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-outline !py-3.5 !px-6 text-xs font-medium inline-flex items-center gap-2"
                    data-cursor="button"
                  >
                    <Package size={15} />
                    <span>Package</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Taller Immersive Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 h-full flex items-center justify-center">
            <div className="w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950/90 shadow-2xl relative group/preview">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Glowing Corner Indicator with matching project color */}
              <div className="absolute bottom-5 right-5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-neutral-300 flex items-center gap-2 shadow-lg">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[11px] font-semibold text-white">
                  Featured Case Study
                </span>
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

  // Dynamic background atmospheric color transition based on scroll position!
  // Colors: forms.thecma (blue) -> isitsecure (green) -> scanthepolicy (purple) -> securiheader (cyan) -> reqapi (amber)
  const bgColors = [
    "rgba(59, 130, 246, 0.18)",   // Blue (#3b82f6)
    "rgba(16, 185, 129, 0.18)",   // Green (#10b981)
    "rgba(139, 92, 246, 0.18)",   // Purple (#8b5cf6)
    "rgba(6, 182, 212, 0.18)",    // Cyan (#06b6d4)
    "rgba(245, 158, 11, 0.18)",   // Amber (#f59e0b)
  ];

  const ambientBg = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    bgColors
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-28 relative overflow-visible bg-black text-white transition-colors duration-700"
    >
      {/* Dynamic Ambient Background Aura: Reacts to scroll position using project colors */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-80 transition-all duration-700"
        style={{
          background: useTransform(
            ambientBg,
            (col) =>
              `radial-gradient(ellipse 90% 60% at 50% 30%, ${col}, transparent 70%)`
          ),
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionTitleReveal
          badge="// SELECTED CASE STUDIES"
          title="Featured Projects Stack."
          subtitle="A curation of high-impact platforms, open-source security tools, and interactive web architectures. Scroll to reveal each deck."
          align="left"
        />

        {/* Stack of Taller Cards */}
        <div className="relative flex flex-col items-center w-full space-y-20 pb-24">
          {featuredProjects.map((project, index) => {
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
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-10 rounded-[32px] border border-white/15 bg-white/[0.03] backdrop-blur-md">
          <div>
            <h4 className="text-2xl font-bold text-white tracking-tight">
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