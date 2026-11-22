import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { staticPath } from "./config/staticPath.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads/brands",
  express.static(staticPath),
);
app.use("/api", router);

export default app;
