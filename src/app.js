import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { fileURLToPath } from "node:url";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads/brands",
  express.static(fileURLToPath(new URL("../uploads/brands/", import.meta.url))),
);
app.use("/api", router);

export default app;
