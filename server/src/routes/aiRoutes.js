import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { uploadResume } from "../middlewares/uploadResume.js";
import { resumeScorePreviewController } from "../controllers/aiController.js";

const router = express.Router();

router.post("/resume-score/:jobId", AuthMiddleware,uploadResume, resumeScorePreviewController);

export default router;