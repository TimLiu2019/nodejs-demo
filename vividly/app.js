require("express-async-errors");
require("winston-mongodb");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");

// process.on('uncaughtException',ex =>{
//   console.log('We got an uncaught exception');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

//throw new Error("Something failed during startup");
// const p = Promise.reject(new Error("Something failed miseably!"));
// p.then(() => console.log("Done"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` Listening on port ${port}...`));
