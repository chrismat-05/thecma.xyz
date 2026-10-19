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
  Eye,
  Code2,
  Wrench,
  Palette,
  Film
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
  discipline?: string;
  servicesOffered?: string[];
  thumbnail: string;
  images: string[];
  link: string | null;
  github: string | null;
  package: string | null;
  videos?: Array<{ id: string; title: string; src: string; duration?: string; caption?: string }>;
}

export const ProjectsPage: React.FC = () => {
  const allProjects = projectsData as ProjectItem[];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");

  const disciplineFilters = [
    { label: "All Disciplines", value: "all", icon: Layers },
    { label: "Web Development", value: "web-dev", icon: Code2 },
    { label: "Tools & Packages", value: "tools-packages", icon: Wrench },
    { label: "Graphic Designing", value: "graphic-design", icon: Palette },
    { label: "Video Editing", value: "video-editing", icon: Film },
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesDiscipline =
        selectedDiscipline === "all" ||
        project.discipline === selectedDiscipline ||
        (project.servicesOffered && project.servicesOffered.includes(selectedDiscipline));
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.subtitle && project.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesDiscipline && matchesSearch;
    });
  }, [allProjects, selectedDiscipline, searchQuery]);

  // Dynamic hero spotlight project based on active discipline
  const spotlightProject = useMemo(() => {
    if (selectedDiscipline === "graphic-design") {
      return allProjects.find((p) => p.id === "techvista") || allProjects[0];
    }
    if (selectedDiscipline === "video-editing") {
      return allProjects.find((p) => p.id === "airborne-26") || allProjects[0];
    }
    if (selectedDiscipline === "tools-packages") {
      return (
        allProjects.find((p) => p.id === "isitsecure") ||
        allProjects.find((p) => p.id === "req-api") ||
        allProjects[0]
      );
    }
    // "all" or "web-dev"
    return allProjects.find((p) => p.id === "icpf-bengaluru") || allProjects[0];
  }, [allProjects, selectedDiscipline]);

  const spotlightTag = useMemo(() => {
    if (spotlightProject?.discipline === "graphic-design")
      return "Flagship Hackathon Identity & Collateral";
    if (spotlightProject?.discipline === "video-editing")
      return "Flagship Social Media Promo Campaign";
    if (spotlightProject?.discipline === "tools-packages")
      return "Flagship Developer Telemetry Suite";
    return "Flagship Production Platform";
  }, [spotlightProject]);

  const spotlightCatMeta = spotlightProject
    ? getCategoryMeta(spotlightProject.category)
    : null;
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
            A comprehensive interactive repository spanning web architectures, developer tools & packages, graphic design branding, and cinematic video editing.
          </p>
        </div>

        {/* 1. Bento Spotlight Banner (Dynamic Featured Showcase) */}
        {spotlightProject && !searchQuery && (
          <div className="mb-16 rounded-[32px] sm:rounded-[40px] border border-white/15 bg-gradient-to-b from-white/[0.07] via-neutral-950/80 to-black p-6 sm:p-10 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-40 transition-all duration-700"
              style={{ background: spotlightProject.themeColor || "#9333ea" }}
            />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Info */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.05] text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]">
                    <Sparkles size={12} className="text-[#D7E2EA]" />
                    <span>{spotlightTag}</span>
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

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={`/projects/${spotlightProject.id}`}
                    className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-300 hover:bg-neutral-200 shadow-lg shadow-white/10 inline-flex items-center gap-2"
                    data-cursor="button"
                  >
                    <span>Inspect Project</span>
                    <ArrowUpRight size={15} />
                  </Link>

                  {spotlightProject.link && (
                    <a
                      href={spotlightProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full border border-white/20 bg-white/[0.05] hover:border-white/50 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-2"
                      data-cursor="button"
                    >
                      <Globe size={14} />
                      <span>Live Site</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {spotlightProject.github && (
                    <a
                      href={spotlightProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full border border-white/15 bg-white/[0.02] hover:border-white/40 text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-2"
                      data-cursor="button"
                    >
                      <Github size={14} />
                      <span>Code</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column Preview Image */}
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
          {/* Top row: Discipline Tabs & Search Input */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Discipline Filter Tabs */}
            <div className="flex flex-wrap gap-2 items-center p-1.5 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/10 w-fit">
              {disciplineFilters.map((disc) => {
                const isActive = selectedDiscipline === disc.value;
                const count =
                  disc.value === "all"
                    ? allProjects.length
                    : allProjects.filter(
                        (p) =>
                          p.discipline === disc.value ||
                          (p.servicesOffered && p.servicesOffered.includes(disc.value))
                      ).length;
                const DiscIcon = disc.icon;

                return (
                  <button
                    key={disc.value}
                    onClick={() => setSelectedDiscipline(disc.value)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-white text-black font-bold shadow-lg shadow-white/20 scale-105"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    data-cursor="button"
                  >
                    <DiscIcon size={13} className={isActive ? "text-black" : "text-neutral-400"} />
                    <span>{disc.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isActive ? "bg-black/15 text-black font-bold" : "bg-white/10 text-neutral-400"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Bento Interactive Grid of Project Cards */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/15 rounded-3xl p-8">
            <p className="text-neutral-400 font-mono text-sm">
              No projects found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDiscipline("all");
              }}
              className="mt-5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => {
              const targetUrl = project.link || project.package || project.github;
              const actionLabel = project.link
                ? "Live Preview"
                : project.package
                ? "PyPI Package"
                : project.github
                ? "GitHub Source"
                : null;

              const catMeta = getCategoryMeta(project.category);
              const CatIcon = catMeta.icon;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 hover:border-white/30 transition-all duration-500 flex flex-col justify-between overflow-hidden group shadow-xl backdrop-blur-sm hover:shadow-2xl hover:shadow-white/[0.03]"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <Link
                      to={`/projects/${project.id}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-neutral-950 border-b border-white/[0.08]"
                      data-cursor="SELECT"
                    >
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-mono uppercase tracking-wider font-semibold ${catMeta.badgeClass}`}
                        >
                          <CatIcon size={11} className="shrink-0" />
                          <span>{catMeta.shortLabel}</span>
                          <span className="opacity-40">•</span>
                          <span>{project.year}</span>
                        </span>

                        {project.discipline && (
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                            {project.discipline === "graphic-design"
                              ? "Design"
                              : project.discipline === "video-editing"
                              ? "Video"
                              : project.discipline === "tools-packages"
                              ? "Tool"
                              : "Web"}
                          </span>
                        )}
                      </div>

                      {project.featured && (
                        <div className="absolute bottom-3 left-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-mono uppercase tracking-wider text-white">
                          <Sparkles size={10} className="text-white" />
                          <span>Featured</span>
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
                        {project.link ? (
                          <Globe size={13} />
                        ) : project.package ? (
                          <Package size={13} />
                        ) : (
                          <Github size={13} />
                        )}
                        <span>{actionLabel}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <Link
                        to={`/projects/${project.id}`}
                        className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-1.5 mt-4"
                        data-cursor="button"
                      >
                        <span>View Details</span>
                        <ArrowUpRight size={13} />
                      </Link>
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
