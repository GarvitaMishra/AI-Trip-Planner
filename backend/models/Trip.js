const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    people: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    // ✅ STORE COMPLETE AI RESPONSE

    plan: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);