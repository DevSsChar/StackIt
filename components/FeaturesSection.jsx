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
    <section 
      id="features" 
      className="py-20 px-6 lg:px-12 text-center relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%),
          radial-gradient(ellipse at center top, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at center bottom, rgba(6, 182, 212, 0.05) 0%, transparent 50%)
        `
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 backdrop-blur-sm">
          Features
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mx-auto max-w-2xl mb-4">
          Everything you need <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">to learn and teach</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 mb-16">
          Our platform makes knowledge sharing effortless with powerful tools and an engaged community.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-3xl border border-border/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 text-center flex flex-col items-center min-h-[20rem] group backdrop-blur-sm"
            >
              {/* Card background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-200">
                  {f.title}
                </h3>
                <p className="text-foreground/70 text-base leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
