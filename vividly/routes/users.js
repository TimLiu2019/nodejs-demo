const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require('config');

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(404).send(result.error);
  console.log(result.error);
  const bcrypt = require("bcrypt");
  let user = await User.findOne({ email: req.body.emal });
  if (user) return res.status(400).send("User already registered.");
  //    user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  //   });
  // or use pick
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  const token = user.generateAuthToken();
  //const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
  res.header('x-auth-token',token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
