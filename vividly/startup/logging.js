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

  //   const logger = winston.createLogger({
  //     level: "info",
  //     format: winston.format.json(),
  //     defaultMeta: { service: "user-service" },
  //     transports: [
  //       //
  //       // - Write to all logs with level `info` and below to `combined.log`
  //       // - Write all logs error (and below) to `error.log`.
  //       //
  //       new winston.transports.File({ filename: "error.log", level: "error" }),
  //       new winston.transports.File({ filename: "combined.log" }),
  //       new winston.transports.Console({ format: winston.format.json() })
  //     ]
  //   });
  //   winston.add(logger);
  if (process.env.LOG_CONSOLE_TRANSPORT === "true") {
    const myFormat = printf(formatLogMessage);

    winston.add(
      new transports.Console({
        level: process.env.LOG_CONSOLE_TRANSPORT_LEVEL,
        format: combine(colorize(), myFormat)
      })
    );
  }
  if (process.env.LOG_FILE_TRANSPORT === "true") {
    winston.add(
      new transports.File({
        level: process.env.LOG_FILE_TRANSPORT_LEVEL,
        format: format.json(),
        filename: "combined.log"
      })
    );

    winston.add(
      new transports.File({
        level: process.env.LOG_FILE_TRANSPORT_LEVEL,
        format: format.json(),
        filename: "combined.log"
      })
    );
  }

  // winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vividly",
      level: "info"
    })
  );
};
