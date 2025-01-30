import express from "express";
import { chatWithAI } from "../services/openaiService.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const aiResponse = await chatWithAI(message);
    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: "Error processing request" });
  }
});

export default router;