import express from 'express';

import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/profile",AuthMiddleware, (req,res)=>{
    res.json({
        success:true,
        message:"you are logged in",
        userFromToken:req.user
    });
});
 export default router;