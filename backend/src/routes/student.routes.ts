import { Router } from "express";
import protect from "../middleware/auth.middleware";
import { createOne, deleteOne, getAll, updateOne } from "../controllers/student.controllers";

const router = Router();

router.post("/", createOne);
router.get("/", protect, getAll);
router.patch("/:id", updateOne);
router.delete("/:id", deleteOne);

export default router;