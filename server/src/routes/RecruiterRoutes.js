import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

import {
    createRecruiterController,
    getMyRecruiterController,
    updateRecruiterController
} from "../controllers/RecruiterController.js";

const router =express.Router();

router.post("/profile", AuthMiddleware, createRecruiterController);
router.get("/profile", AuthMiddleware, getMyRecruiterController);
router.put("/profile", updateRecruiterController);

export default router;