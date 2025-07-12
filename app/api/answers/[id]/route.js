import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Question from "@/models/Question";
import Answer from "@/models/Answer";
import User from "@/models/User";
import { getServerSession } from "next-auth";

// PUT /api/answers/[id] - Update an answer
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { content } = body;

    // Find answer
    const answer = await Answer.findById(id);
    if (!answer) {
      return NextResponse.json(
        { error: "Answer not found" },
        { status: 404 }
      );
    }

    // Check if user is the author
    const user = await User.findOne({ email: session.user.email });
    if (!user || answer.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Validation
    if (content && content.length < 30) {
      return NextResponse.json(
        { error: "Answer must be at least 30 characters" },
        { status: 400 }
      );
    }

    // Update answer
    const updateData = { updatedAt: new Date() };
    if (content) updateData.content = content;

    const updatedAnswer = await Answer.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("author", "name email image");

    return NextResponse.json(updatedAnswer);
  } catch (error) {
    console.error("Error updating answer:", error);
    return NextResponse.json(
      { error: "Failed to update answer" },
      { status: 500 }
    );
  }
}

// DELETE /api/answers/[id] - Delete an answer
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Find answer
    const answer = await Answer.findById(id);
    if (!answer) {
      return NextResponse.json(
        { error: "Answer not found" },
        { status: 404 }
      );
    }

    // Check if user is the author
    const user = await User.findOne({ email: session.user.email });
    if (!user || answer.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete answer
    await Answer.findByIdAndDelete(id);

    return NextResponse.json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error deleting answer:", error);
    return NextResponse.json(
      { error: "Failed to delete answer" },
      { status: 500 }
    );
  }
}
