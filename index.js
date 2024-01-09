import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

import authRouter from "./routers/Auth.js";
import  userRouter from "./routers/users.js";
import  productRouter from  "./routers/product.js";
import cartRouter from "./routers/cart.js"

dotenv.config()
connectDb();


const port=process.env.PORT
const app=express();
app.use(express.json());

app.use('/auth',authRouter)
app.use('/user',userRouter);
app.use('/products',productRouter);
app.use('/cart',cartRouter);

app.listen(port,()=>{
    console.log(port)
})