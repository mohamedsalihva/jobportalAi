import express from "express";
const router = express.Router();

import passport from "passport";
import jwt from "jsonwebtoken";

import {
  signupController,
  loginController
} from "../controllers/AuthController.js";

import { signupValidation } from "../middlewares/validators/validateUser.js";
import { validateRequest } from "../middlewares/validators/validateRequest.js";
import { authLimiter } from "../middlewares/authLimiter.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

/* ---------- SIGNUP ---------- */
router.post(
  "/signup",
  authLimiter,
  signupValidation,
  validateRequest,
  signupController
);

/* ---------- LOGIN ---------- */
router.post(
  "/login",
  authLimiter,
  loginController
);

/* ---------- AUTH CHECK (DEBUG) ---------- */
router.get("/me", AuthMiddleware, (req, res) => {
  res.json({
    success: true,
    userId: req.user?._id,
    role: req.user?.role,
    email: req.user?.email
  });
});

/* ---------- GOOGLE AUTH ---------- */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/"
  }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    const redirectPath =
      user.role === "admin" ? "/admin/dashboard" :
      user.role === "recruiter" ? "/recruiter/dashboard" :
      "/jobs";

    res.redirect(`${process.env.CLIENT_URL}${redirectPath}`);
  }
);

export default router;
