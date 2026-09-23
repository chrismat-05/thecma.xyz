import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Github,
  Globe,
  Package,
  ArrowUpRight,
  Sparkles,
  Layers,
  X,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "@/content/projects.json";
import { CursorGridBackground } from "@/components/backgrounds/CursorGridBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import servicesData from "@/content/services.json";

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
  servicesOffered?: string[];
  thumbnail: string;
  images: string[];
  link: string | null;
  github: string | null;
  package: string | null;
}

export const ProjectsPage: React.FC = () => {
  const allProjects = projectsData as ProjectItem[];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);

  const serviceFilters = [
    { label: "All Services", value: "all" },
    ...servicesData.map((s) => ({
      label: s.title,
      value: s.id,
    })),
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesService =
        selectedService === "all" ||
        (project.servicesOffered && project.servicesOffered.includes(selectedService));
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.subtitle && project.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesService && matchesSearch;
    });
  }, [allProjects, selectedService, searchQuery]);

  // Spotlight featured project (defaults to forms-thecma or first project)
  const spotlightProject = useMemo(() => {
    return allProjects.find((p) => p.featured && p.id === "forms-thecma") || allProjects[0];
  }, [allProjects]);

  return (
    <div className="min-h-screen bg-[#070709] text-white relative selection:bg-white selection:text-black">
      <CursorGridBackground opacity={0.4} />
      <Navigation />

      <main className="container mx-auto px-4 max-w-7xl pt-32 sm:pt-36 pb-28 relative z-10">
        {/* Top Breadcrumb & Return to Portfolio */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            data-cursor="button"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{allProjects.length} Catalogued Systems</span>
          </div>
        </div>

        {/* Hero Title & Ethos */}
        <div className="mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/80 font-mono block mb-2 font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D7E2EA]" />
            ARCHIVE DIRECTORY // ALL EXPERIMENTAL &amp; PRODUCTION WORKS
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase font-display">
            Selected Works &amp; Code.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans">
            A comprehensive interactive repository of web architectures, security telemetry tools, open-source packages, and creative applications.
          </p>
        </div>

        {/* 1. Bento Spotlight Banner (Dynamic Featured Showcase) */}
        {spotlightProject && selectedCategory === "all" && !searchQuery && (
          <div className="mb-16 rounded-[32px] sm:rounded-[40px] border border-white/15 bg-gradient-to-b from-white/[0.07] via-neutral-950/80 to-black p-6 sm:p-10 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-40"
              style={{ background: spotlightProject.themeColor || "#9333ea" }}
            />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Info */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.05] text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]">
                  <Sparkles size={12} className="text-[#D7E2EA]" />
                  <span>Flagship Production Platform</span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-display tracking-tight">
                    {spotlightProject.title}
                  </h2>
                  <p className="text-neutral-400 font-mono text-xs uppercase tracking-wider mt-1">
                    {spotlightProject.subtitle}
                  </p>
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {spotlightProject.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {spotlightProject.technologies.slice(0, 6).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.05] border border-white/10 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Services Offered Badges */}
                {spotlightProject.servicesOffered && spotlightProject.servicesOffered.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {spotlightProject.servicesOffered.map((srvId) => {
                      const srv = servicesData.find((s) => s.id === srvId);
                      if (!srv) return null;
                      return (
                        <span
                          key={srvId}
                          className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.08] border border-white/20 text-[#D7E2EA] flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {srv.title}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {spotlightProject.link && (
                    <a
                      href={spotlightProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3 rounded-full border border-white/25 bg-gradient-to-b from-white/15 via-white/[0.05] to-black hover:border-white/60 text-[#D7E2EA] hover:text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold transition-all flex items-center gap-2 shadow-lg"
                      data-cursor="button"
                    >
                      <Globe size={14} />
                      <span>Live Platform</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => setPreviewProject(spotlightProject)}
                    className="px-6 py-3 rounded-full border border-white/15 hover:border-white/40 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                    data-cursor="button"
                  >
                    Deep Inspection
                  </button>
                </div>
              </div>

              {/* Right Column Showcase Visual */}
              <div className="lg:col-span-6">
                <div
                  onClick={() => setPreviewProject(spotlightProject)}
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 relative group/img cursor-pointer shadow-2xl"
                  data-cursor="SELECT"
                >
                  <img
                    src={spotlightProject.thumbnail}
                    alt={spotlightProject.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-neutral-300">
                    <span>Click to view gallery ({spotlightProject.images.length} screens)</span>
                    <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar & Interactive Search */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-10 pb-6 border-b border-white/10">
          {/* Service Filter Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            {serviceFilters.map((s) => {
              const isActive = selectedService === s.value;
              const count =
                s.value === "all"
                  ? allProjects.length
                  : allProjects.filter((p) => p.servicesOffered?.includes(s.value)).length;

              return (
                <button
                  key={s.value}
                  onClick={() => setSelectedService(s.value)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-white text-black font-bold shadow-lg shadow-white/15 scale-105"
                      : "bg-white/[0.03] text-neutral-400 border border-white/10 hover:text-white hover:border-white/30"
                  }`}
                  data-cursor="button"
                >
                  <span>{s.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-black/15 text-black font-mono font-bold" : "bg-white/10 text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search stack, title, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-neutral-900/80 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white text-xs font-mono transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 2. Bento Interactive Grid of Project Cards */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/15 rounded-3xl p-8">
            <p className="text-neutral-400 font-mono text-sm">
              No repositories or systems found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedService("all");
              }}
              className="mt-5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
              data-cursor="button"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => {
              const actionLabel = project.link
                ? "Live Site"
                : project.package
                ? "Package"
                : "Source Code";
              const targetUrl = project.link || project.package || project.github;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-[28px] bg-gradient-to-b from-neutral-900/80 via-neutral-950/90 to-black border border-white/10 hover:border-white/30 overflow-hidden flex flex-col justify-between group transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-black origin-top"
                >
                  <div>
                    {/* Card Media Viewport */}
                    <div
                      onClick={() => setPreviewProject(project)}
                      className="aspect-video w-full overflow-hidden bg-neutral-950 relative cursor-pointer group/thumb"
                      data-cursor="VIEW"
                    >
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out filter brightness-95 group-hover/thumb:brightness-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Header tags inside image */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-300">
                          {project.category.toUpperCase()}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#D7E2EA] font-semibold">
                          {project.year}
                        </span>
                      </div>

                      {project.images && project.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-400">
                          +{project.images.length} images
                        </div>
                      )}
                    </div>

                    {/* Card Editorial Info */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-neutral-100 transition-colors tracking-tight font-display">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <p className="text-xs font-mono text-neutral-400 mt-1 truncate">
                            {project.subtitle}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed font-sans">
                        {project.description}
                      </p>

                      {/* Technologies Telemetry Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 5).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Services Offered Badges */}
                      {project.servicesOffered && project.servicesOffered.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {project.servicesOffered.map((srvId) => {
                            const srv = servicesData.find((s) => s.id === srvId);
                            if (!srv) return null;
                            return (
                              <span
                                key={srvId}
                                className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/[0.08] text-[#D7E2EA] border border-white/15"
                              >
                                {srv.title}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0 border-t border-white/[0.08] flex items-center justify-between gap-3 mt-auto">
                    <button
                      onClick={() => setPreviewProject(project)}
                      className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors pt-4 inline-flex items-center gap-1"
                      data-cursor="button"
                    >
                      <span>Preview</span>
                      <ChevronRight size={14} />
                    </button>

                    <div className="flex items-center gap-2 pt-4">
                      {targetUrl && (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full border border-white/20 bg-gradient-to-b from-white/10 via-neutral-900/60 to-black hover:border-white/50 text-[#D7E2EA] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-1.5 shadow-md"
                          data-cursor="button"
                        >
                          {project.link ? <Globe size={13} /> : project.package ? <Package size={13} /> : <Github size={13} />}
                          <span>{actionLabel}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 3. Interactive Quick-Preview Modal */}
        <AnimatePresence>
          {previewProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl"
              onClick={() => setPreviewProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl max-h-[90vh] rounded-[32px] border border-white/20 bg-neutral-950 p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl relative"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      // {previewProject.category.toUpperCase()} SYSTEM
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">
                      {previewProject.title}
                    </h3>
                    {previewProject.subtitle && (
                      <p className="text-xs font-mono text-neutral-400 mt-1">
                        {previewProject.subtitle}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setPreviewProject(null)}
                    className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors bg-white/[0.03]"
                    data-cursor="button"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Gallery */}
                <div className="space-y-4">
                  <div className="w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/15 bg-black">
                    <img
                      src={previewProject.thumbnail}
                      alt={previewProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {previewProject.images && previewProject.images.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {previewProject.images.slice(0, 4).map((img, i) => (
                        <div
                          key={i}
                          className="h-20 sm:h-24 rounded-xl overflow-hidden border border-white/10 bg-neutral-900"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Narrative & Tech */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
                    System Architecture &amp; Overview
                  </h4>
                  <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                    {previewProject.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-mono text-neutral-400 block mb-2">Technologies Used:</span>
                    <div className="flex flex-wrap gap-2">
                      {previewProject.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-xs font-mono text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {previewProject.servicesOffered && previewProject.servicesOffered.length > 0 && (
                    <div className="pt-2">
                      <span className="text-xs font-mono text-neutral-400 block mb-2">Services Delivered:</span>
                      <div className="flex flex-wrap gap-2">
                        {previewProject.servicesOffered.map((srvId) => {
                          const srv = servicesData.find((s) => s.id === srvId);
                          if (!srv) return null;
                          return (
                            <span
                              key={srvId}
                              className="px-3 py-1 rounded-lg bg-white/[0.08] border border-white/20 text-xs font-mono text-white flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {srv.title}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Action Bar */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono text-neutral-500">
                    Release Year: {previewProject.year}
                  </span>

                  <div className="flex items-center gap-3">
                    {previewProject.github && (
                      <a
                        href={previewProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-white/[0.05] transition-colors"
                        data-cursor="button"
                      >
                        <Github size={14} /> Source Code
                      </a>
                    )}
                    {previewProject.package && (
                      <a
                        href={previewProject.package}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-white/[0.05] transition-colors"
                        data-cursor="button"
                      >
                        <Package size={14} /> Package
                      </a>
                    )}
                    {previewProject.link && (
                      <a
                        href={previewProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full border border-white/25 bg-gradient-to-b from-white/15 via-white/[0.05] to-black hover:border-white/60 text-[#D7E2EA] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 shadow-lg"
                        data-cursor="button"
                      >
                        <Globe size={14} /> Live Site <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
