import fs from "fs";
import pdf from "pdf-parse";

export const extractResumeText = async (file) => {
  try {
    let dataBuffer;

    // CASE 1: multer upload (buffer)
    if (file.buffer) {
      dataBuffer = file.buffer;
    }

    // CASE 2: stored resume (path)
    else if (file.path) {
      dataBuffer = fs.readFileSync(file.path);
    }

    else {
      throw new Error("Invalid resume input");
    }

    const data = await pdf(dataBuffer);
    return data.text || "";
  } catch (error) {
    console.error("Resume extract error:", error.message);
    throw error;
  }
};
