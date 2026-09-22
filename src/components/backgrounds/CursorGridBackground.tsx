import React, { useEffect, useRef } from "react";

interface CursorGridBackgroundProps {
  className?: string;
  spacing?: number;
  influenceRadius?: number;
  opacity?: number;
}

export const CursorGridBackground: React.FC<CursorGridBackgroundProps> = ({
  className = "",
  spacing = 36,
  influenceRadius = 180,
  opacity = 0.7,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates relative to this canvas container
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
    };

    const SPACING = spacing;
    const BASE_RADIUS = 1.2;
    const INFLUENCE_RADIUS = influenceRadius;

    interface Node {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      radius: number;
      targetRadius: number;
      alpha: number;
      targetAlpha: number;
    }

    let nodes: Node[] = [];

    const initGrid = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      nodes = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          nodes.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            radius: BASE_RADIUS,
            targetRadius: BASE_RADIUS,
            alpha: 0.12,
            targetAlpha: 0.12,
          });
        }
      }
    };

    initGrid();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Mouse coordinates relative to this section canvas
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.body.addEventListener("mouseleave", handleMouseLeave);

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

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const dx = mouse.x - node.baseX;
        const dy = mouse.y - node.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE_RADIUS) {
          const factor = 1 - dist / INFLUENCE_RADIUS;
          node.targetRadius = BASE_RADIUS + factor * 2.5;
          node.targetAlpha = 0.12 + factor * 0.75;

          const angle = Math.atan2(dy, dx);
          const push = factor * 8;
          const targetPosX = node.baseX - Math.cos(angle) * push;
          const targetPosY = node.baseY - Math.sin(angle) * push;

          node.x += (targetPosX - node.x) * 0.15;
          node.y += (targetPosY - node.y) * 0.15;
        } else {
          node.targetRadius = BASE_RADIUS;
          node.targetAlpha = 0.12;
          node.x += (node.baseX - node.x) * 0.08;
          node.y += (node.baseY - node.y) * 0.08;
        }

        node.radius += (node.targetRadius - node.radius) * 0.15;
        node.alpha += (node.targetAlpha - node.alpha) * 0.15;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha})`;
        ctx.fill();
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
  }, [spacing, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity, willChange: "transform" }}
    />
  );
};
