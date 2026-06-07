'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  category: string;
  skills: { name: string; level: number }[];
}

const skillsData: Skill[] = [
  {
    category: 'Programming & Libraries',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 90 },
      { name: 'Pandas', level: 92 },
      { name: 'NumPy', level: 90 },
      { name: 'Scikit-Learn', level: 92 },
    ],
  },
  {
    category: 'Machine Learning',
    skills: [
      { name: 'Linear Regression', level: 92 },
      { name: 'Logistic Regression', level: 90 },
      { name: 'Decision Tree', level: 88 },
      { name: 'Random Forest', level: 92 },
      { name: 'XGBoost', level: 90 },
      { name: 'Feature Engineering', level: 92 },
    ],
  },
  {
    category: 'Deep Learning',
    skills: [
      { name: 'TensorFlow', level: 88 },
      { name: 'Keras', level: 88 },
      { name: 'CNN', level: 90 },
      { name: 'Transfer Learning', level: 88 },
      { name: 'OpenCV', level: 85 },
    ],
  },
  {
    category: 'Data Visualization & BI',
    skills: [
      { name: 'Power BI', level: 90 },
      { name: 'Matplotlib', level: 88 },
      { name: 'Seaborn', level: 88 },
      { name: 'Tableau', level: 82 },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MySQL', level: 92 },
      { name: 'SQL Server', level: 88 },
      { name: 'Database Design', level: 90 },
      { name: 'DAX', level: 85 },
    ],
  },
  {
    category: 'Tools & IDEs',
    skills: [
      { name: 'Jupyter Notebook', level: 95 },
      { name: 'VS Code', level: 92 },
      { name: 'Git', level: 88 },
      { name: 'Power BI Desktop', level: 90 },
    ],
  },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="text-xs text-foreground/60">{level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title mb-4">Skills & Expertise</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-8 rounded-2xl hover:bg-white/20 transition-all"
            >
              <h3 className="text-xl font-bold mb-6 gradient-text">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <SkillBar key={idx} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
