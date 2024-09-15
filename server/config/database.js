const sqlite3 = require("sqlite3").verbose();

// Initialize SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database successfully");
  }
});

module.exports = db;