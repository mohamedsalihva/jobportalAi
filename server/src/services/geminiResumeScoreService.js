import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiResumeScore = async ({ resumeText, job }) => {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-flash-latest",
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

  let text = result.response.text();
  text = text.replace(/```json|```/g, "").trim();

  let parsed = {};
  try {
    parsed = JSON.parse(text);
  } catch (e) {

    // fallback if AI returned extra text

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
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
