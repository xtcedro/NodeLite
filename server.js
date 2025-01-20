const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../html/public')));

// API Routes
app.use('/api/appointments', appointmentRoutes);

// Test route
app.get('/api', (req, res) => {
    res.send('API is working!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});