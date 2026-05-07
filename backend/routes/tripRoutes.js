const express = require("express");
const router = express.Router();
const { createTrip, getTrips, updateTrip, deleteTrip } = require("../controllers/tripController");
const { protect } = require("../middleware/authMiddleware");

// Routes
router.post("/", protect, createTrip);
router.get("/", protect, getTrips);
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

module.exports = router;