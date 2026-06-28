'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';
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
  details: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Customer Intelligence & Revenue Optimization',
    category: 'SQL & Analytics',
    description: 'Full-stack SQL analytics system answering 4 real business questions live from MySQL — RFM segmentation, retention, product affinity & revenue leakage — on the Olist e-commerce dataset.',
    accuracy: 'N/A',
    tech: ['MySQL', 'FastAPI', 'Next.js', 'SQLAlchemy', 'Recharts'],
    github: 'https://github.com/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization',
    details: 'Built a full-stack customer analytics platform on the Olist Brazilian e-commerce dataset (96K+ customers, $15.4M+ revenue analyzed). Every metric is computed live — a FastAPI backend runs raw SQL against MySQL and a Next.js + Recharts frontend renders the result. Covers RFM customer segmentation (Champions, Loyal, At Risk, Lost), repeat-purchase cohort retention, product-affinity "bought together" analysis, and revenue-leakage detection from canceled/unavailable orders, with a data-backed recommendation for each module.',
  },
  {
    id: 2,
    title: 'AI-Powered Interview Readiness Platform',
    category: 'AI SaaS Platforms',
    description: 'Multi-tenant SaaS that parses a candidate\'s CV, runs a personalized mock interview with voice or typed answers, and generates an explainable PDF readiness report.',
    accuracy: 'N/A',
    tech: ['FastAPI', 'Python', 'Whisper', 'MediaPipe', 'Sentence-Transformers'],
    github: 'https://github.com/MuhammadAdnan586/interview-platform',
    details: 'Built a 5-phase AI interview pipeline: CV upload with automatic skill/contact extraction, personalized question generation (LLM or template bank), voice or typed answer capture, and scoring across relevance, clarity and confidence. Speech-to-text runs on faster-Whisper, voice tone analysis uses librosa, and semantic answer scoring uses sentence-transformers with a TF-IDF fallback. An optional MediaPipe module gives descriptive posture/eye-contact feedback. Every module is auto-detected and gracefully degrades if not installed. Outputs a multi-dimensional PDF readiness report plus a company-side dashboard for comparing candidates — deliberately framed as a signal for a human reviewer, never an automated hire/reject verdict.',
  },
  {
    id: 3,
    title: 'AI-Powered AutoML SaaS Platform',
    category: 'AI SaaS Platforms',
    description: 'Production-ready AutoML SaaS — upload a dataset, auto-train & benchmark models, get SHAP explainability, and deploy a no-code prediction API in minutes.',
    accuracy: 'N/A',
    tech: ['FastAPI', 'Next.js', 'Scikit-Learn', 'XGBoost', 'SHAP', 'Docker'],
    github: 'https://github.com/MuhammadAdnan586/AI-Powered-AutoML',
    details: 'Built an end-to-end AutoML platform that takes a raw dataset and benchmarks multiple algorithms (Random Forest, XGBoost, Logistic Regression and more) with automated preprocessing and hyperparameter tuning. Includes SHAP-based explainability, an AI chat assistant for natural-language questions about the dataset, one-click PDF/Excel reports, and a versioned model registry with champion/staging promotion. Production features include a no-code REST API generator for any trained model, scheduled retraining, RBAC, monitoring/health checks, structured JSON logging, and an Nginx + Docker Compose deployment.',
  },
  {
    id: 4,
    title: 'AI-Powered Fertilizer Deficiency Detection',
    category: 'Deep Learning',
    description: 'Computer-vision app that detects Nitrogen, Phosphorus & Potassium deficiencies from leaf images and recommends fertilizers, reaching 96.3% accuracy with EfficientNet-B3.',
    accuracy: '96.3%',
    tech: ['TensorFlow', 'OpenCV', 'FastAPI', 'Next.js', 'MySQL', 'Docker'],
    github: 'https://github.com/MuhammadAdnan586/Fertilizer_Deficiency_Detection',
    details: 'Built a full-stack agriculture platform that detects nutrient deficiencies (Nitrogen, Phosphorus, Potassium, Magnesium, Iron, Calcium) from plant leaf images or structured soil data. Benchmarked a custom CNN, ResNet-50 and EfficientNet-B3 — EfficientNet-B3 won with 96.3% accuracy. Includes a soil-quality analyzer, an AI chat assistant for crop-health questions, a fertilizer recommendation engine, and auto-generated PDF diagnosis reports. Shipped as a role-based (farmer/agronomist/admin) Next.js + FastAPI web app, containerized with Docker Compose behind Nginx.',
  },
  {
    id: 5,
    title: 'Age & Gender Prediction + Food Recommendation',
    category: 'Deep Learning',
    description: 'CNN model predicting age and gender from facial images, paired with a bonus food-recommendation engine based on the predicted age group.',
    accuracy: '90%',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    github: 'https://github.com/MuhammadAdnan586/Age-and-Gender-Prediction',
    details: 'Trained a CNN on facial images to jointly predict age (regression) and gender (classification), with OpenCV handling face detection in the preprocessing pipeline. Gender classification reaches ~90%+ accuracy with age estimation around 5 years MAE. As a bonus module, added a rule-based food recommendation system that suggests age-appropriate food once a face is classified, combining computer vision with a practical recommendation layer.',
  },
  {
    id: 6,
    title: 'Power BI Sales Dashboard',
    category: 'Power BI',
    description: 'Interactive sales analytics dashboard with KPI tracking and regional trend analysis.',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX', 'SQL'],
    github: 'https://github.com/MuhammadAdnan586/Sale_Dashboard',
    image: '/images/sales-dashboard.png',
    details: 'Designed an interactive Power BI dashboard to track sales KPIs including Total Revenue (11M), Sum of Profit (3M), Profit Margin (29.59%), and Average Order Value (120.71K). Dashboard includes monthly revenue trends, regional breakdown, and product category analysis with dynamic filters.',
  },
  {
    id: 7,
    title: 'Power BI HR Analytics',
    category: 'Power BI',
    description: 'HR analytics dashboard tracking employee attrition and performance metrics.',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX'],
    github: 'https://github.com/MuhammadAdnan586/HR-Analytics-Dashboard-',
    image: '/images/hr-dashboard.png',
    details: 'Created a comprehensive HR Analytics Dashboard showing employee attrition rate (19.20%), total employees (1K), active employees (808), average age (40.32), satisfaction score (3.02), and average years (3.27). Includes department-wise attrition, gender distribution, salary analysis, and performance ratings with interactive filters.',
  },
  {
    id: 8,
    title: 'Power BI Financial Dashboard',
    category: 'Power BI',
    description: 'Financial analytics dashboard with revenue and expense tracking.',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX'],
    github: 'https://github.com/MuhammadAdnan586/Financial-Analytics-Dashboard-',
    image: '/images/financial-dashboard.png',
    details: 'Built a Financial Analytics Dashboard tracking Total Revenue (28M), Total Expense (9M), Net Profit (20M), Budget Variance (1M), and Profit Margin (69.40%). Includes monthly revenue trends, expense breakdown by sub-category (Salaries vs Operations), department-wise expense analysis, and quarterly revenue vs expense comparison.',
  },
];

const categories = ['All', 'AI SaaS Platforms', 'Deep Learning', 'SQL & Analytics', 'Power BI'];

export { projects };

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
                className="glass rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/30 transition-all group cursor-default flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="p-6 flex flex-col flex-1">
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
                  <div className="flex gap-3 mt-auto">
{project.github && project.github !== '#' && (                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span className="text-sm">GitHub</span>
                      </motion.a>
                    )}
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg transition-all flex-1 justify-center"
                    >
                      <span className="text-sm">Details</span>
                      <ChevronRight size={16} />
                    </Link>
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
