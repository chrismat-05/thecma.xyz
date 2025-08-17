import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, AppWindow, Home, User, FolderOpen, Mail } from 'lucide-react';
import { Link } from 'react-scroll';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'hero', icon: Home },
    { name: 'About', to: 'about', icon: User },
    { name: 'Projects', to: 'projects', icon: FolderOpen },
    { name: 'Contact', to: 'contact', icon: Mail },
  ];

  return (
    <>
      {/* Desktop vertical nav */}
      <div className="hidden lg:flex fixed right-8 top-1/2 z-50 flex-col items-center gap-6 -translate-y-1/2 bg-background/80 backdrop-blur-lg rounded-2xl p-4 border border-border shadow-lg">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="group flex flex-col items-center justify-center cursor-pointer text-muted-foreground group-hover:text-primary transition-colors duration-300"
              activeClass="text-primary nav-active"
            >
              <Icon size={28} />
              <span className="sr-only">{item.name}</span>
            </Link>
          );
        })}
      </div>


      {/* Mobile nav bar on top center for small screens */}
      <div className="lg:hidden fixed top-4 left-1/2 z-50 -translate-x-1/2 flex flex-row items-center gap-6 bg-background/80 backdrop-blur-lg rounded-2xl px-4 py-2 border border-border shadow-lg">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="group flex flex-col items-center justify-center cursor-pointer"
              activeClass="nav-active"
            >
              <Icon size={24} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <span className="sr-only">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur-lg border-r border-border lg:hidden"
          >
            <div className="flex flex-col pt-20 pb-4 px-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      to={item.to}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3 text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                      activeClass="nav-active text-primary"
                    >
                      <Icon size={22} className="text-muted-foreground group-hover:text-primary" />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;