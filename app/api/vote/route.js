import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Question from "@/models/Question";
import Answer from "@/models/Answer";
import User from "@/models/User";
import { getServerSession } from "next-auth";

// POST /api/vote - Vote on a question or answer
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
    const { itemId, itemType, voteType } = body;

    // Validation
    if (!itemId || !itemType || !["up", "down"].includes(voteType)) {
      return NextResponse.json(
        { error: "Invalid vote data" },
        { status: 400 }
      );
    }

    if (!["question", "answer"].includes(itemType)) {
      return NextResponse.json(
        { error: "Invalid item type" },
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

    // Find the item to vote on
    const Model = itemType === "question" ? Question : Answer;
    const item = await Model.findById(itemId);
    
    if (!item) {
      return NextResponse.json(
        { error: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} not found` },
        { status: 404 }
      );
    }

    // Check if user has already voted
    const existingVoteIndex = item.votes.findIndex(
      vote => vote.user.toString() === user._id.toString()
    );

    let voteChange = 0;
    let newVoteValue = voteType === "up" ? 1 : -1;

    if (existingVoteIndex !== -1) {
      // User has already voted
      const existingVote = item.votes[existingVoteIndex];
      
      if (existingVote.value === newVoteValue) {
        // Same vote - remove it
        item.votes.splice(existingVoteIndex, 1);
        voteChange = -newVoteValue;
      } else {
        // Different vote - change it
        voteChange = newVoteValue - existingVote.value;
        item.votes[existingVoteIndex].value = newVoteValue;
        item.votes[existingVoteIndex].createdAt = new Date();
      }
    } else {
      // New vote
      item.votes.push({
        user: user._id,
        value: newVoteValue,
        createdAt: new Date()
      });
      voteChange = newVoteValue;
    }

    // Update vote count
    item.voteCount = (item.voteCount || 0) + voteChange;
    item.updatedAt = new Date();

    await item.save();

    // Add notification to item author (if different from voter)
    if (item.author.toString() !== user._id.toString() && voteChange > 0) {
      const notificationType = voteType === "up" ? "upvote" : "downvote";
      const contentText = itemType === "question" 
        ? `${user.name} ${voteType}voted your question`
        : `${user.name} ${voteType}voted your answer`;

      await User.findByIdAndUpdate(item.author, {
        $push: {
          notifications: {
            type: notificationType,
            content: contentText,
            isRead: false,
            createdAt: new Date(),
            questionId: itemType === "question" ? itemId : item.questionId,
            answerId: itemType === "answer" ? itemId : null
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      voteCount: item.voteCount,
      userVote: existingVoteIndex !== -1 ? item.votes.find(v => v.user.toString() === user._id.toString())?.value || null : null
    });
  } catch (error) {
    console.error("Error voting:", error);
    return NextResponse.json(
      { error: "Failed to vote" },
      { status: 500 }
    );
  }
}
