require('dotenv').config(); // Load environment variables
const mysql = require('mysql2/promise');

async function initializeDatabase() {
  try {
    // Create a connection pool
    const db = mysql.createPool({
      host: process.env.DB_HOST, // From .env
      user: process.env.DB_USER, // From .env
      password: process.env.DB_PASSWORD, // From .env
      database: process.env.DB_NAME, // From .env
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Verify the connection
    const connection = await db.getConnection();
    console.log('Database connected successfully!');
    connection.release();

    return db; // Return the connection pool
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the process on connection error
  }
}

// Initialize the database and export the pool
const db = initializeDatabase();

module.exports = db;