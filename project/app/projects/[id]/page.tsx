'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';

// Project data with detailed information
const projectsData: { [key: number]: any } = {
  1: {
    id: 1,
    title: 'Titanic Survival Prediction',
    category: 'Machine Learning',
    model: 'Random Forest Classifier',
    accuracy: '85%',
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Seaborn'],
    description:
      'A machine learning project that predicts the survival probability of Titanic passengers using a Random Forest Classifier. The model analyzes passenger features such as age, gender, class, and fare to determine survival likelihood.',
    fullDescription:
      'This project involves building a predictive model to determine whether a passenger would have survived the Titanic disaster. Using historical passenger data, the Random Forest Classifier learns patterns from various features including passenger class, age, gender, fare, and embarkation port. The model was trained on 80% of the data and evaluated on 20%, achieving an accuracy of 85%.',
    keyFeatures: [
      'Data preprocessing and cleaning',
      'Feature engineering from raw data',
      'Random Forest classification',
      'Cross-validation and hyperparameter tuning',
      'Feature importance analysis',
    ],
    algorithms: ['Random Forest', 'Logistic Regression', 'SVM'],
    metrics: {
      'Accuracy': 85,
      'Precision': 82,
      'Recall': 88,
      'F1-Score': 85,
    },
    charts: {
      survivalDistribution: [
        { name: 'Survived', value: 342, fill: '#06b6d4' },
        { name: 'Did not Survive', value: 549, fill: '#3b82f6' },
      ],
      featureImportance: [
        { name: 'Gender', value: 0.27 },
        { name: 'Fare', value: 0.23 },
        { name: 'Age', value: 0.19 },
        { name: 'Class', value: 0.16 },
        { name: 'Embark Port', value: 0.08 },
        { name: 'Others', value: 0.07 },
      ],
    },
  },
  2: {
    id: 2,
    title: 'House Price Prediction',
    category: 'Machine Learning',
    model: 'XGBoost & Random Forest',
    accuracy: '89%',
    tech: ['Python', 'XGBoost', 'Scikit-Learn', 'Pandas', 'Seaborn'],
    description:
      'A comprehensive regression model that predicts real estate prices based on property features. Combines XGBoost and Random Forest models with advanced feature engineering techniques.',
    fullDescription:
      'This regression project predicts house prices using multiple features including location, size, number of bedrooms, bathrooms, and amenities. The ensemble approach combining XGBoost and Random Forest achieves an R² score of 0.89, indicating excellent predictive performance.',
    keyFeatures: [
      'Feature engineering from property data',
      'Ensemble methods (XGBoost + Random Forest)',
      'Hyperparameter optimization with GridSearchCV',
      'Cross-validation for model robustness',
      'Price range predictions with confidence intervals',
    ],
    algorithms: ['XGBoost', 'Random Forest', 'Linear Regression'],
    metrics: {
      'R² Score': 89,
      'RMSE': 45000,
      'MAE': 35000,
      'MAPE': 12,
    },
    charts: {
      priceDistribution: [
        { name: '100K-200K', value: 45 },
        { name: '200K-300K', value: 120 },
        { name: '300K-400K', value: 85 },
        { name: '400K-500K', value: 65 },
        { name: '500K+', value: 35 },
      ],
      featureImportance: [
        { name: 'Location', value: 0.28 },
        { name: 'Size (sqft)', value: 0.24 },
        { name: 'Bedrooms', value: 0.15 },
        { name: 'Bathrooms', value: 0.12 },
        { name: 'Age', value: 0.11 },
        { name: 'Others', value: 0.10 },
      ],
    },
  },
  3: {
    id: 3,
    title: 'Customer Churn Prediction',
    category: 'Machine Learning',
    model: 'XGBoost',
    accuracy: '91%',
    tech: ['Python', 'XGBoost', 'Scikit-Learn', 'Pandas'],
    description:
      'An advanced classification model that identifies customers at risk of churning, enabling proactive retention strategies.',
    fullDescription:
      'This project predicts customer churn in a telecom company using XGBoost. The model identifies patterns in customer behavior, contract type, and service usage to predict which customers are likely to leave.',
    keyFeatures: [
      'Class imbalance handling',
      'Feature scaling and normalization',
      'XGBoost classification',
      'Feature importance visualization',
      'Business impact analysis',
    ],
    algorithms: ['XGBoost', 'Logistic Regression'],
    metrics: {
      'Accuracy': 91,
      'Precision': 89,
      'Recall': 92,
      'AUC-ROC': 94,
    },
    charts: {
      churnDistribution: [
        { name: 'Retained', value: 73, fill: '#06b6d4' },
        { name: 'Churned', value: 27, fill: '#ef4444' },
      ],
      featureImportance: [
        { name: 'Contract Type', value: 0.25 },
        { name: 'Tenure', value: 0.22 },
        { name: 'Monthly Charges', value: 0.18 },
        { name: 'Internet Service', value: 0.15 },
        { name: 'Others', value: 0.20 },
      ],
    },
  },
  5: {
    id: 5,
    title: 'Power BI Sales Dashboard',
    category: 'Power BI',
    model: 'Power BI Analytics',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX', 'SQL', 'Excel'],
    description:
      'Interactive sales analytics dashboard with KPI tracking, revenue analysis, and sales trend visualization.',
    fullDescription:
      'A comprehensive Power BI dashboard designed for sales team to monitor key performance indicators in real-time. The dashboard includes revenue tracking by region, salesperson, and product category. Features interactive filters for date range, region, and product type allowing deep-dive analysis.',
    keyFeatures: [
      'Real-time KPI dashboard',
      'Revenue tracking by region and product',
      'Sales trend analysis over time',
      'Top performers identification',
      'Interactive filtering and drill-down',
      'Monthly sales comparison charts',
    ],
    algorithms: ['DAX Calculations', 'Data Aggregation'],
    metrics: {
      'Total Revenue': 2500000,
      'Active Regions': 15,
      'Sales Growth': 23,
      'Top Product': 'Electronics',
    },
    charts: {
      salesTrend: [
        { month: 'Jan', sales: 150000, target: 140000 },
        { month: 'Feb', sales: 175000, target: 140000 },
        { month: 'Mar', sales: 165000, target: 140000 },
        { month: 'Apr', sales: 190000, target: 160000 },
        { month: 'May', sales: 220000, target: 160000 },
        { month: 'Jun', sales: 245000, target: 160000 },
      ],
      revenueByRegion: [
        { name: 'North', value: 450000, fill: '#06b6d4' },
        { name: 'South', value: 380000, fill: '#3b82f6' },
        { name: 'East', value: 520000, fill: '#8b5cf6' },
        { name: 'West', value: 650000, fill: '#ec4899' },
      ],
    },
  },
  6: {
    title: 'Image Classification',
    category: 'Deep Learning',
    model: 'CNN + Transfer Learning',
    accuracy: '94%',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    description:
      'A deep learning project using Convolutional Neural Networks with Transfer Learning to classify images with 94% accuracy.',
    fullDescription:
      'This deep learning model uses a pre-trained InceptionV3 network with additional custom layers for transfer learning. The model achieved 94% accuracy on the test dataset.',
    keyFeatures: [
      'Transfer learning with InceptionV3',
      'Data augmentation techniques',
      'Custom CNN architecture',
      'Model ensemble for improved accuracy',
      'Grad-CAM visualization for interpretability',
    ],
    algorithms: ['CNN', 'Transfer Learning', 'Ensemble Methods'],
    metrics: {
      'Accuracy': 94,
      'Precision': 93,
      'Recall': 94,
      'F1-Score': 93.5,
    },
    charts: {
      trainingHistory: [
        { epoch: 1, accuracy: 0.65, valAccuracy: 0.62 },
        { epoch: 2, accuracy: 0.75, valAccuracy: 0.73 },
        { epoch: 3, accuracy: 0.82, valAccuracy: 0.81 },
        { epoch: 4, accuracy: 0.88, valAccuracy: 0.87 },
        { epoch: 5, accuracy: 0.94, valAccuracy: 0.94 },
      ],
      classDistribution: [
        { name: 'Class A', value: 25 },
        { name: 'Class B', value: 30 },
        { name: 'Class C', value: 28 },
        { name: 'Class D', value: 17 },
      ],
    },
  },
  7: {
    id: 7,
    title: 'Student Management Database',
    category: 'SQL',
    model: 'MySQL Relational Database',
    accuracy: 'N/A',
    tech: ['MySQL', 'SQL', 'Database Design', 'Triggers', 'Stored Procedures'],
    description:
      'Comprehensive MySQL database system for managing student records, courses, enrollment, and academic performance.',
    fullDescription:
      'A fully normalized relational database designed for educational institutions to manage student information, course enrollment, grades, and attendance. Includes complex queries for academic analytics and reporting.',
    keyFeatures: [
      'Complete student information management',
      'Course and enrollment tracking',
      'Grade and performance management',
      'Advanced SQL queries for analytics',
      'Stored procedures for complex operations',
      'Database triggers for data integrity',
      'ER diagram with proper normalization',
      'CRUD operations optimization',
    ],
    algorithms: ['Database Normalization', 'Query Optimization'],
    metrics: {
      'Tables': 8,
      'Relationships': 12,
      'Stored Procedures': 15,
      'Triggers': 6,
    },
    charts: {
      studentDistribution: [
        { name: 'Engineering', value: 450, fill: '#06b6d4' },
        { name: 'Science', value: 320, fill: '#3b82f6' },
        { name: 'Arts', value: 280, fill: '#8b5cf6' },
        { name: 'Commerce', value: 200, fill: '#ec4899' },
      ],
      performanceMetrics: [
        { grade: 'A+', count: 150 },
        { grade: 'A', count: 280 },
        { grade: 'B+', count: 320 },
        { grade: 'B', count: 200 },
        { grade: 'C+', count: 100 },
      ],
    },
  },
  8: {
    id: 8,
    title: 'Hospital Management Database',
    category: 'SQL',
    model: 'MySQL Hospital System',
    accuracy: 'N/A',
    tech: ['MySQL', 'SQL', 'Database Design', 'Views', 'Indexes'],
    description:
      'Advanced database system for hospital operations including patient records, doctor schedules, appointments, and billing.',
    fullDescription:
      'A comprehensive hospital management system database that handles patient data, medical records, doctor assignments, appointment scheduling, billing, and pharmacy management. Designed with proper security and data integrity constraints.',
    keyFeatures: [
      'Patient records and medical history',
      'Doctor and staff management',
      'Appointment scheduling system',
      'Billing and invoice generation',
      'Pharmacy inventory tracking',
      'Department and ward management',
      'Lab test records and results',
      'Complex reporting queries',
    ],
    algorithms: ['Database Normalization', 'Index Optimization'],
    metrics: {
      'Tables': 12,
      'Views': 8,
      'Indexes': 15,
      'Relationships': 18,
    },
    charts: {
      departmentBeds: [
        { dept: 'Cardiology', beds: 45, occupied: 38 },
        { dept: 'Neurology', beds: 35, occupied: 28 },
        { dept: 'Pediatrics', beds: 40, occupied: 35 },
        { dept: 'Surgery', beds: 50, occupied: 42 },
        { dept: 'General', beds: 60, occupied: 52 },
      ],
      patientStats: [
        { name: 'Indoor', value: 195, fill: '#06b6d4' },
        { name: 'Outdoor', value: 340, fill: '#3b82f6' },
        { name: 'Emergency', value: 85, fill: '#ef4444' },
      ],
    },
  },
  9: {
    id: 9,
    title: 'Power BI HR Analytics Dashboard',
    category: 'Power BI',
    model: 'Power BI HR Analytics',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX', 'SQL', 'Excel'],
    description:
      'HR analytics dashboard tracking employee attrition, performance metrics, and departmental analysis.',
    fullDescription:
      'A powerful HR analytics dashboard providing insights into employee attrition, departmental performance, compensation analysis, and workforce demographics. Features predictive analytics for employee retention risks.',
    keyFeatures: [
      'Employee attrition analysis',
      'Performance metrics tracking',
      'Compensation and salary analysis',
      'Department-wise statistics',
      'Retention risk identification',
      'Hiring and recruitment trends',
      'Training and development metrics',
      'Employee satisfaction tracking',
    ],
    algorithms: ['DAX Calculations', 'Statistical Analysis'],
    metrics: {
      'Total Employees': 850,
      'Attrition Rate': 12,
      'Avg Tenure': 4.5,
      'Departments': 8,
    },
    charts: {
      attritionTrend: [
        { quarter: 'Q1', attrition: 8, retention: 92 },
        { quarter: 'Q2', attrition: 10, retention: 90 },
        { quarter: 'Q3', attrition: 12, retention: 88 },
        { quarter: 'Q4', attrition: 15, retention: 85 },
      ],
      deptDistribution: [
        { name: 'Engineering', value: 280, fill: '#06b6d4' },
        { name: 'Sales', value: 180, fill: '#3b82f6' },
        { name: 'HR', value: 45, fill: '#8b5cf6' },
        { name: 'Finance', value: 70, fill: '#ec4899' },
        { name: 'Others', value: 275, fill: '#f59e0b' },
      ],
    },
  },
  10: {
    id: 10,
    title: 'Power BI Financial Dashboard',
    category: 'Power BI',
    model: 'Power BI Finance Analytics',
    accuracy: 'N/A',
    tech: ['Power BI', 'DAX', 'SQL', 'Financial Data'],
    description:
      'Financial analytics dashboard with revenue analysis, expense tracking, and profit insights.',
    fullDescription:
      'Comprehensive financial dashboard providing real-time insights into company revenue, expenses, profit margins, and cash flow. Features budget vs actual analysis and forecasting capabilities.',
    keyFeatures: [
      'Revenue tracking and analysis',
      'Expense categorization and monitoring',
      'Profit margin analysis',
      'Budget vs actual comparison',
      'Cash flow forecasting',
      'Cost center analysis',
      'Financial ratio calculations',
      'Year-over-year comparisons',
    ],
    algorithms: ['DAX Calculations', 'Financial Modeling'],
    metrics: {
      'Total Revenue': 15000000,
      'Profit Margin': 22,
      'Operating Costs': 11700000,
      'ROI': 18.5,
    },
    charts: {
      revenueExpense: [
        { month: 'Jan', revenue: 1200000, expenses: 850000 },
        { month: 'Feb', revenue: 1350000, expenses: 890000 },
        { month: 'Mar', revenue: 1500000, expenses: 920000 },
        { month: 'Apr', revenue: 1450000, expenses: 910000 },
        { month: 'May', revenue: 1650000, expenses: 980000 },
        { month: 'Jun', revenue: 1850000, expenses: 1050000 },
      ],
      expenseBreakdown: [
        { name: 'Operations', value: 45, fill: '#06b6d4' },
        { name: 'Personnel', value: 35, fill: '#3b82f6' },
        { name: 'Marketing', value: 12, fill: '#8b5cf6' },
        { name: 'Other', value: 8, fill: '#ec4899' },
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
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link
            href="/#projects"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg inline-block"
          >
            Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Back Button */}
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
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-accent mb-4">
            {project.category}
          </div>
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-foreground/70 mb-6">{project.fullDescription}</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              className="glass rounded-lg p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm text-foreground/60 mb-1">Model Accuracy</p>
              <p className="text-3xl font-bold gradient-text">{project.accuracy}</p>
            </motion.div>
            <motion.div
              className="glass rounded-lg p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm text-foreground/60 mb-1">Model Type</p>
              <p className="text-lg font-bold">{project.model}</p>
            </motion.div>
            <motion.div
              className="glass rounded-lg p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm text-foreground/60 mb-1">Category</p>
              <p className="text-lg font-bold">{project.category}</p>
            </motion.div>
            <motion.div
              className="glass rounded-lg p-4"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm text-foreground/60 mb-1">Tech Stack</p>
              <p className="text-lg font-bold">{project.tech.length} Tools</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Features */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
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
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visualizations */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Project Visualization */}
            {(project.id === 5 || project.id === 9 || project.id === 10) && (
              <motion.div
                className="glass rounded-xl p-6 mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-6">Dashboard Preview</h3>
                <div className="w-full h-72 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Header Bar */}
                    <rect x="0" y="0" width="800" height="80" fill="#1a1a2e" stroke="#06b6d4" strokeWidth="2"/>
                    <text x="20" y="50" fontSize="24" fontWeight="bold" fill="#06b6d4">{project.title}</text>

                    {/* KPI Cards */}
                    <rect x="20" y="100" width="180" height="120" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" rx="8"/>
                    <text x="40" y="130" fontSize="12" fill="#ffffff60">Revenue</text>
                    <text x="40" y="160" fontSize="20" fontWeight="bold" fill="#06b6d4">$2.5M</text>
                    <text x="40" y="180" fontSize="11" fill="#ffffff40">+23% Growth</text>

                    <rect x="220" y="100" width="180" height="120" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" rx="8"/>
                    <text x="240" y="130" fontSize="12" fill="#ffffff60">Operations</text>
                    <text x="240" y="160" fontSize="20" fontWeight="bold" fill="#8b5cf6">1,850K</text>
                    <text x="240" y="180" fontSize="11" fill="#ffffff40">Active Metrics</text>

                    <rect x="420" y="100" width="180" height="120" fill="#0f172a" stroke="#ec4899" strokeWidth="2" rx="8"/>
                    <text x="440" y="130" fontSize="12" fill="#ffffff60">Growth Rate</text>
                    <text x="440" y="160" fontSize="20" fontWeight="bold" fill="#ec4899">23%</text>
                    <text x="440" y="180" fontSize="11" fill="#ffffff40">YoY Increase</text>

                    {/* Chart Area */}
                    <rect x="20" y="240" width="760" height="320" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" rx="8"/>
                    <text x="40" y="270" fontSize="14" fontWeight="bold" fill="#ffffff">Data Visualization</text>

                    {/* Sample Chart Bars */}
                    <rect x="80" y="400" width="40" height="120" fill="#06b6d4" opacity="0.8"/>
                    <rect x="140" y="360" width="40" height="160" fill="#8b5cf6" opacity="0.8"/>
                    <rect x="200" y="320" width="40" height="200" fill="#ec4899" opacity="0.8"/>
                    <rect x="260" y="380" width="40" height="140" fill="#f59e0b" opacity="0.8"/>
                    <rect x="320" y="340" width="40" height="180" fill="#10b981" opacity="0.8"/>
                    <rect x="380" y="360" width="40" height="160" fill="#06b6d4" opacity="0.8"/>
                    <rect x="440" y="300" width="40" height="220" fill="#8b5cf6" opacity="0.8"/>
                  </svg>
                </div>
                <p className="text-xs text-foreground/60 mt-4">Interactive dashboard with real-time analytics, KPI tracking, and data visualizations</p>
              </motion.div>
            )}

            {(project.id === 7 || project.id === 8) && (
              <motion.div
                className="glass rounded-xl p-6 mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-6">Database Structure</h3>
                <div className="w-full h-72 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Database Tables */}
                    {/* Table 1 */}
                    <rect x="20" y="20" width="180" height="200" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" rx="4"/>
                    <rect x="20" y="20" width="180" height="35" fill="#06b6d4"/>
                    <text x="35" y="45" fontSize="12" fontWeight="bold" fill="#0f172a">Users</text>
                    <line x1="20" y1="60" x2="200" y2="60" stroke="#06b6d4" strokeWidth="1"/>
                    <text x="30" y="85" fontSize="10" fill="#ffffff">id (PK)</text>
                    <text x="30" y="105" fontSize="10" fill="#ffffff">name</text>
                    <text x="30" y="125" fontSize="10" fill="#ffffff">email</text>
                    <text x="30" y="145" fontSize="10" fill="#ffffff">phone</text>
                    <text x="30" y="165" fontSize="10" fill="#ffffff">created_at</text>

                    {/* Table 2 */}
                    <rect x="220" y="20" width="180" height="200" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" rx="4"/>
                    <rect x="220" y="20" width="180" height="35" fill="#8b5cf6"/>
                    <text x="235" y="45" fontSize="12" fontWeight="bold" fill="#0f172a">Records</text>
                    <line x1="220" y1="60" x2="400" y2="60" stroke="#8b5cf6" strokeWidth="1"/>
                    <text x="230" y="85" fontSize="10" fill="#ffffff">id (PK)</text>
                    <text x="230" y="105" fontSize="10" fill="#ffffff">user_id (FK)</text>
                    <text x="230" y="125" fontSize="10" fill="#ffffff">data</text>
                    <text x="230" y="145" fontSize="10" fill="#ffffff">status</text>
                    <text x="230" y="165" fontSize="10" fill="#ffffff">updated_at</text>

                    {/* Table 3 */}
                    <rect x="420" y="20" width="180" height="200" fill="#0f172a" stroke="#ec4899" strokeWidth="2" rx="4"/>
                    <rect x="420" y="20" width="180" height="35" fill="#ec4899"/>
                    <text x="435" y="45" fontSize="12" fontWeight="bold" fill="#0f172a">Logs</text>
                    <line x1="420" y1="60" x2="600" y2="60" stroke="#ec4899" strokeWidth="1"/>
                    <text x="430" y="85" fontSize="10" fill="#ffffff">id (PK)</text>
                    <text x="430" y="105" fontSize="10" fill="#ffffff">record_id (FK)</text>
                    <text x="430" y="125" fontSize="10" fill="#ffffff">action</text>
                    <text x="430" y="145" fontSize="10" fill="#ffffff">timestamp</text>
                    <text x="430" y="165" fontSize="10" fill="#ffffff">user_id</text>

                    {/* Relationships */}
                    <line x1="200" y1="120" x2="220" y2="120" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5"/>
                    <polygon points="220,120 215,115 215,125" fill="#06b6d4"/>
                    <text x="205" y="110" fontSize="9" fill="#06b6d4">1:N</text>

                    <line x1="400" y1="150" x2="420" y2="150" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5"/>
                    <polygon points="420,150 415,145 415,155" fill="#8b5cf6"/>
                    <text x="405" y="140" fontSize="9" fill="#8b5cf6">1:N</text>

                    {/* Legend */}
                    <text x="20" y="290" fontSize="12" fontWeight="bold" fill="#ffffff">Database Info:</text>
                    <text x="20" y="315" fontSize="10" fill="#ffffff60">{project.id === 7 ? '8 Tables • 12 Relationships • Normalized Design' : '12 Tables • 18 Relationships • Optimized Indexes'}</text>
                    <text x="20" y="335" fontSize="10" fill="#ffffff60">PK = Primary Key | FK = Foreign Key</text>
                  </svg>
                </div>
                <p className="text-xs text-foreground/60 mt-4">Relational database design with proper normalization and optimized query performance</p>
              </motion.div>
            )}

            {/* Performance Metrics */}
            <motion.div
              className="glass rounded-xl p-6 mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(project.metrics).map(([key, value]: [string, any]) => (
                  <div key={key} className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">{key}</p>
                    <p className="text-2xl font-bold gradient-text">{value}%</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Charts */}
            {project.charts && (
              <>
                {project.charts.survivalDistribution && (
                  <motion.div
                    className="glass rounded-xl p-6 mb-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Survival Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={project.charts.survivalDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {project.charts.survivalDistribution.map(
                            (entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            )
                          )}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {project.charts.featureImportance && (
                  <motion.div
                    className="glass rounded-xl p-6 mb-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Feature Importance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={project.charts.featureImportance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1a2e',
                            border: '1px solid #ffffff20',
                          }}
                        />
                        <Bar dataKey="value" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {project.charts.trainingHistory && (
                  <motion.div
                    className="glass rounded-xl p-6 mb-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Training History</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={project.charts.trainingHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="epoch" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1a2e',
                            border: '1px solid #ffffff20',
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="accuracy" stroke="#06b6d4" />
                        <Line type="monotone" dataKey="valAccuracy" stroke="#8b5cf6" />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {project.charts.churnDistribution && (
                  <motion.div
                    className="glass rounded-xl p-6 mb-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Churn Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={project.charts.churnDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {project.charts.churnDistribution.map(
                            (entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            )
                          )}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {project.charts.classDistribution && (
                  <motion.div
                    className="glass rounded-xl p-6 mb-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Class Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={project.charts.classDistribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1a2e',
                            border: '1px solid #ffffff20',
                          }}
                        />
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
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6">Interested in this project?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://github.com/MuhammadAdnan586/Kingsman"
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
