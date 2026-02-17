const mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: "Please enter a valid email address",
      },
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return /^(\+91|0)?[6-9]\d{9}$/.test(value)
        },
        message:
          "Please enter a valid 10-digit phone number (Indian format accepted)",
      },
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["Pending", "Reviewed", "Hired"],
        message: "Status must be Pending, Reviewed, or Hired",
      },
      default: "Pending",
    },

    resumeUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Candidate", candidateSchema)
