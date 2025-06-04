import mongoose from "mongoose";

export const connectToMongo = async () => {
    const url = process.env.MONGODB_URI
    try {
        await mongoose.connect(url)
        
    } catch (error) {
        console.log(error)
    }
}