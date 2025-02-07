import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";  // ✅ Database connection
import appointmentRoutes from "./routes/appointments.js";
import chatRoutes from "./routes/chat.js"; // ✅ AI Chatbot routes

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("../html/public")); // Serve frontend files

// Use Modular Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes); // ✅ Modular AI route

// Start Server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));