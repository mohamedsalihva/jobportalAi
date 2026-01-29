import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { uploadResume} from "../middlewares/uploadResume.js";
import {resumeScorePreviewController} from "../controllers/aiController.js";
import {aiRateLimiter} from "../middlewares/aiRateLimiter.js";

const router = express.Router();

router.post("/resume-score/:jobId", AuthMiddleware, aiRateLimiter, uploadResume, resumeScorePreviewController);

export default router;