const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users'); // Import user routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../html/public/pages/')));

// API Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes); // Add user routes for registration and login

// Test route
app.get('/api', (req, res) => {
    res.send('API is working!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
