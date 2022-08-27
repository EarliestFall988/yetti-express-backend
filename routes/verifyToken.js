const { equal } = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const userLoggedIn = require("../models/UserLoginSchema");

module.exports = async function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const user = await userLoggedIn.findOne({ token: token });
    if (!user) return res.status(401).send("Access Denied");

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
