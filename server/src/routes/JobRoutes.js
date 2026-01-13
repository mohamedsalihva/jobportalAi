import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import isRecruiter from "../middlewares/isRecruiter.js";

import {
    createJobController,
    getAllJobController,
    getSingleJobController,
    updateJobController,
    deleteJobController
} from  "../controllers/JobController.js";

const router = express.Router();


router.get("/", getAllJobController);
router.get("/:id", getSingleJobController);


router.post("/", AuthMiddleware, isRecruiter, createJobController);
router.put("/:id", AuthMiddleware, isRecruiter, updateJobController);
router.delete("/:id", AuthMiddleware, isRecruiter, deleteJobController);

export default router;
