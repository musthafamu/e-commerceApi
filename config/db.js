import mongoose from "mongoose";


export const connectDb=async()=>{
    try{
      
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connected")
    }catch(e){
      console.log("not connected")
    }
}