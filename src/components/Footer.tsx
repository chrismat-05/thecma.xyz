import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, Phone, MessageSquareMore, Award, MapPin } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/chrismat-05',
    color: 'hover:text-foreground',
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

const Footer = () => {
  return (
    <footer className="bg-card/20 backdrop-blur-sm border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold gradient-text mb-2">Chris Mathew Aje</h3>
              <p className="text-grey-100 mb-4">
                Bridging tech & creativity - one step at a time
              </p>
              <p className="text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin /> Bengaluru, Karnataka, India
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-4">Let's Connect</h4>
              <p className="text-muted-foreground mb-4">
                Ready to collaborate on your next project?
              </p>
              <a
                href="mailto:chrismaje63@gmail.com"
                className="btn-hero-outline inline-block"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          <div className="border-t border-border pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
                <p className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} Chris Mathew Aje. All rights reserved.
                </p>
              </div>
              <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:justify-end">
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-muted-foreground ${social.color} transition-colors duration-300`}
                        title={social.label}
                      >
                        <Icon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;