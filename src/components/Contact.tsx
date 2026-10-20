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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      href: 'mailto:chrismaje05@gmail.com',
      brandColor: '#ea4335',
    },
    {
      icon: Handshake,
      label: 'Fiverr',
      href: 'https://www.fiverr.com/s/zWgryod',
      brandColor: '#1dbf73',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/chrismaje05@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Transmission from ${formData.name} via thecma.xyz`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Transmission failed');
      }
    } catch {
      setErrorMessage(
        'Direct server transmission encountered an issue. You can also contact me directly at chrismaje05@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden bg-black text-white">
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
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Let's build something exceptional.</h3>
                <p className="text-neutral-400 text-xs sm:text-base leading-relaxed">
                  Whether you require full-stack web applications, cybersecurity tools, or high-touch digital experiences, I'm currently open to client projects and team collaborations.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:chrismaje05@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/30 transition-colors"
                  data-cursor="button"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-mono text-neutral-500 uppercase tracking-wider">Email Transmission</div>
                    <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[210px] sm:max-w-none">chrismaje05@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-neutral-900/40 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-mono text-neutral-500 uppercase tracking-wider">Base Location</div>
                    <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[210px] sm:max-w-none">Bengaluru, Karnataka, India</div>
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
              className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-neutral-900/30 border border-white/[0.1] backdrop-blur-xl"
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
                      placeholder="Chris Mat"
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
                      placeholder="chris@gmail.com"
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

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs font-mono leading-relaxed">
                      {errorMessage}{" "}
                      <a
                        href={`mailto:chrismaje05@gmail.com?subject=Transmission%20from%20${encodeURIComponent(
                          formData.name || "Portfolio Visitor"
                        )}&body=${encodeURIComponent(formData.message)}`}
                        className="underline hover:text-white font-bold ml-1"
                      >
                        Click to open email client →
                      </a>
                    </div>
                  )}

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