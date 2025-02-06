import express from "express";
import { chatWithGPT } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", chatWithGPT);

export default router;