import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MessageSquareMore, Award, MapPin, Handshake } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/chrismat-05', brandColor: '#2b3137' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/chrismaje/', brandColor: '#0077b5' },
  { icon: MessageSquareMore, label: 'WhatsApp', href: 'https://wa.me/+918848914245', brandColor: '#25D366' },
  { icon: Phone, label: 'Call', href: 'tel:+918848914245', brandColor: '#0284c7' },
  { icon: Mail, label: 'Email', href: 'mailto:chrismaje05@gmail.com', brandColor: '#ea4335' },
  { icon: Handshake, label: 'Fiverr', href: 'https://www.fiverr.com/s/zWgryod', brandColor: '#1dbf73' },
  { icon: Award, label: 'Credly', href: 'https://www.credly.com/users/chrismaje', brandColor: '#ff6f00' },
];

export const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="bg-black border-t border-white/[0.08] pt-12 sm:pt-16 pb-28 sm:pb-16 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 bg-brand-red/10 text-xs font-mono text-neutral-300 mb-4 shadow-[0_0_15px_rgba(229,9,20,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-beacon-pulse shadow-[0_0_8px_#ef4444]" />
              CHRIS MATHEW AJE
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Full-Stack Engineer &amp; Creative Designer
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed mb-4">
              Building next-generation digital products, robust security tools, and interactive WebGL experiences.
            </p>
            <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
              <MapPin size={14} className="text-brand-red" /> Bengaluru, Karnataka, India
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-between gap-6">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Quick Navigation
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-300">
                {isHome ? (
                  <>
                    <ScrollLink to="hero" smooth={true} duration={500} className="hover:text-brand-red cursor-pointer transition-colors">
                      Home
                    </ScrollLink>
                    <ScrollLink to="projects" smooth={true} offset={-70} duration={500} className="hover:text-brand-red cursor-pointer transition-colors">
                      Featured
                    </ScrollLink>
                    <Link to="/projects" className="hover:text-brand-red cursor-pointer transition-colors">
                      All Projects
                    </Link>
                    <ScrollLink to="services" smooth={true} offset={-70} duration={500} className="hover:text-brand-red cursor-pointer transition-colors">
                      Capabilities
                    </ScrollLink>
                    <Link to="/about" className="hover:text-brand-red cursor-pointer transition-colors">
                      About
                    </Link>
                    <ScrollLink to="testimonials" smooth={true} offset={-70} duration={500} className="hover:text-brand-red cursor-pointer transition-colors">
                      Reviews
                    </ScrollLink>
                    <ScrollLink to="contact" smooth={true} offset={-70} duration={500} className="hover:text-brand-red cursor-pointer transition-colors">
                      Contact
                    </ScrollLink>
                  </>
                ) : (
                  <>
                    <Link to="/" className="hover:text-brand-red cursor-pointer transition-colors">
                      Home
                    </Link>
                    <Link to="/#projects" className="hover:text-brand-red cursor-pointer transition-colors">
                      Featured
                    </Link>
                    <Link to="/projects" className="hover:text-brand-red cursor-pointer transition-colors">
                      All Projects
                    </Link>
                    <Link to="/#services" className="hover:text-brand-red cursor-pointer transition-colors">
                      Capabilities
                    </Link>
                    <Link to="/about" className="hover:text-brand-red cursor-pointer transition-colors">
                      About
                    </Link>
                    <Link to="/#testimonials" className="hover:text-brand-red cursor-pointer transition-colors">
                      Reviews
                    </Link>
                    <Link to="/#contact" className="hover:text-brand-red cursor-pointer transition-colors">
                      Contact
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="pt-2 sm:pt-6 w-full sm:w-auto">
              {isHome ? (
                <ScrollLink
                  to="contact"
                  smooth={true}
                  offset={-70}
                  duration={600}
                  className="btn-hero-outline hover:border-brand-red/60 hover:text-white hover:shadow-[0_0_25px_rgba(229,9,20,0.35)] w-full sm:w-auto text-center block cursor-pointer"
                  data-cursor="button"
                >
                  Initiate Project Transmission
                </ScrollLink>
              ) : (
                <Link
                  to="/#contact"
                  className="btn-hero-outline hover:border-brand-red/60 hover:text-white hover:shadow-[0_0_25px_rgba(229,9,20,0.35)] w-full sm:w-auto text-center block cursor-pointer"
                  data-cursor="button"
                >
                  Initiate Project Transmission
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-neutral-500 text-xs font-mono">
            © {new Date().getFullYear()} Chris Mathew Aje. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-red/60 hover:shadow-[0_0_15px_rgba(229,9,20,0.35)] transition-all"
                  title={social.label}
                  data-cursor="button"
                  data-cursor-color={social.brandColor}
                  data-cursor-text={social.label}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;