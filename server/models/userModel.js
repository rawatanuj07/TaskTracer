// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database("database.db"); // Replace 'your_database.db' with your actual file name
const bcrypt = require("bcrypt");
const db = require("../config/database");

// Find user by email

const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  console.log("Executing query:", query, "with email:", email); // Add logging here

  db.get(query, [email], (err, row) => {
    // Use db.get for a single row
    if (err) {
      console.log("Error executing query:", err); // Add logging here
      return callback(err, null);
    }
    if (!row) {
      console.log("No user found with email:", email); // Add logging here
      return callback(null, null); // No user found
    }
    console.log("User found:", row); // Add logging here
    return callback(null, row); // Return the user found
  });
};

// create user
const createUser = (username, email, password, salt, callback) => {
  console.log("serrrModel");

  // Check if the "users" table exists
  const checkTableExistsQuery =
    "SELECT name FROM sqlite_master WHERE type='table' AND name='users'";
  db.get(checkTableExistsQuery, (err, row) => {
    if (err) {
      console.error("Error checking table existence:", err);
      callback(err, null);
      return; // Exit if error checking the table
    }

    if (!row) {
      console.warn("users table doesn't exist, creating it...");
      const createTableQuery = `CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        salt TEXT NOT NULL
      )`;
      db.run(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating table:", err);
          callback(err, null);
          return;
        }

        // Now that the table exists, insert the user
        const insertQuery =
          "INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)";
        db.run(insertQuery, [username, email, password, salt], function (err) {
          callback(err, this.lastID);
        });
      });
    } else {
      // If the table exists, proceed with the insert
      const query =
        "INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)";
      db.run(query, [username, email, password, salt], function (err) {
        callback(err, this.lastID);
      });
    }
  });
};

module.exports = { createUser, findUserByEmail };
