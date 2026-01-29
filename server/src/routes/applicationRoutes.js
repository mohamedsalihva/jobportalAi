import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import isRecruiter from "../middlewares/isRecruiter.js";

import {
  applyJobController,
  myApplicationsController,
  getApplicantsByJobController,
  updateApplicationStatusController,
  viewApplicantResumeController
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/:jobId/apply", AuthMiddleware, applyJobController);
router.get("/myApplication", AuthMiddleware, myApplicationsController);

// recruiter routes
router.get("/job/:jobId", AuthMiddleware, isRecruiter, getApplicantsByJobController);
router.put("/:id/status", AuthMiddleware, isRecruiter, updateApplicationStatusController);

router.get(
  "/:jobId/:userId/resume", AuthMiddleware, isRecruiter, viewApplicantResumeController);


export default router;