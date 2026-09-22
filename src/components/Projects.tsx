import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github, Package, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "@/content/projects.json";
import { SectionTitleReveal } from "@/components/ui/SectionTitleReveal";
import { LiveProjectButton } from "@/components/ui/LiveProjectButton";

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

  // Top offset for stacked deck rim: starts at ~75px + index * 26px
  const topOffset = 75 + index * 26;
  const rowNumber = (index + 1).toString().padStart(2, "0");

  const color = project.themeColor || "#ffffff";

  // Pick gallery screenshots
  const col1Img1 = project.images[0] || project.thumbnail;
  const col1Img2 = project.images[1] || project.thumbnail;
  const col2Img = project.images[2] || project.images[1] || project.thumbnail;

  return (
    <div
      ref={containerRef}
      className="sticky w-full flex items-center justify-center pointer-events-auto"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 10,
      }}
    >
      <div className="relative w-full max-w-6xl">
        {/* DIRECT BACKDROP BLOOM BEHIND THIS SPECIFIC CARD:
            Radiates outwards with the project image's distinct vibrant color */}
        <div
          className="absolute -inset-6 sm:-inset-10 rounded-[50px] blur-[80px] sm:blur-[110px] opacity-45 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle at 60% 40%, ${color}99, ${color}33 50%, transparent 80%)`,
          }}
        />

        <motion.div
          style={{
            scale,
          }}
          className="w-full rounded-[38px] sm:rounded-[48px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-7 md:p-9 shadow-2xl shadow-black/95 overflow-hidden relative group transition-colors duration-500 flex flex-col justify-between"
        >
          {/* Top Row: Huge Number + Category + Project Name + Live Project Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10">
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
              <span className="font-black text-3xl sm:text-5xl md:text-6xl text-white font-mono tracking-tight">
                {rowNumber}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border backdrop-blur-md"
                style={{
                  borderColor: `${color}40`,
                  backgroundColor: `${color}15`,
                  color: color,
                }}
              >
                {project.category}
              </span>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                {project.title}
              </h3>
            </div>

            {/* Live Project Button */}
            <div className="flex items-center gap-3">
              {project.link ? (
                <LiveProjectButton href={project.link} label="Live Project" />
              ) : project.github ? (
                <LiveProjectButton href={project.github} label="View GitHub" />
              ) : project.package ? (
                <LiveProjectButton href={project.package} label="View PyPI" />
              ) : null}
            </div>
          </div>

          {/* Middle Row: Description & Tech tags */}
          <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-[#D7E2EA] text-xs sm:text-sm md:text-base font-light max-w-3xl leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              {project.technologies.slice(0, 4).map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/[0.05] text-neutral-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Row: Jack-style 2-Column Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 pt-2">
            {/* Left Column (40% width / 5 cols): 2 Stacked Images */}
            <div className="md:col-span-5 flex flex-col gap-4 sm:gap-5">
              <div className="w-full h-[140px] sm:h-[180px] md:h-[210px] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/15 bg-neutral-950/80 shadow-lg relative group/img">
                <img
                  src={col1Img1}
                  alt={`${project.title} screenshot 1`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="w-full h-[170px] sm:h-[220px] md:h-[260px] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/15 bg-neutral-950/80 shadow-lg relative group/img">
                <img
                  src={col1Img2}
                  alt={`${project.title} screenshot 2`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column (60% width / 7 cols): 1 Tall Hero Image */}
            <div className="md:col-span-7">
              <div className="w-full h-[320px] sm:h-[415px] md:h-[490px] rounded-[28px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden border border-white/15 bg-neutral-950/80 shadow-2xl relative group/img">
                <img
                  src={col2Img}
                  alt={`${project.title} hero showcase`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Corner Status Pill */}
                <div className="absolute bottom-5 right-5 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-xs font-mono text-neutral-300 flex items-center gap-2 shadow-xl">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[11px] font-semibold text-white">
                    Interactive Production Showcase
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
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
  // Screenshot-extracted true colors:
  // 1. forms.thecma.xyz (#9333ea - Vibrant Purple UI)
  // 2. IsItSecure (#0284c7 - Oceanic Security Blue)
  // 3. ScanThePolicy (#3b82f6 - Legal Navy Blue)
  // 4. SecuriHeader (#059669 - Terminal Security Emerald)
  // 5. Req API (#6366f1 - Indigo / Slate API Interface)
  const bgColors = [
    "rgba(147, 51, 234, 0.42)", // forms.thecma.xyz
    "rgba(2, 132, 199, 0.42)",  // IsItSecure
    "rgba(59, 130, 246, 0.42)",  // ScanThePolicy
    "rgba(5, 150, 105, 0.42)",  // SecuriHeader
    "rgba(99, 102, 241, 0.42)", // Req API
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
      className="pt-28 pb-36 relative bg-black text-white"
    >
      {/* SECTION-SCOPED FULLSTAGE AMBIENT COLOR AURA:
          Stays behind the cards and transitions smoothly through the project screenshot colors as you scroll */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-700"
        style={{
          background: useTransform(
            ambientBg,
            (col) =>
              `radial-gradient(ellipse 85% 65% at 50% 45%, ${col}, transparent 75%)`
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

        {/* Stack of Taller Cards: each card has its own sticky scroll envelope */}
        <div className="relative flex flex-col items-center w-full z-10 mt-12">
          {featuredProjects.map((project, index) => {
            const targetScale = 1 - (featuredProjects.length - index) * 0.04;
            const step = 1 / featuredProjects.length;
            const range: [number, number] = [index * step, 1];

            return (
              <div
                key={project.id}
                className="w-full"
                style={{
                  // Generates scroll track length so each card sticks and subsequent cards slide over it
                  height: index === featuredProjects.length - 1 ? "auto" : "110vh",
                  marginBottom: index === featuredProjects.length - 1 ? "4rem" : "0",
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  total={featuredProjects.length}
                  range={range}
                  targetScale={targetScale}
                  progress={scrollYProgress}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to View All Projects */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-10 rounded-[32px] border border-white/15 bg-white/[0.03] backdrop-blur-md relative z-10">
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