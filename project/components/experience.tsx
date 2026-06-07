'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItem {
  type: 'experience' | 'education';
  title: string;
  organization: string;
  period: string;
  duration?: string;
  description: string;
  icon: React.ReactNode;
}

const timeline: TimelineItem[] = [
  {
    type: 'experience',
    title: 'Business Associate',
    organization: "Scroll'n Ecom",
    period: '2025 - 2026',
    duration: '6 - 12 Months',
    description:
      'Founded and managed an e-commerce startup, overseeing end-to-end business operations including product sourcing, online store management, digital marketing, and customer relations. Gained hands-on entrepreneurial experience in building and scaling an online business.',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    type: 'education',
    title: 'B.Sc. Computer Science',
    organization: 'Pir Mehr Ali Shah Arid Agriculture University, Rawalpindi',
    period: '2022 - 2026',
    description: 'CGPA: 3.46 / 4.0 - Completed with strong foundation in Data Science, Machine Learning, and Software Development.',
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    type: 'education',
    title: 'F.Sc. Pre-Engineering',
    organization: 'Zubair Public School & College, Dera Ismail Khan',
    period: '2022',
    description: 'Grade: A Grade - Strong foundation in Mathematics, Physics, and Chemistry.',
    icon: <GraduationCap className="w-6 h-6" />,
  },
];

export function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title mb-4">Experience & Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <motion.div
          ref={ref}
          className="relative space-y-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform md:-translate-x-1/2" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full glass flex items-center justify-center text-primary transform md:-translate-x-1/2 -translate-x-1/2 md:-translate-x-1/2"
                whileHover={{ scale: 1.1 }}
              >
                {item.icon}
              </motion.div>

              {/* Content */}
              <motion.div
                className={`flex-1 glass rounded-xl p-6 ml-24 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:w-5/12' : 'md:ml-auto md:w-5/12'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-accent mb-2">
                  {item.type === 'experience' ? 'Experience' : 'Education'}
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-primary font-semibold mb-1">{item.organization}</p>
                <p className="text-xs text-foreground/60 mb-3">{item.period}</p>
                {item.duration && (
                  <p className="text-xs text-foreground/50 mb-3">{item.duration}</p>
                )}
                <p className="text-foreground/80 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
