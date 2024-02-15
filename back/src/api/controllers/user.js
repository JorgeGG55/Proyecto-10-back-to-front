const Event = require("../models/event");
const Attendee = require("../models/attendee");
const User = require("../models/user");

const createEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;
    const newEvent = new Event({ title, date, location, description });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al buscar el usuario", error: error.message });
  }
};

const confirmAttendanceWithToken = async (req, res) => {
  try {
    const { _id: userId, name, email } = req.user;
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    let attendee = await Attendee.findOne({ userId });

    if (!attendee) {
      attendee = await Attendee.findOne({ email });

      if (!attendee) {
        attendee = new Attendee({
          userId,
          name,
          email,
          confirmedEvents: [eventId],
        });
      } else {
        if (attendee.confirmedEvents.includes(eventId)) {
          return res
            .status(400)
            .json({ message: "Ya has confirmado asistencia a este evento" });
        } else {
          attendee.confirmedEvents.push(eventId);
        }
      }
    } else {
      if (attendee.confirmedEvents.includes(eventId)) {
        return res
          .status(400)
          .json({ message: "Ya has confirmado asistencia a este evento" });
      } else {
        attendee.confirmedEvents.push(eventId);
      }
    }

    await attendee.save();
    res.status(201).json({ message: "Asistencia confirmada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmAttendanceWithoutToken = async (req, res) => {
  try {
    const { name, email } = req.body;
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    let attendee = await Attendee.findOne({ email });
    if (!attendee) {
      attendee = new Attendee({
        name,
        email,
        confirmedEvents: [eventId],
      });
    } else {
      if (attendee.confirmedEvents.includes(eventId)) {
        return res
          .status(400)
          .json({ message: "Ya has confirmado asistencia a este evento" });
      } else {
        attendee.confirmedEvents.push(eventId);
      }
    }
    await attendee.save();
    res.status(201).json({ message: "Asistencia confirmada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserEvents = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await Attendee.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const events = await Event.find({ _id: { $in: user.confirmedEvents } });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "El usuario no está apuntado a ningún evento" });
    }
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelAttendance = async (req, res) => {
  try {
    const { _id: userId, email } = req.user;
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    let attendee = await Attendee.findOne({ userId });
    if (!attendee) {
      attendee = await Attendee.findOne({ email });
      if (!attendee) {
        return res.status(400).json({
          message: "No tienes confirmada la asistencia a este evento",
        });
      }
    }

    if (!attendee.confirmedEvents.includes(eventId)) {
      return res
        .status(400)
        .json({ message: "No tienes confirmada la asistencia a este evento" });
    }
    attendee.confirmedEvents = attendee.confirmedEvents.filter(
      (id) => id.toString() !== eventId
    );
    await attendee.save();

    res.status(200).json({ message: "Asistencia cancelada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  confirmAttendanceWithToken,
  confirmAttendanceWithoutToken,
  getUserEvents,
  cancelAttendance,
  getUserById,
};
