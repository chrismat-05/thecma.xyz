import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle, MessageSquareMore, Handshake, MapPin } from 'lucide-react';
import { SectionTitleReveal } from '@/components/ui/SectionTitleReveal';
import { CursorGridBackground } from '@/components/backgrounds/CursorGridBackground';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/chrismat-05',
      brandColor: '#2b3137',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/chrismaje/',
      brandColor: '#0077b5',
    },
    {
      icon: MessageSquareMore,
      label: 'WhatsApp',
      href: 'https://wa.me/+918848914245',
      brandColor: '#25D366',
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:+918848914245',
      brandColor: '#0284c7',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:chrismaje63@gmail.com',
      brandColor: '#ea4335',
    },
    {
      icon: Handshake,
      label: 'Fiverr',
      href: 'https://www.fiverr.com/s/zWgryod',
      brandColor: '#1dbf73',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Netlify forms submission via fetch
    const encodedData = new URLSearchParams({
      'form-name': 'contactv2',
      ...formData,
    }).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodedData,
    })
      .then(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-black text-white">
      {/* Subtle interactive dot grid background scoped exclusively to this section */}
      <CursorGridBackground opacity={0.4} spacing={40} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <SectionTitleReveal
          title="Get In Touch."
          subtitle="Have a project in mind, an opportunity, or simply want to connect? Send a transmission below."
          align="left"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Let's build something exceptional.</h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                  Whether you require full-stack web applications, cybersecurity threat assessments, or high-touch digital experiences, I'm currently open to select client projects and team collaborations.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:chrismaje63@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/30 transition-colors"
                  data-cursor="button"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Email Transmission</div>
                    <div className="text-sm font-medium text-white">chrismaje63@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/40 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Base Location</div>
                    <div className="text-sm font-medium text-white">Bengaluru, Karnataka, India</div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
                  Direct Channels
                </span>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] hover:text-white flex items-center justify-center text-neutral-400 transition-all duration-300 hover:scale-110"
                        title={social.label}
                        data-cursor="button"
                        data-cursor-color={social.brandColor}
                        data-cursor-text={social.label}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="p-8 sm:p-10 rounded-3xl bg-neutral-900/30 border border-white/[0.1] backdrop-blur-xl"
            >
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Message Transmitted!</h4>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto">
                    Thank you for reaching out. I'll review your transmission and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-hero-outline mt-4"
                    data-cursor="button"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@domain.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Message / Project Scope
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or vision..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-hero-primary flex items-center justify-center gap-2"
                    data-cursor="button"
                    data-magnetic="true"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Transmitting...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;