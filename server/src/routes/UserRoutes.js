import express from 'express';

import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { logoutController } from '../controllers/AuthController.js';

const router = express.Router();

router.get("/profile",AuthMiddleware, (req,res)=>{
    res.json({
        success:true,
        message:"you are logged in",
        userFromToken:req.user
    });
});

router.post("/logout", AuthMiddleware, logoutController);

 export default router;