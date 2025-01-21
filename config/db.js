require('dotenv').config(); // Load environment variables
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST, // From .env
  user: process.env.DB_USER, // From .env
  password: process.env.DB_PASSWORD, // From .env
  database: process.env.DB_NAME, // From .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection during initialization
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the process on connection error
  }
})();

module.exports = db; // Export the connection pool directly