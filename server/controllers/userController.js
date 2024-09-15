const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
// POST handler for user signup
const signupUser = (req, res) => {
  const { username, email, password } = req.body;
  console.log("hello form controller, req body is", username);

  //   // Generate a random salt
  //   bcrypt.genSalt(10, (err, salt) => {
  //     if (err) {
  //       console.error("Error generating salt:", err);
  //       callback(err, null);
  //       return;
  //     }
  //     // Hash the password with the salt
  //     bcrypt.hash(password, salt, (err, hash) => {
  //       if (err) {
  //         console.error("Error hashing password:", err);
  //         callback(err, null);
  //         return;
  //       }
  //     });
  //   });

  //   userModel.createUser(username, email, password, salt, (err, userId) => {
  //     if (err) {
  //       console.log("error from controller is", err);
  //       return res.status(400).json({ error: err.message });
  //     }
  //     res.status(201).json({ id: userId });
  //   });
  // };
  // Generate a random salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log("Error generating salt:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Hash the password with the salt
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log("Error hashing password:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Create the user with the hashed password and salt
      userModel.createUser(username, email, hash, salt, (err, userId) => {
        if (err) {
          console.log("error from controller is", err);
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: userId });
      });
    });
  });
};

// Export the controller functions
module.exports = {
  signupUser,
};
