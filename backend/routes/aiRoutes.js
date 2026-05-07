const express = require("express");
const router = express.Router();
const { generateTripPlan } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

// AI generate route
router.post("/generate", protect, generateTripPlan);

module.exports = router;