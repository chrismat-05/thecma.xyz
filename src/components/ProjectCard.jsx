import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const { title, description, tags, images, link } = project;

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-md rounded-lg p-5 text-white shadow-xl transition-all hover:scale-[1.02]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-sm text-gray-300 my-3">{description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {images?.length > 0 && (
        <div className="aspect-video overflow-hidden rounded-md mb-4">
          <img src={images[0]} alt={title} className="object-cover w-full h-full" />
        </div>
      )}

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-block px-4 py-2 bg-orange-500 text-black font-semibold rounded hover:bg-orange-600 transition"
      >
        Visit
      </a>
    </motion.div>
  );
};

export default ProjectCard;
