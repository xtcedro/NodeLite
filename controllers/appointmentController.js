import db from "../config/db.js"; // Import the database connection

// Submit an appointment
export const submitAppointment = async (req, res) => {
    try {
        const { name, phone, email, appointment_date, appointment_time, service, message } = req.body;

        if (!name || !phone || !email || !appointment_date || !service) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        // Insert appointment into the database
        const [result] = await db.execute(
            "INSERT INTO appointments (name, phone, email, appointment_date, appointment_time, service, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, phone, email, appointment_date, appointment_time, service, message]
        );

        res.status(201).json({ message: "Appointment submitted successfully!", appointmentId: result.insertId });
    } catch (error) {
        console.error("Error submitting appointment:", error);
        res.status(500).json({ error: "Failed to submit appointment" });
    }
};

// Fetch all appointments
export const fetchAppointments = async (req, res) => {
    try {
        const [appointments] = await db.execute("SELECT * FROM appointments ORDER BY appointment_date DESC");

        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Failed to fetch appointments" });
    }
};