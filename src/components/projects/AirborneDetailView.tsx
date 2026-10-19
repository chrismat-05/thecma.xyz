import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Video,
  Film,
  Sliders,
  AudioWaveform,
  Sparkles,
  Calendar,
  Layers,
  Flame,
  CheckCircle2,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryMeta } from "@/lib/projectCategories";
import type { ProjectItem, ProjectDetailViewProps } from "@/types/project";

interface VideoClip {
  id: string;
  title: string;
  src: string;
  duration?: string;
  caption?: string;
}

export const AirborneDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  nextProject,
}) => {
  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("0:00");
  const [totalDuration, setTotalDuration] = useState<string>("0:00");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const themeColor = project.themeColor || "#f59e0b";
  const catMeta = getCategoryMeta(project.category);
  const CatIcon = catMeta.icon;

  const videoClips: VideoClip[] = project.videos && project.videos.length > 0
    ? project.videos
    : [
      {
        id: "promo-10d",
        title: "10 Days to Go - Countdown Teaser",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/10daystogo_final.mp4",
        duration: "0:30",
      },
      {
        id: "promo-7d",
        title: "7 Days to Go - Countdown Teaser",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/726sde.mp4",
        duration: "0:15",
      },
      {
        id: "promo-v1",
        title: "Register Now",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/VID_20260922_045107_239_bsl.mp4",
        duration: "0:45",
      },
      {
        id: "promo-v2",
        title: "Camp Announcement",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/VID_20260922_065931_731_bsl.mp4",
        duration: "0:35",
      },
      {
        id: "promo-6d",
        title: "6 Days to Go - Countdown Teaser",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/VID_20260924_022740_885_bsl.mp4",
        duration: "0:50",
      },
      {
        id: "promo-7d",
        title: "7 Days to Go - Countdown Teaser",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/VID_20260924_034426_253_bsl.mp4",
        duration: "0:25",
      },
      {
        id: "promo-9d",
        title: "Registration Call to Action & 9Days Countdown",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/VID_20260924_034435_907_bsl.mp4",
        duration: "0:25",
      },
      {
        id: "promo-v6",
        title: "Registration Call to Action",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/VID_20260925_201438_593_bsl.mp4",
        duration: "0:30",
      },
      {
        id: "promo-v7",
        title: "Registration Call to Action",
        src: "/media/Projects/VideoEditing/Airborne '26 Promo/VID_20260928_084005_377_bsl.mp4",
        duration: "0:35",
      }
    ];

  const currentClip = videoClips[activeClipIndex] || videoClips[0];

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setProgress((cur / dur) * 100);
      setCurrentTime(formatTime(cur));
      setTotalDuration(formatTime(dur));
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSelectClip = (index: number) => {
    setActiveClipIndex(index);
    setIsPlaying(true);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setTimeout(() => {
        videoRef.current?.play();
      }, 50);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newPercent = clickX / rect.width;
      videoRef.current.currentTime = newPercent * (videoRef.current.duration || 1);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      // Auto-play muted on clip change
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [activeClipIndex]);

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
            <span className="px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
              <Film size={13} />
              <span>Video Editing Discipline</span>
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
              DaVinci Resolve & Meta Edits
            </span>

            <span className="px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.06] text-xs font-mono uppercase tracking-wider text-neutral-400">
              ICPF Bengaluru Annual Camp
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
            className="text-lg sm:text-2xl text-amber-300/90 font-mono max-w-3xl leading-relaxed"
          >
            {project.subtitle}
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

        {/* INTERACTIVE VIDEO EDITING THEATER */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                Airborne '26 Promo Collection
              </h2>
            </div>

            <div className="text-xs font-mono text-neutral-400">
              Playing <span className="text-amber-400 font-bold">{activeClipIndex + 1}</span> of {videoClips.length} Reels
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Reel Player (9:16 vertical phone aspect ratio) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-white/20 bg-black shadow-2xl shadow-amber-500/10 group">
                <video
                  ref={videoRef}
                  src={currentClip.src}
                  playsInline
                  loop
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Subtle Amber Top Rim */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none" />

                {/* Play/Pause Center Overlay on Hover or Pause */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform hover:scale-110 cursor-pointer shadow-2xl"
                  >
                    <Play size={28} className="translate-x-0.5 text-amber-400" />
                  </button>
                )}

                {/* Bottom Custom Playback Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
                  {/* Progress Scrubber */}
                  <div
                    onClick={handleSeek}
                    className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/scrub"
                  >
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between text-white text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
                      >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
                        title={isMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {isMuted ? <VolumeX size={15} className="text-amber-400" /> : <Volume2 size={15} />}
                      </button>

                      <span className="text-[11px] text-neutral-400">
                        {currentTime} / {totalDuration}
                      </span>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                      9:16 Reel
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reel Selection Drawer & Breakdown */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-6 rounded-3xl border border-white/10 bg-[#090b10] mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  Active Highlight // {currentClip.duration || "0:30"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white mb-2">
                  {currentClip.title}
                </h3>
                {currentClip.caption && (
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {currentClip.caption}
                  </p>
                )}
              </div>

              {/* Scrollable Reel Cards List */}
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                {videoClips.map((clip, index) => {
                  const isActive = activeClipIndex === index;
                  return (
                    <motion.div
                      key={clip.id}
                      onClick={() => handleSelectClip(index)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${isActive
                        ? "border-amber-400/60 bg-amber-950/20 shadow-lg shadow-amber-500/10"
                        : "border-white/10 bg-[#090b10] hover:border-white/20 hover:bg-white/[0.03]"
                        }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${isActive
                            ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                            : "bg-white/10 text-white"
                            }`}
                        >
                          {isActive ? <Play size={16} fill="black" /> : index + 1}
                        </div>

                        <div>
                          <h4 className={`text-sm font-bold font-sans ${isActive ? "text-amber-300" : "text-white"}`}>
                            {clip.title}
                          </h4>
                          {clip.caption && (
                            <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                              {clip.caption}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-xs font-mono text-neutral-400 block">
                          {clip.duration || "0:30"}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                            Playing
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTION TELEMETRY & EDITING SPECS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1: NLE & Software Pipeline */}
          <div className="rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Sliders size={16} />
                <span>NLE Suite & Tools</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3">
                DaVinci Resolve & Meta Edits
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Utilized DaVinci Resolve's cut and edit pages for precision timing, speed ramping, beat matching, and seamless transition choreography.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Primary NLE:</span>
                <span className="text-amber-300 font-semibold">DaVinci Resolve</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Distribution:</span>
                <span className="text-white">Instagram Reels & Status</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-400">Aspect Ratio:</span>
                <span className="text-white">9:16 Vertical (1080×1920)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Audio Engineering & Sound Design */}
          <div className="rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <AudioWaveform size={16} />
                <span>Audio Engineering</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3">
                Sound Design & Pacing
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Layered high-energy bass drops, riser sweeps, and rhythmic sync to lock visual cuts tightly with musical crescendo points.
              </p>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>Rhythmic Beat-Matched Cuts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>Voiceover EQ & Limiter Compression</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>Custom Whooshes & Cinematic Risers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>Atmospheric Youth Worship Sync</span>
              </div>
            </div>
          </div>

          {/* Card 3: Color Grading & Look Development */}
          <div className="rounded-3xl border border-white/10 bg-[#090b10] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Flame size={16} />
                <span>Color Science</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3">
                Color Grading Pipeline
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Color graded in DaVinci Resolve with warm sunset palettes, skin-tone preservation, and vibrant saturation calibrated for smartphone OLED displays.
              </p>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>OLED Screen Color Calibration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>Golden Hour & Warm Ambient Tones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>Stage Light Highlight Compression</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                <span>Kinetic Typography Motion Blur</span>
              </div>
            </div>
          </div>
        </section>

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
                <span className="text-lg font-bold font-display uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-amber-400 transition-colors">
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-amber-400 transition-colors" />
              </div>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export const VideoEditingDetailView = AirborneDetailView;
export default AirborneDetailView;
