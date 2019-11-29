require("dotenv").config();

const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// settings
const portNumber = process.env.DB_PORT || 4000;

// set up express app
const app = express();

// connect to mongodb
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
);
mongoose.Promise = global.Promise;

app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());

app.use("/api", routes);

// error handling middleware
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// listen for request
app.listen(portNumber, function() {
  console.log(`Listening for requests at ${portNumber}`);
});
