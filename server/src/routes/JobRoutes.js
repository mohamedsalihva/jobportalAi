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
} from  "../controllers/JobController.js";

const router = express.Router();


router.get("/", getAllJobController);

router.get("/my-jobs", AuthMiddleware, isRecruiter, getMyJobsController);

router.get("/:id", getSingleJobController);


router.post("/", AuthMiddleware, isRecruiter, checkJobPostLimit, createJobController);
router.put("/:id", AuthMiddleware, isRecruiter, updateJobController);
router.delete("/:id", AuthMiddleware, isRecruiter, deleteJobController);

export default router;
