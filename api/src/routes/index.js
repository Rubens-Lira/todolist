import { Router } from "express";
import userRoutes from "./user.js"
import tagRoutes from "./tag.js"
import taskRoutes from "./task.js"

const router = Router()

router.use("/users", userRoutes)
router.use("/tags", tagRoutes)
router.use("/tasks", taskRoutes)

export default router
