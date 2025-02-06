import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable cross-origin requests

// Routes
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));