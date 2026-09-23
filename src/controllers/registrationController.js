const mongoose = require("mongoose");
const Registration = require("../models/registrationModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

// Register user for an event
const registerForEvent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { eventId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
  return res.status(400).json({
    message: "Invalid event ID",
  });
}

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const existingRegistration = await Registration.findOne({
      user: user._id,
      event: eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "User is already registered for this event",
      });
    }

    const registrationCount = await Registration.countDocuments({
      event: eventId,
    });

    if (registrationCount >= event.capacity) {
      return res.status(400).json({
        message: "Event is fully booked",
      });
    }

    const registration = await Registration.create({
      user: user._id,
      event: eventId,
    });

    res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email")
      .populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get user's registrations
const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const registrations = await Registration.find({
      user: userId,
    })
      .populate("user", "name email")
      .populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Cancel registration
const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid registration ID",
      });
    }

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    // Check if the logged-in user owns this registration
    if (registration.user.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        message: "You can only cancel your own registration",
      });
    }

    await Registration.findByIdAndDelete(id);

    res.status(200).json({
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerForEvent,
  getAllRegistrations,
  getUserRegistrations,
  cancelRegistration,
};