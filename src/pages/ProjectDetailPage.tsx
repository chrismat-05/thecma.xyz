import React, { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Github,
  Package,
  Sparkles,
  Layers,
  Cpu,
  Calendar,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import projectsData from "@/content/projects.json";
import servicesData from "@/content/services.json";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CursorGridBackground } from "@/components/backgrounds/CursorGridBackground";
import { getCategoryMeta } from "@/lib/projectCategories";

import { GraphicDesignDetailView } from "@/components/projects/GraphicDesignDetailView";
import { VideoEditingDetailView } from "@/components/projects/VideoEditingDetailView";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  featured: boolean;
  themeColor?: string;
  ambientGradient?: string;
  tags: string[];
  technologies: string[];
  category: string;
  discipline?: string;
  servicesOffered?: string[];
  thumbnail: string;
  images: string[];
  link: string | null;
  github: string | null;
  package: string | null;
  videos?: Array<{ id: string; title: string; src: string; duration?: string; caption?: string }>;
}

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allProjects = projectsData as ProjectItem[];

  const currentIndex = useMemo(() => {
    return allProjects.findIndex((p) => p.id === id);
  }, [allProjects, id]);

  const project = useMemo(() => {
    return currentIndex !== -1 ? allProjects[currentIndex] : null;
  }, [allProjects, currentIndex]);

  const nextProject = useMemo(() => {
    if (currentIndex === -1) return null;
    const nextIdx = (currentIndex + 1) % allProjects.length;
    return allProjects[nextIdx];
  }, [allProjects, currentIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold font-display uppercase tracking-tight mb-4">
          Project Not Found
        </h1>
        <p className="text-neutral-400 font-mono text-sm max-w-md mb-8">
          The requested project could not be located in the catalogued archives.
        </p>
        <Link
          to="/projects"
          className="px-6 py-3 rounded-full border border-white/20 bg-white/[0.05] hover:border-white/50 text-[#D7E2EA] hover:text-white font-mono text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Return to Works</span>
        </Link>
      </div>
    );
  }

  const themeColor = project.themeColor || "#9333ea";
  const catMeta = getCategoryMeta(project.category);
  const CatIcon = catMeta.icon;

  // Filter gallery images so we don't repeat the thumbnail if it's the only one
  const galleryImages = project.images && project.images.length > 0 ? project.images : [project.thumbnail];
  const heroImage = galleryImages[0];
  const remainingImages = galleryImages.slice(1);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-foreground relative selection:bg-white selection:text-black">
      {/* Background Interactive Ambient Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <CursorGridBackground />
      </div>

      {/* Global Navigation Header */}
      <Navigation />

      {/* Dynamic Project Ambient Glow Bloom */}
      <div
        className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[170px] pointer-events-none opacity-25 z-0 transition-all duration-700"
        style={{ background: themeColor }}
      />

      {project.discipline === "graphic-design" || (project.servicesOffered && project.servicesOffered.includes("graphic-design")) ? (
        <GraphicDesignDetailView project={project} nextProject={nextProject} />
      ) : project.discipline === "video-editing" || (project.servicesOffered && project.servicesOffered.includes("video-editing")) ? (
        <VideoEditingDetailView project={project} nextProject={nextProject} />
      ) : (
        <main className="relative z-10 pt-28 sm:pt-36 pb-32">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

          {/* Top Sticky-like Utility Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group"
              data-cursor="button"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              <span>Selected Works</span>
            </Link>

            <div className="flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.05] hover:border-white/50 text-[#D7E2EA] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-1.5 shadow-md"
                  data-cursor="button"
                >
                  <Globe size={13} />
                  <span>Live Site</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] hover:border-white/40 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                  data-cursor="button"
                >
                  <Github size={13} />
                  <span>Source</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
              {project.package && (
                <a
                  href={project.package}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] hover:border-white/40 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                  data-cursor="button"
                >
                  <Package size={13} />
                  <span>PyPI Package</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </motion.div>

          {/* 1. HERO HEADER (Hyperworld Inspired) */}
          <div className="space-y-6 mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-mono uppercase tracking-wider font-semibold backdrop-blur-md ${catMeta.badgeClass}`}
              >
                <CatIcon size={12} className="shrink-0" />
                <span>{catMeta.label}</span>
                <span className="opacity-40">•</span>
                <span>{project.year}</span>
              </span>

              {project.servicesOffered && project.servicesOffered.map((srvId) => {
                const srv = servicesData.find((s) => s.id === srvId);
                if (!srv) return null;
                return (
                  <span
                    key={srvId}
                    className="px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.06] text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: themeColor }}
                    />
                    {srv.title}
                  </span>
                );
              })}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-display leading-[1.05]"
            >
              {project.title}
            </motion.h1>

            {project.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-2xl text-neutral-400 font-mono tracking-tight font-medium max-w-3xl"
              >
                {project.subtitle}
              </motion.p>
            )}
          </div>

          {/* 2. CINEMATIC HERO SHOWCASE MEDIA (Full Width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mb-20 sm:mb-28 rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden border border-white/15 bg-neutral-950 relative shadow-2xl group"
          >
            <img
              src={heroImage}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-h-[720px] object-cover filter contrast-[1.02] group-hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* 3. "ABOUT" NARRATIVE SECTION (2-Column Editorial Structure) */}
          <section className="mb-24 sm:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
              {/* Left Column: Heading styled with Project Accent */}
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                  01 // OVERVIEW
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black uppercase font-display tracking-tight"
                  style={{ color: themeColor }}
                >
                  About
                </h2>
              </div>

              {/* Right Column: Narrative Story */}
              <div className="md:col-span-8 space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-normal leading-relaxed">
                  {project.description}
                </p>

                {/* Scope & Role Metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">
                      Release Year
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-white mt-1 block">
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">
                      Role / Discipline
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-white mt-1 block">
                      Full Stack Web Dev
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">
                      Status
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-emerald-400 mt-1 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Production Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. CURATED GALLERY (Rhythmic Alternating Layout from Hyperworld) */}
          {remainingImages.length > 0 && (
            <section className="mb-24 sm:mb-32 space-y-8 sm:space-y-12">
              <div className="border-t border-white/[0.08] pt-12 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                    02 // VISUAL TELEMETRY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase font-display text-white">
                    Interface Showcase
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {galleryImages.length} Visual Artifacts
                </span>
              </div>

              {/* Layout: if we have 1 image, full-width. If multiple, pairs & highlights */}
              {remainingImages.map((img, idx) => {
                // If it's the first image in remaining or an odd count: make it a large cinematic banner
                const isFullBanner = idx % 3 === 0;

                if (isFullBanner) {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7 }}
                      className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl group"
                    >
                      <img
                        src={img}
                        alt={`${project.title} detail ${idx + 2}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[680px] object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                  );
                }

                // If not full banner, check if paired with next
                return null;
              })}

              {/* Grid pairs for non-banner images */}
              {remainingImages.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {remainingImages
                    .filter((_, idx) => idx % 3 !== 0)
                    .map((img, pIdx) => (
                      <motion.div
                        key={pIdx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: pIdx * 0.1 }}
                        className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 shadow-xl group aspect-video sm:aspect-auto sm:h-[420px]"
                      >
                        <img
                          src={img}
                          alt={`${project.title} showcase ${pIdx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </motion.div>
                    ))}
                </div>
              )}
            </section>
          )}

          {/* 5. ARCHITECTURE & DELIVERABLES SECTION (Hyperworld Impact Section) */}
          <section className="mb-24 sm:mb-32">
            <div className="rounded-[28px] sm:rounded-[36px] border border-white/15 bg-gradient-to-b from-white/[0.04] via-neutral-950/70 to-black p-8 sm:p-12 lg:p-16 relative overflow-hidden backdrop-blur-xl">
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
                style={{ background: themeColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
                {/* Left Column: Heading */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
                    03 // ARCHITECTURE &amp; STACK
                  </span>
                  <h3
                    className="text-3xl sm:text-4xl md:text-5xl font-black uppercase font-display tracking-tight leading-tight"
                    style={{ color: themeColor }}
                  >
                    Engineering Depth.
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                    Designed and architected with a focus on runtime performance, security telemetry, resilient backend integrations, and responsive micro-interactions.
                  </p>

                  {/* Actions CTA */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border border-white/25 bg-gradient-to-b from-white/15 via-white/[0.05] to-black hover:border-white/60 text-[#D7E2EA] hover:text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold transition-all inline-flex items-center gap-2 shadow-lg"
                        data-cursor="button"
                      >
                        <Globe size={14} />
                        <span>Launch Live Platform</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border border-white/20 bg-white/[0.04] hover:border-white/50 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                        data-cursor="button"
                      >
                        <Github size={14} />
                        <span>View Source Repository</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Technologies & Deliverables Checklist */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Technologies Stack Chips */}
                  <div>
                    <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
                      Core Technologies Utilized
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 text-xs font-mono rounded-xl bg-white/[0.06] border border-white/15 text-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
                      Capabilities &amp; Specializations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.03] border border-white/10 text-[#D7E2EA]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Checklist (Matching Hyperworld Deliverables) */}
                  <div className="pt-4 border-t border-white/[0.08] space-y-3">
                    <div className="flex items-center gap-3 text-sm text-neutral-300 font-sans">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      <span>End-to-end responsive design with custom component systems</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300 font-sans">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      <span>Optimized assets, GPU-accelerated micro-animations, and fast page load speeds</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300 font-sans">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      <span>Security-first architectural integrity and resilient data flows</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. NEXT PROJECT INTERACTIVE FOOTER (Infinite Exploration Loop) */}
          {nextProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-20 pt-12 border-t border-white/[0.1]"
            >
              <div className="text-center mb-8">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.25em] block">
                  Next Project
                </span>
              </div>

              <Link
                to={`/projects/${nextProject.id}`}
                className="block group relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-b from-neutral-900/60 to-black p-8 sm:p-14 hover:border-white/40 transition-all duration-500 shadow-2xl"
                data-cursor="NEXT"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none blur-[100px]"
                  style={{ background: nextProject.themeColor || "#9333ea" }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-3">
                    {(() => {
                      const nextCatMeta = getCategoryMeta(nextProject.category);
                      const NextCatIcon = nextCatMeta.icon;
                      return (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono uppercase tracking-wider font-semibold backdrop-blur-md ${nextCatMeta.badgeClass}`}
                        >
                          <NextCatIcon size={11} className="shrink-0" />
                          <span>{nextCatMeta.label}</span>
                          <span className="opacity-40">•</span>
                          <span>{nextProject.year}</span>
                        </span>
                      );
                    })()}
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-display text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                      {nextProject.title}
                    </h3>
                    <p className="text-sm sm:text-base font-mono text-neutral-400 max-w-xl truncate">
                      {nextProject.subtitle || nextProject.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-white/[0.05] group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-lg">
                      <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
