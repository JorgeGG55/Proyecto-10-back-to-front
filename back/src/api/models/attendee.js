const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    confirmedEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    ],
  },
  {
    timestamps: true,
    collection: "attendees",
  }
);

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
