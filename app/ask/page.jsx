"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import QuestionForm from "@/components/QuestionForm";

export default function AskQuestionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push("/login?callbackUrl=/ask");
    return null;
  }

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the new question
        router.push(`/questions/${data._id}`);
      } else {
        console.error("Error creating question:", data.error);
        alert("Failed to create question: " + data.error);
      }
    } catch (error) {
      console.error("Error creating question:", error);
      alert("Failed to create question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto py-8">
        <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
