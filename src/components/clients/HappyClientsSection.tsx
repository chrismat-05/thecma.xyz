import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SplitFlapText } from "@/components/ui/SplitFlapText";
import { RollupNumber } from "@/components/ui/RollupNumber";
import clientsData from "@/content/happyclients.json";

interface HappyClient {
  id?: string;
  name: string;
  logo?: string;
  work: string;
  link?: string;
}

export const HappyClientsSection: React.FC = () => {
  const metrics = [
    { label: "Products Shipped", value: 15, suffix: "+", decimals: 0 },
    { label: "Client Satisfaction", value: 99.8, suffix: "%", decimals: 1 },
  ];

  const clients: HappyClient[] = clientsData;

  // Duplicated array to guarantee seamless infinite loop
  const marqueeItems = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-24 relative overflow-hidden bg-neutral-950/60 border-y border-white/[0.06]">
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
              <SplitFlapText
                text="Trusted By:"
                onHoverTrigger={true}
              />
            </h3>
            <p className="text-sm sm:text-base font-luxury-sub text-neutral-400 mt-2 tracking-wide font-normal">
              Founders, creators, communities &amp; early-stage teams.
            </p>
          </div>

          {/* Metrics summary: 2 clean metrics with rollup animation */}
          <div className="grid grid-cols-2 gap-8 border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-8">
            {metrics.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="flex flex-col group cursor-default"
              >
                <span className="text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight flex items-baseline group-hover:text-emerald-400 transition-colors duration-300">
                  <RollupNumber
                    value={m.value}
                    decimals={m.decimals}
                    suffix={m.suffix}
                    duration={2}
                    replayOnHover={true}
                  />
                </span>
                <span className="text-xs text-neutral-400 mt-1 uppercase tracking-wider group-hover:text-neutral-200 transition-colors duration-300">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Single Row Borderless Marquee Track */}
      <div
        className="relative w-full overflow-hidden py-12"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="animate-marquee-scroll flex items-center gap-14 sm:gap-20 md:gap-24 w-max">
          {marqueeItems.map((item, index) => {
            const clientContent = (
              <>
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-8 md:h-10 w-auto max-w-[160px] object-contain filter grayscale opacity-40 group-hover:filter-none group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-500 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-all duration-300 font-['Space_Grotesk'] whitespace-nowrap">
                    {item.name}
                  </span>
                )}

                {/* One-liner work reveal tooltip on hover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-bottom-6 transition-all duration-300 pointer-events-none z-30 whitespace-nowrap">
                  <div className="px-4 py-1.5 rounded-full bg-neutral-900/95 border border-white/20 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.85)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-xs font-medium text-[#D7E2EA] font-sans">
                      {item.work}
                    </span>
                    {item.link && (
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 transition-colors shrink-0" />
                    )}
                  </div>
                </div>
              </>
            );

            return item.link ? (
              <a
                key={`${item.name}-${index}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center cursor-pointer select-none py-4 outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 rounded-lg"
                title={`Visit ${item.name}`}
              >
                {clientContent}
              </a>
            ) : (
              <div
                key={`${item.name}-${index}`}
                className="group relative flex items-center cursor-default select-none py-4"
              >
                {clientContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
