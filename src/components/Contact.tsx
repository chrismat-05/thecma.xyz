import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Github, Linkedin, Award, Send, CheckCircle, MessageSquareMore } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/chrismat-05',
      color: 'hover:text-grey-100',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/chrismaje/',
      color: 'hover:text-blue-400',
    },
    {
      icon: MessageSquareMore,
      label: 'WhatsApp',
      href: 'https://wa.me/+918848914245',
      color: 'hover:text-green-400',
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:+918848914245',
      color: 'hover:text-purple-400',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:chrismaje63@gmail.com',
      color: 'hover:text-red-400',
    },
    {
      icon: Award,
      label: 'Credly',
      href: 'https://www.credly.com/users/chrismaje',
      color: 'hover:text-orange-400',
    },
  ];

  return (
  <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to collaborate? Let's connect and create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Whether you have a project in mind, want to discuss opportunities, 
                  or simply want to say hello, I'd love to hear from you. 
                  Drop me a message and I'll get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground mb-4">Find me on</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                        className={`flex items-center gap-3 p-3 bg-card/50 backdrop-blur-sm border border-border rounded-lg text-grey-300 ${social.color} transition-all duration-300 hover:scale-105 hover:border-primary/50`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-8"
            >
              <form name="contactv2" method="POST" className="space-y-6" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contactv2" />
                <input type="hidden" name="bot-field" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-input"
                    placeholder="Your Name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1, duration: 0.4 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="form-input resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-hero-primary flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;