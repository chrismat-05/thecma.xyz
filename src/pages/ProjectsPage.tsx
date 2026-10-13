import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Github,
  Globe,
  Package,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "@/content/projects.json";
import { CursorGridBackground } from "@/components/backgrounds/CursorGridBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import servicesData from "@/content/services.json";
import { getCategoryMeta } from "@/lib/projectCategories";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryFilters = [
    { label: "All Projects", value: "all" },
    { label: "Client Projects", value: "client" },
    { label: "Personal Projects", value: "personal" },
    { label: "College Projects", value: "college" },
  ];

  const serviceFilters = [
    { label: "All Services", value: "all" },
    ...servicesData.map((s) => ({
      label: s.title,
      value: s.id,
    })),
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (project.category && project.category.toLowerCase() === selectedCategory.toLowerCase());
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
      return matchesCategory && matchesService && matchesSearch;
    });
  }, [allProjects, selectedCategory, selectedService, searchQuery]);

  // Spotlight featured project (defaults to forms-thecma or first project)
  const spotlightProject = useMemo(() => {
    return allProjects.find((p) => p.featured && p.id === "forms-thecma") || allProjects[0];
  }, [allProjects]);

  const spotlightCatMeta = spotlightProject ? getCategoryMeta(spotlightProject.category) : null;
  const SpotlightCatIcon = spotlightCatMeta?.icon;

  return (
    <div className="min-h-screen bg-[#070709] text-white relative flex flex-col selection:bg-white selection:text-black">
      <CursorGridBackground opacity={0.4} />
      <Navigation />

      <main className="container mx-auto px-4 max-w-7xl pt-32 sm:pt-36 pb-28 relative z-10 flex-1">
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

        </div>

        {/* Hero Title & Ethos */}
        <div className="mb-14">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase font-display">
            Portfolio
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-sans">
            A comprehensive interactive repository of web architectures, security telemetry tools, open-source packages, and creative applications.
          </p>
        </div>

        {/* 1. Bento Spotlight Banner (Dynamic Featured Showcase) */}
        {spotlightProject && selectedService === "all" && !searchQuery && (
          <div className="mb-16 rounded-[32px] sm:rounded-[40px] border border-white/15 bg-gradient-to-b from-white/[0.07] via-neutral-950/80 to-black p-6 sm:p-10 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-40"
              style={{ background: spotlightProject.themeColor || "#9333ea" }}
            />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Info */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.05] text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]">
                    <Sparkles size={12} className="text-[#D7E2EA]" />
                    <span>Flagship Production Platform</span>
                  </div>
                  {spotlightCatMeta && SpotlightCatIcon && (
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-mono uppercase tracking-wider font-semibold ${spotlightCatMeta.badgeClass}`}
                    >
                      <SpotlightCatIcon size={12} className="shrink-0" />
                      <span>{spotlightCatMeta.label}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Link to={`/projects/${spotlightProject.id}`} className="group/title block">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-display tracking-tight group-hover/title:text-neutral-200 transition-colors">
                      {spotlightProject.title}
                    </h2>
                  </Link>
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
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    {spotlightProject.link ? (
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
                    ) : spotlightProject.github ? (
                      <a
                        href={spotlightProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3 rounded-full border border-white/25 bg-gradient-to-b from-white/15 via-white/[0.05] to-black hover:border-white/60 text-[#D7E2EA] hover:text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold transition-all flex items-center gap-2 shadow-lg"
                        data-cursor="button"
                      >
                        <Github size={14} />
                        <span>Source Code</span>
                        <ArrowUpRight size={14} />
                      </a>
                    ) : null}
                  </div>

                  {/* Icon-based button aligned to the right to open project */}
                  <Link
                    to={`/projects/${spotlightProject.id}`}
                    className="w-12 h-12 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 hover:border-white/50 text-[#D7E2EA] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg group/modalbtn ml-auto"
                    title="View Project"
                    aria-label="View Project"
                    data-cursor="button"
                  >
                    <Eye size={20} className="group-hover/modalbtn:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column Showcase Visual */}
              <div className="lg:col-span-6">
                <Link
                  to={`/projects/${spotlightProject.id}`}
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 relative group/img cursor-pointer shadow-2xl block"
                  data-cursor="SELECT"
                >
                  <img
                    src={spotlightProject.thumbnail}
                    alt={spotlightProject.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-neutral-300">
                    <Eye size={12} className="text-[#D7E2EA]" />
                    <span>Explore Project</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar & Interactive Search */}
        <div className="flex flex-col gap-5 mb-10 pb-6 border-b border-white/10">
          {/* Top row: Category Tabs & Search Input */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 items-center p-1 rounded-full bg-white/[0.03] border border-white/10 w-fit">
              {categoryFilters.map((cat) => {
                const isActive = selectedCategory === cat.value;
                const count =
                  cat.value === "all"
                    ? allProjects.length
                    : allProjects.filter((p) => p.category?.toLowerCase() === cat.value).length;
                const catMeta = cat.value !== "all" ? getCategoryMeta(cat.value) : null;
                const CatIcon = catMeta?.icon;

                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${isActive
                        ? "bg-white text-black font-bold shadow-lg shadow-white/20 scale-105"
                        : "text-neutral-400 hover:text-white"
                      }`}
                    data-cursor="button"
                  >
                    {CatIcon && <CatIcon size={13} className={isActive ? "text-black" : "text-neutral-400"} />}
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isActive ? "bg-black/15 text-black font-bold" : "bg-white/10 text-neutral-400"
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
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

          {/* Sub row: Services Offered Filter Chips */}
          <div className="flex flex-wrap gap-2 items-center pt-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mr-1">
              Domain:
            </span>
            {serviceFilters.map((s) => {
              const isActive = selectedService === s.value;
              const count =
                s.value === "all"
                  ? allProjects.filter((p) =>
                    selectedCategory === "all" || p.category?.toLowerCase() === selectedCategory
                  ).length
                  : allProjects.filter(
                    (p) =>
                      (selectedCategory === "all" || p.category?.toLowerCase() === selectedCategory) &&
                      p.servicesOffered?.includes(s.value)
                  ).length;

              return (
                <button
                  key={s.value}
                  onClick={() => setSelectedService(s.value)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${isActive
                      ? "bg-white/20 border border-white/50 text-white font-semibold"
                      : "bg-white/[0.02] text-neutral-400 border border-white/10 hover:text-neutral-200 hover:border-white/20"
                    }`}
                  data-cursor="button"
                >
                  <span>{s.label}</span>
                  <span className="text-[10px] text-neutral-400">({count})</span>
                </button>
              );
            })}
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

              const catMeta = getCategoryMeta(project.category);
              const CatIcon = catMeta.icon;

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
                    <Link
                      to={`/projects/${project.id}`}
                      className="aspect-video w-full overflow-hidden bg-neutral-950 relative cursor-pointer group/thumb block"
                      data-cursor="VIEW"
                    >
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out filter brightness-95 group-hover/thumb:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Header tags inside image */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono uppercase tracking-wider font-semibold ${catMeta.badgeClass}`}
                        >
                          <CatIcon size={11} className="shrink-0" />
                          <span>{catMeta.label}</span>
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
                    </Link>

                    {/* Card Editorial Info */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <div>
                        <Link to={`/projects/${project.id}`} className="group/title block">
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover/title:text-neutral-200 transition-colors tracking-tight font-display">
                            {project.title}
                          </h3>
                        </Link>
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
                    {targetUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full border border-white/20 bg-gradient-to-b from-white/10 via-neutral-900/60 to-black hover:border-white/50 text-[#D7E2EA] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-1.5 shadow-md mt-4"
                        data-cursor="button"
                      >
                        {project.link ? <Globe size={13} /> : project.package ? <Package size={13} /> : <Github size={13} />}
                        <span>{actionLabel}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <div className="mt-4" />
                    )}

                    {/* Icon-based button aligned to the right to open project */}
                    <Link
                      to={`/projects/${project.id}`}
                      className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 hover:border-white/50 text-[#D7E2EA] hover:text-white flex items-center justify-center transition-all duration-300 shadow-md group/modalbtn ml-auto mt-4"
                      title="View Project"
                      aria-label="View Project"
                      data-cursor="button"
                    >
                      <Eye size={15} className="group-hover/modalbtn:scale-110 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
