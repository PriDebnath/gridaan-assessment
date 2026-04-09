import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ strict: false }));

app.get("/", (_req, res) => {
  res.json({ message: "success" });
});


export default app;