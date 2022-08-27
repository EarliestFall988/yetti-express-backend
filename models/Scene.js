const mongoose = require("mongoose");
const snapshotSchema = require("../models/Snapshot").schema;
const usersSchema = require("../models/User").schema;

const SceneSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  snapshots: [{ type: snapshotSchema, required: true }],
  owner: {
    type: String,
    required: true,
  },
  shared: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("scenes", SceneSchema);
