// Import required packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const tripRoutes = require("./routes/tripRoutes");
const aiRoutes = require("./routes/aiRoutes");
const profileRoutes = require("./routes/profileRoutes");

// Create express app
const app = express();

// Middleware
app.use(cors()); // allows frontend to talk to backend
app.use(express.json()); // allows us to read JSON data
app.use("/api/profile", profileRoutes);

// use routes
app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// use route
app.use("/api/trips", tripRoutes);

app.use("/api/ai", aiRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});