const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User, validate } = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(404).send(result.error);
  console.log(result.error);

  let user = await User.findOne({ email: req.body.emal });
  if (user) return res.status(400).send("User already registered.");
   user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user = await user.save();
  res.send(user);
});

module.exports = router;
