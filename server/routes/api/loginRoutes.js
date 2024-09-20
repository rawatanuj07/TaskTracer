const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/loginController");
// POST endpoint for user signup
router.post("/", loginController.loginUser);
module.exports = router;
