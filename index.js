import dotenv from "dotenv";
import http from "http";
import app from "./src/app.js";
import db from "./src/database/models/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

await db.sequelize.authenticate();
console.log("Database connected");

// await db.sequelize.sync({ alter: true });

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
