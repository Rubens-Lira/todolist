import { Router } from "express";

import AuthController from "../controllers/AuthController.js";
import ValidateUser from "../middlewares/ValidateUser.js";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/create", ValidateUser.validateCreate, UserController.create); 
router.post("/login", AuthController.login) 
router.post("/refresh", AuthController.refresh) 
router.post("/logout", AuthController.logout) 

router.use(authMiddleware)

router.get("/list", UserController.index);
router.get("/show/:id", ValidateUser.validateSelect, UserController.show);
router.put("/update/:id", ValidateUser.validateUpdate, UserController.update);
router.delete("/destroy/:id", ValidateUser.validateDelete, UserController.delete);

export default router
