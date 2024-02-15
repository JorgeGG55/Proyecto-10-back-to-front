const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/user");
const authenticateToken = require("../../middlewares/auth");

userRoutes.post(
  "/attendees/:eventId",
  userController.confirmAttendanceWithoutToken
);

userRoutes.post(
  "/attendees/registered/:eventId",
  authenticateToken,
  userController.confirmAttendanceWithToken
);

userRoutes.get("/", authenticateToken, userController.getUserById);

userRoutes.post("/events", authenticateToken, userController.createEvent);
userRoutes.get("/events", authenticateToken, userController.getUserEvents);
userRoutes.delete(
  "/attendees/registered/:eventId",
  authenticateToken,
  userController.cancelAttendance
);

module.exports = userRoutes;
