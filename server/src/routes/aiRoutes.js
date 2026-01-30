import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { uploadResume} from "../middlewares/uploadResume.js";
import {resumeRewriteController, resumeScorePreviewController} from "../controllers/aiController.js";
import {aiRateLimiter} from "../middlewares/aiRateLimiter.js";

const router = express.Router();

router.post("/resume-score/:jobId", AuthMiddleware, aiRateLimiter, uploadResume, resumeScorePreviewController);
router.post("/resume-rewrite/:jobId", AuthMiddleware, resumeRewriteController)

export default router;