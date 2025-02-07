import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(message);
        const botReply = result.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ error: "AI processing failed" });
    }
};