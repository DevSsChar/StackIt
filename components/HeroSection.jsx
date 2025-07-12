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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 lg:px-16 bg-gradient-to-b from-white to-gray-100 dark:bg-gradient-to-br dark:from-violet-700 dark:via-purple-600 dark:to-indigo-600 overflow-hidden"
      style={{
        backgroundPosition: "calc(50% + var(--shift-x)) calc(50% + var(--shift-y))",
      }}
    >
      {/* floating cards */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* left top */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="hidden md:block absolute top-20 left-14 w-36 h-16 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg"
        />
        {/* right top */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="hidden md:block absolute top-32 right-16 w-32 h-14 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg"
        />
        {/* bottom left */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="hidden md:block absolute bottom-32 left-24 w-32 h-14 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg"
        />
        {/* bottom right */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="hidden md:block absolute bottom-20 right-20 w-40 h-16 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-gray-900 dark:text-white drop-shadow-md"
      >
        <span className="text-primary/80 dark:text-white">{keywords[wordIndex]}.</span> <span className="text-gray-900 dark:text-white">Answer.</span>{" "}
        <span className="text-accent">Grow.</span>
      </motion.h1>

      <p className="mt-6 max-w-2xl text-xl sm:text-2xl md:text-3xl font-medium text-foreground">
        Build Community, Grow Together.
      </p>

      {/* buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#features"
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl"
        >
          Get Started — It’s Free
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
          href="#demo"
          className="inline-flex items-center gap-2 px-10 py-4 border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/10"
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
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
          Watch Demo
        </motion.a>
      </div>

      {/* bullet list bottom */}
      <div className="mt-8 flex flex-col sm:flex-row gap-8 items-center text-sm text-foreground">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">✓</span> No credit card required
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">✓</span> Free forever plan
        </div>
      </div>
    </section>
  );
}
