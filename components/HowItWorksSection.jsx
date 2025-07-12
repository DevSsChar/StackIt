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
    <section className="py-20 px-6 lg:px-12 bg-muted text-center">
      <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-accent/10 text-accent">
        How It Works
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mx-auto max-w-2xl">
        Simple. Fast. <span className="text-accent">Effective.</span>
      </h2>

      <div className="mt-20 grid sm:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
        {/* colored line */}
        <span className="hidden sm:block absolute top-9 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-yellow-400" />

        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="size-24 rounded-full flex items-center justify-center text-4xl bg-gradient-to-r from-primary to-accent text-white shadow-xl mb-8">
              {s.icon}
            </span>
            <span className="text-xs uppercase font-semibold tracking-wider text-primary mb-2">
              Step {s.step}
            </span>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              {s.title}
            </h3>
            <p className="max-w-xs text-sm text-foreground leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
