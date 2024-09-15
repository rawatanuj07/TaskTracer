const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const loginController = require("../../controllers/loginController");
// POST endpoint for user signup
router.post("/login", loginController.signinUser);
module.exports = router;
