import express, { Router } from "express";
import {Register,Login} from '../controller/Auth.js';
import {verifyToken} from '../middleware/verified.js'
const router=express.Router();

router.post('/register',Register)
router.post('/login',Login)
router.get('/one',verifyToken,(req,res)=>{
 res.status(200).json({message:"yjdwdwd dw "})
})





export default router;
