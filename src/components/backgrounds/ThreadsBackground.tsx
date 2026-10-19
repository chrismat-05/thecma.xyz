import React, { useEffect, useRef } from "react";

interface ThreadsBackgroundProps {
  className?: string;
  accentColor?: string;
  threadsCount?: number;
}

export const ThreadsBackground: React.FC<ThreadsBackgroundProps> = ({
  className = "",
  accentColor = "rgba(187, 204, 215, 0.25)", // Silver-blue metallic accent
  threadsCount = 18,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let step = 0;

    const render = () => {
      step += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const count = threadsCount;
      const pointsCount = 45;

      for (let t = 0; t < count; t++) {
        ctx.beginPath();
        const yOffset = (canvas.height / count) * t;

        for (let p = 0; p <= pointsCount; p++) {
          const x = (canvas.width / pointsCount) * p;
          const y =
            yOffset +
            Math.sin(p * 0.15 + step + t * 0.4) * 35 +
            Math.cos(p * 0.08 - step * 0.5) * 20;

          if (p === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const alpha = Math.sin(t * 0.5 + step) * 0.04 + 0.06;
        ctx.strokeStyle =
          t % 3 === 0
            ? accentColor
            : `rgba(255, 255, 255, ${alpha * 0.65})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor, threadsCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

export default ThreadsBackground;
