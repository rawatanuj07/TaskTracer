const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false, // Disable createdAt and updatedAt timestamps
    hooks: {
      beforeCreate: (user, options) => {
        console.log("Before creating user:", user);
      },
      afterCreate: (user, options) => {
        console.log("After creating user:", user);
      },
    },
  }
);
// this has been moved to server.js file
// // Create the table if it doesn't exist
// User.sync()
//   .then(() => {
//     console.log("Users table has been created (if it did not exist)");
//   })
//   .catch((err) => {
//     console.error("Error creating Users table:", err);
//   });

module.exports = User;
