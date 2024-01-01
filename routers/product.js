import express from 'express';
import { verifyToken,verifiedTokenAdmin,verifiedTokenAuth } from '../middleware/verified.js';
import  {createProduct,updateProduct,getAllProduct,getProduct,deleteProduct} from '../controller/product.js';     

const router=express.Router();


router.get('/',verifiedTokenAuth,getAllProduct);
router.get('/find/:id',verifiedTokenAuth,getProduct);
router.post('/',verifiedTokenAdmin,createProduct);
router.delete('/:id',verifiedTokenAdmin,deleteProduct);
router.put('/:id',verifiedTokenAdmin,updateProduct);

export default router;









