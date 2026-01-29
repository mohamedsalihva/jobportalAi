import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

import {
    getMyProfileController,
    updateMyProfileController,
    uploadResumeController
} from "../controllers/profileController.js";

import {
    uploadResume
} from "../middlewares/uploadResume.js";

const router = express.Router();

router.get("/me", AuthMiddleware, getMyProfileController);
router.put("/me", AuthMiddleware, updateMyProfileController);
router.post("/resume", AuthMiddleware, uploadResume, uploadResumeController);

export default router;