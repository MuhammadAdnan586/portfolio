'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/20 transition-all mb-6"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">Resume</h1>
            <p className="text-foreground/70 text-lg">
              Muhammad Adnan - Data Scientist & Machine Learning Engineer
            </p>
          </motion.div>

          {/* PDF Viewer */}
          <motion.div
            className="glass rounded-xl overflow-hidden mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <iframe
              src="/Muhammad_Adnan_(CV).pdf"
              className="w-full h-screen min-h-96 rounded-lg"
              title="Muhammad Adnan CV"
            />
          </motion.div>

          {/* Download Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.a
              href="/Muhammad_Adnan_(CV).pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Resume (PDF)
            </motion.a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
