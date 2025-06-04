import mongoose from "mongoose";

export const connectToMongo = async () => {
    const url = process.env.MONGODB_URI
    try {
        await mongoose.l
    } catch (error) {
        console.log(error)
    }
}