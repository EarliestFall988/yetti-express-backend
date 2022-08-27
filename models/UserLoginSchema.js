const { date } = require("@hapi/joi");
const mongoose = require("mongoose");
const userSchema = require("./User").schema;

const UserLoginSchema = mongoose.Schema({
  userLoggedIn: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  timeLoggedIn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userLoginSchema", UserLoginSchema);
