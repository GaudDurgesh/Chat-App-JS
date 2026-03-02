import mongoose from 'mongoose';
import { ENV } from './env';
 
const connectDB = async () => {
    try {
        const {MONGO_URI} = ENV
        if(!MONGO_URI) throw new Error("MONGO_URI is not set")
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MongoDB Connected", conn.connection.host)
    } catch (error) {
        console.error("Error connection to MongoDB", error)
        process.exit(1) // 1 Status code means fail , 0 means success
    }
}

export {connectDB}