const mongoose = require("mongoose");
const snapshotSchema = require("./Snapshot").schema;
const usersSchema = require("./User").schema;

const SiteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now().toJSON,
  },
  owner: {
    type: String,
    required: true,
  },
  shared: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("sites", SiteSchema);
