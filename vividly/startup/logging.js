const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  process.on("unhandledRejection ", ex => {
    console.log("We got an unhandled rejection");
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vividly",
      level: "info"
    })
  );
};
