require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

require('./startup/routes')(app);

// process.on('uncaughtException',ex =>{
//   console.log('We got an uncaught exception');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

winston.handleExceptions( new winston.transports.File({filename: 'uncaughtExceptions.log'}));
process.on('unhandledRejection ',ex =>{
  console.log('We got an unhandled rejection');
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/vividly" , level: 'info'})
);

//throw new Error("Something failed during startup");
const p = Promise.reject(new Error('Something failed miseably!'));
p.then(( )=>console.log('Done'));
if (!config.get("jwtPrivateKey")) {
  console.error("jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vividly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to Mongodb ..."))
  .catch(() => console.error("Could not connect to mongodb"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` Listening on port ${port}...`));
