import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Home, FolderGit2, Layers, User, Star, Send } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mounted, setMounted] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (!isHome) return;

    const handleScroll = () => {
      setIsAtTop(window.scrollY < 250);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const triggerHaptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  // Iconography & Destination definitions:
  // 1. Home -> Scrolls to top / revealed hero on homepage, or links to '/'
  // 2. About -> Links directly to dedicated '/about' page (background, experience, certs)
  // 3. Projects -> Scrolls to '#projects' (Selected Works) on homepage, or links to '/#projects'
  // 4. Services -> Scrolls to '#services' (What I Create) on homepage, or links to '/#services'
  // 5. Reviews -> Scrolls to '#testimonials' (Reviews) on homepage, or links to '/#testimonials'
  // 6. Contact -> Scrolls to '#contact' (Contact Form) on homepage, or links to '/#contact'
  const navItems = [
    { name: 'Home', to: 'hero', icon: Home, route: '/', isPage: false },
    { name: 'About', to: 'about', icon: User, route: '/about', isPage: true },
    { name: 'Projects', to: 'projects', icon: FolderGit2, route: '/#projects', isPage: false },
    { name: 'Services', to: 'services', icon: Layers, route: '/#services', isPage: false },
    { name: 'Reviews', to: 'testimonials', icon: Star, route: '/#testimonials', isPage: false },
    { name: 'Contact', to: 'contact', icon: Send, route: '/#contact', isPage: false },
  ];

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-[9999] flex justify-center pointer-events-none px-2 sm:px-4">
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full border border-white/15 bg-neutral-950/90 backdrop-blur-2xl shadow-2xl shadow-black/90 hover:border-brand-red/40 transition-colors duration-300 max-w-full"
        aria-label="Bottom Navigation Dock"
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          // If it's a dedicated page route (About -> /about)
          if (item.isPage) {
            const isActivePage = location.pathname === item.route;
            return (
              <Link
                key={item.name}
                to={item.route}
                onClick={triggerHaptic}
                className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-all duration-200 group flex items-center justify-center shrink-0 ${
                  isActivePage
                    ? "text-white bg-brand-red/25 border border-brand-red/60 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                    : "text-neutral-400 hover:text-white hover:bg-brand-red/10 active:scale-90"
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
              const isHomeActive = isAtTop;
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
                  className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-all duration-200 cursor-pointer group flex items-center justify-center shrink-0 active:scale-90 ${
                    isHomeActive
                      ? "text-white bg-brand-red/25 border border-brand-red/60 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
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
                className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full text-neutral-400 hover:text-white hover:bg-brand-red/10 active:scale-90 transition-all duration-200 cursor-pointer group flex items-center justify-center shrink-0"
                activeClass="!text-white !bg-brand-red/25 !border !border-brand-red/60 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
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
                className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-90 transition-all duration-200 group flex items-center justify-center shrink-0"
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
    </div>,
    document.body
  );
};

export default Navigation;