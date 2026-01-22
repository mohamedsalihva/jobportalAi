import pdf from "pdf-parse";
import mammoth from "mammoth";

export const extractResumeText = async (file) => {
  if (!file) return "";

  if (file.mimetype === "application/pdf") {
    const data = await pdf(file.buffer);
    return data.text || "";
  }

  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value || "";
  }

  return "";
};
