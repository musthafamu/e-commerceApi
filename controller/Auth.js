
import { User}  from "../models/User.js";
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";

export const Register=async(req,res)=>{
  try{
    const {username,email,password}=req.body
    const available=await User.findOne({email})
    if(available){

      res.status(404).json({message:"already registered"})
    }
    const salt=await bcrypt.genSalt(10)
    const  hashedpassword= await bcrypt.hash(password,salt);
    
   const newUser=new User({
    username,
    email,
    password:hashedpassword
   });

   
   await newUser.save();
   res.status(201).json(newUser);

  }catch(e){
   res.status(500).json({message:"internal server error"})
  }
};

export const Login=async(req,res)=>{
  try{
 const {email,password}=req.body;

 const user=await User.findOne({email});

 if(!user){
  return res.status(404).json({message:"user doesnt exist"})
 }
const passwordMatch=await bcrypt.compare(password,user.password);
if(!passwordMatch){
  return res.status(401).json({message:"incorrect password"})
};
const token =await Jwt.sign(
  {
    id:user._id,
    isAdmin:user.isAdmin
  },
  process.env.JWT_SEC,
  {expiresIn:"3d"}
)


res.status(200).json(token)
  }catch(error){
 res.status(500).json({message:"internal server error"})
  }
}


