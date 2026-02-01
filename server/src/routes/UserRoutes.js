import express from 'express';

import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { logoutController } from '../controllers/AuthController.js';

const router = express.Router();

router.get("/profile", AuthMiddleware, (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({
    success: true,
    user: req.user
  });
});


router.post("/logout", AuthMiddleware, logoutController);

 export default router;