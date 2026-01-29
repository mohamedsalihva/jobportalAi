import fs from "fs";
import path from "path";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { extractResumeText } from "../utils/resumeTextExtractor.js";
import { getGeminiResumeScore } from "../services/geminiResumeScoreService.js";

export const resumeScorePreviewController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    /* ---------- JOB ---------- */
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    /* ---------- USER + RESUME ---------- */
    const user = await User.findById(userId);
    if (!user || !user.resumePath) {
      return res.status(400).json({
        message: "Upload resume in profile first",
      });
    }

    const resumeAbsolutePath = path.join(
      process.cwd(),
      user.resumePath
    );

    if (!fs.existsSync(resumeAbsolutePath)) {
      return res.status(400).json({
        message: "Resume file not found on server",
      });
    }

    /* ---------- EXTRACT TEXT ---------- */
    let resumeText = await extractResumeText({
      path: resumeAbsolutePath,
      mimetype: "application/pdf",
    });

    resumeText = resumeText.slice(0, 6000);

    /* ---------- GEMINI ---------- */
    const aiResult = await getGeminiResumeScore({
      resumeText,
      job,
    });

    return res.status(200).json(aiResult);
  } catch (err) {
    console.error("Resume Score Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
