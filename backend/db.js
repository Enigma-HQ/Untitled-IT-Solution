const sqlite = require("sqlite3").verbose();

// Connect to db
const db = new sqlite.Database("tickets.db", (err) => {
    if (err) console.error(err);
    else console.log("DB Created Successfully");
});

// Create table if it doesn't exist

db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    title TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("DB is Ready");
        }
    });


module.exports = db;