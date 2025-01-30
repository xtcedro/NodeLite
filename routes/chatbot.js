import express from "express";
import { handleChatbotRequest } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/chat", handleChatbotRequest);

export default router;