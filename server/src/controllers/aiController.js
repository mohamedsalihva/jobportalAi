import fs from "fs";
import path from "path";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { extractResumeText } from "../utils/resumeTextExtractor.js";
import { getGeminiResumeScore } from "../services/geminiResumeScoreService.js";
import { getGeminiResumeRewrite } from "../services/geminiRewriteService.js";
import { generateResumePDF } from "../services/pdfGeneratorServices.js";
import { SERVER_ROOT } from "../utils/paths.js";



// RESUME SCORE PREVIEW

export const resumeScorePreviewController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const user = await User.findById(userId);
    if (!user || !user.resumePath)
      return res.status(400).json({ message: "Upload resume first" });

    const resumeAbsolutePath = path.join(SERVER_ROOT, user.resumePath);
    if (!fs.existsSync(resumeAbsolutePath))
      return res.status(400).json({ message: "Resume file missing" });

    let resumeText = await extractResumeText({
      path: resumeAbsolutePath,
      mimetype: "application/pdf",
    });

    resumeText = resumeText.slice(0, 6000);

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




// RESUME REWRITE + PDF

export const resumeRewriteController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const user = await User.findById(userId);
    if (!user || !user.resumePath)
      return res.status(400).json({ message: "Upload resume first" });

    const resumeAbsolutePath = path.join(SERVER_ROOT, user.resumePath);
    if (!fs.existsSync(resumeAbsolutePath))
      return res.status(400).json({ message: "Resume missing" });

    let resumeText;
    try {
      resumeText = await extractResumeText({
        path: resumeAbsolutePath,
        mimetype: "application/pdf",
      });
    } catch (err) {
      console.error("Resume Extract Error:", err);
      return res.status(500).json({ message: "Resume extract failed" });
    }

    resumeText = resumeText.slice(0, 6000);

    let rewrittenResume;
    try {
      rewrittenResume = await getGeminiResumeRewrite({
        resumeText,
        job,
      });
    } catch (err) {
      console.error("Gemini Rewrite Error:", err);
      return res.status(500).json({ message: "AI rewrite failed" });
    }

    console.log("AI Rewrite Output:", rewrittenResume);

    let pdf;
    try {
      pdf = await generateResumePDF({
        name: user.name,
        ...rewrittenResume,
      });
    } catch (err) {
      console.error("PDF Generate Error:", err);
      return res.status(500).json({ message: "PDF generation failed" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=optimized-resume.pdf"
    );

    return res.send(pdf);

  } catch (err) {
    console.error("Resume Rewrite Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
