import mongoose from "mongoose";


export const connectToMongo = async () => {
    const url = process.env.MONGODB_URI
    try {
        await mongoose.connect(url).then(()=>{
            console.log("Connect to mongodb")
        }).then(()=>{
            console.log()
        })
        console.log('Connected to mongodb')
    } catch (error) {
        console.log(error)
    }
}