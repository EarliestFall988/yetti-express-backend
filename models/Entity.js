const mongoose = require("mongoose");

const EntitySchema = mongoose.Schema({
  ids: {
    instance: {
      type: String,
      required: true,
      min: 32,
      max: 40,
    },
    entity: {
      type: String,
      required: true,
      min: 32,
      max: 40,
    },
  },
  location: [{ type: Number, required: true }],
  rotation: [{ type: Number, required: true }],
  scale: [{ type: Number, required: true }],
  properties: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("entities", EntitySchema);
