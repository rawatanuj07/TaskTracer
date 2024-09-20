// services/userService.js
const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  console.log("email from signInService", email);
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Error finding user: " + error.message);
  }
};

module.exports = {
  findUserByEmail,
};
