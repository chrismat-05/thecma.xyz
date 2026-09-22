import React, { useEffect, useRef } from "react";

interface ChromaGridProps {
  className?: string;
  gridSize?: number; // Size of grid squares in px
  radius?: number; // Cursor glow radius in px
}

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  className = "",
  gridSize = 36,
  radius = 280,
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

      // 1. Draw base faint subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw Chroma Radial Glow on cursor (Chromatic dispersion)
      if (mouse.x > -500 && mouse.y > -500) {
        // Red / Rose chromatic inner ring
        const redGrad = ctx.createRadialGradient(
          mouse.x - 6,
          mouse.y - 4,
          0,
          mouse.x,
          mouse.y,
          radius
        );
        redGrad.addColorStop(0, "rgba(244, 63, 94, 0.22)");
        redGrad.addColorStop(0.4, "rgba(225, 29, 72, 0.1)");
        redGrad.addColorStop(1, "transparent");

        // Cyan / Blue chromatic shift
        const blueGrad = ctx.createRadialGradient(
          mouse.x + 8,
          mouse.y + 6,
          0,
          mouse.x,
          mouse.y,
          radius * 1.2
        );
        blueGrad.addColorStop(0, "rgba(56, 189, 248, 0.18)");
        blueGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.08)");
        blueGrad.addColorStop(1, "transparent");

        ctx.globalCompositeOperation = "screen";

        ctx.fillStyle = redGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = blueGrad;
        ctx.fillRect(0, 0, width, height);

        // Highlight grid intersections near cursor
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();

        const startX = Math.max(0, Math.floor((mouse.x - radius) / gridSize) * gridSize);
        const endX = Math.min(width, Math.ceil((mouse.x + radius) / gridSize) * gridSize);
        const startY = Math.max(0, Math.floor((mouse.y - radius) / gridSize) * gridSize);
        const endY = Math.min(height, Math.ceil((mouse.y + radius) / gridSize) * gridSize);

        for (let x = startX; x <= endX; x += gridSize) {
          ctx.moveTo(x, startY);
          ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
        }
        ctx.stroke();

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
  }, [gridSize, radius]);

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
