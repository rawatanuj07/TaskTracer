const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// const signupRoutes = require("./routes/api/userRoutes");
const userRoutes = require("../server/routes/api/userRoutes");
const loginRoutes = require("../server/routes/api/loginRoutes");

// Initialize Express app
const app = express();
app.use(cors());
const port = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("middleware is okkay now");
// API routes
app.use("/api", userRoutes); // Use the signup routes
console.log("signupp is okkay now");
app.use("/api", loginRoutes); // Use the signup routes
console.log("signupp is okkay now");
// Serve static files (if you have a build directory for your React app)
app.use(express.static(path.join(__dirname, "client/build")));

// Fallback to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
