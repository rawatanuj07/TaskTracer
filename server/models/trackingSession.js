const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary

class TrackingSession extends Model {}

TrackingSession.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
    },
    totalTime: {
      type: DataTypes.INTEGER, // total seconds
    },
  },
  {
    sequelize,
    modelName: "TrackingSession",
  }
);

module.exports = TrackingSession;
