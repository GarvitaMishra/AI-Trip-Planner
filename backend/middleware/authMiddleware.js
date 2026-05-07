const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (only logged-in users)
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if token is in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB (without password)
    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware for admin access
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};