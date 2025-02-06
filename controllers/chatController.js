import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chatbot Controller
export const chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        // Send message to Gemini AI
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(message);
        const botReply = result.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Something went wrong with AI processing" });
    }
};