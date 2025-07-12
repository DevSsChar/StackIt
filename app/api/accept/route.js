import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Question from "@/models/Question";
import Answer from "@/models/Answer";
import User from "@/models/User";
import { getServerSession } from "next-auth";

// POST /api/accept - Accept or unaccept an answer
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
    const { answerId, accept } = body;

    // Validation
    if (!answerId || typeof accept !== "boolean") {
      return NextResponse.json(
        { error: "Invalid accept data" },
        { status: 400 }
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

    // Find answer
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return NextResponse.json(
        { error: "Answer not found" },
        { status: 404 }
      );
    }

    // Find question
    const question = await Question.findById(answer.questionId);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Check if user is the question author
    if (question.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Only the question author can accept answers" },
        { status: 403 }
      );
    }

    if (accept) {
      // Unaccept all other answers for this question
      await Answer.updateMany(
        { questionId: answer.questionId },
        { isAccepted: false }
      );

      // Accept this answer
      answer.isAccepted = true;
      answer.acceptedAt = new Date();

      // Add notification to answer author (if different from question author)
      if (answer.author.toString() !== user._id.toString()) {
        await User.findByIdAndUpdate(answer.author, {
          $push: {
            notifications: {
              type: "accepted",
              content: `${user.name} accepted your answer`,
              isRead: false,
              createdAt: new Date(),
              questionId: question._id,
              answerId: answerId
            }
          }
        });
      }
    } else {
      // Unaccept the answer
      answer.isAccepted = false;
      answer.acceptedAt = null;
    }

    answer.updatedAt = new Date();
    await answer.save();

    return NextResponse.json({
      success: true,
      isAccepted: answer.isAccepted,
      acceptedAt: answer.acceptedAt
    });
  } catch (error) {
    console.error("Error accepting answer:", error);
    return NextResponse.json(
      { error: "Failed to accept answer" },
      { status: 500 }
    );
  }
}
