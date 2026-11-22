import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config();

const projectDirectory = fileURLToPath(new URL("../../", import.meta.url));
export const staticPath = path.resolve(
  projectDirectory,
  process.env.STATIC_PATH || "uploads/brands",
);
