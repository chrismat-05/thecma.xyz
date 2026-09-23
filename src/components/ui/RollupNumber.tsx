import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface RollupNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  replayOnHover?: boolean;
}

export const RollupNumber: React.FC<RollupNumberProps> = ({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
  replayOnHover = true,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(
    decimals > 0 ? (0).toFixed(decimals) : "0"
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  const startRollup = () => {
    animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo: fast responsive start with smooth deceleration
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(decimals));
      },
    });
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      startRollup();
    }
  }, [isInView, hasAnimated, value, decimals, duration]);

  const handleMouseEnter = () => {
    if (replayOnHover) {
      startRollup();
    }
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={`tabular-nums inline-flex items-baseline select-none ${className}`}
    >
      {prefix && <span>{prefix}</span>}
      <span>{displayValue}</span>
      {suffix && <span className="text-neutral-400 font-sans ml-0.5">{suffix}</span>}
    </span>
  );
};
