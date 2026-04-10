import { Request, Response } from "express";
import { studentModel as model, Student as Type } from "../models";

export const createOne = async (req: Request, res: Response) => {
  try {
    const body: Type = req.body;
    const { name, student_class } = body
    if (!name || !student_class) {
      return res.status(400).json({ error: "Missing data" });
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

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: Partial<Type> = req.body;

    const { name, student_class } = body;

    // Optional: validate at least one field is provided
    if (!name && !student_class) {
      return res.status(400).json({ error: "No data to update" });
    }

    const updated = await model.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(student_class && { student_class }),
        modified_at: Date.now(),
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

    res.status(200).json({ message: "Dleted successfully", deleted, });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};