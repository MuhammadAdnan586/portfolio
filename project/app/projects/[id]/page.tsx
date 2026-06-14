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
    title: 'Titanic Survival Prediction',
    category: 'Machine Learning',
    model: 'Random Forest Classifier',
    accuracy: '85%',
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Seaborn'],
    description: 'A machine learning project that predicts the survival probability of Titanic passengers using a Random Forest Classifier.',
    fullDescription: 'This project involves building a predictive model to determine whether a passenger would have survived the Titanic disaster. Using historical passenger data, the Random Forest Classifier learns patterns from various features including passenger class, age, gender, fare, and embarkation port. The model was trained on 80% of the data and evaluated on 20%, achieving an accuracy of 85%.',
    keyFeatures: ['Data preprocessing and cleaning', 'Feature engineering from raw data', 'Random Forest classification', 'Cross-validation and hyperparameter tuning', 'Feature importance analysis'],
    algorithms: ['Random Forest', 'Logistic Regression', 'SVM'],
    metrics: { 'Accuracy': 85, 'Precision': 82, 'Recall': 88, 'F1-Score': 85 },
    charts: {
      survivalDistribution: [
        { name: 'Survived', value: 342, fill: '#06b6d4' },
        { name: 'Did not Survive', value: 549, fill: '#3b82f6' },
      ],
      featureImportance: [
        { name: 'Gender', value: 0.27 }, { name: 'Fare', value: 0.23 }, { name: 'Age', value: 0.19 },
        { name: 'Class', value: 0.16 }, { name: 'Embark Port', value: 0.08 }, { name: 'Others', value: 0.07 },
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
    description: 'A comprehensive regression model that predicts real estate prices based on property features.',
    fullDescription: 'This regression project predicts house prices using multiple features including location, size, number of bedrooms, bathrooms, and amenities. The ensemble approach combining XGBoost and Random Forest achieves an R² score of 0.89.',
    keyFeatures: ['Feature engineering from property data', 'Ensemble methods (XGBoost + Random Forest)', 'Hyperparameter optimization with GridSearchCV', 'Cross-validation for model robustness', 'Price range predictions with confidence intervals'],
    algorithms: ['XGBoost', 'Random Forest', 'Linear Regression'],
    metrics: { 'R² Score': 89, 'RMSE': 45000, 'MAE': 35000, 'MAPE': 12 },
    charts: {
      featureImportance: [
        { name: 'Location', value: 0.28 }, { name: 'Size (sqft)', value: 0.24 }, { name: 'Bedrooms', value: 0.15 },
        { name: 'Bathrooms', value: 0.12 }, { name: 'Age', value: 0.11 }, { name: 'Others', value: 0.10 },
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
    description: 'An advanced classification model that identifies customers at risk of churning.',
    fullDescription: 'This project predicts customer churn in a telecom company using XGBoost. The model identifies patterns in customer behavior, contract type, and service usage to predict which customers are likely to leave.',
    keyFeatures: ['Class imbalance handling', 'Feature scaling and normalization', 'XGBoost classification', 'Feature importance visualization', 'Business impact analysis'],
    algorithms: ['XGBoost', 'Logistic Regression'],
    metrics: { 'Accuracy': 91, 'Precision': 89, 'Recall': 92, 'AUC-ROC': 94 },
    charts: {
      churnDistribution: [
        { name: 'Retained', value: 73, fill: '#06b6d4' },
        { name: 'Churned', value: 27, fill: '#ef4444' },
      ],
      featureImportance: [
        { name: 'Contract Type', value: 0.25 }, { name: 'Tenure', value: 0.22 },
        { name: 'Monthly Charges', value: 0.18 }, { name: 'Internet Service', value: 0.15 }, { name: 'Others', value: 0.20 },
      ],
    },
  },
  4: {
    id: 4,
    title: 'Sales Forecasting',
    category: 'Machine Learning',
    model: 'Prophet + XGBoost',
    accuracy: '88%',
    tech: ['Python', 'Prophet', 'XGBoost', 'Pandas'],
    description: 'Time series forecasting using Prophet and XGBoost for accurate sales predictions.',
    fullDescription: 'Built a time series forecasting solution combining Facebook Prophet and XGBoost to predict future sales. Handled seasonality, trends, and holiday effects. Achieved 88% forecast accuracy on test data.',
    keyFeatures: ['Time series decomposition', 'Seasonality and trend analysis', 'Facebook Prophet integration', 'XGBoost for residual modeling', 'Holiday effects handling'],
    algorithms: ['Prophet', 'XGBoost'],
    metrics: { 'Accuracy': 88, 'MAE': 12, 'RMSE': 15, 'MAPE': 8 },
    charts: {
      featureImportance: [
        { name: 'Trend', value: 0.35 }, { name: 'Seasonality', value: 0.28 },
        { name: 'Holiday', value: 0.20 }, { name: 'Others', value: 0.17 },
      ],
    },
  },
  5: {
    id: 5,
    title: 'Power BI Sales Dashboard',
    category: 'Power BI',
    model: 'Power BI Analytics',
    accuracy: 'N/A',
    image: '/images/sales-dashboard.png',
    tech: ['Power BI', 'DAX', 'SQL', 'Excel'],
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
  6: {
    id: 6,
    title: 'Image Classification',
    category: 'Deep Learning',
    model: 'CNN + Transfer Learning',
    accuracy: '94%',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    description: 'A deep learning project using Convolutional Neural Networks with Transfer Learning to classify images with 94% accuracy.',
    fullDescription: 'This deep learning model uses a pre-trained InceptionV3 network with additional custom layers for transfer learning. The model achieved 94% accuracy on the test dataset.',
    keyFeatures: ['Transfer learning with InceptionV3', 'Data augmentation techniques', 'Custom CNN architecture', 'Model ensemble for improved accuracy', 'Grad-CAM visualization for interpretability'],
    algorithms: ['CNN', 'Transfer Learning', 'Ensemble Methods'],
    metrics: { 'Accuracy': 94, 'Precision': 93, 'Recall': 94, 'F1-Score': 93.5 },
    charts: {
      trainingHistory: [
        { epoch: 1, accuracy: 0.65, valAccuracy: 0.62 }, { epoch: 2, accuracy: 0.75, valAccuracy: 0.73 },
        { epoch: 3, accuracy: 0.82, valAccuracy: 0.81 }, { epoch: 4, accuracy: 0.88, valAccuracy: 0.87 },
        { epoch: 5, accuracy: 0.94, valAccuracy: 0.94 },
      ],
      classDistribution: [
        { name: 'Class A', value: 25 }, { name: 'Class B', value: 30 },
        { name: 'Class C', value: 28 }, { name: 'Class D', value: 17 },
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
    description: 'Comprehensive MySQL database system for managing student records, courses, enrollment, and academic performance.',
    fullDescription: 'A fully normalized relational database designed for educational institutions to manage student information, course enrollment, grades, and attendance.',
    keyFeatures: ['Complete student information management', 'Course and enrollment tracking', 'Grade and performance management', 'Advanced SQL queries for analytics', 'Stored procedures for complex operations', 'Database triggers for data integrity', 'ER diagram with proper normalization', 'CRUD operations optimization'],
    algorithms: ['Database Normalization', 'Query Optimization'],
    metrics: { 'Tables': 8, 'Relationships': 12, 'Stored Procedures': 15, 'Triggers': 6 },
    charts: {
      performanceMetrics: [
        { grade: 'A+', count: 150 }, { grade: 'A', count: 280 }, { grade: 'B+', count: 320 },
        { grade: 'B', count: 200 }, { grade: 'C+', count: 100 },
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
    description: 'Advanced database system for hospital operations including patient records, doctor schedules, appointments, and billing.',
    fullDescription: 'A comprehensive hospital management system database that handles patient data, medical records, doctor assignments, appointment scheduling, billing, and pharmacy management.',
    keyFeatures: ['Patient records and medical history', 'Doctor and staff management', 'Appointment scheduling system', 'Billing and invoice generation', 'Pharmacy inventory tracking', 'Department and ward management', 'Lab test records and results', 'Complex reporting queries'],
    algorithms: ['Database Normalization', 'Index Optimization'],
    metrics: { 'Tables': 12, 'Views': 8, 'Indexes': 15, 'Relationships': 18 },
    charts: {
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
    image: '/images/hr-dashboard.png',
    tech: ['Power BI', 'DAX', 'SQL', 'Excel'],
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
  10: {
    id: 10,
    title: 'Power BI Financial Dashboard',
    category: 'Power BI',
    model: 'Power BI Finance Analytics',
    accuracy: 'N/A',
    image: '/images/financial-dashboard.png',
    tech: ['Power BI', 'DAX', 'SQL', 'Financial Data'],
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
              href={
                project.id === 5 ? 'https://github.com/MuhammadAdnan586/Sale_Dashboard'
                : project.id === 9 ? 'https://github.com/MuhammadAdnan586/HR-Analytics-Dashboard-'
                : project.id === 10 ? 'https://github.com/MuhammadAdnan586/Financial-Analytics-Dashboard-'
                : 'https://github.com/MuhammadAdnan586'
              }
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