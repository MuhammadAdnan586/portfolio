'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const projectsData: { [key: number]: any } = {
  1: {
    id: 1,
    title: 'Customer Intelligence & Revenue Optimization',
    category: 'SQL & Analytics',
    model: 'SQL Analytics Engine',
    accuracy: 'N/A',
    tech: ['MySQL', 'FastAPI', 'SQLAlchemy', 'Next.js', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/MuhammadAdnan586/Customer-Intelligence-Revenue-Optimization',
    description: 'A full-stack SQL-driven analytics dashboard answering four real business questions live from a MySQL database, built on the Olist Brazilian e-commerce dataset.',
    fullDescription: 'A full-stack customer intelligence dashboard built on the Olist Brazilian e-commerce dataset (2016-2018), analyzing 96,096 unique customers and $15.42M in delivered revenue. Every number on the dashboard is computed live — a FastAPI backend runs raw SQL against MySQL on each request, and a Next.js + Recharts frontend renders the result. The dashboard answers four real business questions: who the best customers are (RFM segmentation), whether customers come back (repeat-purchase & cohort retention), what products get bought together (product affinity), and where revenue is leaking (canceled/unavailable order analysis) — each module ending in a data-backed recommendation.',
    keyFeatures: [
      'RFM segmentation scoring 93,357 customers into Champions, Loyal, New, At Risk, Need Attention & Lost',
      'Repeat-purchase & cohort retention analysis across all delivered customers',
      'Product-affinity mining of category pairs frequently bought together',
      'Revenue-leakage detection tracing canceled/unavailable orders back to product category',
      'Live FastAPI + SQLAlchemy backend — every metric queried from MySQL on request',
      'Recharts-powered Next.js dashboard with a recommendation card per module',
    ],
    algorithms: ['RFM Scoring', 'Cohort Analysis', 'Market Basket / Affinity Analysis'],
    metrics: {
      'Total Customers': '96,096',
      'Revenue Analyzed': '$15.42M',
      'Avg Order Value': '$159.86',
      'Revenue at Risk': '$270K',
    },
    charts: {
      repeatPurchaseRate: [
        { name: 'One-Time Buyers', value: 97, fill: '#3b82f6' },
        { name: 'Repeat Buyers', value: 3, fill: '#06b6d4' },
      ],
    },
  },
  2: {
    id: 2,
    title: 'AI-Powered Interview Readiness Platform',
    category: 'AI SaaS Platforms',
    model: 'Multi-Tenant AI SaaS',
    accuracy: 'N/A',
    tech: ['FastAPI', 'Python', 'SQLite', 'faster-Whisper', 'librosa', 'Sentence-Transformers', 'MediaPipe'],
    github: 'https://github.com/MuhammadAdnan586/interview-platform',
    description: 'A multi-tenant SaaS that analyzes a candidate\'s CV, runs a personalized mock interview, and produces an explainable, multi-dimensional readiness report.',
    fullDescription: 'A multi-tenant SaaS platform that parses a candidate\'s CV, runs a personalized mock interview (voice or typed), and produces an explainable, multi-dimensional readiness report rather than a blunt hire/reject verdict. Every "smart" feature — LLM question generation, real voice transcription, semantic scoring, body-language analysis — is optional and auto-detected, so the app is fully functional out of the box and gets smarter as more modules are installed.',
    keyFeatures: [
      'PDF CV parsing with automatic skill, contact & experience extraction',
      'Personalized question generation via local LLM (Ollama) with a template-bank fallback',
      'Speech-to-text via faster-Whisper plus voice confidence scoring (pitch & pause analysis)',
      'Semantic answer scoring with sentence-transformers, TF-IDF fallback for typed answers',
      'Optional MediaPipe webcam module for descriptive posture/eye-contact feedback — never scored',
      'Company dashboard for side-by-side candidate comparison with configurable category weights',
      'Auto-generated PDF readiness report explicitly framed as a signal for a human reviewer',
    ],
    algorithms: ['Whisper STT', 'Sentence Embeddings', 'TF-IDF', 'Pitch/Pause Voice Analysis'],
    metrics: {
      'Pipeline Phases': '5',
      'Scoring Dimensions': '3',
      'Optional AI Modules': '4',
      'Report Output': 'PDF',
    },
  },
  3: {
    id: 3,
    title: 'AI-Powered AutoML SaaS Platform',
    category: 'AI SaaS Platforms',
    model: 'AutoML SaaS Platform',
    accuracy: 'N/A',
    tech: ['FastAPI', 'Next.js', 'TypeScript', 'Scikit-Learn', 'XGBoost', 'SHAP', 'MySQL', 'Docker'],
    github: 'https://github.com/MuhammadAdnan586/AI-Powered-AutoML',
    description: 'A production-ready AutoML SaaS that takes a raw dataset to a deployed, explainable prediction API — no code required.',
    fullDescription: 'A production-ready, full-stack Automated Machine Learning SaaS that lets a user upload a dataset, automatically train and benchmark multiple ML models, understand why a model predicted what it did via SHAP, and deploy a live prediction API — without writing a single line of code. Built with a FastAPI + MySQL backend and a Next.js + TypeScript frontend, containerized with Docker Compose behind Nginx.',
    keyFeatures: [
      'Automated model selection, preprocessing and hyperparameter tuning across multiple algorithms',
      'SHAP-based explainability for every trained model',
      'AI chat assistant for natural-language questions about the dataset',
      'Versioned model registry with champion/staging promotion',
      'No-code REST API generator — one click to deploy any trained model',
      'Scheduled retraining, RBAC, monitoring/health checks & structured JSON logging',
      'One-click PDF & Excel report generation',
    ],
    algorithms: ['Random Forest', 'XGBoost', 'Logistic Regression', 'SHAP'],
    metrics: {
      'Algorithms Benchmarked': '5+',
      'Explainability': 'SHAP',
      'API Generation': 'No-Code',
      'Deployment': 'Docker + Nginx',
    },
  },
  4: {
    id: 4,
    title: 'AI-Powered Fertilizer Deficiency Detection',
    category: 'Deep Learning',
    model: 'EfficientNet-B3 (CNN)',
    accuracy: '96.3%',
    tech: ['TensorFlow', 'OpenCV', 'FastAPI', 'Next.js', 'TypeScript', 'MySQL', 'Docker', 'Nginx'],
    github: 'https://github.com/MuhammadAdnan586/Fertilizer_Deficiency_Detection',
    description: 'A full-stack computer-vision app that detects nutrient deficiencies from plant leaf images and recommends fertilizers in seconds.',
    fullDescription: 'A full-stack intelligent agriculture system that lets farmers and agronomists upload a plant/soil image or input crop data and instantly detect nutrient deficiencies — Nitrogen, Phosphorus, Potassium, Magnesium, Iron and Calcium — then receive AI-driven fertilizer recommendations. Three architectures were benchmarked for the detection engine: a custom CNN, ResNet-50, and EfficientNet-B3, which won out with 96.3% accuracy. Shipped as a role-based (farmer/agronomist/admin) Next.js + FastAPI web app, containerized with Docker Compose.',
    keyFeatures: [
      'Deep learning multi-class deficiency detection from leaf images',
      'Soil-data analyzer with NPK & pH-based quality scoring',
      'AI chat assistant for natural-language crop-health questions',
      'Fertilizer recommendation engine tailored to crop type and detected deficiency',
      'One-click auto-generated PDF diagnosis reports',
      'Role-based access (farmer / agronomist / admin) with crop-history tracking',
      'Dockerized production deployment behind Nginx',
    ],
    algorithms: ['Custom CNN', 'ResNet-50', 'EfficientNet-B3'],
    metrics: {
      'Best Accuracy': '96.3%',
      'Precision': '96.0%',
      'Recall': '96.5%',
      'F1-Score': '96.2%',
    },
    charts: {
      modelComparison: [
        { name: 'Custom CNN', value: 91.2 },
        { name: 'ResNet-50', value: 94.7 },
        { name: 'EfficientNet-B3', value: 96.3 },
      ],
    },
  },
  5: {
    id: 5,
    title: 'Age & Gender Prediction + Food Recommendation',
    category: 'Deep Learning',
    model: 'CNN (Age + Gender)',
    accuracy: '90%',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/MuhammadAdnan586/Age-and-Gender-Prediction',
    description: 'A CNN that predicts age and gender from facial images, with a bonus food-recommendation engine tied to the predicted age group.',
    fullDescription: 'A deep learning project that uses a Convolutional Neural Network to predict a person\'s age and gender from facial images, built on TensorFlow and Keras with OpenCV handling face detection in the preprocessing pipeline. Gender is predicted as a classification task while age is estimated via regression. As a bonus feature, a rule-based food recommendation system suggests nutritionally appropriate food once a face is classified into an age group — combining computer vision with a practical recommendation layer.',
    keyFeatures: [
      'CNN-based facial analysis predicting age and gender simultaneously',
      'OpenCV face-detection preprocessing pipeline',
      'Transfer learning support for faster training, plus data augmentation',
      'Bonus rule-based food recommendation engine keyed to predicted age group',
      'Training curves, sample predictions & confusion-matrix visualizations',
      'Reproducible end-to-end Jupyter Notebook workflow',
    ],
    algorithms: ['CNN', 'Transfer Learning', 'Rule-Based Recommendation'],
    metrics: {
      'Gender Accuracy': '~90%',
      'Age Estimation MAE': '~5 yrs',
      'Face Detection': 'Real-time',
      'Bonus Module': 'Food Reco',
    },
  },
  6: {
    id: 6,
    title: 'Power BI Sales Dashboard',
    category: 'Power BI',
    model: 'Power BI Analytics',
    accuracy: 'N/A',
    image: '/images/sales-dashboard.png',
    tech: ['Power BI', 'DAX', 'SQL', 'Excel'],
    github: 'https://github.com/MuhammadAdnan586/Sale_Dashboard',
    description: 'Interactive sales analytics dashboard with KPI tracking, revenue analysis, and sales trend visualization.',
    fullDescription: 'A comprehensive Power BI dashboard designed for the sales team to monitor key performance indicators in real-time. The dashboard includes revenue tracking by region, product category, and monthly trends with interactive filters.',
    keyFeatures: ['Real-time KPI dashboard', 'Revenue tracking by region and product', 'Sales trend analysis over time', 'Top performers identification', 'Interactive filtering and drill-down', 'Monthly sales comparison charts'],
    algorithms: ['DAX Calculations', 'Data Aggregation'],
    metrics: {
      'Total Revenue': '11M',
      'Sum of Profit': '3M',
      'Profit Margin': '29.59%',
      'Avg Order Value': '120.71K',
    },
    charts: {
      revenueByRegion: [
        { name: 'East', value: 4000000, fill: '#06b6d4' },
        { name: 'North', value: 3500000, fill: '#3b82f6' },
        { name: 'South', value: 3000000, fill: '#8b5cf6' },
        { name: 'West', value: 1000000, fill: '#ec4899' },
      ],
    },
  },
  7: {
    id: 7,
    title: 'Power BI HR Analytics Dashboard',
    category: 'Power BI',
    model: 'Power BI HR Analytics',
    accuracy: 'N/A',
    image: '/images/hr-dashboard.png',
    tech: ['Power BI', 'DAX', 'SQL', 'Excel'],
    github: 'https://github.com/MuhammadAdnan586/HR-Analytics-Dashboard-',
    description: 'HR analytics dashboard tracking employee attrition, performance metrics, and departmental analysis.',
    fullDescription: 'A powerful HR analytics dashboard providing insights into employee attrition, departmental performance, compensation analysis, and workforce demographics.',
    keyFeatures: ['Employee attrition analysis', 'Performance metrics tracking', 'Compensation and salary analysis', 'Department-wise statistics', 'Retention risk identification', 'Hiring and recruitment trends', 'Training and development metrics', 'Employee satisfaction tracking'],
    algorithms: ['DAX Calculations', 'Statistical Analysis'],
    metrics: {
      'Attrition Rate': '19.20%',
      'Total Employees': '1K',
      'Active Employees': '808',
      'Avg Satisfaction': '3.02',
    },
    charts: {
      deptDistribution: [
        { name: 'Engineering', value: 280, fill: '#06b6d4' },
        { name: 'Sales', value: 180, fill: '#3b82f6' },
        { name: 'HR', value: 45, fill: '#8b5cf6' },
        { name: 'Finance', value: 70, fill: '#ec4899' },
        { name: 'Others', value: 275, fill: '#f59e0b' },
      ],
    },
  },
  8: {
    id: 8,
    title: 'Power BI Financial Dashboard',
    category: 'Power BI',
    model: 'Power BI Finance Analytics',
    accuracy: 'N/A',
    image: '/images/financial-dashboard.png',
    tech: ['Power BI', 'DAX', 'SQL', 'Financial Data'],
    github: 'https://github.com/MuhammadAdnan586/Financial-Analytics-Dashboard-',
    description: 'Financial analytics dashboard with revenue analysis, expense tracking, and profit insights.',
    fullDescription: 'Comprehensive financial dashboard providing real-time insights into company revenue, expenses, profit margins, and cash flow. Features budget vs actual analysis and forecasting capabilities.',
    keyFeatures: ['Revenue tracking and analysis', 'Expense categorization and monitoring', 'Profit margin analysis', 'Budget vs actual comparison', 'Cash flow forecasting', 'Cost center analysis', 'Financial ratio calculations', 'Year-over-year comparisons'],
    algorithms: ['DAX Calculations', 'Financial Modeling'],
    metrics: {
      'Total Revenue': '28M',
      'Total Expense': '9M',
      'Net Profit': '20M',
      'Profit Margin': '69.40%',
    },
    charts: {
      expenseBreakdown: [
        { name: 'Salaries', value: 60, fill: '#06b6d4' },
        { name: 'Operations', value: 40, fill: '#f59e0b' },
      ],
    },
  },
};

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const project = projectsData[parseInt(params.id)];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/#projects" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg inline-block">
            Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <motion.button
        onClick={() => router.back()}
        className="fixed top-24 left-8 p-2 rounded-lg glass hover:bg-white/20 transition-all z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-accent mb-4">{project.category}</div>
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-foreground/70 mb-6">{project.fullDescription}</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div className="glass rounded-lg p-4" whileHover={{ scale: 1.05 }}>
              <p className="text-sm text-foreground/60 mb-1">Model Accuracy</p>
              <p className="text-3xl font-bold gradient-text">{project.accuracy}</p>
            </motion.div>
            <motion.div className="glass rounded-lg p-4" whileHover={{ scale: 1.05 }}>
              <p className="text-sm text-foreground/60 mb-1">Model Type</p>
              <p className="text-lg font-bold">{project.model}</p>
            </motion.div>
            <motion.div className="glass rounded-lg p-4" whileHover={{ scale: 1.05 }}>
              <p className="text-sm text-foreground/60 mb-1">Category</p>
              <p className="text-lg font-bold">{project.category}</p>
            </motion.div>
            <motion.div className="glass rounded-lg p-4" whileHover={{ scale: 1.05 }}>
              <p className="text-sm text-foreground/60 mb-1">Tech Stack</p>
              <p className="text-lg font-bold">{project.tech.length} Tools</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column */}
          <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="glass rounded-xl p-6 sticky top-28">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.keyFeatures.map((feature: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-semibold mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>

            {/* Power BI Dashboard Image */}
            {project.image && (
              <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                <h3 className="text-xl font-bold mb-4">Dashboard Preview</h3>
                <img src={project.image} alt={project.title} className="w-full rounded-lg object-cover" />
              </motion.div>
            )}

            {/* Performance Metrics */}
            <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
              <h3 className="text-xl font-bold mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(project.metrics).map(([key, value]: [string, any]) => (
                  <div key={key} className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-sm text-foreground/60 mb-2">{key}</p>
                    <p className="text-2xl font-bold gradient-text">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Charts */}
            {project.charts && (
              <>
                {project.charts.repeatPurchaseRate && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Repeat-Purchase Rate</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={project.charts.repeatPurchaseRate} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} dataKey="value">
                          {project.charts.repeatPurchaseRate.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.modelComparison && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Model Accuracy Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={project.charts.modelComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }} />
                        <Bar dataKey="value" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.survivalDistribution && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Survival Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={project.charts.survivalDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} dataKey="value">
                          {project.charts.survivalDistribution.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.featureImportance && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Feature Importance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={project.charts.featureImportance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }} />
                        <Bar dataKey="value" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.trainingHistory && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Training History</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={project.charts.trainingHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="epoch" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }} />
                        <Legend />
                        <Line type="monotone" dataKey="accuracy" stroke="#06b6d4" />
                        <Line type="monotone" dataKey="valAccuracy" stroke="#8b5cf6" />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.churnDistribution && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Churn Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={project.charts.churnDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} dataKey="value">
                          {project.charts.churnDistribution.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.revenueByRegion && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Revenue by Region</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={project.charts.revenueByRegion}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }} />
                        <Bar dataKey="value" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.deptDistribution && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Department Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={project.charts.deptDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} dataKey="value">
                          {project.charts.deptDistribution.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.expenseBreakdown && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Expense Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={project.charts.expenseBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} dataKey="value">
                          {project.charts.expenseBreakdown.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.performanceMetrics && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Performance Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={project.charts.performanceMetrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="grade" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }} />
                        <Bar dataKey="count" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.patientStats && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Patient Statistics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={project.charts.patientStats} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} dataKey="value">
                          {project.charts.patientStats.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {project.charts.classDistribution && (
                  <motion.div className="glass rounded-xl p-6 mb-8" whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xl font-bold mb-6">Class Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={project.charts.classDistribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }} />
                        <Bar dataKey="value" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div className="text-center py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
          <h3 className="text-2xl font-bold mb-6">Interested in this project?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={project.github || 'https://github.com/MuhammadAdnan586'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
              View on GitHub
            </motion.a>
            <motion.a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
