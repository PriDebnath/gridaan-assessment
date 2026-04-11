

import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config(); /// Load env data

const PORT = process.env.PORT || 8000;
const URI: string  = process.env.MONGO_URI as string
connectDB(URI)

app.get("/", async (req, res) => {
    try {
        res.status(200).json({ message: "success"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "failed" });
    }
});

app.listen(PORT, () => {
  console.log(`🟩 Server running on port ${PORT}`);
});