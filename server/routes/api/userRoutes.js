// routes/api/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// Define routes for user registration and login
router.post("/signup", userController.registerUser);

module.exports = router;
