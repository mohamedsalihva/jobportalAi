import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

import { getMyProfileController, updateMyProfileController } from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", AuthMiddleware,getMyProfileController);
router.put("/me", AuthMiddleware,updateMyProfileController);

export default router;