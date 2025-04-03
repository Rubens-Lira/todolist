import Sequelize from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

async function connection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com sucesso.");
  } catch (error) {
    console.error("Sem sucesso na conexão:", error);
  }
}

connection();
