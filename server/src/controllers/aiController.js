import Job from "../models/Job.js";
import { extractResumeText } from "../utils/resumeTextExtractor.js";
import { getGeminiResumeScore } from "../services/geminiResumeScoreService.js";

export const resumeScorePreviewController = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (!req.file)
      return res.status(400).json({ message: "Resume file is required" });

    let resumeText = await extractResumeText(req.file);
    resumeText = resumeText.slice(0, 6000);

    
    const aiResult = await getGeminiResumeScore({ resumeText, job });

    res.status(200).json({
      score: aiResult.score || 0,
      matchedSkills: aiResult.matchedSkills || [],
      missingSkills: aiResult.missingSkills || [],
      feedback: aiResult.feedback || "",
    });
  } catch (err) {
    console.log("Preview Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
