/**
 * Creating model, it will generate a collection in database.
 */

import { Schema, ObjectId } from "mongoose";
import mongoose, { InferSchemaType } from "mongoose";

export const adminSchema = new Schema({
  email: String,
  password: String,
  created_at: Number,
  modified_at: Number,
});

export const adminModel = mongoose.model("admin", adminSchema);

export type Admin = InferSchemaType<typeof adminSchema>;

export const studentSchema = new Schema({
  name: String,
  student_class: String,
  created_at: Number,
  modified_at: Number,
});

export const studentModel = mongoose.model("student", studentSchema);

export type Student = InferSchemaType<typeof studentSchema>;

export const taskSchema = new Schema({
  title: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: studentModel.modelName},
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export const taskModel = mongoose.model("task", taskSchema);

export type Task = InferSchemaType<typeof taskSchema>;
