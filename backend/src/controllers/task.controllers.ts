import { Request, Response } from "express";
import { taskModel as model, studentModel, Task as Type } from "../models";

export const createOne = async (req: Request, res: Response) => {
  try {
    const body: Type = req.body;
    const { title, student, } = body
    if (!title || !student) {
      return res.status(400).json({ error: "Missing data" });
    }
    if (student) {
      const studentStored = await studentModel.findById(student)
      if (!studentStored) {
        return res.status(404).json({ error: "Student not found" });
      }
    }

    const newData = new model({
      title,
      student,
    });

    const saved = await newData.save();
    const populated = await saved.populate("student");
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ error: "Save failed" });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const all = await model.find().populate("student");
    console.log({all});
    
    res.status(200).json(all);
  } catch {
    res.status(500).json({ error: "Get failed" });
  }
};

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: Partial<Type> = req.body;

    const { title, student, completed } = body;

    const updated = await model.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
        ...(student !== undefined && { student }),
      },
      { new: true }
    ).populate("student");

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