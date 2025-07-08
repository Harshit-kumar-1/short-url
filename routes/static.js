const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.route("/").get(async (req, res) => {
    const user = req.user;
  if (!user) return res.render('login');
    const userUrls = await URL.find({createdBy : user._id});
    return res.render("home", { urls: userUrls });
});

router.route("/signup").get(async (req, res) => {
  return res.render("signup");
});

router.route("/login").get(async (req, res) => {
  return res.render("login");
});

module.exports = router;