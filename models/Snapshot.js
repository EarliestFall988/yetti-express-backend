const mongoose = require("mongoose");
const EntitySchema = require("../models/Entity").schema;

const SnapshotSchema = mongoose.Schema({
  id: String,
  entities: {
    type: [EntitySchema],
  },
});

module.exports = mongoose.model("snapshots", SnapshotSchema);
