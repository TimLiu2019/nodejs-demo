const mongoose = require("mongoose");
const logger = require("./logger");
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/vividly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => logger.info("Connected to Mongodb ..."))
    .catch(() => console.error("Could not connect to mongodb"));
};
