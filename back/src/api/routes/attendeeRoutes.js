const express = require("express");
const attendeeRoutes = express.Router();
const attendeeController = require("../controllers/attendee");

attendeeRoutes.get("/", attendeeController.getAllAttendees);
attendeeRoutes.get("/:id", attendeeController.getAttendeeById);
attendeeRoutes.get("/events/:id", attendeeController.getAttendeesByEventId);

module.exports = attendeeRoutes;
