import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const UpdateUser=async(req,res)=>{
    try{
        const newPassword=req.body.updatepassword
  const hashpassword=await bcrypt.hash(newPassword,10)
        const updatedFiled={
          password:hashpassword,
          username:req.body.username,
          email:req.body.email
        }
        

    
   const updatepassword=await User.findByIdAndUpdate(req.params.id,{
    $set:updatedFiled
   },{new:true})
  


   res.status(200).json(updatepassword)
    }catch{
        res.status(500).json({message:"internal server error"})
    }
}

export const  deleteUser=async(req,res)=>{
    try{
      const id=req.params.id;
      await User.findByIdAndDelete(id);
      res.status(200).json("user has been deleted")
    }catch{
        res.status(500).json({message:"could not delete the user"})
    }
}




export const getUser=async(req,res)=>{
    try{
        const {id}=req.params
  const users=await User.findById(id);
  res.status(200).json(users);
    }catch{
        res.status(500).json({messsage:"interal server error"})
    }
}

export const getAlluser=async(req,res)=>{
    try{
        const query=req.query.new;
        
  const users= query?await User.find().sort({_id:-1}).limit(5):await User.find();
  res.status(200).json(users);
    }catch{
        res.status(500).json({messsage:"interal server error"})
    }
}



export const userStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));

    const aggregationResult = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    console.log('Aggregation Result:', aggregationResult);
    res.status(200).json(aggregationResult);
  } catch (error) {
    console.error('Error in userStats function:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


























