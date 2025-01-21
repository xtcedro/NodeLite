const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js'); // Database connection

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const [emailExists] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (emailExists.length > 0) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a token
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login successful.' });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};