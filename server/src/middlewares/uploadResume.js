import fs from "fs";
import multer from "multer";
import path from "path";
import { RESUMES_DIR } from "../utils/paths.js";

fs.mkdirSync(RESUMES_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: RESUMES_DIR,
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "");
    cb(null, `${req.user._id}-${Date.now()}-${safeName}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

export const uploadResume = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }
}).single("resume");
