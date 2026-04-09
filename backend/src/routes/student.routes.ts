import { Router } from "express";
import { createOne, deleteOne, getAll } from "../controllers/student.controllers";
import protect from "../middleware/auth.middleware";

const router = Router();

router.post("/", createOne);
router.get("/", protect, getAll);
router.delete("/:id", deleteOne);

export default router;