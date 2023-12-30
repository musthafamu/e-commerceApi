import express from 'express';
import { verifyToken,verifiedTokenAdmin,verifiedTokenAuth } from '../middleware/verified.js';

import {UpdateUser,deleteUser,userStats,getUser,getAlluser} from '../controller/user.js'
const router=express.Router();

router.put('/:id',verifiedTokenAuth,UpdateUser);
router.delete('/:id',verifiedTokenAuth,deleteUser);
router.get('/:id',verifiedTokenAdmin,getUser);
router.get('/stats',verifiedTokenAdmin,userStats);
router.get('/',verifiedTokenAdmin,getAlluser);

export default router;


