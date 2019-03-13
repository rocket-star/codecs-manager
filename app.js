const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const codecRoutes = require("./api/routes/codecs");
const userRoutes = require("./api/routes/user");

mongoose.connect(
  "mongodb://" + process.env.MONGO_DB_URL + "/codecs-manager",
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;

app.use(express.static("client/dist"));

app.use(morgan("common"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/codecs", codecRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

module.exports = app;
