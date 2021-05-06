const logger = require('./startup/logger');
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
// process.on('uncaughtException',ex =>{
//   console.log('We got an uncaught exception');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

//throw new Error("Something failed during startup");
// const p = Promise.reject(new Error("Something failed miseably!"));
// p.then(() => console.log("Done"));

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(` Listening on port ${port}...`));
