// const mongoose = require("mongoose");

// // Trip schema
// const tripSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // reference to User model
//     required: true
//   },
//   destination: {
//     type: String,
//     required: true
//   },
//   days: {
//     type: Number,
//     required: true
//   },
//   people: {
//     type: String,
//     enum: ["Solo", "Family", "Friends"], // restrict values
//     required: true
//   },
//   budget: {
//     type: Number,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ["India", "International"],
//     required: true
//   },
//   itinerary: {
//     type: Object, // will store AI generated plan
//     default: {}
//   },
//   expenses: {
//     type: Number,
//     default: 0
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Trip", tripSchema);

const mongoose = require("mongoose");

// Trip schema
const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
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
      enum: ["Solo", "Family", "Friends"],
      required: true,
    },

    // ✅ FIXED (was Number before)
    budget: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["India", "International"],
      required: true,
    },

    // ✅ NEW (REPLACES itinerary + expenses)
    plan: {
      itinerary: [],
      hotels: [],
      food: [],
      transport: [],
      estimatedBudget: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);