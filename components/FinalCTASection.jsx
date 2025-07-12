"use client";

import { motion } from "framer-motion";

export default function FinalCTASection() {
  return (
    <section 
      className="relative py-24 px-6 lg:px-12 text-center overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 25%, rgba(168, 85, 247, 0.1) 50%, rgba(251, 191, 36, 0.1) 75%, rgba(99, 102, 241, 0.1) 100%),
          radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, var(--background) 0%, var(--muted) 100%)
        `
      }}
    >
      {/* Enhanced decorative background with animations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-gradient-to-r from-accent/15 to-purple-500/15 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/8 to-accent/8 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-1/4 w-6 h-6 bg-primary/30 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-20 right-1/4 w-8 h-8 bg-accent/30 rounded-full animate-bounce animation-delay-500" />
        <div className="absolute top-32 right-1/3 w-4 h-4 bg-purple-500/30 rotate-45 animate-pulse animation-delay-1000" />
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-primary/40 rounded-full animate-bounce animation-delay-1500" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-20 w-2 h-2 bg-accent/50 rounded-full animate-ping animation-delay-2000" />
        <div className="absolute bottom-1/4 left-20 w-3 h-3 bg-primary/50 rounded-full animate-ping animation-delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-12 lg:p-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Ready to <span className="bg-gradient-to-r from-accent via-primary to-purple-500 bg-clip-text text-transparent">Stack</span> Your Knowledge?
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-foreground/80 leading-relaxed">
            Join our growing community of learners and experts. Ask, answer, and grow
            together on StackIt! Start your learning journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="/portal"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-accent to-purple-500 text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <span>Get Started Free</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-border bg-background/50 backdrop-blur-sm text-foreground font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Explore Features</span>
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span className="text-sm text-foreground/60 font-medium">
              Trusted by students & professionals worldwide
            </span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <span className="text-green-500">✓</span>
                <span>15,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <span className="text-blue-500">✓</span>
                <span>50,000+ Questions Answered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <span className="text-purple-500">✓</span>
                <span>99% Uptime</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4 opacity-60">
              <img src="/globe.svg" alt="Globe" className="w-6 h-6" />
              <img src="/file.svg" alt="File" className="w-6 h-6" />
              <img src="/window.svg" alt="Window" className="w-6 h-6" />
              <img src="/vercel.svg" alt="Vercel" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
