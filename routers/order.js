import express from  "express";
import {createOrder,updateOrder,deleteOrder,userOrder,allOrder,monthlyIncome
} from '../controller/order.js';
import { verifyToken,verifiedTokenAdmin,verifiedTokenAuth } from '../middleware/verified.js';

const router=express.Router();


router.get( '/',verifiedTokenAuth,allOrder);
router.put( '/:id',verifiedTokenAuth,updateOrder);
router.get( '/:userId',verifiedTokenAuth,userOrder);
router.post( '/',verifiedTokenAuth,createOrder); 
router.delete( '/:id',verifiedTokenAuth,deleteOrder);
router.get( '/income',verifiedTokenAdmin,monthlyIncome);

export default router


