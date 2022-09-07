const mongoose = require("mongoose");

const CameraLocationSchema = mongoose.Schema({
  xLoc: {
    type: Number,
    default: 0,
  },
  yLoc: {
    type: Number,
    default: 0,
  },
  zLoc: {
    type: Number,
    default: 0,
  },
  xRot: {
    type: Number,
    default: 0,
  },
  yRot: {
    type: Number,
    default: 0,
  },
  zRot: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("cameraLocation", CameraLocationSchema);
