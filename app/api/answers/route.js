import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Question from "@/models/Question";
import Answer from "@/models/Answer";
import User from "@/models/User";
import { getServerSession } from "next-auth";

// POST /api/answers - Create a new answer
export async function POST(request) {
  try {
    await connectDB();
    
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { questionId, content } = body;

    // Validation
    if (!questionId || !content) {
      return NextResponse.json(
        { error: "Question ID and content are required" },
        { status: 400 }
      );
    }

    if (content.length < 30) {
      return NextResponse.json(
        { error: "Answer must be at least 30 characters" },
        { status: 400 }
      );
    }

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Find user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create answer
    const answer = new Answer({
      questionId,
      content,
      author: user._id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await answer.save();

    // Populate author data for response
    await answer.populate("author", "name email image");

    // Add notification to question author (if different from answer author)
    if (question.author.toString() !== user._id.toString()) {
      await User.findByIdAndUpdate(question.author, {
        $push: {
          notifications: {
            type: "answer",
            content: `${user.name} answered your question "${question.title}"`,
            isRead: false,
            createdAt: new Date(),
            questionId: questionId,
            answerId: answer._id
          }
        }
      });
    }

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json(
      { error: "Failed to create answer" },
      { status: 500 }
    );
  }
}
