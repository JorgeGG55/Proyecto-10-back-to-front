const Event = require("../models/event");

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

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (events.length === 0) {
      return res.status(404).json({ message: "No hay eventos disponibles" });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, date, location, description },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
