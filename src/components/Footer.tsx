import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-card/20 backdrop-blur-sm border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold gradient-text mb-2">Chris Mathew Aje</h3>
              <p className="text-muted-foreground mb-4">
                Bridging tech & creativity - one step at a time
              </p>
              <p className="text-muted-foreground">
                Aspiring Software Developer passionate about bridging technology and creativity.
              </p>
            </motion.div>

            {/* Connect */}
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

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Chris Mathew Aje. All rights reserved.
              </p>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                Made with <Heart className="text-red-500" size={16} /> and lots of coffee
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;