import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import "./config/passport.js";

import userRoutes from "./routes/UserRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import jobRoutes from "./routes/JobRoutes.js";
import recruiterRoutes from "./routes/RecruiterRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import savedJobRoutes from "./routes/savedJobRoutes.js";
import profileRoutes from "./routes/ProfileRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

/* 🔐 IMPORTANT FOR RATE LIMIT + COOKIES */
app.set("trust proxy", 1);

/* ---------- CORE MIDDLEWARE ---------- */
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(passport.initialize());

/* ---------- RATE LIMITER ---------- */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 1000 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

/* ---------- STATIC FILES (RESUMES) ---------- */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/* ---------- ROUTES ---------- */
app.use("/api/auth", apiLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/applications", apiLimiter, applicationRoutes);
app.use("/api/saved", savedJobRoutes);
app.use("/api/profile", apiLimiter, profileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payments", paymentRoutes);

export default app;
