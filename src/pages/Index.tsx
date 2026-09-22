import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { Waves } from '@/components/backgrounds/Waves';
import { HappyClientsSection } from '@/components/clients/HappyClientsSection';
import Projects from '@/components/Projects';
import WhatWeCreateSection from '@/components/services/WhatWeCreateSection';
import About from '@/components/About';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-clip selection:bg-white selection:text-black">
      {/* Subtle, interactive organic waves background reacting to cursor movements */}
      <Waves
        className="opacity-35"
        lineColor="rgba(255, 255, 255, 0.08)"
        waveAmpX={14}
        waveAmpY={10}
        waveSpeedX={0.010}
        waveSpeedY={0.007}
        xGap={26}
        yGap={30}
        friction={0.92}
        tension={0.009}
        maxCursorMove={70}
      />

      {/* Sleek Floating Pill Navigation */}
      <Navigation />

      {/* 3. Hero Section with 3D Physics Lanyard Reveal & Wave Shader */}
      <Hero />

      {/* 4. Happy Clients Infinite Counter-Scrolling Logo Marquee */}
      <HappyClientsSection />

      {/* 5. Philosophy & Ethos / About Section with 3D Corner Artifacts & Kinetic Character Scroll */}
      <About />

      {/* 6. Selected 5 Projects Showcase with Jack 2-Column Sticky Stacked Cards */}
      <Projects />

      {/* 7. What We Create / Services Bento Grid with Interactive Demos */}
      <WhatWeCreateSection />

      {/* 8. 3D Stacked Deck Testimonials Section with Gesture Swipes */}
      <TestimonialsSection />

      {/* 9. Get In Touch Section */}
      <Contact />

      {/* 10. Footer */}
      <Footer />
    </div>
  );
};

export default Index;