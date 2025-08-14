import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ChevronDown, ChevronUp } from 'lucide-react';

const languages = [
  'JavaScript', 'Python', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS',
  'MySQL', 'SQLite', 'SQL Plus', 'VB.NET', 'Git', 'FastAPI'
];

const LanguagesToggle = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-6 py-12 bg-black">
      <div className="max-w-3xl mx-auto">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between cursor-pointer bg-white/10 backdrop-blur p-4 rounded-lg text-white"
        >
          <div className="flex items-center gap-3">
            <Code2 className="text-orange-400" />
            <h3 className="text-lg font-semibold">Languages I Work With</h3>
          </div>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6"
            >
              {languages.map((lang, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 p-3 rounded-md text-center text-orange-200"
                  whileHover={{ scale: 1.05 }}
                >
                  {lang}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LanguagesToggle;
