"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function VotingSystem({ 
  itemId, 
  itemType = "answer", // "question" or "answer"
  initialVotes = 0, 
  userVote = null, // "up", "down", or null
  onVote,
  showAccept = false,
  isAccepted = false,
  onAccept,
  canAccept = false
}) {
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState(userVote);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType) => {
    if (isVoting) return;
    
    setIsVoting(true);
    
    try {
      let newVote = voteType;
      let voteChange = 0;

      // Calculate vote change
      if (currentVote === voteType) {
        // Remove vote
        newVote = null;
        voteChange = voteType === "up" ? -1 : 1;
      } else if (currentVote === null) {
        // Add new vote
        voteChange = voteType === "up" ? 1 : -1;
      } else {
        // Change vote
        voteChange = voteType === "up" ? 2 : -2;
      }

      // Update local state
      setVotes(prev => prev + voteChange);
      setCurrentVote(newVote);

      // Call parent callback
      if (onVote) {
        await onVote(itemId, voteType, newVote);
      }
    } catch (error) {
      console.error("Voting error:", error);
      // Revert on error
      setVotes(initialVotes);
      setCurrentVote(userVote);
    } finally {
      setIsVoting(false);
    }
  };

  const handleAccept = async () => {
    if (!canAccept || isVoting) return;
    
    setIsVoting(true);
    
    try {
      if (onAccept) {
        await onAccept(itemId, !isAccepted);
      }
    } catch (error) {
      console.error("Accept error:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const getVoteButtonClass = (voteType) => {
    const isActive = currentVote === voteType;
    const baseClass = "p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (voteType === "up") {
      return `${baseClass} ${
        isActive 
          ? "bg-green-500 text-white shadow-lg" 
          : "hover:bg-green-50 dark:hover:bg-green-900/20 text-muted-foreground hover:text-green-600"
      }`;
    } else {
      return `${baseClass} ${
        isActive 
          ? "bg-red-500 text-white shadow-lg" 
          : "hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-600"
      }`;
    }
  };

  const getAcceptButtonClass = () => {
    const baseClass = "p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (isAccepted) {
      return `${baseClass} bg-emerald-500 text-white shadow-lg`;
    } else if (canAccept) {
      return `${baseClass} hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-muted-foreground hover:text-emerald-600`;
    } else {
      return `${baseClass} text-muted-foreground/50 cursor-not-allowed`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Upvote Button */}
      <motion.button
        onClick={() => handleVote("up")}
        disabled={isVoting}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={getVoteButtonClass("up")}
        title="This answer is useful"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4l-8 8h6v8h4v-8h6z" />
        </svg>
      </motion.button>

      {/* Vote Count */}
      <motion.div
        key={votes}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="text-lg font-semibold text-card-foreground min-w-[2rem] text-center"
      >
        {votes}
      </motion.div>

      {/* Downvote Button */}
      <motion.button
        onClick={() => handleVote("down")}
        disabled={isVoting}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={getVoteButtonClass("down")}
        title="This answer is not useful"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 20l8-8h-6V4H8v8H2z" />
        </svg>
      </motion.button>

      {/* Accept Button (only for answers) */}
      {showAccept && itemType === "answer" && (
        <motion.button
          onClick={handleAccept}
          disabled={isVoting || !canAccept}
          whileHover={canAccept ? { scale: 1.1 } : {}}
          whileTap={canAccept ? { scale: 0.95 } : {}}
          className={getAcceptButtonClass()}
          title={
            isAccepted 
              ? "This answer is accepted" 
              : canAccept 
                ? "Accept this answer" 
                : "Only the question owner can accept answers"
          }
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </motion.button>
      )}

      {/* Accepted Badge */}
      {isAccepted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Accepted
        </motion.div>
      )}
    </div>
  );
}
