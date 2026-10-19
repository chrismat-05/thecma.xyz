import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
  Palette,
  Type,
  Layers,
  Sparkles,
  Printer,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ZoomIn
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryMeta } from "@/lib/projectCategories";

export interface ProjectItem {
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

interface TechVistaDetailViewProps {
  project: ProjectItem;
  nextProject: ProjectItem | null;
}

interface DesignAsset {
  id: string;
  title: string;
  type: string;
  image: string;
  dimensions: string;
}

export const TechVistaDetailView: React.FC<TechVistaDetailViewProps> = ({
  project,
  nextProject,
}) => {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Lock body scroll and listen for ESC key when lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxOpen]);

  const themeColor = project.themeColor || "#00e5ff";
  const catMeta = getCategoryMeta(project.category);
  const CatIcon = catMeta.icon;

  // Assets catalogued for TechVista or general graphic design
  const designAssets: DesignAsset[] = [
    {
      id: "backdrop",
      title: "Main Stage Backdrop",
      type: "Stage & Venue Collateral",
      image: "/media/Projects/Graphic Design/TechVista/TechVista Backdrop v3.png",
      dimensions: "16:9 Large Format Print",
    },
    {
      id: "poster",
      title: "Official Hackathon Poster",
      type: "Promotional Print & Digital",
      image: "/media/Projects/Graphic Design/TechVista/TechVista Poster v2.png",
      dimensions: "A3 High-Res",
    },
    {
      id: "signage",
      title: "Venue & Navigation Signage",
      type: "Wayfinding & Standee",
      image: "/media/Projects/Graphic Design/TechVista/TechVista Signage v2.png",
      dimensions: "Vertical Standee",
    },
    {
      id: "brochure1",
      title: "Official Brochure — Page 1",
      type: "Event Guide & Rules",
      image: "/media/Projects/Graphic Design/TechVista/Brochure1.png",
      dimensions: "Print Guide (A4 Folded)",
    },
    {
      id: "brochure2",
      title: "Official Brochure — Page 2",
      type: "Tracks & Guidelines",
      image: "/media/Projects/Graphic Design/TechVista/Brochure2.png",
      dimensions: "Print Guide (A4 Folded)",
    },
  ];

  const currentAsset = designAssets[selectedAssetIndex] || designAssets[0];

  const paletteSwatches = [
    { name: "Electric Cyan", hex: "#00E5FF", role: "Primary Accent & Neon Energy" },
    { name: "Deep Obsidian", hex: "#070A13", role: "Core Stage & Negative Space" },
    { name: "Cyber Violet", hex: "#8B5CF6", role: "Gradient Transition & Pacing" },
    { name: "Vibrant Fuchsia", hex: "#EC4899", role: "High-Priority Glow Points" },
    { name: "Pristine White", hex: "#FFFFFF", role: "High-Contrast Typography" },
  ];

  return (
    <div className="relative z-10 pt-28 sm:pt-36 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Top Breadcrumb Nav */}
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
            <span>Return to Works</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
              <Palette size={13} />
              <span>Graphic Design Discipline</span>
            </span>
          </div>
        </motion.div>

        {/* Hero Section */}
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

            <span className="px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.06] text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: themeColor }} />
              Canva & Visual Identity
            </span>

            <span className="px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.06] text-xs font-mono uppercase tracking-wider text-neutral-400">
              Kristu Jayanti Institute of Technology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-display leading-[1.05]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl text-cyan-300/90 font-mono max-w-3xl leading-relaxed"
          >
            "Think Bold, Build Beyond" — National Level 24-Hour Hackathon
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-4xl"
          >
            {project.description}
          </motion.p>
        </div>

        {/* INTERACTIVE ASSET STAGE */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-1">
                // EXHIBITION STAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                Brand Collateral Showcase
              </h2>
            </div>

            {/* Asset Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {designAssets.map((asset, idx) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAssetIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${selectedAssetIndex === idx
                    ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/25"
                    : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                    }`}
                >
                  {asset.title.replace("Official ", "").replace("Main Stage ", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Active Asset Viewer Frame */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#090b10] shadow-2xl group">
            {/* Ambient Backlight */}
            <div
              className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-all duration-700"
              style={{ background: themeColor }}
            />

            <div className="relative flex items-center justify-center p-4 sm:p-10 min-h-[420px] sm:min-h-[580px]">
              <motion.img
                key={currentAsset.id}
                src={currentAsset.image}
                alt={currentAsset.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-h-[600px] w-auto max-w-full object-contain rounded-xl shadow-2xl cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              />

              {/* Lightbox Trigger Button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-6 right-6 p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all shadow-xl hover:scale-105 cursor-pointer"
                title="Expand Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            {/* Asset Metadata Bar */}
            <div className="border-t border-white/10 bg-black/60 backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                    {currentAsset.type}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {currentAsset.dimensions}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white">
                  {currentAsset.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
                  {currentAsset.description}
                </p>
              </div>

              <button
                onClick={() => setLightboxOpen(true)}
                className="shrink-0 px-5 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-300 text-xs font-mono uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <ZoomIn size={14} />
                <span>Inspect High-Res</span>
              </button>
            </div>
          </div>
        </section>

        {/* DESIGN DNA & SPECIFICATIONS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1: Color Palette */}
          <div className="rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3">
                Color Palette
              </h3>
            </div>

            <div className="space-y-3">
              {paletteSwatches.map((swatch) => (
                <div key={swatch.name} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-md border border-white/20 shrink-0 shadow-sm"
                      style={{ background: swatch.hex }}
                    />
                    <span className="text-neutral-300 font-semibold">{swatch.name}</span>
                  </div>
                  <span className="text-neutral-500">{swatch.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Typography & Branding */}
          <div className="rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-8 flex flex-col justify-between">

            <div className="space-y-4 pt-2 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                  Event
                </span>
                <p className="text-lg font-black uppercase tracking-wider text-white font-display">
                  TECHVISTA 2026
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                  Tagline & Philosophy
                </span>
                <p className="text-sm font-mono text-cyan-300 uppercase tracking-widest">
                  THINK BOLD, BUILD BEYOND
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                  Hosting Entity
                </span>
                <p className="text-xs text-neutral-400">
                  Kristu Jayanti Institute of Technology
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FULLSCREEN LIGHTBOX MODAL VIA PORTAL TO BODY */}
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {lightboxOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
                  onClick={() => setLightboxOpen(false)}
                >
                  {/* Fixed Close Button always locked in the visible top-right viewport corner */}
                  <button
                    onClick={() => setLightboxOpen(false)}
                    className="fixed top-6 right-6 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-[10000] border border-white/20 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95"
                    title="Close (ESC)"
                    aria-label="Close Fullscreen"
                  >
                    <X size={24} />
                  </button>

                  <div
                    className="relative max-w-6xl max-h-[82vh] w-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={currentAsset.image}
                      alt={currentAsset.title}
                      className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
                    />
                  </div>

                  <div className="mt-4 text-center select-none" onClick={(e) => e.stopPropagation()}>
                    <h4 className="text-lg font-bold font-display uppercase tracking-tight text-white">
                      {currentAsset.title}
                    </h4>
                    <p className="text-xs font-mono text-cyan-400 mt-1">
                      {currentAsset.dimensions} • Click anywhere or press ESC to close
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}

        {/* Next Project Footer Bar */}
        {nextProject && (
          <div className="pt-16 border-t border-white/10 flex items-center justify-between">
            <Link
              to="/projects"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              ← Back to All Works
            </Link>

            <Link
              to={`/projects/${nextProject.id}`}
              className="group inline-flex items-center gap-3 text-right"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                  Next Project
                </span>
                <span className="text-lg font-bold font-display uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export const GraphicDesignDetailView = TechVistaDetailView;
export default TechVistaDetailView;
