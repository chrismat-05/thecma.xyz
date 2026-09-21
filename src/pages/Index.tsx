import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { HappyClientsSection } from '@/components/clients/HappyClientsSection';
import Projects from '@/components/Projects';
import WhatWeCreateSection from '@/components/services/WhatWeCreateSection';
import About from '@/components/About';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { CursorGridBackground } from '@/components/backgrounds/CursorGridBackground';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-clip selection:bg-white selection:text-black">
      {/* 1. High-performance GPU cursor dot grid background */}
      <CursorGridBackground />

      {/* 2. Sleek Floating Pill Navigation */}
      <Navigation />

      {/* 3. Hero Section with 3D Physics Lanyard Reveal & Wave Shader */}
      <Hero />

      {/* 4. Happy Clients Infinite Counter-Scrolling Logo Marquee */}
      <HappyClientsSection />

      {/* 5. Selected 5 Projects Showcase with Floating Cursor Image Preview */}
      <Projects />

      {/* 6. What We Create / Services Bento Grid with Interactive Demos */}
      <WhatWeCreateSection />

      {/* 7. Pinned Storytelling About Section with Circular Scroll Progress */}
      <About />

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