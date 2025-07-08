const mongoose = require("mongoose");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { fullName, email, password } = req.body;

  const user = await User.create({
    fullName: fullName,
    email: email,
    password: password,
  });

  if (!user) {
    return res.render("login");
  } else if (user) {
    const token = setUser(user);
    res.cookie('usid', token);
    return res.redirect("/");
  } else {
    return res.render("error");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    const token = setUser(user);
    res.cookie("usid", token);
    return res.redirect("/");
  } else {
    return res.render("login", {error: "Invalid User or Password"});
  }
}

module.exports = { handleUserLogin, handleUserSignup };
