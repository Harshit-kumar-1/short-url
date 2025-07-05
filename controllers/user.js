const mongoose = require("mongoose");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { fullName, email, password } = req.body;

  const result = await User.create({
    fullName: fullName,
    email: email,
    password: password,
  });

  if (!result) {
    return res.render("login");
  } else if (result) {
    return res.render("home");
  } else {
    return res.render("error");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

    if (user) {
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("usid", sessionId);
    return res.render("home");
  } else {
    return res.render("login");
  }
}

module.exports = { handleUserLogin, handleUserSignup };
