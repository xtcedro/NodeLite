const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../controllers/chatbotController');

// Route for chatbot interaction
router.post('/chat', getChatResponse);

module.exports = router;