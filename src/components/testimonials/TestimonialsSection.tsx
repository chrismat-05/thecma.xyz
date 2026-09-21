import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, ExternalLink } from "lucide-react";
import testimonialsData from "@/content/testimonials.json";
import { SectionTitleReveal } from "@/components/ui/SectionTitleReveal";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  website: string;
  avatar: string;
  rating: number;
  verified: boolean;
  quote: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials = testimonialsData as Testimonial[];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -80) {
      nextCard();
    } else if (info.offset.x > 80) {
      prevCard();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitleReveal
          badge="// CLIENT PERSPECTIVES"
          title="Endorsements & Testimonials."
          subtitle="Feedback from enterprise founders, engineering leads, and creative partners."
          align="center"
        />

        {/* 3D Stacked Deck Container */}
        <div className="relative max-w-2xl mx-auto h-[440px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => {
            // Determine relative position from activeIndex
            const position = (index - activeIndex + testimonials.length) % testimonials.length;

            // Only render top 3 cards for the 3D stack
            if (position > 2) return null;

            const isFront = position === 0;
            const yOffset = position * 16;
            const scale = 1 - position * 0.06;
            const zIndex = 30 - position * 10;
            const opacity = 1 - position * 0.28;
            const blur = position === 0 ? 0 : position * 2;

            return (
              <motion.div
                key={testimonial.id}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={isFront ? handleDragEnd : undefined}
                animate={{
                  y: yOffset,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`absolute inset-0 rounded-3xl p-8 sm:p-10 bg-[#0d0e12] border border-white/[0.12] shadow-2xl shadow-black/90 flex flex-col justify-between ${
                  isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
                style={{ willChange: "transform" }}
                data-cursor-text={isFront ? "Swipe" : undefined}
              >
                {/* Large decorative quotation mark & Star rating */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < testimonial.rating
                              ? "fill-white text-white"
                              : "text-neutral-700"
                          }
                        />
                      ))}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-400">
                      <Quote size={18} />
                    </div>
                  </div>

                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-100 font-normal leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Client Avatar & Meta */}
                <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-sm sm:text-base">
                          {testimonial.name}
                        </span>
                        {testimonial.verified && (
                          <CheckCircle
                            size={14}
                            className="text-white fill-white/20"
                            title="Verified Client"
                          />
                        )}
                      </div>
                      <p className="text-xs text-neutral-400">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {testimonial.website && (
                    <a
                      href={testimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                      title="Visit Client Website"
                      data-cursor="button"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deck Controls & Pagination Indicator */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={prevCard}
            aria-label="Previous testimonial"
            className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
            data-cursor="button"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            aria-label="Next testimonial"
            className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
            data-cursor="button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
