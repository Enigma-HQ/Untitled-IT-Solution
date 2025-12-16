const sqlite = require("sqlite3").verbose();

// Connect to db
const db = new sqlite.Database("database.db", (err) => {
    if (err) console.error(err);
    else console.log("DB Created Successfully");
});

// Create table if it doesn't exist

db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
    id PRIMARY KEY,
    title TEXT,
    status TEXT,
    statusLabel TEXT,
    badgeClass TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    description TEXT
    )
    `, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("DB is Ready");
        }
    });
module.exports = db;