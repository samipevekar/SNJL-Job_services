import mongoose from "mongoose";

export const connectToMongo = async () => {
    const url = process.env.MONGODB_URI
    try {
        
    } catch (error) {
        console.log(error)
    }
}