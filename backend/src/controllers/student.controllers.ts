import { Request, Response } from "express";
import { studentModel as model, Student as Type } from "../models";

export const createOne = async (req: Request, res: Response) => {
  try {
    const body: Type = req.body;
   const { name, student_class } = body
    if (!name || !student_class) {
      return res.status(400)
      .json({ error: "Missing data" });
    }

    const newData = new model({
      name,
      student_class,
      created_at: Date.now(),
      modified_at: Date.now(),
    });

    const saved = await newData.save();
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ error: "Save failed" });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const all = await model.find();
    res.status(200).json(all);
  } catch {
    res.status(500).json({ error: "Get failed" });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Flow not found" });
    }

    res.status(200).json({
      message: "Dleted successfully",
      deleted,
    });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};