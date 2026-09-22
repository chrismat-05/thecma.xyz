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
  progress: MotionValue<number>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  progress,
}) => {
  // TristanMedia catalog stacking logic:
  // Each card is sticky and locks at `top: 90px + index * 48px`.
  // As the user continues scrolling down, the NEXT card slides over the current card's body,
  // leaving the top 48px header tab (with `// 01 TITLE`, tags, year) exposed!
  const headerTabHeight = 52;
  const topStickyOffset = 84 + index * headerTabHeight;
  const rowNumber = (index + 1).toString().padStart(2, "0");
  const color = project.themeColor || "#ffffff";

  // Gallery images
  const col1Img1 = project.images[0] || project.thumbnail;
  const col1Img2 = project.images[1] || project.thumbnail;
  const col2Img = project.images[2] || project.images[1] || project.thumbnail;

  // Scale down slightly as user scrolls past this card
  // Active range where this card is being covered
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(progress, [cardStart, cardEnd], [1, targetScale]);
  const brightness = useTransform(progress, [cardStart, cardEnd], [1, 0.75]);

  return (
    <div
      className="sticky w-full flex justify-center pointer-events-auto transition-all"
      style={{
        top: `${topStickyOffset}px`,
        zIndex: index + 10,
        // The space below each card gives the user room to scroll each subsequent card into view
        marginBottom: index === total - 1 ? "6rem" : "60vh",
      }}
    >
      <motion.div
        style={{
          scale,
          filter: useTransform(brightness, (b) => `brightness(${b})`),
        }}
        className="relative w-full max-w-6xl rounded-[28px] sm:rounded-[38px] md:rounded-[48px] border border-white/20 bg-[#0a0a0a] shadow-[0_-15px_50px_rgba(0,0,0,0.85),0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden transition-shadow duration-500"
      >
        {/* Direct subtle color accent line at top border rim */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />

        {/* Inner Card Container */}
        <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between">
          {/* CATALOG HEADER TAB (Always visible even when stacked underneath next cards) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span
                className="font-mono text-xs sm:text-sm font-bold tracking-wider"
                style={{ color }}
              >
                // {rowNumber}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                {project.title}
              </h3>
              <span
                className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold border backdrop-blur-md"
                style={{
                  borderColor: `${color}40`,
                  backgroundColor: `${color}15`,
                  color: color,
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Top Right: Year & Actions */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-400">
                [{project.year}]
              </span>
              {project.link ? (
                <LiveProjectButton href={project.link} label="Live Site" />
              ) : project.github ? (
                <LiveProjectButton href={project.github} label="Source" />
              ) : project.package ? (
                <LiveProjectButton href={project.package} label="Package" />
              ) : null}
            </div>
          </div>

          {/* Middle Row: Subtitle & Description */}
          <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <p className="text-[#D7E2EA] text-xs sm:text-sm max-w-3xl leading-relaxed opacity-90">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {project.technologies.slice(0, 4).map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.05] text-neutral-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Showcase (TristanMedia / Catalog cinematic layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 pt-1">
            {/* Left Column: 2 Stacked Previews */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <div className="w-full h-[120px] sm:h-[150px] md:h-[165px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 relative group/img">
                <img
                  src={col1Img1}
                  alt={`${project.title} screenshot 1`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="w-full h-[140px] sm:h-[170px] md:h-[195px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 relative group/img">
                <img
                  src={col1Img2}
                  alt={`${project.title} screenshot 2`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Hero Showcase */}
            <div className="md:col-span-8">
              <div className="w-full h-[270px] sm:h-[330px] md:h-[370px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 relative group/img shadow-2xl">
                <img
                  src={col2Img}
                  alt={`${project.title} hero showcase`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Central circular TristanMedia "VIEW" beacon on hover */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center font-mono text-xs uppercase tracking-widest text-white font-bold shadow-2xl transition-transform hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 40px ${color}99`,
                      }}
                    >
                      VIEW
                    </div>
                  </a>
                )}

                {/* Status pill */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-neutral-300 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: color }}
                  />
                  <span>Featured Case Study</span>
                </div>
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
  // Screenshot-extracted true colors:
  // 1. forms.thecma.xyz (#9333ea - Vibrant Purple UI)
  // 2. IsItSecure (#0284c7 - Oceanic Security Blue)
  // 3. ScanThePolicy (#3b82f6 - Legal Navy Blue)
  // 4. SecuriHeader (#059669 - Terminal Security Emerald)
  // 5. Req API (#6366f1 - Indigo / Slate API Interface)
  const bgColors = [
    "rgba(147, 51, 234, 0.55)", // forms.thecma.xyz (Vibrant Purple)
    "rgba(2, 132, 199, 0.55)",  // IsItSecure (Deep Cyan/Blue)
    "rgba(59, 130, 246, 0.55)",  // ScanThePolicy (Cobalt Blue)
    "rgba(5, 150, 105, 0.55)",  // SecuriHeader (Emerald Green)
    "rgba(99, 102, 241, 0.55)", // Req API (Indigo)
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
      className="pt-24 pb-36 relative bg-[#060606] text-white min-h-screen"
    >
      {/* SECTION-SCOPED FULLSTAGE AMBIENT COLOR WASH:
          Sticky to viewport across entire projects scroll length, radiating the current screenshot's color */}
      <div className="sticky top-0 left-0 w-full h-screen pointer-events-none -mb-[100vh] z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full transition-all duration-700 blur-[130px] opacity-70"
          style={{
            background: useTransform(
              ambientBg,
              (col) =>
                `radial-gradient(ellipse 90% 70% at 50% 50%, ${col}, transparent 75%)`
            ),
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionTitleReveal
          badge="// SELECTED CASE STUDIES"
          title="Featured Projects Stack."
          subtitle="A curation of high-impact platforms, open-source security tools, and interactive web architectures. Scroll to reveal each deck."
          align="left"
        />

        {/* CONTINUOUS STACKING CATALOG CONTAINER:
            All cards share this same parent container so position:sticky stacks each card neatly over previous ones */}
        <div className="relative w-full z-10 mt-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={featuredProjects.length}
              progress={scrollYProgress}
            />
          ))}
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