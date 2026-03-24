import mongoose from 'mongoose';


const connectDB = async ()=>{
    try{
          console.log("MONGO_URI =", process.env.MONGO_URI); 
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        console.log("CONNECTED DB:", mongoose.connection.name);

    }catch(error){
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}

export default connectDB;
