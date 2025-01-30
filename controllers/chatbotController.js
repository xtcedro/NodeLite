const { chatWithAI } = require('../services/openaiService');

exports.getChatResponse = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required!" });
        }

        const aiResponse = await chatWithAI(message);
        res.json({ reply: aiResponse });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
};