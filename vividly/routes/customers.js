const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {Customer, validate} = require("../models/customer");


router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});
router.get("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id);
  //  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!customer)
    return res.status(404).send("The genre with given id was not found");

  res.send(customer);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(404).send(result.error);
  console.log(result.error);
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const result = validate(req.body);

  if (result.error) return res.status(404).send(result.error);
  // console.log(result.error.details);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("The genre with given id was not found");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  // look up if this  exist
  // if not 404
  console.log(" start to delete...");
  // const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!customer)
    return res.status(404).send("The course with given id was not found");

  res.send(customer);
});

module.exports = router;
