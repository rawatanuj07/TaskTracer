const TrackingSession = require("../models/trackingSession");

const createSession = async (userId, startTime) => {
  return await TrackingSession.create({ userId, startTime });
};

const updateSession = async (trackid, endTime, totalTime) => {
  console.log("hello from update1");
  console.log("trackid from update", trackid);
  return await TrackingSession.update(
    { endTime, totalTime },
    { where: { id: trackid } }
  );
};

const getSessionById = async (id) => {
  return await TrackingSession.findByPk(id);
};

module.exports = { createSession, updateSession, getSessionById };
