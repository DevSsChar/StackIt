"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Portal() {
  const [activeTab, setActiveTab] = useState('questions');

  const sampleQuestions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js?",
      author: "john_dev",
      answers: 5,
      votes: 12,
      tags: ["nextjs", "authentication", "javascript"]
    },
    {
      id: 2,
      title: "Best practices for React state management",
      author: "sarah_codes",
      answers: 3,
      votes: 8,
      tags: ["react", "state-management", "redux"]
    },
    {
      id: 3,
      title: "Understanding TypeScript generics",
      author: "mike_ts",
      answers: 7,
      votes: 15,
      tags: ["typescript", "generics", "types"]
    }
  ];

  return (
    <div 
      className="min-h-screen pt-20 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%)
        `
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/3 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/2 to-accent/2 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8 relative z-10">
        {/* Enhanced Header with glass effect */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Welcome to StackIt Portal
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Discover, ask, and answer questions from our vibrant community of learners and experts
            </p>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg p-2 mb-8">
          <nav className="flex space-x-2">
            {[
              { id: 'questions', label: 'Questions', count: '1.2k', icon: '❓' },
              { id: 'tags', label: 'Tags', count: '456', icon: '🏷️' },
              { id: 'users', label: 'Users', count: '2.8k', icon: '👥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'text-foreground/60 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-white/20' 
                    : 'bg-muted'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg p-1">
              <div className="relative bg-background/50 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search questions, tags, or users..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-0 focus:ring-0 focus:outline-none text-foreground placeholder-foreground/50 text-lg"
                />
              </div>
            </div>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2 group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ask Question
          </button>
        </div>

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'questions' && (
            <div className="space-y-4">
              {sampleQuestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary cursor-pointer group-hover:text-primary transition-colors duration-200">
                        {question.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {question.author[0].toUpperCase()}
                          </div>
                          <span>by {question.author}</span>
                        </div>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 ml-6">
                      <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-3">
                        <div className="text-xl font-bold text-primary">{question.votes}</div>
                        <div className="text-xs text-foreground/60">votes</div>
                      </div>
                      <div className="text-center bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-3">
                        <div className="text-xl font-bold text-accent">{question.answers}</div>
                        <div className="text-xs text-foreground/60">answers</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tags' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['javascript', 'react', 'nextjs', 'typescript', 'nodejs', 'python'].map((tag) => (
                <div
                  key={tag}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">#{tag}</h3>
                  <p className="text-foreground/70 text-sm mb-3">
                    Popular tag used in web development and programming discussions.
                  </p>
                  <div className="text-xs text-foreground/60">
                    125 questions • 89 followers
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['john_dev', 'sarah_codes', 'mike_ts', 'alice_js', 'bob_react', 'emma_next'].map((user) => (
                <div
                  key={user}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {user[0].toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-foreground">{user}</h3>
                      <p className="text-sm text-foreground/60">Full Stack Developer</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>Reputation: 1,234</span>
                    <span>Answers: 56</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}