const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary
const TrackingSession = require("./trackingSession"); // Your existing TrackingSession model

class Screenshot extends Model {}

Screenshot.init(
  {
    trackingSessionId: {
      type: DataTypes.INTEGER,
      references: {
        model: TrackingSession, // Reference the TrackingSession model
        key: "id",
      },
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE, // Time the screenshot was captured
      allowNull: false,
    },
    screenshot: {
      type: DataTypes.BLOB("long"), // Store screenshot as binary data (BLOB)
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Screenshot",
  }
);

// Define relationships
TrackingSession.hasMany(Screenshot, { foreignKey: "trackingSessionId" });
Screenshot.belongsTo(TrackingSession, { foreignKey: "trackingSessionId" });

module.exports = Screenshot;
