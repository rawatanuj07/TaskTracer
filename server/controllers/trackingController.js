const trackingService = require("../services/trackingService");

const startTracking = async (req, res) => {
  console.log("req.session Is", req.session);
  console.log("req.session.user Is", req.session.user);

  console.log("req.session.userId Iss", req.body.userId);

  const { userId } = req.body;
  const startTime = new Date();
  console.log("userId from tracking-controller", userId);
  try {
    console.log("req.sessionID 1oct", req.sessionID);

    const session = await trackingService.createSession(userId, startTime);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: "Error starting tracking session", error });
  }
};

const stopTracking = async (req, res) => {
  console.log("sessionId from tracking-controller1", req.body);

  const { totalSeconds } = req.body;
  const trackid = req.body.ids;
  console.log("id is", trackid);
  console.log("totalSeconds is", totalSeconds);
  console.log("sessionId from S-T-O-P", req.sessionID);
  const endTime = new Date();
  console.log("end time is ", endTime);
  try {
    console.log("id from TRACKINGXXXX", trackid);
    const session = await trackingService.getSessionById(trackid);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    console.log("id from TRACKING 2", trackid);

    const totalSeconds = Math.floor(
      (endTime - new Date(session.startTime)) / 1000
    ); // seconds
    console.log("id from TRACKING 3", trackid);

    await trackingService.updateSession(trackid, endTime, totalSeconds);
    console.log("id from TRACKING 4", trackid);

    res.status(200).json({ message: "Tracking session updated", trackid });
    console.log("id from TRACKING 5", trackid);
  } catch (error) {
    console.log("id from TRACKING 6", trackid);
    res.status(500).json({ message: "Error stopping tracking session", error });
  }
};

module.exports = { startTracking, stopTracking };
