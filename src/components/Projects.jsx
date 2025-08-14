import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from '../data/projects.json';
import { filterProjectsByTag, getAllTags } from '../utils/filter';
import { motion } from 'framer-motion';

const Projects = () => {
  const allTags = getAllTags(projects);
  const [activeTag, setActiveTag] = useState('All');

  const filtered = filterProjectsByTag(projects, activeTag);

  return (
    <section id="projects" className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          My Projects
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allTags.map((tag, i) => (
            <button
              key={i}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                tag === activeTag
                  ? 'bg-orange-500 text-black'
                  : 'bg-white/10 text-orange-300 hover:bg-orange-400/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;