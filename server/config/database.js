// const sqlite3 = require("sqlite3").verbose();

// // Initialize SQLite database
// const db = new sqlite3.Database("./database.db", (err) => {
//   if (err) {
//     console.error("Error opening database " + err.message);
//   } else {
//     console.log("Connected to the SQLite database successfully");
//   }
// });

// module.exports = db;
const { Sequelize } = require("sequelize");

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db", // Path to SQLite database file
  logging: false, // Disable logging; default: console.log
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connected to the SQLite database successfully using Sequelize"
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the SQLite database:", err);
  });

module.exports = sequelize;
