"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const keywords = ["Ask", "Answer", "Grow"];

  // cycle words
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % keywords.length), 2500);
    return () => clearInterval(id);
  }, []);

  // subtle parallax on mouse move (desktop)
  useEffect(() => {
    const handle = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      heroRef.current?.style.setProperty("--shift-x", `${x * 50}px`);
      heroRef.current?.style.setProperty("--shift-y", `${y * 50}px`);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 lg:px-16 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden"
      style={{
        backgroundPosition: "calc(50% + var(--shift-x)) calc(50% + var(--shift-y))",
      }}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:40px_40px] opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent rounded-full blur-3xl" />
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className={`hidden lg:block absolute w-16 h-16 rounded-2xl bg-gradient-to-r ${
              i % 2 === 0 
                ? 'from-primary/10 to-accent/10 border border-primary/20' 
                : 'from-accent/10 to-primary/10 border border-accent/20'
            } backdrop-blur-sm shadow-lg`}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i * 10)}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enhanced headline with word animation */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          <span className="inline-block">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -50, rotateX: 90 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
            >
              {keywords[wordIndex]}.
            </motion.span>
          </span>{" "}
          <span className="text-foreground">Learn.</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
            Excel.
          </span>
        </motion.h1>

        {/* Enhanced subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the world's largest community of developers.{" "}
            <span className="text-foreground font-semibold">Share knowledge,</span>{" "}
            <span className="text-foreground font-semibold">solve problems,</span> and{" "}
            <span className="text-foreground font-semibold">build amazing things together.</span>
          </p>
        </motion.div>

        {/* Enhanced action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="#features"
            className="group relative px-12 py-5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100 group-hover:opacity-90 transition-opacity" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-3 text-lg">
              Get Started Free
              <motion.svg
                className="w-6 h-6"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="#demo"
            className="group px-12 py-5 border-2 border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm text-foreground font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center gap-3 text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-8h2m-1 0V3m0 0L10 6m2-3l2 3" />
              </svg>
              Watch Demo
            </span>
          </motion.a>
        </motion.div>

        {/* Enhanced social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-8 items-center justify-center text-muted-foreground mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background flex items-center justify-center text-white font-semibold text-sm"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium">
              Join <span className="text-foreground font-bold">50,000+</span> developers
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">
              <span className="text-foreground font-bold">4.9/5</span> from our community
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
