import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (overlayRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        overlayRef.current.style.left = `${x - 100}px`;
        overlayRef.current.style.top = `${y - 100}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-dotted bg-fixed relative overflow-x-clip">
      {/* Mouse-follow overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed z-0 w-[200px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(120,120,120,0.12) 80%, transparent 100%)',
          transition: 'left 0.1s, top 0.1s',
        }}
      />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;