import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import checkmarkAnim from '../assets/lottie/checkmark.json';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 500); // simulate delay
  };

  return (
    <section id="contact" className="py-20 px-6 bg-black text-white">
      <div className="max-w-xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-10 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Contact Me
        </motion.h2>

        {submitted ? (
          <Lottie animationData={checkmarkAnim} loop={false} className="h-44 mx-auto" />
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 text-left"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            {['Name', 'Email', 'Message'].map((label, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <label className="block mb-2 text-orange-300">{label}</label>
                {label === 'Message' ? (
                  <textarea
                    required
                    className="w-full p-3 bg-white/5 border border-orange-500/20 rounded-md text-white"
                  />
                ) : (
                  <input
                    type={label === 'Email' ? 'email' : 'text'}
                    required
                    className="w-full p-3 bg-white/5 border border-orange-500/20 rounded-md text-white"
                  />
                )}
              </motion.div>
            ))}
            <motion.button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-black font-bold"
            >
              Send Message
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Contact;
