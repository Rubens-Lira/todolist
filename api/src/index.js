import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";
import cors from "cors";
import "./models/associations.js";

const app = express();

sequelize.sync({ force: false });

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () =>
  console.log(`Server iniciado em http://localhost:${process.env.PORT}`)
);
