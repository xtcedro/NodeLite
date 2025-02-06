import express from "express";
import { chatWithGemini } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", chatWithGemini);

export default router;