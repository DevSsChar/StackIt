"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    tag: "",
    sort: "newest"
  });

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...filters
      });

      const response = await fetch(`/api/questions?${params}`);
      const data = await response.json();

      if (response.ok) {
        setQuestions(data.questions);
        setPagination(data.pagination);
      } else {
        console.error("Error fetching questions:", data.error);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filtering
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTruncatedDescription = (description, maxLength = 200) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-card-foreground mb-2">
              All Questions
            </h1>
            <p className="text-muted-foreground">
              {pagination.total ? `${pagination.total} questions` : "Browse community questions"}
            </p>
          </div>

          <Link
            href="/ask"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ask Question
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Search
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Tag
              </label>
              <input
                type="text"
                placeholder="Filter by tag..."
                value={filters.tag}
                onChange={(e) => handleFilterChange("tag", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Sort by
              </label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="votes">Most Voted</option>
                <option value="answers">Most Answers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-semibold text-card-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground mb-6">
              {filters.search || filters.tag 
                ? "Try adjusting your search filters"
                : "Be the first to ask a question!"
              }
            </p>
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Ask the First Question
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <motion.div
                key={question._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="flex gap-6">
                  {/* Stats */}
                  <div className="flex flex-col items-center gap-2 min-w-[80px]">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-card-foreground">
                        {question.voteCount || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">votes</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-card-foreground">
                        {question.answerCount || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">answers</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <Link href={`/questions/${question._id}`}>
                      <h3 className="text-xl font-semibold text-card-foreground hover:text-primary transition-colors duration-200 mb-3 cursor-pointer">
                        {question.title}
                      </h3>
                    </Link>

                    <div className="text-muted-foreground mb-4 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ 
                        __html: getTruncatedDescription(question.description)
                      }} />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors duration-200"
                          onClick={() => handleFilterChange("tag", tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {question.author?.image ? (
                          <img
                            src={question.author.image}
                            alt={question.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                            {question.author?.name?.charAt(0) || "U"}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-card-foreground text-sm">
                            {question.author?.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            asked {formatDate(question.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors duration-200"
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                    page === pageNum
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setPage(prev => Math.min(pagination.pages, prev + 1))}
              disabled={page === pagination.pages}
              className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
