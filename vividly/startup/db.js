const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/vividly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => winston.info("Connected to Mongodb ..."))
    .catch(() => console.error("Could not connect to mongodb"));
};
