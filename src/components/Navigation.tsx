import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderGit2, Layers, User, Star, Send } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Quick auto-hide on mobile when scrolling downwards to maximize viewable screen space
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateDockVisibility = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        setIsVisible(true);
        ticking = false;
        return;
      }

      // Always show when near top or bottom
      if (
        currentScrollY < 80 ||
        currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 80
      ) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 14) {
        // Scrolling down -> hide dock smoothly
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 14) {
        // Scrolling up -> show dock
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateDockVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const triggerHaptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  // Iconography & Destination definitions:
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
      <motion.nav
        initial={{ opacity: 0, y: 40, x: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 80,
          x: "-50%",
        }}
        exit={{ opacity: 0, y: 40, x: "-50%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 z-[999] flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full border border-white/15 bg-neutral-950/85 backdrop-blur-2xl shadow-2xl shadow-black/90 hover:border-brand-red/40 transition-colors duration-300 max-w-[calc(100vw-16px)] sm:max-w-max pointer-events-auto"
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
                  onClick={triggerHaptic}
                  className={`relative p-2.5 sm:p-3 rounded-full transition-all duration-200 group flex items-center justify-center ${
                    isActivePage
                      ? "text-white bg-brand-red/20 border border-brand-red/50 shadow-lg shadow-brand-red/30"
                      : "text-neutral-400 hover:text-white hover:bg-brand-red/10 active:scale-95"
                  }`}
                  title={item.name}
                  data-cursor="button"
                  data-cursor-text={item.name}
                >
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>

                  {/* Discreet hover tooltip pill */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/15 text-[10px] font-mono font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap hidden sm:block">
                    {item.name} Page
                  </span>
                </Link>
              );
            }

            // In-page section scroll link on homepage
            if (isHome) {
              if (item.name === 'Home') {
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      triggerHaptic();
                      // Scroll to where the hero stage is fully revealed (around 1.4x viewport height)
                      const targetY = window.innerHeight * 1.35;
                      window.scrollTo({
                        top: targetY,
                        behavior: 'smooth',
                      });
                    }}
                    className="relative p-2.5 sm:p-3 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all duration-200 cursor-pointer group flex items-center justify-center"
                    title={item.name}
                    data-cursor="button"
                    data-cursor-text="Hero"
                  >
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-200 group-hover:scale-110" />
                    <span className="sr-only">{item.name}</span>

                    {/* Discreet hover tooltip pill */}
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/15 text-[10px] font-mono font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap hidden sm:block">
                      Hero Section
                    </span>
                  </button>
                );
              }

              return (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={triggerHaptic}
                  className="relative p-2.5 sm:p-3 rounded-full text-neutral-400 hover:text-white hover:bg-brand-red/10 active:scale-95 transition-all duration-200 cursor-pointer group flex items-center justify-center"
                  activeClass="!text-white !bg-brand-red/20 !border !border-brand-red/50 shadow-lg shadow-brand-red/30"
                  title={item.name}
                  data-cursor="button"
                  data-cursor-text={item.name}
                >
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>

                  {/* Discreet hover tooltip pill */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/15 text-[10px] font-mono font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap hidden sm:block">
                    {item.name}
                  </span>
                </ScrollLink>
              );
            } else {
              return (
                <Link
                  key={item.name}
                  to={item.route}
                  onClick={triggerHaptic}
                  className="relative p-2.5 sm:p-3 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all duration-200 group flex items-center justify-center"
                  title={item.name}
                  data-cursor="button"
                  data-cursor-text={item.name}
                >
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>

                  {/* Discreet hover tooltip pill */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/15 text-[10px] font-mono font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap hidden sm:block">
                    {item.name}
                  </span>
                </Link>
              );
            }
          })}
        </motion.nav>
    </AnimatePresence>
  );
};

export default Navigation;