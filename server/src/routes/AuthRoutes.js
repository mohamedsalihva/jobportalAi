import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";


import { signupController, loginController } from '../controllers/AuthController.js';




router.post("/signup", signupController);
router.post("/login", loginController);



router.get("/google", passport.authenticate("google",{scope: ["profile", "email"]}));

router.get("/google/callback",passport.authenticate("google", { session: false, failureRedirect: "/"}),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }
);


export default router;
