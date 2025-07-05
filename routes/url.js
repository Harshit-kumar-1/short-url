const express = require('express');
const router = express.Router();
const {
  handleGenrateNewShortUrl,
  handleGetUrl,
  handleUrlAnalitics,
} = require("../controllers/url");

router.route('/').get((req, res) => {
    res.status(200).json({ msg: 'Welcome to URL Shortner' });
});

router.route('/:shortId').get(handleGetUrl);
router.route("/").post(handleGenrateNewShortUrl);
router.route("/analitics/:shortId").get(handleUrlAnalitics);

module.exports = router;