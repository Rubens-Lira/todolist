import { Router } from "express";
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";
import { validateUser } from "../middlewares/validateUser.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const routes = Router();

routes.use(authMiddleware)

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", validateUser, UserController.update);
routes.delete("/users/:id", UserController.delete);

routes.post("/logout", AuthController.logout);

routes.get("/protegida", (req, res) => {
  res.json({
    message: "Você acessou uma rota protegida!",
    user: req.user
  })
})

export default routes;
