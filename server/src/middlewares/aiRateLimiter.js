import rateLimit from "express-rate-limit";

export const aiRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // only 5 AI calls per user
  message: "AI resume check limit reached Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
