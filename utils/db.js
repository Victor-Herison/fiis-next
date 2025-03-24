import mongoose from "mongoose";

export default async function connectDB() {
    console.log(process.env.MONGO_URI)
    return await mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err))
}