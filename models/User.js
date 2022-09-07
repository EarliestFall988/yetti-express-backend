const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    last: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    nick: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now().toJSON,
  },
});

module.exports = mongoose.model("User", userSchema);
