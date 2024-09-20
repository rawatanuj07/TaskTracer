// services/userService.js
const User = require("../models/userModel");

const createUser = async (username, email, password, salt) => {
  try {
    console.log("username from service", username);
    const user = await User.create({ username, email, password, salt });
    console.log("user from service 222", user);
    return user;
  } catch (error) {
    console.log("error from service", error, error.message);
    throw new Error("Error creating user: " + error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Error finding user: " + error.message);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
};
