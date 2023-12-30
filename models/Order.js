import express from "express";
import mongoose from "mongoose";



const OrderSchema=new mongoose.Schema({
userId:{
    type:String,
    required:true
},
products:[
    {
        productId:{
            type:String
        },
        quantity:{
            type:String,
            default:1,
        }
    }
],
amount:{
    type:String,
    required:true
},
address:{
    type:Object,
    required:true
},
status:{
    type:String,
    default:"pending"
},

})

export const Order=mongoose.model("Order",OrderSchema);