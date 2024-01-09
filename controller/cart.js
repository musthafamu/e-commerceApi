import express from 'express';
import {Cart} from '../models/Cart.js';


export const addtoCart=async(req,res)=>{
    try{
        const newCart=new Cart(req.body);
        const savedCart=await newCart.save();
        res.status(200).json(savedCart);

    }catch(e){
        res.status(500).json('internal  server error')
    }
};





export const updateCart=async(req,res)=>{
    try{
   const updatecart=await Cart.findByIdAndUpdate(req.params.id,{
    $set:req.body,
   },{new:true});
   res.status(200).json(updatecart);
    }catch(r){
res.status(500).json('server error')
    }
};




export const getCart = async (req, res) => {
  try {
  
    const userId = req.params.userId;
    const cart = await Cart.findOne( {userId});

    if (!cart) {
     
      return res.status(404).json({ message: 'Cart not found for the user' });
    }
    res.status(200).json(cart);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const getallCart=async(req,res)=>{
    try{
  const carts=await Cart.find();
  res.status(200).json(carts);
    }catch(e){
        res.status(500).json(e)
    }
}

