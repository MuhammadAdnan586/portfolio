'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
}

const mockRepos: GitHubRepo[] = [
  {
    name: 'AI-Powered AutoML Platform',
    description: 'Production-ready AutoML SaaS — automated ML pipeline with FastAPI, Next.js, SHAP explainability and a no-code API generator.',
    stars: 0,
    forks: 0,
    url: 'https://github.com/MuhammadAdnan586/AI-Powered-AutoML',
  },
  {
    name: 'Customer Intelligence & Revenue Optimization',
    description: 'SQL-driven customer analytics dashboard on the Olist dataset — RFM segmentation, cohort retention, product affinity and revenue leakage.',
    stars: 0,
    forks: 0,
    url: 'https://github.com/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization',
  },
  {
    name: 'AI Interview Readiness Platform',
    description: 'FastAPI-powered interview platform with CV parsing, dynamic question generation, voice analysis and automated scoring.',
    stars: 0,
    forks: 0,
    url: 'https://github.com/MuhammadAdnan586/interview-platform',
  },
];

export function GitHubStats() {
  const [repos, setRepos] = useState<GitHubRepo[]>(mockRepos);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title mb-4 flex items-center justify-center gap-3">
            <Github size={32} />
            GitHub Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {repos.map((repo, index) => (
            <motion.a
              key={index}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-primary/30 transition-all group cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <Github className="text-primary group-hover:scale-110 transition-transform" size={28} />
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 group-hover:bg-primary/30 transition-all">
                  Repository
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                {repo.name}
              </h3>

              <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                {repo.description}
              </p>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  <span className="text-sm font-semibold">{repo.stars}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork size={16} className="text-accent" />
                  <span className="text-sm font-semibold">{repo.forks}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/MuhammadAdnan586"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Repositories
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
