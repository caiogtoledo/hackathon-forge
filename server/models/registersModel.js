const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bat: {
      type: Number,
      required: true,
    },
    cpe: {
      type: Number,
      required: true,
    },
    lux: {
      type: Number,
      required: true,
    },
    tmp: {
      type: Number,
      required: true,
    },
    hum: {
      type: Number,
      required: true,
    },
    vol: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("registers", RegisterSchema);
