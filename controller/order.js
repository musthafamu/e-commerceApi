import express from 'express';
import {Order} from '../models/Order.js';


export const createOrder=async(req,res)=>{
    try{
       
        const newOrder=new Order(req.body);
        const savedorder=await newOrder.save();
        res.status(201).json(savedorder)
    }catch(err){
        res.status(500).json('servewr error')
    }
};


export const updateOrder = async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        
        if (!updateOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(updateOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const deleteOrder=async(req,res)=>{
    try{
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('delete order successfully')
    }catch(e){
        res.status(500).json(e)
    }
}

export const userOrder=async(req,res)=>{
    try{
 const orders=await Order.find({userId:req.params.userId});
 res.status(200).json(orders)
    }catch(e){
        res.status(500).json(e)
    }
};



export const allOrder=async(req,res)=>{
    try{
        const orders=await Order.find();
    res.status(200).json(orders)
    }catch(e){
  res.status(500).json('internal server error')
    }
}


export const monthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        console.error('Monthly Income:', JSON.stringify(income));  // Use JSON.stringify for logging objects

        res.status(200).json(income);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


