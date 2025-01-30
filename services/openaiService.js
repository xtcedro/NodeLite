const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function chatWithAI(userMessage) {
    try {
        const response = await openai.chat.completions.create({
            model: "chatgpt-4o-latest",  // ✅ Updated model
            messages: [{ role: "user", content: userMessage }],
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        throw new Error("Failed to fetch response from OpenAI.");
    }
}

module.exports = { chatWithAI }; // ✅ Export for CommonJS