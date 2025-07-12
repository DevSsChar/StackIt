"use client";

import { motion } from "framer-motion";

export default function FinalCTASection() {
  return (
    <section className="relative py-20 px-6 lg:px-12 text-center overflow-hidden bg-gray-50 dark:bg-gradient-to-br dark:from-violet-700 dark:via-purple-600 dark:to-indigo-700 text-gray-900 dark:text-white">
      {/* subtle particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(124,58,237,0.15) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.15) 0, transparent 40%)",
        }}
      />

      <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-6">
        Ready to join the <span className="text-primary/80 dark:text-white">conversation</span>?
      </h2>
      <p className="relative z-10 max-w-xl mx-auto mb-12 text-white/90 text-lg">
        Start asking, answering, and growing with our amazing community today.
      </p>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#signup"
        className="relative z-10 inline-flex items-center gap-2 px-12 py-5 bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl dark:bg-white dark:text-primary dark:from-white dark:to-white"
      >
        Sign Up Free
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

      {/* social proof */}
      <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600 dark:text-white/80">
        <div className="flex items-center gap-2">
          ⚡ Join 10,000+ users
        </div>
        <div className="flex items-center gap-2">
          ⭐ 4.9/5 rating
        </div>
      </div>
    </section>
  );
}
