import express from 'express';
import {addtoCart,DeleteCart,updateCart,getCart,getallCart} from '../controller/cart.js';
import { verifyToken,verifiedTokenAdmin,verifiedTokenAuth } from '../middleware/verified.js';

const router=express.Router();
router.get('/',verifiedTokenAdmin,getallCart);
router.get('/:userId',verifiedTokenAuth,getCart);
router.post('/',verifiedTokenAuth,addtoCart);
router.delete('/:id', verifiedTokenAuth, DeleteCart);
router.put('/:id',verifiedTokenAuth,updateCart);


export default router;




