const express = require("express");
const userRoute = express.Router();
const { register, login } = require("../controllers/auth");

userRoute.post("/register", register);
userRoute.post("/login", login);

module.exports = userRoute;
