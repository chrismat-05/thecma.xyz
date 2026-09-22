import React, { useEffect, useRef } from "react";

interface ChromaGlowProps {
  className?: string;
  radius?: number; // Cursor glow radius in px
}

export const ChromaGrid: React.FC<ChromaGlowProps> = ({
  className = "",
  radius = 320,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    container.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Chroma Radial Glow on cursor (Chromatic dispersion with NO grid lines)
      if (mouse.x > -500 && mouse.y > -500) {
        // Red / Rose chromatic inner ring
        const redGrad = ctx.createRadialGradient(
          mouse.x - 8,
          mouse.y - 6,
          0,
          mouse.x,
          mouse.y,
          radius
        );
        redGrad.addColorStop(0, "rgba(244, 63, 94, 0.28)");
        redGrad.addColorStop(0.35, "rgba(225, 29, 72, 0.14)");
        redGrad.addColorStop(0.75, "rgba(225, 29, 72, 0.03)");
        redGrad.addColorStop(1, "transparent");

        // Cyan / Blue chromatic shift
        const blueGrad = ctx.createRadialGradient(
          mouse.x + 10,
          mouse.y + 8,
          0,
          mouse.x,
          mouse.y,
          radius * 1.25
        );
        blueGrad.addColorStop(0, "rgba(56, 189, 248, 0.24)");
        blueGrad.addColorStop(0.45, "rgba(99, 102, 241, 0.12)");
        blueGrad.addColorStop(0.8, "rgba(99, 102, 241, 0.02)");
        blueGrad.addColorStop(1, "transparent");

        ctx.globalCompositeOperation = "screen";

        ctx.fillStyle = redGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = blueGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = "source-over";
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [radius]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ChromaGrid;
