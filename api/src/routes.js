import { Router } from "express";
import { UserController } from "./controllers/index.js";
import { validateUser } from "./middlewares/index.js";

const router = Router();

// root
router.get("/", (req, res) => res.send("Olá usuário"));

// users
router.get("/users/", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users/", validateUser, UserController.create);
router.put("/users/:id", validateUser, UserController.update);
router.delete("/users/:id", UserController.delete);

export default router;
