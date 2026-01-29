import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/resumes",
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
