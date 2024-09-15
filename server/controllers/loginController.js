const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// POST handler for user signin
const signinUser = (req, res) => {
  const { email, password } = req.body;
  console.log("hello from Logincontroller1, req body is", email);

  // Find the user by email
  userModel.findUserByEmail(email, (err, user) => {
    console.log("hello from Logincontroller3");
    console.log("user is", user);
    console.log("user password is", user.password);

    if (err) {
      console.log("hello from Logincontroller4");
      console.log("Error finding user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!user) {
      console.log("hello from Logincontroller5");
      return res.status(400).json({ error: "Invalid email or password" });
    }
    console.log("hello from Logincontroller6");

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      console.log("hello from Logincontroller7");

      if (err) {
        console.log("Error comparing passwords:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Passwords match, sign-in successful
      res.status(200).json({ message: "Sign-in successful", userId: user.id });
    });
  });
};

// Export the controller functions
module.exports = {
  signinUser,
};
