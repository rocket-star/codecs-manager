const mongoose = require("mongoose");
const log = require("../../log");
const multer = require("multer");
const jsxapi = require("jsxapi");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "client/dist/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }).single("file");

const Codec = require("../models/codec");

exports.get_all = (req, res, next) => {
  Codec.find()
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        codecs: docs
      });
    })
    .catch(err => {
      sendError(err, res);
    });
};

exports.create_codec = (req, res, next) => {
  Codec.find({ mac: req.body.mac })
    .exec()
    .then(codec => {
      if (codec.length >= 1) {
        return res.status(409).json({
          message: "Codec already exists"
        });
      } else {
        var feedbackMeetingEnabled = true;

        if (req.body.cloud) {
          feedbackMeetingEnabled = false;
        }

        const codec = new Codec({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          type: req.body.type,
          ip: req.body.ip,
          mac: req.body.mac,
          login: req.body.login,
          password: req.body.password,
          cloud: req.body.cloud,
          feedbackMeeting: feedbackMeetingEnabled
        });
        codec
          .save()
          .then(result => {
            res.status(201).json({
              message: "Codec created",
              codec: result
            });
          })
          .catch(err => {
            sendError(err, res);
          });
      }
    });
};

exports.get_codec = (req, res, next) => {
  Codec.findById(req.params.codecId)
    .exec()
    .then(codec => {
      if (!codec) {
        return res.status(404).json({
          message: "Codec not found"
        });
      }
      res.status(200).json({
        codec: codec
      });
    })
    .catch(err => {
      sendError(err, res);
    });
};

exports.get_codec_by_app = (req, res, next) => {
  switch (req.params.app) {
    case "presence":
      Codec.find({ peoplePresence: true })
        .exec()
        .then(docs => {
          res.status(200).json({
            count: docs.length,
            codecs: docs
          });
        })
        .catch(err => {
          sendError(err, res);
        });
      break;
    case "feedback":
      Codec.find({ feedbackMeeting: true })
        .exec()
        .then(docs => {
          res.status(200).json({
            count: docs.length,
            codecs: docs
          });
        })
        .catch(err => {
          sendError(err, res);
        });
      break;
    case "wallpaper":
      Codec.find({ bulkWallpaperPush: true })
        .exec()
        .then(docs => {
          res.status(200).json({
            count: docs.length,
            codecs: docs
          });
        })
        .catch(err => {
          sendError(err, res);
        });
      break;
  }
};

exports.get_codec_by_mac = (req, res, next) => {
  Codec.findOne({ mac: req.params.mac.toUpperCase() })
    .exec()
    .then(codec => {
      if (!codec) {
        return res.status(404).json({
          message: "Codec not found"
        });
      }
      res.status(200).json({
        codec: codec
      });
    })
    .catch(err => {
      sendError(err, res);
    });
};

exports.update_codec = (req, res, next) => {
  const id = req.params.codecId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Codec.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Codec updated"
      });
    })
    .catch(err => {
      sendError(err, res);
    });
};

exports.delete_codec = (req, res, next) => {
  Codec.remove({ _id: req.params.codecId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Codec deleted"
      });
    })
    .catch(err => {
      sendError(err, res);
    });
};

exports.uploadFile = (req, res, next) => {
  upload(req, res, function(err) {
    if (err) {
      sendError(err, res);
    }

    res.status(200).json({
      message: "File uploaded"
    });
  });
};

exports.uploadToCodec = (req, res, next) => {
  Codec.findOne({ _id: req.body._id })
    .exec()
    .then(codec => {
      if (!codec) {
        return res.status(404).json({
          message: "Codec not found"
        });
      }

      const xapi = jsxapi.connect("ssh://" + codec.ip, {
        username: codec.login,
        password: codec.password
      });

      xapi.on("error", err => {
        sendError(err, res);
      });

      xapi
        .command("Provisioning Service Fetch", {
          URL: req.body.filename,
          Checksum: req.body.checksum
        })
        .then(result => {
          res.status(200).json({
            result
          });
        })
        .catch(err => {
          sendError(err, res);
        });
    })
    .catch(err => {
      sendError(err, res);
    });
};

exports.restore_config = (req, res, next) => {
  Codec.findOne({ _id: req.params.codecId })
    .exec()
    .then(codec => {
      if (!codec) {
        return res.status(404).json({
          message: "Codec not found"
        });
      }

      const xapi = jsxapi.connect("ssh://" + codec.ip, {
        username: codec.login,
        password: codec.password
      });

      xapi.on("error", err => {
        sendError(err, res);
      });

      xapi
        .command("Provisioning Service Fetch", {
          URL: "http://websrv2:15161/uploads/defaultConfig.zip",
          Checksum:
            "bc243e4cd20581ade9ee396d474c4b29e146f8a4829eaba84898dbec85b4f0148c30da0a20ff1063bd4b20b25f2cb5c50b96e815dec8788b1aaf70f8fee24052"
        })
        .then(result => {
          res.status(200).json({
            result
          });
        })
        .catch(err => {
          sendError(err, res);
        });
    });
};

function sendError(err, res) {
  log.info(err);
  res.status(500).json({
    error: err
  });
}
