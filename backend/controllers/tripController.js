const Trip = require("../models/Trip");

// @desc Create trip (with AI data passed from frontend)
// @route POST /api/trips
// @access Private
exports.createTrip = async (req, res) => {
  try {
    //const { destination, days, budget, type, people, itinerary } = req.body;
    const { destination, days, budget, type, people, plan } = req.body;

    // Validate input
    if (!destination || !days || !budget || !type || !people) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Create trip directly (AI data already comes from frontend)
    const trip = await Trip.create({
      user: req.user._id,
      destination,
      days,
      budget,
      type,
      people,
      //itinerary
      plan
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all trips of logged-in user
// @route GET /api/trips
// @access Private
exports.getTrips = async (req, res) => {
  try {
    // Find trips belonging to logged-in user
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(trips);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update a trip
// @route PUT /api/trips/:id
// @access Private
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    // Check if trip exists
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Check if user owns this trip
    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update fields
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated data
    );

    res.json({
      message: "Trip updated successfully",
      trip: updatedTrip
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete a trip
// @route DELETE /api/trips/:id
// @access Private
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    // Check if trip exists
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Check ownership
    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete trip
    await trip.deleteOne();

    res.json({ message: "Trip deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};