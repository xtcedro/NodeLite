import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const streamingResponse = await model.generateContentStream(message);

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Process streamed chunks
        for await (const chunk of streamingResponse.stream) {
            const content = chunk.candidates?.[0]?.content?.parts?.[0]?.text || "";
            if (content) {
                res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
            }
        }

        res.write("data: [DONE]\n\n"); // Signal completion
        res.end();
    } catch (error) {
        console.error("Streaming AI Error:", error);
        res.write(`data: ${JSON.stringify({ error: "AI streaming failed" })}\n\n`);
        res.end();
    }
};