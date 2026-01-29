import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import checkJobPostLimit from "../middlewares/checkJobPostLimit.js";

import {
    createJobController,
    getAllJobController,
    getSingleJobController,
    updateJobController,
    deleteJobController,
    getMyJobsController
} from "../controllers/JobController.js";

import {
    validateJob
} from "../middlewares/validators/validateJob.js";
import {
    validateRequest
} from "../middlewares/validators/validateRequest.js";


const router = express.Router();


/* ---------- PROTECTED ROUTES ---------- */
router.get("/my-jobs", AuthMiddleware, isRecruiter, getMyJobsController);

/* ---------- PUBLIC ROUTES ---------- */
router.get("/", getAllJobController);

router.get("/:id", getSingleJobController);

/* ---------- CREATE JOB (SECURED) ---------- */
router.post("/", AuthMiddleware, isRecruiter, checkJobPostLimit, validateJob, validateRequest, createJobController);

/* ---------- UPDATE JOB (SECURED) ---------- */
router.put("/:id", AuthMiddleware, isRecruiter, validateJob, validateRequest, updateJobController);

/* ---------- DELETE JOB ---------- */
router.delete("/:id", AuthMiddleware, isRecruiter, deleteJobController);

export default router;