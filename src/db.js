import { Sequelize } from "sequelize";
import initModels from "../database/models/init-models.js";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
);

export const models = initModels(sequelize);
