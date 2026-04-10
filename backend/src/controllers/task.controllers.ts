import { Request, Response } from "express";
import { taskModel as model, Task as Type } from "../models";

export const createOne = async (req: Request, res: Response) => {
  try {
    const body: Type = req.body;
    const {  title, studentId,  } = body
    if (!title || !studentId) {
      return res.status(400).json({ error: "Missing data" });
    }

    const newData = new model({
      title,
      studentId,
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

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: Partial<Type> = req.body;

    const { title, studentId, completed} = body;

    const updated = await model.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(completed && { completed }),
        ...(studentId && { studentId }),
      },
      { new: true } // returns updated document
    );

    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({ message: "Deleted successfully", deleted, });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};