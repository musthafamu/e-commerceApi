import express from 'express';
import {Product} from "../models/Product.js";

;

export const getAllProduct = async (req, res) => {
    try {
        const qnew = req.query.new;
        const qCategory = req.query.category;

        let products;

        if (qnew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
           
            products = await Product.find({categories:{
                $in:[qCategory]
            }});
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal server error");
    }
};

export const getProduct=async(req,res)=>{
    try{
    const prodcut=await Product.findById(req.params.id);
    res.status(200).json(prodcut);
    }catch(err){
  res.status(500).json("internal server error");
    }
};

export const createProduct=async(req,res)=>{
    try{
         const  newProduct=new Product(req.body);
         const savedProduct=await newProduct.save();
         res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err)
    }
};




export const updateProduct=async(req,res)=>{
    try{
  const id=req.params._id;
     const updateProduct= await Product.findOneAndUpdate(id,{
        $set:req.body
     },{new:true});


     res.status(200).json(updateProduct);
    }catch(err){
 res.status(500).json('internal server err0r',err)
    }
};

export const deleteProduct=async(req,res)=>{
    try{

      await Product.findByIdAndDelete(req.params.id);

     res.status(200).json("dleted successfully");
    }catch(err){
 res.status(500).json('internal server err0r',err)
    }
};


