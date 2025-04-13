import { Router } from "express";

import ValidateTag from "../middlewares/ValidateTag.js";
import TagController from "../controllers/TagController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/create", ValidateTag.title, TagController.create);
router.get("/list", TagController.index);
router.get("/show/:id", ValidateTag.byId, TagController.show);

router.put(
  "/update/:id",
  ValidateTag.byId,
  ValidateTag.title,
  TagController.update
);

router.delete("/destroy/:id", ValidateTag.byId, TagController.delete);

export default router;
