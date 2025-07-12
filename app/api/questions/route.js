import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/db/connectDB";
import Question from "@/models/Question";
import Answer from "@/models/Answer";
import User from "@/models/User";
import { getServerSession } from "next-auth";

// GET /api/questions - Get all questions with pagination and filtering
export async function GET(request) {
  try {
    await connectDB();
    
    // If no database connection, return mock data
    if (!mongoose.connection.readyState) {
      return NextResponse.json({
        questions: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 }
      });
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Build sort
    let sortQuery = {};
    switch (sort) {
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      case "oldest":
        sortQuery = { createdAt: 1 };
        break;
      case "votes":
        sortQuery = { votes: -1, createdAt: -1 };
        break;
      case "answers":
        sortQuery = { answerCount: -1, createdAt: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    // Get questions with pagination
    const questions = await Question.find(query)
      .populate("author", "name email image")
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Question.countDocuments(query);

    // Calculate answer count for each question
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const answerCount = await Answer.countDocuments({ 
          questionId: question._id 
        });
        return {
          ...question.toObject(),
          answerCount
        };
      })
    );

    return NextResponse.json({
      questions: questionsWithAnswers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

// POST /api/questions - Create a new question
export async function POST(request) {
  try {
    await connectDB();
    
    // If no database connection, return error
    if (!mongoose.connection.readyState) {
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }
    
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, tags } = body;

    // Validation
    if (!title || !description || !tags) {
      return NextResponse.json(
        { error: "Title, description, and tags are required" },
        { status: 400 }
      );
    }

    if (title.length < 10) {
      return NextResponse.json(
        { error: "Title must be at least 10 characters" },
        { status: 400 }
      );
    }

    if (description.length < 30) {
      return NextResponse.json(
        { error: "Description must be at least 30 characters" },
        { status: 400 }
      );
    }

    if (tags.length === 0 || tags.length > 5) {
      return NextResponse.json(
        { error: "Must have 1-5 tags" },
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

    // Create question
    const question = new Question({
      title,
      description,
      tags,
      author: user._id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await question.save();

    // Populate author data for response
    await question.populate("author", "name email image");

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}
