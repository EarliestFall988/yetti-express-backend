const mongoose = require("mongoose");
const EntitySchema = require("../models/Entity").schema;

const SnapshotSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  creator: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  entities: {
    type: [EntitySchema],
  },
});

module.exports = mongoose.model("snapshots", SnapshotSchema);
