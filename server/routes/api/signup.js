const express = require("express");
// const router = express.Router();
const app = express();
console.log("hello1");

const db = require("../../config/database"); // Import the database connection
console.log("hello2");

// POST endpoint for user signup
app.post("/", (req, res) => {
  console.log("hello3");

  console.log(req);

  console.log(req.body);
  const { username, email, password } = req.body;

  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.run(query, [username, email, password], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    console.log("enterData succesfully");
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = app;
