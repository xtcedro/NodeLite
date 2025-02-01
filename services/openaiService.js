import { openai } from "../config/db.js"; // ✅ Import OpenAI from db.js

export async function chatWithAI(userMessage) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: userMessage }],
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("❌ Error communicating with OpenAI:", error);
        throw new Error("Failed to fetch response from OpenAI.");
    }
}