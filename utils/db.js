import mongoose from "mongoose";

export default async function connectDB() {
    return await mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err))
}