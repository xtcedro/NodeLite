-- Schema for Appointment Database
-- Created: 2025-01-10
-- Last Updated: 2025-01-21
-- Schema Version: 1.1

-- Create the database
CREATE DATABASE IF NOT EXISTS appointment_db;

-- Use the created database
USE appointment_db;

-- Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique identifier for each appointment
    name VARCHAR(100) NOT NULL,                -- Full name of the customer
    phone VARCHAR(10) NOT NULL,                -- Phone number (10 digits only)
    email VARCHAR(100) NOT NULL,               -- Customer's email address
    appointment_date DATE NOT NULL,            -- Preferred appointment date
    appointment_time TIME NULL,                -- Preferred appointment time
    service VARCHAR(255) NOT NULL,             -- Type of service requested
    message TEXT,                              -- Additional details or notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for record creation
);

-- Create the users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                     -- Unique identifier for each user
    name VARCHAR(255) NOT NULL,                -- Full name of the user
    email VARCHAR(255) UNIQUE NOT NULL,        -- User's email address
    password VARCHAR(255) NOT NULL,            -- User's hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for record creation
);

-- Optional: Insert sample data for testing
INSERT INTO appointments (name, phone, email, appointment_date, service, message)
VALUES
('John Doe', '1234567890', 'john.doe@example.com', '2025-01-10', 'Roof Repair', 'Urgent roof repair needed.'),
('Jane Smith', '0987654321', 'jane.smith@example.com', '2025-01-11', 'Inspection', 'Requesting a standard roof inspection.');