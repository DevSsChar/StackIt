"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBox({ 
  placeholder = "Search questions, tags, or users...",
  onSearch,
  className = ""
}) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Sample suggestions for demo
  const sampleSuggestions = [
    { type: "tag", text: "react", icon: "🏷️" },
    { type: "tag", text: "javascript", icon: "🏷️" },
    { type: "tag", text: "nextjs", icon: "🏷️" },
    { type: "question", text: "How to implement authentication?", icon: "❓" },
    { type: "question", text: "State management best practices", icon: "❓" },
    { type: "user", text: "john_doe", icon: "👤" }
  ];

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Default behavior: navigate to questions page with search
      router.push(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
    
    setIsExpanded(false);
    setQuery("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Filter suggestions based on input
    if (value.trim()) {
      const filtered = sampleSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Escape") {
      setIsExpanded(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "tag") {
      router.push(`/questions?tag=${encodeURIComponent(suggestion.text)}`);
    } else if (suggestion.type === "question") {
      setQuery(suggestion.text);
      handleSearch(suggestion.text);
    } else if (suggestion.type === "user") {
      router.push(`/users/${suggestion.text}`);
    }
    
    setIsExpanded(false);
    setSuggestions([]);
    setQuery("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <svg 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsExpanded(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {isExpanded && (query || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 flex items-center gap-3"
                  >
                    <span className="text-lg">{suggestion.icon}</span>
                    <div className="flex-1">
                      <span className="text-card-foreground">{suggestion.text}</span>
                      <span className="ml-2 text-xs text-muted-foreground capitalize">
                        {suggestion.type}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="py-4 px-4 text-center text-muted-foreground">
                <p className="mb-2">No suggestions found</p>
                <button
                  onClick={() => handleSearch()}
                  className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  Search for "{query}"
                </button>
              </div>
            ) : (
              <div className="py-4 px-4">
                <p className="text-muted-foreground text-sm mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {["react", "javascript", "nextjs", "authentication"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => router.push(`/questions?tag=${tag}`)}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsExpanded(false);
            setSuggestions([]);
          }}
        />
      )}
    </div>
  );
}
