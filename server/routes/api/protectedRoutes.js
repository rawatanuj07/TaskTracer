// protectedRoutes.js
const express = require("express");
const router = express.Router();

// Middleware to check if the user is authenticated
const requireAuth = (req, res, next) => {
  console.log("insideX rA", req.sessionID);

  if (!req.sessionID) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next(); // Proceed to the next middleware or route handler
};

// Define protected routes
router.post("/home", requireAuth, (req, res) => {
  // Access userId from the session
  const userId = req.session.userId;
  console.log("insideX rA", req.session);

  console.log("insideXXx");
  res.status(200).json({ message: "This is a protected route" });
});

// Logout route without requireAuth middleware
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie

    res.status(200).json({ message: "Logout successful" });
  });
});

module.exports = router;
