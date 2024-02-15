const express = require("express");
const eventRoutes = express.Router();
const eventController = require("../controllers/event");

eventRoutes.get("/", eventController.getAllEvents);
eventRoutes.get("/:id", eventController.getEventById);

module.exports = eventRoutes;
