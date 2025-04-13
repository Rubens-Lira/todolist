import { Router } from "express";

import TaskController from "../controllers/TaskController.js";
import ValidateTask from "../middlewares/ValidadeteTask.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/create",
  ValidateTask.validateUser,
  ValidateTask.validateValue,
  TaskController.create
);

router.get("/list", TaskController.index);
router.get("/show/:id", TaskController.show);

router.put(
  "/update/:id",
  ValidateTask.validateUser,
  ValidateTask.validateValue,
  TaskController.update
);

router.delete("delete/:id", TaskController.delete);

export default router;
