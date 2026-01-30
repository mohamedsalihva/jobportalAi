import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiResumeRewrite = async ({ resumeText, job }) => {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-flash-latest",
  });

  const jobText = `
Job Title: ${job.title}
Skills: ${(job.skills || []).join(", ")}
Requirements: ${(job.requirements || []).join(", ")}
Description: ${job.description}
`;

  const prompt = `
You are a professional resume writer.

Rewrite the resume to better match the job role.
- Highlight relevant skills
- Use strong action verbs
- Make ATS-friendly
- Do NOT add fake experience
- Keep it professional

Return ONLY structured JSON:
{
  "summary": string,
  "skills": string[],
  "experience": string[],
  "projects": string[],
  "education": string
}

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
  } catch {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  }

  return parsed;
};
