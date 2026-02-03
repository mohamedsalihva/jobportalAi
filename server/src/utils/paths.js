import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SERVER_ROOT = path.resolve(__dirname, "..", "..");
export const UPLOADS_DIR = path.join(SERVER_ROOT, "uploads");
export const RESUMES_DIR = path.join(UPLOADS_DIR, "resumes");
