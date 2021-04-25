require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
const mongoose = require("mongoose");
const config = require('config');
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

 winston.add(new winston.transports.File({ filename: 'logfile.log' }));

if(!config.get('jwtPrivateKey')) {
  console.error('jwtPrivateKey is not defined.');
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
