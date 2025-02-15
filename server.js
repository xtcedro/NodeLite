import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // ✅ Import path for serving static files
import { fileURLToPath } from "url"; // ✅ Required for __dirname in ESM
import { db } from "./config/db.js";
import appointmentRoutes from "./routes/appointments.js";
import chatRoutes from "./routes/chatRoutes.js";
import stripeRoutes from "./routes/stripe.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// ✅ Get correct __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// ✅ API Routes
app.use("/api/stripe", stripeRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Serve React Static Build Files
const reactBuildPath = path.join(__dirname, "../frontend/build");

app.use(express.static(reactBuildPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(reactBuildPath, "index.html"));
});

app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));