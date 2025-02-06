import OpenAI from "openai"; // Correct import for latest OpenAI SDK
import dotenv from "dotenv";

dotenv.config();

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key from .env
});

// Chatbot Controller
export const chatWithGPT = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    // Extract AI response
    const botReply = response.choices[0].message.content;

    res.json({ reply: botReply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Something went wrong with AI processing" });
  }
};