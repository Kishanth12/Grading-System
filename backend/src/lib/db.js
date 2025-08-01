import mongoose from "mongoose";

export const connectDb= async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDb Connected":${conn.connection.host}`)
    } catch (error) {
        console.log("mongoDb Connection Error",error)
    }
}