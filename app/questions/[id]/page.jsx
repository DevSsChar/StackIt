"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import VotingSystem from "@/components/VotingSystem";
import AnswerForm from "@/components/AnswerForm";
import Link from "next/link";

export default function QuestionDetailPage({ params }) {
  const { data: session } = useSession();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  const fetchQuestionData = async () => {
    try {
      const response = await fetch(`/api/questions/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setQuestion(data.question);
        setAnswers(data.answers);
      } else {
        console.error("Error fetching question:", data.error);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionData();
  }, [params.id]);

  const handleVote = async (itemId, voteType, newVote) => {
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          itemType: itemId === question._id ? "question" : "answer",
          voteType
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to vote");
      }

      // Refresh data to get updated vote counts
      fetchQuestionData();
    } catch (error) {
      console.error("Voting error:", error);
      throw error;
    }
  };

  const handleAcceptAnswer = async (answerId, accept) => {
    try {
      const response = await fetch("/api/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerId,
          accept
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to accept answer");
      }

      // Refresh data to get updated acceptance status
      fetchQuestionData();
    } catch (error) {
      console.error("Accept error:", error);
      throw error;
    }
  };

  const handleSubmitAnswer = async (answerData) => {
    setSubmittingAnswer(true);
    
    try {
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowAnswerForm(false);
        fetchQuestionData(); // Refresh to show new answer
      } else {
        console.error("Error creating answer:", data.error);
        alert("Failed to create answer: " + data.error);
      }
    } catch (error) {
      console.error("Error creating answer:", error);
      alert("Failed to create answer. Please try again.");
    } finally {
      setSubmittingAnswer(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-semibold text-card-foreground mb-2">
            Question not found
          </h2>
          <p className="text-muted-foreground mb-6">
            The question you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Browse Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/questions" className="hover:text-primary transition-colors">
              Questions
            </Link>
            <span>›</span>
            <span className="text-card-foreground">Question Detail</span>
          </div>
        </nav>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-8"
        >
          <div className="flex gap-6">
            {/* Voting System */}
            <div className="flex-shrink-0">
              <VotingSystem
                itemId={question._id}
                itemType="question"
                initialVotes={question.voteCount || 0}
                onVote={handleVote}
              />
            </div>

            {/* Question Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-card-foreground mb-6">
                {question.title}
              </h1>

              <div className="prose prose-lg max-w-none mb-6 text-muted-foreground">
                <div dangerouslySetInnerHTML={{ __html: question.description }} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/questions?tag=${tag}`}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Author and Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {question.author?.image ? (
                    <img
                      src={question.author.image}
                      alt={question.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {question.author?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-card-foreground">
                      {question.author?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      asked {formatDate(question.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Edit button for question author */}
                {session && session.user?.email === question.author?.email && (
                  <Link
                    href={`/questions/${question._id}/edit`}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-muted-foreground hover:text-card-foreground hover:border-primary/50 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Answers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </h2>

            {session && (
              <button
                onClick={() => setShowAnswerForm(!showAnswerForm)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {showAnswerForm ? "Cancel" : "Write Answer"}
              </button>
            )}
          </div>

          {/* Answer Form */}
          {showAnswerForm && session && (
            <div className="mb-8">
              <AnswerForm
                questionId={question._id}
                onSubmit={handleSubmitAnswer}
                isLoading={submittingAnswer}
                onCancel={() => setShowAnswerForm(false)}
              />
            </div>
          )}

          {/* Answers List */}
          {answers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-2">
                No answers yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Be the first to answer this question!
              </p>
              {!session && (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Sign in to Answer
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {answers.map((answer, index) => (
                <motion.div
                  key={answer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-card border border-border rounded-2xl p-6 shadow-lg ${
                    answer.isAccepted ? "ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10" : ""
                  }`}
                >
                  <div className="flex gap-6">
                    {/* Voting System */}
                    <div className="flex-shrink-0">
                      <VotingSystem
                        itemId={answer._id}
                        itemType="answer"
                        initialVotes={answer.voteCount || 0}
                        onVote={handleVote}
                        showAccept={true}
                        isAccepted={answer.isAccepted}
                        onAccept={handleAcceptAnswer}
                        canAccept={session && session.user?.email === question.author?.email}
                      />
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1">
                      <div className="prose prose-lg max-w-none mb-6 text-muted-foreground">
                        <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                      </div>

                      {/* Author and Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {answer.author?.image ? (
                            <img
                              src={answer.author.image}
                              alt={answer.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                              {answer.author?.name?.charAt(0) || "U"}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-card-foreground text-sm">
                              {answer.author?.name || "Anonymous"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              answered {formatDate(answer.createdAt)}
                              {answer.isAccepted && (
                                <span className="ml-2 text-emerald-600">• Accepted Answer</span>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Edit button for answer author */}
                        {session && session.user?.email === answer.author?.email && (
                          <Link
                            href={`/answers/${answer._id}/edit`}
                            className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-lg text-muted-foreground hover:text-card-foreground hover:border-primary/50 transition-colors duration-200 text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Sign in prompt for guests */}
        {!session && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-lg text-center"
          >
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Want to contribute?
            </h3>
            <p className="text-muted-foreground mb-4">
              Sign in to ask questions, post answers, and vote on content.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Sign In
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
