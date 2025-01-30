const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

// Import API Routes
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');
const chatbotRoutes = require('./routes/chatbot');  // ✅ Add chatbot route

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../html/public')));

// API Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);  // ✅ Register chatbot API

// Fallback Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/public/pages/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});