import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./config/db.js";  // ✅ Import db.js
import chatbotRoutes from "./routes/chatbot.js";
import appointmentRoutes from "./routes/appointments.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// API Routes
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));