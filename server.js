import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(cors());
app.use(express.static("../html/public")); // Serve frontend files

// AI Chat Route
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        // Send message to Gemini AI
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(message);
        const botReply = result.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ error: "AI processing failed" });
    }
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));