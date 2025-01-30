import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import appointmentRoutes from "./routes/appointments.js";
import userRoutes from "./routes/users.js";
import chatbotRoutes from "./routes/chatbot.js"; // Import chatbot routes
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "../html/public")));

// Register API Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatbotRoutes); // Register chatbot routes

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../html/public/pages/index.html"));
});

// API Test Route
app.get("/api", (req, res) => {
    res.send("API is working!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});