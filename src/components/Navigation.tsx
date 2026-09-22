import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderGit2, Layers, User, Star, Send } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // On homepage: hide dock during initial lanyard intro scene (reveal when user zooms in, ~scrollY > window.innerHeight * 0.7)
  // On other pages (/projects): dock is always visible
  const [showDock, setShowDock] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setShowDock(true);
      return;
    }

    const handleScroll = () => {
      // Show dock once the user scrolls past the initial lanyard-only view (~60% of viewport height)
      const threshold = window.innerHeight * 0.65;
      setShowDock(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Iconography & Destination definitions:
  // 1. Home -> Scrolls to top on homepage, or links to '/'
  // 2. About -> Links directly to dedicated '/about' page (background, experience, certs)
  // 3. Projects -> Links directly to dedicated '/projects' page (complete project archives)
  // 4. Services -> Scrolls to '#services'
  // 5. Reviews -> Scrolls to '#testimonials'
  // 6. Contact -> Scrolls to '#contact'
  const navItems = [
    { name: 'Home', to: 'hero', icon: Home, route: '/', isPage: false },
    { name: 'About', to: 'about', icon: User, route: '/about', isPage: true },
    { name: 'Projects', to: 'projects', icon: FolderGit2, route: '/projects', isPage: true },
    { name: 'Services', to: 'services', icon: Layers, route: '/#services', isPage: false },
    { name: 'Reviews', to: 'testimonials', icon: Star, route: '/#testimonials', isPage: false },
    { name: 'Contact', to: 'contact', icon: Send, route: '/#contact', isPage: false },
  ];

  return (
    <AnimatePresence>
      {showDock && (
        <motion.nav
          initial={{ opacity: 0, y: 40, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 40, x: "-50%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full border border-white/15 bg-neutral-950/80 backdrop-blur-2xl shadow-2xl shadow-black/90"
          aria-label="Bottom Navigation Dock"
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            // If it's a dedicated page route (About -> /about, Projects -> /projects)
            if (item.isPage) {
              const isActivePage = location.pathname === item.route;
              return (
                <Link
                  key={item.name}
                  to={item.route}
                  className={`relative p-3 rounded-full transition-all duration-200 group flex items-center justify-center ${
                    isActivePage
                      ? "text-white bg-white/15 shadow-lg shadow-white/10"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-95"
                  }`}
                  title={item.name}
                  data-cursor="button"
                  data-cursor-text={item.name}
                >
                  <Icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>

                  {/* Discreet hover tooltip pill */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/15 text-[10px] font-mono font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap">
                    {item.name} Page
                  </span>
                </Link>
              );
            }

            // In-page section scroll link on homepage
            if (isHome) {
              return (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="relative p-3 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all duration-200 cursor-pointer group flex items-center justify-center"
                  activeClass="!text-white !bg-white/15 shadow-lg shadow-white/10"
                  title={item.name}
                  data-cursor="button"
                  data-cursor-text={item.name}
                >
                  <Icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>

                  {/* Discreet hover tooltip pill */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/15 text-[10px] font-mono font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap">
                    {item.name}
                  </span>
                </ScrollLink>
              );
            } else {
              return (
                <Link
                  key={item.name}
                  to={item.route}
                  className="relative p-3 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all duration-200 group flex items-center justify-center"
                  title={item.name}
                  data-cursor="button"
                  data-cursor-text={item.name}
                >
                  <Icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>

                  {/* Discreet hover tooltip pill */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/15 text-[10px] font-mono font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              );
            }
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navigation;