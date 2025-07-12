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
        });

        isConnected = true; // Mark as connected
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw new Error("Database connection error"); // Do not exit process
    }
};

export default connectDB;