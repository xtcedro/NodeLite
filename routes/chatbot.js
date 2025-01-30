import express from "express";
import { chatWithAI } from "../services/openaiService.js"; // Import the OpenAI service

const router = express.Router();

router.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const reply = await chatWithAI(message);
        res.json({ reply });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Chatbot failed to respond" });
    }
});

export default router;