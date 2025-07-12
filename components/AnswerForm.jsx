"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RichTextEditor from "./RichTextEditor";

export default function AnswerForm({ questionId, onSubmit, isLoading = false, onCancel }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!content.trim()) {
      setError("Answer content is required");
      return false;
    } else if (content.length < 30) {
      setError("Answer must be at least 30 characters");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        questionId,
        content,
        createdAt: new Date()
      });
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    
    // Clear error when user starts typing
    if (error && newContent.trim()) {
      setError("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          Your Answer
        </h3>
        <p className="text-sm text-muted-foreground">
          Thanks for contributing an answer! Please be sure your answer provides a solution to the question.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Editor */}
        <div>
          <div className={`border-2 rounded-xl overflow-hidden transition-colors duration-200 ${
            error 
              ? 'border-destructive' 
              : 'border-border focus-within:border-primary'
          }`}>
            <RichTextEditor
              value={content}
              onChange={handleContentChange}
              placeholder="Write your answer here. Be specific and explain your solution clearly. Use code blocks for any code examples..."
              minHeight="200px"
            />
          </div>
          
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm mt-2 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.p>
          )}
        </div>

        {/* Submit Section */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            <p>Remember to follow our community guidelines when answering.</p>
          </div>
          
          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-border rounded-xl text-muted-foreground hover:text-card-foreground hover:border-primary/50 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
            
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Post Answer
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 bg-muted/30 rounded-xl border border-border"
      >
        <h4 className="font-medium text-card-foreground mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Tips for a great answer
        </h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Explain your solution step by step
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Include code examples when relevant
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Test your solution before posting
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
