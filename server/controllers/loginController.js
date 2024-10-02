const bcrypt = require("bcrypt");
const User = require("../services/signinService");
const { Cookie } = require("express-session");
const session = require("express-session");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("hello from usercontroller1, req body is", email);
  console.log("pass from usercontroller", password);
  try {
    // Find the user by email
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Store user information in the session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    console.log("req.session.user izZzz", req.session);
    // If successful, send back the user data (excluding password and salt)
    session.user = { id: user.id, username: user.username, email: user.email };
    console.log("req.session.user izZzz", req.session);

    res.status(200).json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  loginUser,
};
