// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-md border-b border-orange-500/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          CMA
        </div>
        <nav className="hidden md:flex gap-8">
          {links.map(link => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              className="cursor-pointer text-white hover:text-orange-400 transition"
            >
              {link.name}
            </ScrollLink>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 px-6 py-4 space-y-4">
          {links.map(link => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg"
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
