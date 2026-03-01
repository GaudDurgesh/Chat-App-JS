import mongoose from 'mongoose';
 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected", conn.connection.host)
    } catch (error) {
        console.error("Error connection to MongoDB", error)
        process.exit(1) // 1 Status code means fail , 0 means success
    }
}

export {connectDB}