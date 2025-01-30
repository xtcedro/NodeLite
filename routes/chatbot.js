const express = require("express");
const { handleChatbotRequest } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/chat", handleChatbotRequest);

module.exports = router;  // ✅ Use CommonJS export