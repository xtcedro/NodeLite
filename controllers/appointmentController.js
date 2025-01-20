const db = require('../config/db');

// Submit an appointment
const submitAppointment = (req, res) => {
    const { name, phone, email, appointment_date, appointment_time, service, message } = req.body;

    if (!name || !phone || !email || !appointment_date || !appointment_time || !service) {
        return res.status(400).send('All fields are required.');
    }

    const sql = `INSERT INTO appointments (name, phone, email, appointment_date, appointment_time, service, message)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, phone, email, appointment_date, appointment_time, service, message || null], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Error saving appointment.');
        }
        res.status(200).send('Appointment booked successfully!');
    });
};

// Fetch all appointments
const fetchAppointments = (req, res) => {
    const sql = `SELECT * FROM appointments ORDER BY appointment_date ASC`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query failed:', err);
            return res.status(500).send('Error fetching appointments.');
        }
        res.status(200).json(results);
    });
};

module.exports = { submitAppointment, fetchAppointments };