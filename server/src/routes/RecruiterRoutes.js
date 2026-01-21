import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import isRecruiter from "../middlewares/isRecruiter.js"

import {
    createRecruiterController,
    getMyRecruiterController,
    updateRecruiterController
} from "../controllers/RecruiterController.js";

const router =express.Router();

router.post("/create-profile", AuthMiddleware, isRecruiter, createRecruiterController);
router.get("/profile", AuthMiddleware, isRecruiter, getMyRecruiterController);
router.put("/profile", AuthMiddleware, isRecruiter, updateRecruiterController);

export default router;