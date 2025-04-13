import { Router } from "express";

import ValidateTask from "../middlewares/ValidadeteTask.js";
import ValidateUser from "../middlewares/ValidateUser.js";
import ValidateTag from "../middlewares/ValidateTag.js";

import AuthController from "../controllers/AuthController.js";
import UserController from "../controllers/UserController.js";
import TaskController from "../controllers/TaskController.js";
import TagController from "../controllers/TagController.js";

const router = Router();

router.use(authMiddleware);

router.get("/users", UserController.index);
router.get("/users/:id", ValidateUser.validateSelect, UserController.show);
router.put("/users/:id", ValidateUser.validateUpdate, UserController.update);
router.delete("/users/:id", ValidateUser.validateDelete, UserController.delete);

router.get("/tags", TagController.index);
router.get("/tags/:id", ValidateTag.byId, TagController.show);
router.post("/tags", ValidateTag.title, TagController.create);
router.put(
  "/tags/:id",
  ValidateTag.byId,
  ValidateTag.title,
  TagController.update
);
router.delete("/tags/:id", ValidateTag.byId, TagController.delete);

router.get(
  "/tasks",
  ValidateTask.validateUser,
  ValidateTask.validateValue,
  TaskController.index
);
router.get(
  "/tasks/:id",
  ValidateTask.validateUser,
  ValidateTask.validateValue,
  TaskController.show
);
router.post(
  "/tasks",
  ValidateTask.validateUser,
  ValidateTask.validateValue,
  TaskController.create
);
router.put(
  "/tasks/:id",
  ValidateTask.validateUser,
  ValidateTask.validateValue,
  TaskController.update
);
router.delete("tasks/:id", TaskController.delete);

router.post("/logout", AuthController.logout);

router.get("/protegida", (req, res) => {
  res.json({
    message: "Você acessou uma rota protegida!",
    user: req.user,
  });
});

export default router;
