import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Could not connect to MongoDB", error);
        process.exit(1); // thoat neu loi
    }
}