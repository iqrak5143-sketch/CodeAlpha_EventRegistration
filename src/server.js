const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api", registrationRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Event Registration System API is running",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});