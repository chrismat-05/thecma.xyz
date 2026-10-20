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
        const expectedStickyTop = isMobile ? 52 + i * 32 : 64 + i * 44;
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
  }, [featuredProjects, isMobile]);

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
      className="relative w-full pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 md:px-6 select-none bg-[#060606] text-white"
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

      {/* Section Header */}
      <div className="relative z-10 max-w-[1720px] 2xl:max-w-[1920px] mx-auto mb-12 sm:mb-16 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <SplitFlapText
            text="SELECTED WORKS"
            className="text-3xl md:text-6xl font-bold text-white uppercase font-display"
          />
        </div>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="relative z-10 max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col pb-6 sm:pb-8">
        {featuredProjects.map((project, i) => {
          // Tabbed cascading offsets: 32px on mobile, 44px on desktop per stacked card
          const stickyTop = isMobile ? 52 + i * 32 : 64 + i * 44;
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

          const catMeta = getCategoryMeta(project.category);
          const CatIcon = catMeta.icon;

          return (
            <div
              key={project.id || i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-st-card={i}
              onClick={() => handleCardClick(project, i)}
              data-cursor={isCovered ? "SELECT" : "VIEW"}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 transition-all duration-500 shadow-[0_-16px_50px_rgba(0,0,0,0.85)] hover:border-white/30 origin-top min-h-0"
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
              <div className="px-5 sm:px-7 py-3 sm:py-3.5 bg-neutral-900/95 border-b border-white/10 flex items-center justify-between gap-4 transition-colors group-hover:bg-neutral-900">
                {/* Left: Indicator, Index & Project Title */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${activeIndex === i
                      ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse"
                      : "bg-neutral-600"
                      }`}
                  />
                  <span className="font-mono text-xs text-[#D7E2EA] font-bold uppercase tracking-wider shrink-0">
                    // 0{i + 1}
                  </span>
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white uppercase tracking-tight truncate group-hover:text-neutral-200 transition-colors font-display">
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
                  <span className={`px-2.5 py-1 rounded-full border text-[11px] font-mono uppercase tracking-wider font-semibold hidden sm:inline-flex items-center gap-1.5 ${catMeta.badgeClass}`}>
                    <CatIcon size={11} className="shrink-0" />
                    <span>{catMeta.label}</span>
                  </span>
                  <span className="hidden md:inline text-neutral-600">•</span>
                  <span className="text-[#D7E2EA] font-bold font-mono text-xs sm:text-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Full Widescreen Media Stage with Right-Middle Project Details */}
              <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] overflow-hidden bg-black">
                {/* Full-Cover Background Image */}
                <img
                  src={imageSrc}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Subtle base vignette */}
                <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none" />

                {/* Desktop: Smooth organic black shade on the right side behind the text */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-3/5 lg:w-1/2 bg-gradient-to-l from-black/95 via-black/65 to-transparent pointer-events-none z-10" />

                {/* Mobile: Smooth organic black shade at bottom */}
                <div className="md:hidden absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none z-10" />

                {/* Floating Category Pill on Mobile */}
                <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full border backdrop-blur-md text-[10px] font-mono uppercase tracking-wider font-semibold sm:hidden inline-flex items-center gap-1.5 ${catMeta.badgeClass}`}>
                  <CatIcon size={10} className="shrink-0" />
                  <span>{catMeta.label}</span>
                </div>

                {/* Desktop/Tablet Right-Middle Project Details (No card, pure typography with soft dark scrim) */}
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-6 md:right-10 lg:right-16 w-full max-w-md lg:max-w-lg xl:max-w-xl flex-col gap-3.5 z-20 pointer-events-auto">
                  {/* Organic feathered dark shade directly behind the text for high contrast */}
                  <div
                    className="absolute -inset-8 lg:-inset-12 bg-black/90 rounded-full blur-3xl pointer-events-none -z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -inset-4 lg:-inset-6 bg-black/65 rounded-3xl blur-xl pointer-events-none -z-10"
                    aria-hidden="true"
                  />

                  {project.subtitle && (
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D7E2EA] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                      {project.subtitle}
                    </span>
                  )}

                  <p className="text-sm lg:text-base text-white/95 leading-relaxed font-sans line-clamp-3 drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                    {description}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {tags.slice(0, 4).map((item, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-neutral-200 drop-shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${project.id}`);
                      }}
                      className="px-6 py-2.5 lg:py-3 rounded-full border border-white/30 bg-black/80 hover:bg-white hover:text-black backdrop-blur-md text-white font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-[0_4px_25px_rgba(0,0,0,0.8)] hover:shadow-white/20 hover:scale-[1.02]"
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
                        className="p-2.5 lg:p-3 rounded-full border border-white/25 bg-black/80 hover:bg-white/20 backdrop-blur-md text-neutral-200 hover:text-white transition-all shadow-[0_4px_25px_rgba(0,0,0,0.8)] shrink-0"
                        title={actionLabel}
                        aria-label={actionLabel}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile Bottom Project Details */}
                <div className="md:hidden absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col gap-2.5 z-20 pointer-events-auto">
                  {/* Feathered dark shade directly behind mobile text */}
                  <div
                    className="absolute -inset-4 bg-black/85 rounded-2xl blur-xl pointer-events-none -z-10"
                    aria-hidden="true"
                  />

                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-sans line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                    {description}
                  </p>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {tags.slice(0, 3).map((item, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-neutral-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${project.id}`);
                      }}
                      className="flex-1 px-4 py-2 rounded-full border border-white/30 bg-black/85 backdrop-blur-md text-white font-mono text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {targetUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(targetUrl, "_blank", "noopener,noreferrer");
                        }}
                        className="p-2 rounded-full border border-white/25 bg-black/85 backdrop-blur-md text-neutral-200 hover:text-white shrink-0 shadow-md"
                        title={actionLabel}
                        aria-label={actionLabel}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to View Full Archive */}
      <div className="relative z-10 max-w-[1720px] 2xl:max-w-[1920px] mx-auto mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
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