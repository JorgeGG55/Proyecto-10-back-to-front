const Attendee = require("../models/attendee");
const User = require("../models/user");
const Event = require("../models/event");

const getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAttendeeById = async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.id);
    if (!attendee) {
      return res.status(404).json({ message: "Asistente no encontrado" });
    }
    const user = await User.findById(attendee.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({
      attendeeId: attendee._id,
      userName: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAttendeesByEventId = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    const attendees = await Attendee.find({
      confirmedEvents: event,
    }).populate("confirmedEvents");

    if (attendees.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay asistentes para este evento" });
    }

    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllAttendees, getAttendeeById, getAttendeesByEventId };
