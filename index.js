import dotenv from "dotenv";
import http from "http";
import app from "./src/app.js";
import db from "./database/models/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected");

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
