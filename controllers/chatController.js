import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message } = req.body || {}; // Handle empty requests

        // System prompt: AI identity and behavior
        const systemPrompt = `
        You are Dominguez Tech Solutions AI Assistant, an expert in AI, web development, and business automation.
        Stay professional, concise, and helpful. Ensure all responses reflect the following accurate pricing:

        📌 **Website Development Packages:**
        - 🚀 **Starter:** $100 (Fully responsive design, basic SEO)
        - 💼 **Business:** $200 (Advanced SEO, secure user accounts, email verification)
        - 🏆 **Enterprise:** $300 (Premium SEO, E-Commerce, Stripe/PayPal integration)

        🎓 **AI & Web Development Crash Course:**
        - 💰 **One-time fee:** $69 per person  
        - ✅ Includes course materials, real-world projects, and lifetime access to resources.

        💡 **Custom Development:**  
        For specialized website features, pricing is based on project scope. Users should contact Dominguez Tech Solutions for a custom quote.

        Always adhere to this pricing when answering user queries. If users ask for services not listed, guide them to request a custom quote.
        `;

        // If no message is sent (first interaction), return an introduction
        if (!message) {
            return res.json({
                reply: "Hello! I'm **Dominguez Tech Solutions AI Assistant 🤖**. I'm here to assist you with AI, web development, and business automation. How can I help you today?"
            });
        }

        // Process user messages
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = await model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 300, // Limits response length
                temperature: 0.7, // Adjusts creativity level
            },
        });

        const response = await chat.sendMessage([systemPrompt, message]);
        const botReply = response.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI processing failed. Please try again later." });
    }
};