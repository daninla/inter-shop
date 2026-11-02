import { Sequelize } from "sequelize";
import initModels from "./init-models.js";
import configByEnv from "../config/configDB.js";

const env = process.env.NODE_ENV || "development";
const config = configByEnv[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
  },
);
const db = initModels(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
