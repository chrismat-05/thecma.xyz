import React from 'react';

import Navbar from './components/Navbar';
import ScrollIndicator from './components/ScrollIndicator';
import Hero from './components/Hero';
import About from './components/About';
import LanguagesToggle from './components/LanguagesToggle';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App = () => {
  return (
    <div className="bg-black text-white font-sans">
      <ScrollIndicator />
      <Navbar />

      <main>
        <Hero />
        <About />
        <LanguagesToggle />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default App;
