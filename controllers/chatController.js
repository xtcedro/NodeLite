import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        // Select AI model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate response with streaming enabled
        const streamingResponse = await model.generateContentStream(message);

        // Set response headers for streaming
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Stream response as chunks
        for await (const chunk of streamingResponse.stream) {
            res.write(`data: ${JSON.stringify({ text: chunk.text() })}\n\n`);
        }

        res.end(); // End stream when complete
    } catch (error) {
        console.error("Streaming AI Error:", error);
        res.status(500).json({ error: "AI streaming failed" });
    }
};