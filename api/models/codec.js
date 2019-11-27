const mongoose = require("mongoose");

const codecSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    ip: {
      type: String,
      required: true
    },
    mac: {
      type: String,
      required: true,
      unique: true
    },
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    feedbackMeeting: {
      type: Boolean,
      default: true
    },
    peoplePresence: {
      type: Boolean,
      default: true
    },
    bulkWallpaperPush: {
      type: Boolean,
      default: true
    },
    alertBot: {
      type: Boolean,
      default: true
    },
    cloud: {
      type: Boolean,
      default: false
    },
    floor: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
    proximity: {
      type: Number,
      required: true
    },
    error: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Codec", codecSchema);
