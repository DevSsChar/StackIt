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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 lg:px-16 overflow-hidden pt-20"
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, var(--background) 0%, var(--muted) 100%)
        `,
        backgroundPosition: "calc(50% + var(--shift-x)) calc(50% + var(--shift-y))",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        {/* Geometric patterns */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-primary/30 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-accent/30 rotate-45 animate-spin-slow animation-delay-1500" />
        <div className="absolute top-40 left-1/3 w-2 h-2 bg-primary/40 rounded-full animate-bounce animation-delay-500" />
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-accent/40 rounded-full animate-bounce animation-delay-1000" />
      </div>

      {/* floating cards */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Enhanced floating cards with gradients */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 1.2, delay: 0.3, y: { repeat: Infinity, duration: 4 } }}
          className="hidden md:block absolute top-20 left-14 w-40 h-20 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-2xl border border-border/50"
        >
          <div className="p-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <div className="flex-1 h-2 bg-primary/20 rounded" />
          </div>
          <div className="px-3 pb-2">
            <div className="h-1.5 bg-accent/30 rounded w-3/4 mb-1" />
            <div className="h-1.5 bg-muted rounded w-1/2" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, y: [0, -15, 0] }}
          transition={{ duration: 1.2, delay: 0.6, y: { repeat: Infinity, duration: 5 } }}
          className="hidden md:block absolute top-32 right-16 w-36 h-18 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-2xl border border-border/50"
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <div className="text-xs text-foreground/60">+5</div>
            </div>
            <div className="h-1.5 bg-primary/20 rounded w-full mb-1" />
            <div className="h-1.5 bg-accent/30 rounded w-2/3" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.2, delay: 0.9, y: { repeat: Infinity, duration: 4.5 } }}
          className="hidden md:block absolute bottom-32 left-24 w-38 h-16 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-2xl border border-border/50"
        >
          <div className="p-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">?</div>
            <div className="flex-1">
              <div className="h-1.5 bg-primary/20 rounded w-full mb-1" />
              <div className="h-1 bg-muted rounded w-3/4" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, y: [0, -8, 0] }}
          transition={{ duration: 1.2, delay: 1.2, y: { repeat: Infinity, duration: 6 } }}
          className="hidden md:block absolute bottom-20 right-20 w-44 h-20 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-2xl border border-border/50"
        >
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-accent to-primary rounded-full" />
              <div className="h-1.5 bg-accent/30 rounded flex-1" />
            </div>
            <div className="h-1.5 bg-primary/20 rounded w-full mb-1" />
            <div className="h-1.5 bg-muted rounded w-4/5" />
          </div>
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-foreground drop-shadow-sm"
      >
        <span className="text-primary">{keywords[wordIndex]}.</span> <span className="text-foreground">Answer.</span>{" "}
        <span className="text-accent">Grow.</span>
      </motion.h1>

      <p className="mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl font-medium text-foreground/80">
        Build Community, Grow Together.
      </p>

      {/* buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/questions"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Browse Questions
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/ask"
          className="inline-flex items-center gap-2 px-8 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          Ask Question
        </motion.a>
      </div>

      {/* bullet list bottom */}
      <div className="mt-12 flex flex-col sm:flex-row gap-8 items-center text-sm text-foreground/70">
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span> No credit card required
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span> Free forever plan
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span> Join 10,000+ learners
        </div>
      </div>
    </section>
  );
}
