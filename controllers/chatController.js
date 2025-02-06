import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

// Configure OpenAI API
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// Chatbot Controller
export const chatWithGPT = async (req, res) => {
  try {
    const { message } = req.body; // Get user input from request

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    // Extract AI response
    const botReply = response.data.choices[0].message.content;

    res.json({ reply: botReply }); // Send AI response to frontend
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Something went wrong with AI processing" });
  }
};