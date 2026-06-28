'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import Link from 'next/link';

const roles = ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 pointer-events-none" />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-primary font-semibold text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Muhammad Adnan</span>
            </motion.h1>

            <motion.div
              className="h-16 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p
                key={roleIndex}
                className="text-2xl md:text-3xl font-semibold text-accent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {roles[roleIndex]}
              </motion.p>
            </motion.div>

            <motion.p
              className="text-lg text-foreground/70 mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Create intelligent solutions through Data Science, Machine Learning, AI and Analytics.
              Building predictive models and data-driven applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.a
                href="/Muhammad Adnan (CV).pdf"
                download
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/m-adnan-12a816402"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/MuhammadAdnan586"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="mailto:adnank75586@gmail.com"
                className="p-3 rounded-lg glass hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Profile Image */}
          <motion.div
            className="relative h-96 lg:h-full flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <motion.div
              className="relative w-80 h-96 rounded-3xl overflow-hidden border-2 border-primary/30 glass"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/WhatsApp_Image_2026-06-06_at_9.22.34_AM.jpeg"
                alt="Muhammad Adnan"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
