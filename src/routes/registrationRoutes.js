const express = require("express");

const {
  registerForEvent,
  getUserRegistrations,
  getAllRegistrations,
  cancelRegistration,
} = require("../controllers/registrationController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Register for an event
router.post( "/events/:eventId/register", protect, registerForEvent);
// View user's registrations
router.get("/my-registrations", protect, getUserRegistrations);

// get allregistrations
router.get("/registrations", protect, adminOnly, getAllRegistrations);
// Cancel registration
router.delete( "/registrations/:id", protect, cancelRegistration);

module.exports = router;