import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";
import isRecruiter from "../middlewares/isRecruiter.js";


import  {getAllUsersController, deleteUsersController, updateUsersController , getSingleUserController} from  "../controllers/AdminController.js"


 const router = express.Router();

router.get("/user", AuthMiddleware, isAdmin, getAllUsersController);
router.delete("/user/:id", AuthMiddleware, isAdmin, deleteUsersController);
router.put("/user/:id", AuthMiddleware, isAdmin, updateUsersController);
router.get("/user/:id", AuthMiddleware, isAdmin, getSingleUserController);



export default router;