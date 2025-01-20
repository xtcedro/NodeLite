const express = require('express');
const router = express.Router();
const { submitAppointment, fetchAppointments } = require('../controllers/appointmentController');

// Appointment submission route
router.post('/', submitAppointment);

// Fetch all appointments route
router.get('/', fetchAppointments);

module.exports = router;