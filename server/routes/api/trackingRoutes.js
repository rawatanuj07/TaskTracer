const express = require("express");
const router = express.Router();
const trackingController = require("../../controllers/trackingController");

router.post("/start", trackingController.startTracking);
router.post("/stop", trackingController.stopTracking);

module.exports = router;
