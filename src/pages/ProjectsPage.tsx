import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Github, Globe, Package, ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "@/content/projects.json";
import { CursorGridBackground } from "@/components/backgrounds/CursorGridBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

const ProjectsPage: React.FC = () => {
  const allProjects = projectsData as ProjectItem[];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "Major", value: "major" },
    { label: "Minor & Security", value: "minor" },
    { label: "Academic", value: "college" },
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      <CursorGridBackground />
      <Navigation />

      <main className="container mx-auto px-4 max-w-6xl pt-32 pb-24 relative z-10">
        {/* Header with Back button */}
        <div className="flex flex-col gap-6 mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors w-max"
            data-cursor="button"
          >
            <ArrowLeft size={16} /> Back to Homepage
          </Link>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              // COMPLETE DIRECTORY
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              All Projects &amp; Archives.
            </h1>
            <p className="text-neutral-400 text-base max-w-2xl mt-4">
              Explore the entire repository of applications, open-source packages, cybersecurity utilities, and experimental architectures developed by Chris Mathew Aje.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-6 border-t border-white/[0.08]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="text"
                placeholder="Search by technology, name, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-900/60 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                    selectedCategory === cat.value
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                      : "bg-white/[0.04] text-neutral-400 border border-white/10 hover:text-white hover:bg-white/[0.08]"
                  }`}
                  data-cursor="button"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-neutral-400 font-mono text-sm">
              No projects found matching your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-white/10 text-xs text-white hover:bg-white/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-[#0c0d11] border border-white/[0.08] hover:border-white/25 overflow-hidden flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="aspect-video w-full overflow-hidden bg-neutral-900 relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                      {project.year}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white border border-white/20">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-auto">
                  <div className="flex items-center gap-2 pt-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors"
                        data-cursor="button"
                      >
                        <Globe size={13} /> Visit Site
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-white text-xs font-medium hover:bg-white/10 transition-colors"
                        data-cursor="button"
                      >
                        <Github size={13} /> Code
                      </a>
                    )}
                    {project.package && (
                      <a
                        href={project.package}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-white text-xs font-medium hover:bg-white/10 transition-colors"
                        data-cursor="button"
                      >
                        <Package size={13} /> Package
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
