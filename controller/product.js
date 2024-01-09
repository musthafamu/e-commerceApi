import express from 'express';
import {Product} from "../models/Product.js";
import cloudinary from "../middleware/cloudinary.js"


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




export const createProduct = async (req, res) => {
  try {
    const { img, title, desc, /* other fields */ } = req.body;

    // Validation logic for required fields
    if (!img /* || other validation checks */) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Check if a product with the same title and description already exists
    const existingProduct = await Product.findOne({ title, desc });

    if (existingProduct) {
      return res.status(409).json({ error: "Product already exists" });
    }

    const uploads = await cloudinary.uploader.upload(img, {
      upload_preset: "onlineshop"
    });

    if (!uploads) {
      return res.status(500).json({ error: "Image upload to Cloudinary failed" });
    }

    const newProduct = new Product({
      ...req.body,
      img: uploads
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

};


 







export const updateProduct = async (req, res) => {
  try {
   
    const { img, title, desc /* other fields */ } = req.body;

    if (img) {
    
      const uploads = await cloudinary.uploader.upload(img, {
        upload_preset: "onlineshop"
      });

      if (!uploads) {
        return res.status(500).json({ error: "Image upload to Cloudinary failed" });
      }

      // Update the image field in the request body with the Cloudinary response
      req.body.img = uploads;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id }, 
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }



    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
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


