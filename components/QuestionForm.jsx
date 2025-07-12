"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RichTextEditor from "./RichTextEditor";
import TagInput from "./TagInput";

export default function QuestionForm({ onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: []
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    } else if (formData.title.length > 150) {
      newErrors.title = "Title must be less than 150 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 30) {
      newErrors.description = "Description must be at least 30 characters";
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    } else if (formData.tags.length > 5) {
      newErrors.tags = "Maximum 5 tags allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({ ...prev, title }));
    
    // Clear title error when user starts typing
    if (errors.title && title.trim()) {
      setErrors(prev => ({ ...prev, title: "" }));
    }
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
    
    // Clear description error when user starts typing
    if (errors.description && content.trim()) {
      setErrors(prev => ({ ...prev, description: "" }));
    }
  };

  const handleTagsChange = (tags) => {
    setFormData(prev => ({ ...prev, tags }));
    
    // Clear tags error when user adds tags
    if (errors.tags && tags.length > 0) {
      setErrors(prev => ({ ...prev, tags: "" }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8 shadow-lg"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-card-foreground mb-2">
            Ask a Question
          </h1>
          <p className="text-muted-foreground">
            Be specific and imagine you're asking a question to another person. 
            Include all the information someone would need to give you a great answer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Section */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-card-foreground mb-3">
              Title
              <span className="text-destructive ml-1">*</span>
            </label>
            <p className="text-sm text-muted-foreground mb-4">
              Be specific and imagine you're asking a question to another person
            </p>
            
            <div className="relative">
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g., How to implement authentication in Next.js with NextAuth?"
                className={`w-full px-4 py-3 border-2 rounded-xl bg-background text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  errors.title 
                    ? 'border-destructive focus:border-destructive' 
                    : 'border-border focus:border-primary'
                }`}
                maxLength={150}
              />
              
              {/* Character Count */}
              <div className="absolute right-3 top-3 text-xs text-muted-foreground">
                {formData.title.length}/150
              </div>
            </div>
            
            {errors.title && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-2 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.title}
              </motion.p>
            )}
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-lg font-semibold text-card-foreground mb-3">
              Description
              <span className="text-destructive ml-1">*</span>
            </label>
            <p className="text-sm text-muted-foreground mb-4">
              Include all the information someone would need to answer your question. 
              Use the formatting tools to make your question clear and easy to read.
            </p>
            
            <div className={`border-2 rounded-xl overflow-hidden transition-colors duration-200 ${
              errors.description 
                ? 'border-destructive' 
                : 'border-border focus-within:border-primary'
            }`}>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Describe your problem in detail. Include what you've tried, what you expected to happen, and what actually happened..."
                minHeight="200px"
              />
            </div>
            
            {errors.description && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-2 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.description}
              </motion.p>
            )}
          </div>

          {/* Tags Section */}
          <div>
            <label className="block text-lg font-semibold text-card-foreground mb-3">
              Tags
              <span className="text-destructive ml-1">*</span>
            </label>
            <p className="text-sm text-muted-foreground mb-4">
              Add up to 5 tags to describe what your question is about. 
              Tags help other community members find and answer your question.
            </p>
            
            <div className={`border-2 rounded-xl transition-colors duration-200 ${
              errors.tags 
                ? 'border-destructive' 
                : 'border-border focus-within:border-primary'
            }`}>
              <TagInput
                value={formData.tags}
                onChange={handleTagsChange}
                maxTags={5}
                placeholder="Add tags (e.g., react, javascript, nextjs)"
              />
            </div>
            
            {errors.tags && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-2 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.tags}
              </motion.p>
            )}
          </div>

          {/* Submit Section */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <p>By posting your question, you agree to our community guidelines.</p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                className="px-6 py-3 border border-border rounded-xl text-muted-foreground hover:text-card-foreground hover:border-primary/50 transition-colors duration-200"
              >
                Save Draft
              </button>
              
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
                    Post Question
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
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-muted/30 rounded-xl border border-border"
        >
          <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Tips for a great question
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Make your title specific and searchable
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Include what you've already tried
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Show your code if relevant
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Use proper formatting and tags
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
