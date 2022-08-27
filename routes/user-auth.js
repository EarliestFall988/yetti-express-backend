const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserLoggedIn = require("../models/UserLoginSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, userLoginValidation } = require("../validation");
const { required } = require("@hapi/joi");
const verify = require("./verifyToken");

router.post("/register", async (req, res) => {
  //validate the data before checking and creating the user

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.message);

  //does the email already exist?
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res
      .status(400)
      .send({ message: "email '" + req.body.email + "' already exists." });

  //hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //insert user
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
  } catch (err) {
    res.status(400).send(err);
  }

  //create token

  //confirmation
  res.send({
    message: {
      name: req.body.name,
      email: req.body.email,
    },
  });
});

//login
router.post("/login", async (req, res) => {
  //validation
  const { error } = userLoginValidation(req.body);
  if (error) return res.status(400).send(error.message);

  //email valid
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exist - register??");

  //Password valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid password");

  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  try {
    const loggedInUser = new UserLoggedIn({
      userLoggedIn: req.body.email,
      token: token,
    });

    const userSuccess = await loggedInUser.save();

    res.header("auth-token", token).status(200).send(token);
  } catch (err) {
    res.json({ err });
  }
});

//logout
router.get("/logout", verify, async (req, res) => {
  try {
    const authToken = req.header("auth-token");

    const user = await UserLoggedIn.findOneAndDelete({ token: authToken });
    return res.status(200).json(user);
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
