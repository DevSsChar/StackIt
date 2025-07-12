"use client";
// Landing page for StackIt with rich animations & responsive design
// Uses TailwindCSS utility classes + Framer Motion for animation
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-x-hidden scroll-smooth font-sans">
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <FinalCTA />
    </div>
  );
}

/* ------------------- 1. HERO SECTION ------------------- */
function Hero() {
  const keywords = ["Knowledge", "Community", "Expertise"];
  const [wordIndex, setWordIndex] = useState(0);
  // Background tilt
  const heroRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % keywords.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Mouse-move parallax background shift
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
      className="relative h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 bg-[radial-gradient(ellipse_at_center,var(--accent)_0%,transparent_70%)]"
      style={{
        backgroundPosition: "calc(50% + var(--shift-x)) calc(50% + var(--shift-y))",
      }}
    >
      {/* Text Column */}
      <div className="z-10 max-w-xl text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Ask. Answer. <br className="hidden lg:block" /> Grow.
        </h1>
        {/* Typing word */}
        <motion.p
          key={wordIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-medium text-primary h-12 mb-8"
        >
          {keywords[wordIndex]}
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(124,58,237,0.6)" }}
          href="#features"
          className="inline-block bg-primary text-white px-8 py-4 rounded-full font-semibold"
        >
          Get Started
        </motion.a>
      </div>

      {/* Illustration Column */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 lg:mt-0 lg:ml-16 w-72 sm:w-96"
      >
        {/* Simple SVG illustration */}
        <svg
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <motion.circle
            cx="150"
            cy="150"
            r="140"
            stroke="#7c3aed"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="36"
            fill="#7c3aed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ?
          </motion.text>
        </svg>
      </motion.div>
    </section>
  );
}

/* ------------- 2. FEATURES SHOWCASE --------------- */
function FeaturesSection() {
  const features = [
    {
      title: "Ask Anything",
      desc: "Post questions with rich formatting & tags.",
      icon: "❓",
    },
    {
      title: "Get Answers Fast",
      desc: "Community-powered solutions voted by peers.",
      icon: "⚡",
    },
    {
      title: "Grow Reputation",
      desc: "Earn points & badges for helpful answers.",
      icon: "🏆",
    },
  ];
  return (
    <section id="features" className="py-24 px-6 lg:px-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition group"
          >
            <motion.div
              className="text-4xl mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              {f.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 group-hover:underline underline-offset-4 decoration-primary">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------- 3. HOW IT WORKS --------------- */
function HowItWorks() {
  const steps = [
    { label: "Ask a Question", icon: "📝" },
    { label: "Get Answers", icon: "💡" },
    { label: "Accept Best", icon: "✅" },
  ];
  return (
    <section className="py-24 px-6 lg:px-16 bg-muted/60">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="hidden sm:flex justify-between items-center relative mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {/* Connector line */}
          <motion.span
            className="absolute top-6 left-0 right-0 h-1 bg-primary/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            originX={0}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {steps.map((s) => (
            <motion.div
              key={s.label}
              className="relative z-10 w-32 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile vertical */}
        <div className="sm:hidden space-y-4">
          {steps.map((s, i) => (
            <details
              key={s.label}
              className="p-4 bg-white rounded-lg shadow cursor-pointer group"
            >
              <summary className="flex items-center gap-3 text-lg font-medium">
                <span className="text-2xl">{s.icon}</span> {s.label}
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Step {i + 1} description goes here.
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------- 4. SOCIAL PROOF / STATS --------------- */
function StatsSection() {
  const [countQ, setCountQ] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
  // Simple counters
  useEffect(() => {
    let q = 0;
    const id = setInterval(() => {
      q += 50;
      setCountQ(q);
      if (q >= 10000) clearInterval(id);
    }, 30);
    let u = 0;
    const id2 = setInterval(() => {
      u += 25;
      setCountUsers(u);
      if (u >= 5000) clearInterval(id2);
    }, 30);
    return () => {
      clearInterval(id);
      clearInterval(id2);
    };
  }, []);

  // Generate avatar urls
  const avatars = Array.from({ length: 20 }).map((_, i) => `https://i.pravatar.cc/50?img=${i + 1}`);

  return (
    <section className="py-24 bg-foreground text-white px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12">Trusted by learners worldwide</h2>
        <div className="flex justify-center gap-16 mb-12 text-primary text-4xl font-extrabold">
          <div>
            {countQ.toLocaleString()}+
            <p className="text-base text-white/80 font-normal mt-1">Questions</p>
          </div>
          <div>
            {countUsers.toLocaleString()}+
            <p className="text-base text-white/80 font-normal mt-1">Experts</p>
          </div>
        </div>
      </div>

      {/* Avatar carousel */}
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: [0, -300] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...avatars, ...avatars].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="user avatar"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        ))}
      </motion.div>
    </section>
  );
}

/* ------------- 5. FINAL CTA --------------- */
function FinalCTA() {
  return (
    <section className="py-24 px-6 lg:px-16 relative bg-primary/5 overflow-hidden">
      {/* floating particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(124,58,237,0.15) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.15) 0, transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to join the conversation?</h2>
        <motion.a
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-primary text-white px-10 py-4 rounded-full font-semibold relative overflow-hidden"
          href="#"
        >
          Sign Up Free
          {/* Ripple effect */}
          <span className="absolute inset-0 bg-white opacity-0 rounded-full" />
        </motion.a>
      </div>
    </section>
  );
}

