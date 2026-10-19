import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Layers } from "lucide-react";
import projectsData from "@/content/projects.json";
import { SplitFlapText } from "@/components/ui/SplitFlapText";
import { getCategoryMeta } from "@/lib/projectCategories";

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
  client?: string;
  outcome?: string;
}

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Selected Works curated list in exact requested sequence:
  // 1. ICPF Bengaluru, 2. Creators Garage, 3. Airborne '26, 4. IPLocator
  const selectedProjectIds = [
    "icpf-bengaluru",
    "creators-garage",
    "airborne-26",
    "iplocator",
  ];

  const featuredProjects: ProjectItem[] = selectedProjectIds
    .map((id) => (projectsData as ProjectItem[]).find((p) => p.id === id))
    .filter((p): p is ProjectItem => Boolean(p));

  // TristanMedia Active Card Detection via getBoundingClientRect & requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const checkActiveCard = () => {
      if (!containerRef.current) {
        ticking = false;
        return;
      }
      const cards = containerRef.current.querySelectorAll<HTMLDivElement>("[data-st-card]");
      let currentActive = 0;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        // Exact formula from TristanMedia StackedProjects.jsx:
        // top: 72 + i * 52
        const expectedStickyTop = 72 + i * 52;
        if (rect.top <= expectedStickyTop + 25) {
          currentActive = i;
        }
      });
      setActiveIndex(currentActive);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(checkActiveCard);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    checkActiveCard();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [featuredProjects]);

  const handleCardClick = (project: ProjectItem, index: number) => {
    // If clicking an inactive predecessor tab, scroll it into focus
    if (index < activeIndex && cardRefs.current[index]) {
      cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // Navigate to dedicated project page
    navigate(`/projects/${project.id}`);
  };

  if (!featuredProjects || featuredProjects.length === 0) return null;

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative w-full py-20 px-4 md:px-6 select-none bg-[#060606] text-white"
    >
      {/* Ambient Blurred Background Layers (st-scbg from TristanMedia) */}
      <div className="absolute inset-0 left-[calc(50%-50vw)] w-[100vw] overflow-hidden pointer-events-none z-0">
        {featuredProjects.map((project, i) => {
          const bgImg =
            (project.images && project.images[0]) ||
            project.thumbnail ||
            "";
          return (
            <div
              key={`bg-${project.id || i}`}
              className="absolute inset-[-40px] bg-cover bg-center transition-opacity duration-700 ease-out"
              style={{
                backgroundImage: `url("${bgImg}")`,
                filter: "blur(60px) saturate(1.4)",
                transform: "scale(1.12)",
                opacity: activeIndex === i ? 0.38 : 0,
              }}
              aria-hidden="true"
            />
          );
        })}
      </div>

      {/* Section Header (TristanMedia layout) */}
      <div className="relative z-10 max-w-[1720px] 2xl:max-w-[1920px] mx-auto mb-16 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <SplitFlapText
            text="SELECTED WORKS"
            className="text-3xl md:text-6xl font-bold text-white uppercase font-display"
          />
        </div>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="relative z-10 max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-3 sm:px-8 md:px-12 lg:px-16 flex flex-col pb-6 sm:pb-8">
        {featuredProjects.map((project, i) => {
          // Tabbed cascading offsets: 36px on mobile, 52px on desktop per stacked card
          const stickyTop = isMobile ? 56 + i * 36 : 72 + i * 52;
          const imageSrc =
            (project.images && project.images[0]) ||
            project.thumbnail ||
            "";
          const description =
            project.description || project.subtitle || "";
          const tags =
            project.technologies && project.technologies.length > 0
              ? project.technologies
              : project.tags || [];
          const isCovered = activeIndex > i;
          const depthScale = isCovered
            ? Math.max(0.95, 1 - (activeIndex - i) * 0.015)
            : 1.0;
          const targetUrl = project.link || project.github || project.package;
          const actionLabel = project.link
            ? "Live Site"
            : project.package
              ? "View Package"
              : "Source Code";

          return (
            <div
              key={project.id || i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-st-card={i}
              onClick={() => handleCardClick(project, i)}
              data-cursor={isCovered ? "SELECT" : "VIEW"}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-neutral-950/95 transition-all duration-500 shadow-[0_-16px_50px_rgba(0,0,0,0.85)] hover:border-white/30 backdrop-blur-xl origin-top min-h-[360px] sm:min-h-[500px]"
              style={{
                position: "sticky",
                top: `${stickyTop}px`,
                zIndex: i + 1,
                marginTop: i === 0 ? "0px" : "40px",
                transform: `scale(${depthScale})`,
                willChange: "transform",
                filter: isCovered ? "brightness(0.90)" : "brightness(1.0)",
              }}
            >
              {/* Top Hero Header Bar (Always visible when stacked like folder index tabs) */}
              <div className="px-4 sm:px-7 py-3 sm:py-3.5 bg-neutral-900/95 border-b border-white/10 flex items-center justify-between gap-3 sm:gap-4 transition-colors group-hover:bg-neutral-900">
                {/* Left: Indicator, Index & Project Title */}
                <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                  <span
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 transition-all ${activeIndex === i
                      ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse"
                      : "bg-neutral-600"
                      }`}
                  />
                  <span className="font-mono text-[11px] sm:text-xs text-[#D7E2EA] font-bold uppercase tracking-wider shrink-0">
                    // 0{i + 1}
                  </span>
                  <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white uppercase tracking-tight truncate group-hover:text-neutral-200 transition-colors font-display">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <span className="hidden xl:inline text-xs font-mono text-neutral-400 truncate max-w-xs">
                      - {project.subtitle}
                    </span>
                  )}
                </div>

                {/* Right: Category, Year */}
                <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs text-neutral-400 shrink-0">
                  {(() => {
                    const catMeta = getCategoryMeta(project.category);
                    const CatIcon = catMeta.icon;
                    return (
                      <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold hidden sm:inline-flex items-center gap-1.5 ${catMeta.badgeClass}`}>
                        <CatIcon size={11} className="shrink-0" />
                        <span>{catMeta.label}</span>
                      </span>
                    );
                  })()}
                  <span className="hidden md:inline text-neutral-600">•</span>
                  <span className="text-[#D7E2EA] font-bold font-mono text-xs sm:text-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Widescreen Media Viewport */}
              <div className="relative w-full h-[220px] sm:h-[380px] md:h-[460px] lg:h-[520px] overflow-hidden bg-black">
                <img
                  src={imageSrc}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

                {/* Floating Category Pill */}
                {(() => {
                  const catMeta = getCategoryMeta(project.category);
                  const CatIcon = catMeta.icon;
                  return (
                    <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border backdrop-blur-md text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold sm:hidden inline-flex items-center gap-1.5 ${catMeta.badgeClass}`}>
                      <CatIcon size={10} className="shrink-0" />
                      <span>{catMeta.label}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Card Editorial Footer */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 bg-neutral-950/80">
                <div className="max-w-3xl space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-sans line-clamp-2">
                    {description}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                      {tags.slice(0, 4).map((item, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.id}`);
                    }}
                    className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 bg-gradient-to-b from-white/10 via-neutral-900/60 to-black hover:border-white/50 hover:bg-white/[0.08] text-[#D7E2EA] hover:text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-white/[0.05]"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  {targetUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(targetUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="p-2.5 sm:p-3 rounded-full border border-white/15 hover:border-white/40 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all shadow-md shrink-0"
                      title={actionLabel}
                      aria-label={actionLabel}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to View Full Archive */}
      <div className="relative z-10 max-w-[1720px] 2xl:max-w-[1920px] mx-auto mt-24 pt-10 border-t border-white/10 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h4 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight">
            Looking to explore more creations &amp; projects?
          </h4>
          <p className="text-xs md:text-sm text-neutral-400 font-sans mt-1">
            Browse all works across full-stack engineering, developer tools, graphic design, and cinematic video editing.
          </p>
        </div>

        <Link
          to="/projects"
          data-cursor="VIEW"
          className="group inline-flex items-center gap-2 rounded-full border border-white/25 hover:border-white/60 text-[#D7E2EA] hover:text-white bg-gradient-to-b from-white/10 via-neutral-900/60 to-black px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.06)] shrink-0"
        >
          <span>View All Works</span>
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default Projects;