import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FolderOpen, Mail, Sparkles, MessageSquare, Layers } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'hero', icon: Home, route: '/' },
    { name: 'Work', to: 'projects', icon: FolderOpen, route: '/#projects' },
    { name: 'Services', to: 'services', icon: Layers, route: '/#services' },
    { name: 'About', to: 'about', icon: User, route: '/#about' },
    { name: 'Reviews', to: 'testimonials', icon: MessageSquare, route: '/#testimonials' },
    { name: 'Contact', to: 'contact', icon: Mail, route: '/#contact' },
  ];

  return (
    <>
      {/* Desktop Floating Pill Nav (Top Center or Right) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl shadow-black/80"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-white hover:bg-white/10 transition-colors"
          data-cursor="button"
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          THECMA
        </Link>

        <div className="w-[1px] h-4 bg-white/15 mx-1" />

        {navItems.map((item) => {
          const Icon = item.icon;
          if (isHome) {
            return (
              <ScrollLink
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                activeClass="!text-white !bg-white/15"
                data-cursor="button"
              >
                <Icon size={13} />
                <span>{item.name}</span>
              </ScrollLink>
            );
          } else {
            return (
              <Link
                key={item.name}
                to={item.route}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                data-cursor="button"
              >
                <Icon size={13} />
                <span>{item.name}</span>
              </Link>
            );
          }
        })}

        <div className="w-[1px] h-4 bg-white/15 mx-1" />

        <Link
          to="/projects"
          className="px-3 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          data-cursor="button"
        >
          All Archive
        </Link>
      </motion.div>

      {/* Mobile Floating Bottom Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center gap-1 px-3 py-2 rounded-full border border-white/15 bg-black/80 backdrop-blur-2xl shadow-2xl shadow-black/90">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (isHome) {
            return (
              <ScrollLink
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="p-2.5 rounded-full text-neutral-400 hover:text-white active:bg-white/20 transition-all cursor-pointer"
                activeClass="!text-white !bg-white/20"
                data-cursor="button"
              >
                <Icon size={18} />
              </ScrollLink>
            );
          } else {
            return (
              <Link
                key={item.name}
                to={item.route}
                className="p-2.5 rounded-full text-neutral-400 hover:text-white active:bg-white/20 transition-all"
                data-cursor="button"
              >
                <Icon size={18} />
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default Navigation;