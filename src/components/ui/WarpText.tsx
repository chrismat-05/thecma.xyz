import React, { useRef, useState, useEffect, useCallback } from "react";

interface WarpTextProps {
  text: string;
  className?: string;
  intensity?: number;
  radius?: number;
  fontFamily?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
}

export const WarpText: React.FC<WarpTextProps> = ({
  text,
  className = "",
  intensity = 1.0,
  radius = 180,
  as: Component = "span",
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Track cursor globally across the window with direct client coordinates
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePos(null);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Split into words, then characters to maintain word-break flow
  const words = text.split(" ");

  return (
    <Component
      ref={containerRef as any}
      className={`relative inline-flex flex-wrap items-center justify-center cursor-default select-none group/warp ${className}`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex whitespace-nowrap mr-[0.28em]">
          {word.split("").map((char, cIdx) => (
            <WarpChar
              key={`${wIdx}-${cIdx}-${char}`}
              char={char}
              containerRef={containerRef}
              mousePos={mousePos}
              isHovering={isHovering}
              intensity={intensity}
              radius={radius}
            />
          ))}
        </span>
      ))}
    </Component>
  );
};

interface WarpCharProps {
  char: string;
  containerRef: React.RefObject<HTMLElement | null>;
  mousePos: { x: number; y: number } | null;
  isHovering: boolean;
  intensity: number;
  radius: number;
}

const WarpChar: React.FC<WarpCharProps> = ({
  char,
  containerRef,
  mousePos,
  isHovering,
  intensity,
  radius,
}) => {
  const charRef = useRef<HTMLSpanElement | null>(null);
  const [transform, setTransform] = useState<{
    x: number;
    y: number;
    scale: number;
    rotate: number;
    rgbShift: number;
  }>({
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    rgbShift: 0,
  });

  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovering || !mousePos || !charRef.current || !containerRef.current) {
      // Spring back to home state
      setTransform({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        rgbShift: 0,
      });
      return;
    }

    const charRect = charRef.current.getBoundingClientRect();

    const charCenterX = charRect.left + charRect.width / 2;
    const charCenterY = charRect.top + charRect.height / 2;

    const dx = mousePos.x - charCenterX;
    const dy = mousePos.y - charCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const force = Math.pow(1 - dist / radius, 1.4) * 38 * intensity;
      const angle = Math.atan2(dy, dx);
      // Fluid repulsion and dynamic chromatic shear
      const targetX = -Math.cos(angle) * force * 1.1;
      const targetY = -Math.sin(angle) * force * 1.3;
      const targetScale = 1 + (force / 38) * 0.22;
      const targetRotate = (targetX / 14) * 10;
      const targetShift = (force / 38) * 8;

      setTransform({
        x: targetX,
        y: targetY,
        scale: targetScale,
        rotate: targetRotate,
        rgbShift: targetShift,
      });
    } else {
      setTransform({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        rgbShift: 0,
      });
    }
  }, [mousePos, isHovering, intensity, radius, containerRef]);

  return (
    <span
      ref={charRef}
      className="inline-block relative transition-transform duration-150 ease-out select-none"
      style={{
        transform: `translate3d(${transform.x.toFixed(2)}px, ${transform.y.toFixed(2)}px, 0px) scale(${transform.scale.toFixed(2)}) rotate(${transform.rotate.toFixed(2)}deg)`,
        willChange: "transform",
      }}
    >
      {/* Front crisp letter inheriting text-fill or gradient styling */}
      <span className="relative z-10 font-black">{char}</span>

      {/* ReactBits Chromatic aberration RGB warp channels */}
      {transform.rgbShift > 0.3 && (
        <>
          {/* Red/Cyan channel */}
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none text-cyan-400 opacity-80 mix-blend-screen select-none font-black"
            style={{
              transform: `translate3d(${(-transform.rgbShift).toFixed(2)}px, 0, 0)`,
            }}
          >
            {char}
          </span>
          {/* Magenta/Yellow channel */}
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none text-red-500 opacity-80 mix-blend-screen select-none font-black"
            style={{
              transform: `translate3d(${(transform.rgbShift).toFixed(2)}px, 0, 0)`,
            }}
          >
            {char}
          </span>
          {/* Yellow channel */}
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none text-amber-400 opacity-60 mix-blend-screen select-none font-black"
            style={{
              transform: `translate3d(0, ${(transform.rgbShift * 0.6).toFixed(2)}px, 0)`,
            }}
          >
            {char}
          </span>
        </>
      )}
    </span>
  );
};

export default WarpText;
