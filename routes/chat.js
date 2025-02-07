import express from "express";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();
router.post("/", chatController); // ✅ AI Chat Route

export default router;