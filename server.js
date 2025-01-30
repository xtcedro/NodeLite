const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users'); // User authentication routes
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../html/public')));

// OpenAI API Configuration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Chatbot Route
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: message }],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Chatbot failed to respond." });
    }
});

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes); // User authentication routes

// Serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/public/pages/index.html'));
});

// Test API Endpoint
app.get('/api', (req, res) => {
    res.send('API is working!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});