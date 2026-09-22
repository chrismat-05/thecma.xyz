import React, { useEffect, useRef } from "react";

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  className?: string;
}

export const Waves: React.FC<WavesProps> = ({
  lineColor = "rgba(255, 255, 255, 0.12)",
  backgroundColor = "transparent",
  waveSpeedX = 0.012,
  waveSpeedY = 0.008,
  waveAmpX = 18,
  waveAmpY = 12,
  xGap = 24, // Subtle dense vertical strands
  yGap = 28,
  friction = 0.92,
  tension = 0.008,
  maxCursorMove = 60,
  className = "",
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
    let width = 0;
    let height = 0;

    // Mouse coordinates relative to viewport
    const mouse = {
      x: -2000,
      y: -2000,
      lx: -2000,
      ly: -2000,
      sx: 0,
      sy: 0,
      v: 0,
      vs: 0,
      a: 0,
      set: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (!mouse.set) {
        mouse.x = clientX;
        mouse.y = clientY;
        mouse.lx = clientX;
        mouse.ly = clientY;
        mouse.set = true;
      } else {
        mouse.x = clientX;
        mouse.y = clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
      mouse.set = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Particle nodes for waving vertical curves
    interface Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
    }

    let lines: Point[][] = [];

    const initLines = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      lines = [];
      const totalColumns = Math.ceil(width / xGap) + 1;
      const totalPointsPerColumn = Math.ceil(height / yGap) + 2;

      for (let i = 0; i < totalColumns; i++) {
        const points: Point[] = [];
        const posX = i * xGap;

        for (let j = 0; j < totalPointsPerColumn; j++) {
          const posY = j * yGap;
          points.push({
            x: posX,
            y: posY,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
          });
        }
        lines.push(points);
      }
    };

    initLines();

    const handleResize = () => {
      initLines();
    };
    window.addEventListener("resize", handleResize);

    let time = 0;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        render();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isVisible) return;
      time++;

      ctx.clearRect(0, 0, width, height);
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Calculate mouse speed
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouse.v = dist;
      mouse.vs += (dist - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);

      ctx.lineWidth = 1.0;
      ctx.strokeStyle = lineColor;

      for (let i = 0; i < lines.length; i++) {
        const points = lines[i];
        ctx.beginPath();

        for (let j = 0; j < points.length; j++) {
          const p = points[j];

          // Harmonic ambient mathematical wave
          const waveOffset =
            Math.sin(time * waveSpeedX + i * 0.12 + j * 0.08) * waveAmpX +
            Math.cos(time * waveSpeedY + j * 0.14) * (waveAmpY * 0.6);

          // Cursor interaction: displacement when cursor moves near nodes
          if (mouse.set) {
            const mdx = p.x - mouse.sx;
            const mdy = p.y - mouse.sy;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            const radius = 180;

            if (mdist < radius) {
              const force = (1 - mdist / radius) * maxCursorMove;
              const angle = Math.atan2(mdy, mdx);
              p.vx += Math.cos(angle) * force * 0.12;
              p.vy += Math.sin(angle) * force * 0.08;
            }
          }

          // Spring physics easing back to home
          const targetX = p.originX + waveOffset;
          const targetY = p.originY;

          p.vx += (targetX - p.x) * tension;
          p.vy += (targetY - p.y) * tension;

          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;

          if (j === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[j - 1];
            // Smooth quadratic bezier interpolation
            const cx = (prev.x + p.x) / 2;
            const cy = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    lineColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove,
  ]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default Waves;
