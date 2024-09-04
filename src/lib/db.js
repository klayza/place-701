// src/lib/db.js
import sqlite3 from 'sqlite3';

// Initialize and return a database connection
export async function initDB() {
    return new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Could not connect to database', err);
        } else {
            console.log('Connected to SQLite database');
        }
    });
}

// Create the subscribers table if it doesn't exist
export function createTable(db) {
    db.run(`CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Could not create table', err);
        } else {
            console.log('Table created or already exists');
        }
    });
}
