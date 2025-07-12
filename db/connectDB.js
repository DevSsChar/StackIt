import mongoose from "mongoose";

let isConnected = false; // Track connection status

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/stackit", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 60000,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });

        isConnected = true; // Mark as connected
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn("Database connection failed:", error.message);
        console.warn("Running in offline mode - some features may not work");
        // Don't throw error, just warn - allow app to continue
    }
};

export default connectDB;