"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: "💬",
      title: "Instant Q&A",
      desc: "Post a question and get expert answers in minutes. Our community is always ready to help.",
    },
    {
      icon: "📝",
      title: "Rich Editor",
      desc: "Format your posts with bold text, lists, images, and emojis. Make your content stand out.",
    },
    {
      icon: "🤝",
      title: "Trusted Community",
      desc: "Rate answers, build reputation, and find your crowd. Connect with like-minded experts.",
    },
  ];

  return (
    <section id="features" className="py-16 px-6 lg:px-12 bg-background text-center">
      <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
        Features
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mx-auto max-w-2xl">
        Everything you need <span className="text-primary">to learn and teach</span>
      </h2>
      <p className="mt-3 max-w-xl mx-auto text-gray-500 dark:text-gray-400">
        Our platform makes knowledge sharing effortless with powerful tools and an engaged community.
      </p>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card p-14 rounded-3xl border border-border shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition text-center flex flex-col items-center min-h-[22rem]"
          >
            <span className="text-6xl mb-8">{f.icon}</span>
            <h3 className="text-2xl font-bold mb-3 text-gray-700 dark:text-gray-200">
              {f.title}
            </h3>
            <p className="text-foreground text-base leading-relaxed max-w-sm">
              {f.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
