import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import { UPLOADS_DIR } from "./utils/paths.js";
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

/*  TRUST PROXY (needed for rate-limit + cookies) */
app.set("trust proxy", 1);

/* ---------- CORE MIDDLEWARE ---------- */
app.use(helmet());
const normalizeOrigin = (value = "") =>
  value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\/$/, "");

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0) {
        return callback(null, true);
      }
      const normalizedOrigin = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(passport.initialize());



/* ---------- RATE LIMITERS ---------- */

//  AI &  Payments: protect cost + quota

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 1000 : 5,
  message: "Too many requests. Please wait."
});

/* ---------- STATIC FILES (RESUMES) ---------- */
const cookieOptions = {
  httpOnly: true,
  secure: false,          
  sameSite: "lax",
  path: "/",              
};

app.use(
  "/uploads",
  express.static(UPLOADS_DIR)
);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});


//  LIMITERS APPLIED ONLY WHERE NEEDED
app.use("/api/auth", authRoutes);
app.use("/api/ai", strictLimiter, aiRoutes);
app.use("/api/payments", strictLimiter, paymentRoutes);

//  NO LIMITERS (normal user flow)
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/saved", savedJobRoutes);
app.use("/api/profile", profileRoutes);

export default app;
