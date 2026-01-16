import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

import { applyJobController,myApplicationsController } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/:jobId/apply", AuthMiddleware,applyJobController);
router.get("/myApplication", AuthMiddleware,myApplicationsController);

export default router;