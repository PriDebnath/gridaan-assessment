import { Router } from "express";
import { createOne, deleteOne, getAll } from "../controllers/student.controllers";

const router = Router();

router.post("/", createOne);
router.get("/", getAll);
router.delete("/:id", deleteOne);

export default router;