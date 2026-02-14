const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bellcorp.db', (err) => {
  if (err) {
    console.log('Database error:', err);
  } else {
    console.log('Database connected');
  }
});

// Create tables
db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    organizer TEXT NOT NULL,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    category TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
  )`);

});

module.exports = db;