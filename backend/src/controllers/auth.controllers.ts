import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";
import { Request, Response } from "express";
import { adminModel as model, Admin as Type } from "../models";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ message: "Missing data" });

    const user = await model.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already present" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) return res.status(400).json({ message: "Could not hash password" });

    const newData = new model({
      email,
      password: hashedPassword,
      created_at: Date.now(),
      modified_at: Date.now(),
    });

    const saved = await newData.save();
    res.status(201).json({ saved });
  } catch (error) {
    res.status(500).json({ message: "Error in sign up" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await model.findOne({ email });
console.log({user});

    if (!user || !user?.password) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
};