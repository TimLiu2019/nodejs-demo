const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");

router.get("/", async (req, res) => {
  throw new Error('Could not get the genres');
  const genres = await Genre.find().sort("name");
  res.send(genres);
});
router.get("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id);
  //  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(404).send(result.error);
  console.log(result.error);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const result = validate(req.body);

  if (result.error) return res.status(404).send(result.error);
  // console.log(result.error.details);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  // look up if this genre exist
  // if not 404
  //  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  // update genre
  // genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  // look up if this genre exist
  // if not 404
  console.log(" start to delete...");
  // const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  // const index = genres.indexOf(genre);
  // console.log("index", index);
  // genres.slice(index, 1);

  res.send(genre);
});

module.exports = router;
