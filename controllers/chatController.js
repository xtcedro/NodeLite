import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message } = req.body || {}; // Handle empty requests

        // System prompt: AI identity and behavior
        const systemPrompt = `
        You are the Dominguez Tech Solutions AI Assistant, an expert in technology, AI, and business automation.
        Your goal is to help users with IT solutions, web development, and AI applications. Stay professional, concise, and helpful.
        `;

        // If no message is sent (first interaction), return an introduction
        if (!message) {
            return res.json({
                reply: "Hello! I'm the **Dominguez Tech Solutions AI Assistant 🤖**. I'm here to assist you with AI, web development, and business automation. How can I help you today?"
            });
        }

        // Process user messages
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const response = await model.generateContent([systemPrompt, message]);
        const botReply = response.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI processing failed" });
    }
};