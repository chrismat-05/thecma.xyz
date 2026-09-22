import React from "react";
import { ArrowUpRight } from "lucide-react";

interface LiveProjectButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  label = "Live Project",
  className = "",
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:text-white hover:bg-[#D7E2EA]/10 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${className}`}
      data-cursor="button"
      data-magnetic="true"
    >
      <span>{label}</span>
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
};

export default LiveProjectButton;
