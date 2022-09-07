const mongoose = require("mongoose");
const snapshotSchema = require("./Snapshot").schema;
const EntitySchema = require("./Entity").schema;
const CameraLocationSchema = require("./CameraLocation").schema;

const SiteDataSchema = mongoose.Schema({
  siteID: {
    type: String,
    required: true,
  },
  entites: [{ type: EntitySchema }],
  snapshots: [{ type: snapshotSchema }],
  cameraLocation: {
    type: String,
    minLength: 11,
    maxLength: 20,
  },
});

module.exports = mongoose.model("siteData", SiteDataSchema);
