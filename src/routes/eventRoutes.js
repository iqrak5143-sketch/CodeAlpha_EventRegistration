const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const express = require("express");

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

// Get all events
router.get("/", getAllEvents);
// Get single event
router.get("/:id", getEventById);
// Create new event
router.post("/", protect, adminOnly, createEvent);
// update event
router.put("/:id", protect, adminOnly, updateEvent);
// delete event
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;