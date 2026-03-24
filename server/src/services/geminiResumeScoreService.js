import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiResumeScore = async ({ resumeText, job }) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  const model = genAI.getGenerativeModel({
    model: modelName,
  });

  const jobText = `
Job Title: ${job.title}
Location: ${job.location}
Job Type: ${job.jobType}
Experience Required: ${job.experienceRequired}

Skills: ${(job.skills || []).join(", ")}
Requirements: ${(job.requirements || []).join(", ")}
Responsibilities: ${(job.responsibilities || []).join(", ")}
Description: ${job.description}
`;

  const prompt = `
You are an ATS Resume Scoring system for a Job Portal.
Compare RESUME with JOB REQUIREMENTS.

 Return ONLY valid JSON (no markdown, no extra text).
 Keep arrays short and useful.

JSON format:
{
  "score": number,
  "fitLevel": "Strong" | "Moderate" | "Low",
  "summary": string,
  "matchedSkills": string[],
  "missingSkills": string[],
  "keywordSuggestions": string[],
  "improvements": string[],
  "atsWarnings": string[],
  "feedback": string
}

Rules:
- score must be between 0 and 100
- fitLevel depends on score:
  - 75+ => Strong
  - 50-74 => Moderate
  - <50 => Low
- improvements must be max 5 items
- atsWarnings must be max 4 items
- keywordSuggestions must be max 8 items

RESUME:
${resumeText}

JOB:
${jobText}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text().replace(/```json|```/g, "").trim();
  let parsed = {};

  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1 || end < start) {
      throw new Error("No JSON object found in Gemini response");
    }

    parsed = JSON.parse(text.slice(start, end + 1));
  } catch (e) {
    throw new Error(`Gemini JSON parse failed: ${e.message}`);
  }

  
  const score = Math.max(0, Math.min(100, Number(parsed.score || 0)));

  return {
    score,
    fitLevel: parsed.fitLevel || (score >= 75 ? "Strong" : score >= 50 ? "Moderate" : "Low"),
    summary: parsed.summary || "Resume analyzed successfully.",
    matchedSkills: parsed.matchedSkills || [],
    missingSkills: parsed.missingSkills || [],
    keywordSuggestions: parsed.keywordSuggestions || [],
    improvements: parsed.improvements || [],
    atsWarnings: parsed.atsWarnings || [],
    feedback: parsed.feedback || "",
  };
};
