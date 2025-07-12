import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Question from "@/models/Question";
import Answer from "@/models/Answer";
import User from "@/models/User";
import { getServerSession } from "next-auth";

// GET /api/questions/[id] - Get a specific question with answers
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    // Get question with author data
    const question = await Question.findById(id)
      .populate("author", "name email image");

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Get answers for this question
    const answers = await Answer.find({ questionId: id })
      .populate("author", "name email image")
      .sort({ isAccepted: -1, votes: -1, createdAt: -1 });

    return NextResponse.json({
      question,
      answers
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Failed to fetch question" },
      { status: 500 }
    );
  }
}

// PUT /api/questions/[id] - Update a question
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
    const { title, description, tags } = body;

    // Find question
    const question = await Question.findById(id);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Check if user is the author
    const user = await User.findOne({ email: session.user.email });
    if (!user || question.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Validation
    if (title && title.length < 10) {
      return NextResponse.json(
        { error: "Title must be at least 10 characters" },
        { status: 400 }
      );
    }

    if (description && description.length < 30) {
      return NextResponse.json(
        { error: "Description must be at least 30 characters" },
        { status: 400 }
      );
    }

    if (tags && (tags.length === 0 || tags.length > 5)) {
      return NextResponse.json(
        { error: "Must have 1-5 tags" },
        { status: 400 }
      );
    }

    // Update question
    const updateData = { updatedAt: new Date() };
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (tags) updateData.tags = tags;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("author", "name email image");

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 }
    );
  }
}

// DELETE /api/questions/[id] - Delete a question
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

    // Find question
    const question = await Question.findById(id);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Check if user is the author
    const user = await User.findOne({ email: session.user.email });
    if (!user || question.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete associated answers
    await Answer.deleteMany({ questionId: id });

    // Delete question
    await Question.findByIdAndDelete(id);

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 }
    );
  }
}
