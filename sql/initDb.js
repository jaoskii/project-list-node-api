const fs = require('fs');
const path = require('path');
const db = require('../config/database');

async function initializeDatabase() {
    try {
        // Read the SQL file
        const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
        
        // Execute the SQL commands
        await db.query(sql);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Run the initialization
initializeDatabase(); 