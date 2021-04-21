const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(404).send(result.error);
  console.log(result.error);
  const bcrypt = require("bcrypt");
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");
  const validPassword = bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send("Invalid email or password.");
  res.send(true);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
       password: Joi.string()
        .min(5)
        .max(255)
        .required(),
    });
    return schema.validate(req);
  }

module.exports = router;
