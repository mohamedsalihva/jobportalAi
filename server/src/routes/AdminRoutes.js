import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";



import {
    getAllUsersController,
    deleteUsersController,
    updateUsersController,
    getSingleUserController,
    getAllRecruitersController,
    getAdminAnalyticsController,
    updateRecruiterLimitController
} from "../controllers/AdminController.js"


const router = express.Router();

router.get("/users", AuthMiddleware, isAdmin, getAllUsersController);
router.delete("/user/:id", AuthMiddleware, isAdmin, deleteUsersController);
router.put("/user/:id", AuthMiddleware, isAdmin, updateUsersController);
router.get("/user/:id", AuthMiddleware, isAdmin, getSingleUserController);

router.get("/recruiter", AuthMiddleware, isAdmin, getAllRecruitersController)


router.get("/analytics", AuthMiddleware, isAdmin, getAdminAnalyticsController);
router.put("/recruiter/:id/limit", AuthMiddleware, isAdmin, updateRecruiterLimitController);

export default router;