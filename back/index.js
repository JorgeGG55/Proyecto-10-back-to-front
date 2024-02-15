require("dotenv").config();
const express = require("express");

const authRoutes = require("./src/api/routes/authRoutes");
const eventRoutes = require("./src/api/routes/eventRoutes");
const attendeeRoutes = require("./src/api/routes/attendeeRoutes");
const userRoutes = require("./src/api/routes/userRoutes");
const { connectDB } = require("./src/config/db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
