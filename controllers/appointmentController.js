const db = require('../config/db'); // Ensure this uses mysql2/promise

// Submit an appointment
const submitAppointment = async (req, res) => {
    const { name, phone, email, appointment_date, appointment_time, service, message } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !appointment_date || !appointment_time || !service) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = `INSERT INTO appointments (name, phone, email, appointment_date, appointment_time, service, message)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await db.query(sql, [name, phone, email, appointment_date, appointment_time, service, message || null]);
        res.status(201).json({ message: 'Appointment booked successfully!', id: result.insertId });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Error saving appointment.' });
    }
};

// Fetch all appointments
const fetchAppointments = async (req, res) => {
    const sql = `SELECT * FROM appointments ORDER BY appointment_date ASC`;

    try {
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).json({ error: 'Error fetching appointments.' });
    }
};

module.exports = { submitAppointment, fetchAppointments };