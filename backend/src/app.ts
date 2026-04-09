import cors from "cors";
import express from "express";
import studentRoutes from "./routes/student.routes";

const app = express();

app.use(cors());
app.use(express.json({ strict: false }));

app.get("/", (_req, res) => {
  res.json({ message: "success" });
});

app.use("/api/students", studentRoutes);

export default app;