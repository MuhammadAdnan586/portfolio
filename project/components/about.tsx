'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AnimatedCounter } from './animated-counter';

const stats = [
  { label: 'Projects Completed', value: 8, suffix: '+' },
  { label: 'Certifications', value: 1, suffix: '+' },
  { label: 'Skills', value: 35, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' },
];

const interests = [
  'Data Science',
  'Machine Learning',
  'Deep Learning',
  'Artificial Intelligence',
  'Business Intelligence',
  'Data Analytics',
];

export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title mb-4">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              Computer Science graduate with hands-on experience in Data Science, Machine Learning, Deep Learning, SQL and Power BI.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              Currently working as a Data Scientist at <strong className="text-foreground">DevRolin</strong>, building end-to-end AI-powered SaaS platforms, predictive models and business intelligence dashboards using Python, FastAPI, Next.js, TensorFlow and Power BI. Passionate about solving real-world problems through data-driven solutions.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              <strong className="text-foreground">Education:</strong>
              <br />
              BS Computer Science
              <br />
              Pir Mehr Ali Shah Arid Agriculture University Rawalpindi
              <br />
              CGPA: 3.46/4.00 | 2022 - 2026
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass p-6 rounded-xl text-center hover:bg-white/20 transition-all"
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {inView ? (
                    <>
                      <AnimatedCounter from={0} to={stat.value} duration={2} />
                      {stat.suffix}
                    </>
                  ) : (
                    <>0{stat.suffix}</>
                  )}
                </div>
                <p className="text-sm text-foreground/70">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Interested In</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="glass px-6 py-2 rounded-full hover:bg-white/20 transition-all cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
