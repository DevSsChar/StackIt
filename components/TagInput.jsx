"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TagInput({ 
  value = [], 
  onChange, 
  placeholder = "Add tags...",
  suggestions = [],
  maxTags = 5,
  className = "" 
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const commonTags = [
    "JavaScript", "React", "Next.js", "TypeScript", "Node.js", "Python", 
    "CSS", "HTML", "MongoDB", "Express", "API", "Frontend", "Backend",
    "Database", "Authentication", "Security", "Performance", "Testing",
    "Git", "Docker", "AWS", "Firebase", "GraphQL", "REST", "JWT",
    "Tailwind", "Bootstrap", "Vue.js", "Angular", "PHP", "Laravel",
    "Redux", "Hooks", "Components", "Responsive", "Mobile", "Web",
    "Development", "Programming", "Coding", "Software", "Algorithm",
    "Data Structure", "Design Pattern", "Architecture", "DevOps"
  ];

  const allSuggestions = [...new Set([...suggestions, ...commonTags])];

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = allSuggestions.filter(tag => 
        tag.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(tag)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [inputValue, value, allSuggestions]);

  const addTag = (tag) => {
    if (tag && !value.includes(tag) && value.length < maxTags) {
      const newTags = [...value, tag];
      onChange(newTags);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = value.filter(tag => tag !== tagToRemove);
    onChange(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0 && filteredSuggestions[selectedSuggestionIndex]) {
        addTag(filteredSuggestions[selectedSuggestionIndex]);
      } else if (inputValue.trim()) {
        addTag(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (tag) => {
    addTag(tag);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="min-h-[3rem] p-3 border border-border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all duration-200">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Render existing tags */}
          <AnimatePresence>
            {value.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="w-4 h-4 rounded-full hover:bg-primary/20 flex items-center justify-center text-primary/70 hover:text-primary transition-colors duration-200"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </AnimatePresence>

          {/* Input field */}
          {value.length < maxTags && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue && setShowSuggestions(true)}
              placeholder={value.length === 0 ? placeholder : ""}
              className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
            />
          )}
        </div>

        {/* Tag limit indicator */}
        {value.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">
            {value.length}/{maxTags} tags
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto"
          >
            {filteredSuggestions.slice(0, 10).map((tag, index) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSuggestionClick(tag)}
                className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors duration-200 text-card-foreground ${
                  index === selectedSuggestionIndex ? 'bg-muted' : ''
                }`}
              >
                <span className="font-medium">{tag}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popular tags */}
      {!showSuggestions && value.length < maxTags && (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground mb-2">Popular tags:</p>
          <div className="flex flex-wrap gap-2">
            {commonTags.slice(0, 8).filter(tag => !value.includes(tag)).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addTag(tag)}
                className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded border border-border transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
