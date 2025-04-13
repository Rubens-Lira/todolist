import { Router } from "express";
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";
import ValidateUser from "../middlewares/ValidateUser.js";

const router = Router()

router.get("/", (req, res) => res.send("Olá usuário"));

router.post("/users", ValidateUser.validateCreate, UserController.create); 
router.post("/refresh", AuthController.refresh) 
router.post("/login", AuthController.login) 

export default router
