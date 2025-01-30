import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key in .env
});

const openai = new OpenAIApi(configuration);

export async function chatWithAI(userMessage) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    throw new Error("Failed to fetch response from OpenAI API.");
  }
}