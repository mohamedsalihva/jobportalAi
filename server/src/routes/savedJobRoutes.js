import express from "express";
import { savedJobController,unsaveJobController,mySavedJobsController } from "../controllers/savedJobController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/:jobId/save", AuthMiddleware, savedJobController);
router.delete("/:jobId/save", AuthMiddleware, unsaveJobController);
router.get("/my", AuthMiddleware, mySavedJobsController);

export default router;