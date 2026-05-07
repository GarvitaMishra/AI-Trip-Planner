const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // user must enter name
  },
  email: {
    type: String,
    required: true,
    unique: true // no duplicate emails allowed
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"], // only these two roles allowed
    default: "user"
  },
  avatar: {
    type: String, // will store image URL
    default: "https://i.pravatar.cc/150"
  }
}, { timestamps: true }); // adds createdAt, updatedAt

// Export model
module.exports = mongoose.model("User", userSchema);