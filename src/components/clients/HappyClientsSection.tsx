import React from "react";
import { motion } from "framer-motion";
import { SplitFlapText } from "@/components/ui/SplitFlapText";
import clientsData from "@/content/happyclients.json";

interface HappyClient {
  id?: string;
  name: string;
  logo?: string;
  work: string;
}

export const HappyClientsSection: React.FC = () => {
  const metrics = [
    { label: "Products Shipped", value: "15+" },
    { label: "Client Satisfaction", value: "99.8%" },
  ];

  const clients: HappyClient[] = clientsData;

  // Duplicated array to guarantee seamless infinite loop
  const marqueeItems = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-24 relative overflow-hidden bg-neutral-950/60 border-y border-white/[0.06]">
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              <SplitFlapText
                text="Collaborating with forward-thinking teams."
                onHoverTrigger={true}
              />
            </h3>
          </div>

          {/* Metrics summary: 2 clean metrics */}
          <div className="grid grid-cols-2 gap-8 border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-8">
            {metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold font-mono text-white">
                  {m.value}
                </span>
                <span className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
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
        <motion.div
          className="flex items-center gap-14 sm:gap-20 md:gap-24 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="group relative flex items-center cursor-pointer select-none py-4"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-[#D7E2EA] font-sans">
                    {item.work}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
