const URL = require('../models/url');
const shortId = require('shortid');
const port = process.env.port;

async function handleGenrateNewShortUrl(req, res) {
  const body = req.body;
  let redirectUrl;
  const shortid = shortId.generate(8);

  if (!body.redirectUrl) {
    return res.status(400).json({ msg: "Redirect Url Required" });
  } else {
    const bodyUrl = body.redirectUrl;
    if (bodyUrl.includes("http://") || bodyUrl.includes("https://")) {
      redirectUrl = bodyUrl;
    } else {
      redirectUrl = `https://${bodyUrl}`;
    }
  }

  const result = await URL.create({
    shortId: shortid,
    redirectUrl: redirectUrl,
    visitHistory: [],
    createdBy: req.user._id,
  });
  const allUrls = await URL.find({});

  // if (result) return res.status(200).json({ shortId: result.shortId, msg: "Url Inserted..." });
  const fullUrl = `${req.protocol}://${req.get("host")}/url/${shortid}`;
  console.log(fullUrl);
  if (result) return res.render("home", { shortUrl: fullUrl, urls: allUrls });
  else return res.status(400).json({ msg: "Something went wrong...."})
}

async function handleGetUrl(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  return res.redirect(entry.redirectUrl);
}

async function handleUrlAnalitics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  return res.status(200).json({
    totalClick: result.visitHistory.length,
    analitics: result.visitHistory,
  });
}

module.exports = {
  handleGenrateNewShortUrl,
  handleGetUrl,
  handleUrlAnalitics,
};
