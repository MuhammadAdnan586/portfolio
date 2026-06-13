'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  accuracy: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Titanic Survival Prediction',
    category: 'Machine Learning',
    description: 'Random Forest based classification model to predict Titanic passenger survival with 85% accuracy.',
    accuracy: '85%',
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib'],
    github: '#',
  },
  {
    id: 2,
    title: 'House Price Prediction',
    category: 'Machine Learning',
    description: 'XGBoost and Random Forest model for real estate price prediction with extensive feature engineering.',
    accuracy: '89%',
    tech: ['Python', 'XGBoost', 'Scikit-Learn', 'Seaborn'],
    github: '#',
  },
  {
    id: 3,
    title: 'Customer Churn Prediction',
    category: 'Machine Learning',
    description: 'XGBoost model to identify customers likely to churn with actionable insights.',
    accuracy: '91%',
    tech: ['Python', 'XGBoost', 'Pandas'],
    github: '#',
  },
  {
    id: 4,
    title: 'Sales Forecasting',
    category: 'Machine Learning',
    description: 'Time series forecasting using Prophet and XGBoost for accurate sales predictions.',
    accuracy: '88%',
    tech: ['Python', 'Prophet', 'XGBoost'],
    github: '#',
  },
  {
    id: 5,
    title: 'Power BI Sales Dashboard',
    category: 'Power BI',
    description: 'Interactive sales analytics dashboard with KPI tracking and trend analysis.',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX', 'SQL'],
    github: 'https://github.com/MuhammadAdnan586/Sale_Dashboard',
    image: '/images/sales-dashboard.png',
  },
  {
    id: 6,
    title: 'Image Classification',
    category: 'Deep Learning',
    description: 'CNN with Transfer Learning achieving 94% accuracy on image classification tasks.',
    accuracy: '94%',
    tech: ['TensorFlow', 'Keras', 'CNN'],
    github: '#',
  },
  {
    id: 7,
    title: 'Student Management Database',
    category: 'SQL',
    description: 'Comprehensive MySQL database with CRUD operations and advanced SQL queries.',
    accuracy: 'N/A',
    tech: ['MySQL', 'SQL', 'Database Design'],
    github: '#',
  },
  {
    id: 8,
    title: 'Hospital Management System',
    category: 'SQL',
    description: 'Complex database system for managing patients, doctors, and billing.',
    accuracy: 'N/A',
    tech: ['MySQL', 'SQL', 'ER Diagrams'],
    github: '#',
  },
  {
    id: 9,
    title: 'Power BI HR Analytics',
    category: 'Power BI',
    description: 'HR analytics dashboard tracking employee attrition and performance metrics.',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX'],
    github: 'https://github.com/MuhammadAdnan586/HR-Analytics-Dashboard-',
    image: '/images/hr-dashboard.png',
  },
  {
    id: 10,
    title: 'Power BI Financial Dashboard',
    category: 'Power BI',
    description: 'Financial analytics dashboard with revenue and expense tracking.',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX'],
    github: 'https://github.com/MuhammadAdnan586/Financial-Analytics-Dashboard-',
    image: '/images/financial-dashboard.png',
  },
];

const categories = ['All', 'Machine Learning', 'Deep Learning', 'Power BI', 'SQL'];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          ref={ref}
          className="flex flex-wrap gap-3 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                  : 'glass hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/30 transition-all group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {project.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-accent mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 text-sm mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Accuracy */}
                  {project.accuracy !== 'N/A' && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg">
                      <p className="text-xs text-foreground/60">Model Accuracy</p>
                      <p className="text-2xl font-bold gradient-text">{project.accuracy}</p>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-primary/20 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Demo</span>
                      </motion.a>
                    )}
                    <motion.a
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg transition-all flex-1 justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">Details</span>
                      <ChevronRight size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
