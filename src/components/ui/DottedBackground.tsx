import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DOT_SIZE = 4;
const DOT_SPACING = 18;
const DOT_COLOR = 'rgba(120,120,120,0)';
const DOT_HIGHLIGHT = 'hsl(var(--primary))';
const DOT_RADIUS = 90;

function getDotPositions(width: number, height: number) {
  const positions = [];
  for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
    for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
      positions.push({ x, y });
    }
  }
  return positions;
}

const DottedBackground: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setCursor({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dots = getDotPositions(windowSize.width, windowSize.height);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
      {dots.map((dot, i) => {
        const dist = Math.hypot(dot.x - cursor.x, dot.y - cursor.y);
        const isActive = dist < DOT_RADIUS;
        const highlightColors = [
          'hsl(var(--primary))',
          'hsl(var(--secondary))',
          'hsl(var(--accent))',
        ];
        const highlightColor = highlightColors[i % highlightColors.length];
        return (
          <motion.span
            key={i}
            animate={{
              backgroundColor: isActive ? highlightColor : DOT_COLOR,
              scale: isActive ? 1.3 : 1,
            }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: dot.x - DOT_SIZE / 2,
              top: dot.y - DOT_SIZE / 2,
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: '50%',
              backgroundColor: DOT_COLOR,
              zIndex: 0,
            }}
          />
        );
      })}
    </div>
  );
};

export default DottedBackground;
