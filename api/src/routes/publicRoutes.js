import { Router } from "express";
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";
import { validateUser } from "../middlewares/validateUser.js";

const routes = Router()

routes.get("/", (req, res) => res.send("Olá usuário"));

routes.post("/users", validateUser, UserController.create); 
routes.post("/refresh", AuthController.refresh) 
routes.post("/login", AuthController.login) 



export default routes
