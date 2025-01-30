const { chatWithAI } = require("../services/openaiService");

async function handleChatbotRequest(req, res) {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const botResponse = await chatWithAI(message);
        res.json({ reply: botResponse });
    } catch (error) {
        res.status(500).json({ error: "Chatbot failed to respond" });
    }
}

module.exports = { handleChatbotRequest }; // ✅ Use CommonJS export