import express from "express";
import mongoose from "mongoose";


const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:Object,
        unique:true,
        
    },
    categories:{
        type:Array
    },
    size:{
        type:String
    },
    color:{
        type:String,
    },
    price:{
       type:Number, 
       required:true 
    }
},{timestamps:true})

export const Product=mongoose.model("Product",ProductSchema);