const { getUser } = require('../service/auth');

async function restrictLoggedInUserOnly(req, res, next) {
  const userUId = req.cookies?.usid;
  if (!userUId) return res.redirect("/login");
  const user = getUser(userUId);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
    const userUId = req.cookies?.usid;
    const user = getUser(userUId);
    req.user = user;
    next();
}

module.exports = { restrictLoggedInUserOnly, checkAuth };