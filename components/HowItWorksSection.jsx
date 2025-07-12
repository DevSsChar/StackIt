"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      icon: "💬",
      title: "Ask a Question",
      desc: "Type your question with details. Add tags to help experts find it quickly.",
    },
    {
      step: "2",
      icon: "📈",
      title: "Receive Answers",
      desc: "Get multiple perspectives from our expert community. Engage in meaningful discussions.",
    },
    {
      step: "3",
      icon: "✅",
      title: "Accept the Best",
      desc: "Mark the most helpful answer as accepted. Build reputation and help others learn.",
    },
  ];

  return (
    <section 
      className="py-20 px-6 lg:px-12 text-center relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, var(--muted) 0%, var(--background) 50%, var(--muted) 100%),
          radial-gradient(ellipse at top, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(99, 102, 241, 0.08) 0%, transparent 50%)
        `
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-accent/3 to-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 left-1/4 w-4 h-4 bg-primary/20 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-32 right-1/4 w-6 h-6 bg-accent/20 rounded-full animate-bounce" />
        <div className="absolute top-1/2 right-16 w-3 h-3 bg-primary/30 rotate-45 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-gradient-to-r from-accent/10 to-primary/10 text-accent border border-accent/20 backdrop-blur-sm">
          How It Works
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mx-auto max-w-2xl mb-16">
          Simple. Fast. <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Effective.</span>
        </h2>

        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Enhanced connecting line with gradient */}
          <div className="hidden sm:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-purple-500 z-0 rounded-full opacity-30" />
          <div className="hidden sm:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-purple-500 z-0 rounded-full" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col items-center bg-gradient-to-br from-background via-card to-background/80 rounded-3xl shadow-xl border border-border/50 p-8 min-h-[22rem] relative z-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group backdrop-blur-sm"
            >
              {/* Card background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="size-28 rounded-full flex items-center justify-center text-4xl bg-gradient-to-r from-primary to-accent text-white shadow-2xl mb-6 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <span className="relative z-10">{s.icon}</span>
                  <span className="absolute -top-3 -right-3 size-10 rounded-full bg-gradient-to-r from-accent to-purple-500 border-4 border-background text-white text-sm font-bold flex items-center justify-center shadow-lg">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-200">
                  {s.title}
                </h3>
                <p className="text-foreground/70 text-base leading-relaxed text-center">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
