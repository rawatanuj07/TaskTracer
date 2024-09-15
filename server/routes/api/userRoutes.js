const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// POST endpoint for user signup
router.post("/", userController.signupUser);

module.exports = router;
