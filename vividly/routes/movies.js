const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require('../middleware/auth');

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});
router.get("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with given id was not found");

  res.send(movie);
});

router.post("/",auth, async (req, res) => {
    console.log('genreId',req.body.genreId);
  const result = validate(req.body);
  if (result.error) return res.status(404).send(result.error.details[0].message);
  console.log(result.error);

  const genre = await Genre.findById(req.body.genreId);
  console.log('genre',genre.name);
  if (!genre)
    return res.status(404).send("Invalid genre");


  let movie = new Movie({
    title: req.body.title,
    genre: {
        _id: genre._id,
        name:genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const result = validate(req.body);

  if (result.error) return res.status(404).send(result.error);
  // console.log(result.error.details);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  // look up if this  exist
  // if not 404
  console.log(" start to delete...");

  if (!movie)
    return res.status(404).send("The movie with given id was not found");

  res.send(movie);
});

module.exports = router;
