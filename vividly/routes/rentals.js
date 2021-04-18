const { Rental, validateRental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  console.log("movieId", req.body.movieId);
  console.log("customerId", req.body.customerId);
  const result = validateRental(req.body);
  if (result.error)
    return res.status(404).send(result.error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  /* without roll back if failed */
  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(rental);

  /** mongoose transacions */
  // const session = await mongoose.startSession();
  // session.startTransaction();
  // try {
  //   const customer = await Customer.findOne({'_id': req.body.customerId}).session(session);
  //   const movie = await Movie.findOne({'_id': req.body.movieId}).session(session);
  //   let rental = new Rental({
  //     customer: {
  //       _id: customer._id,
  //       name: customer.name,
  //       phone: customer.phone
  //     },
  //     movie: {
  //       _id: movie._id,
  //       title: movie.title,
  //       dailyRentalRate: movie.dailyRentalRate
  //     }
  //   });
  //   rental = await rental.save();
  //   movie.numberInStock--;
  //   movie.save();

  //   // commit the changes if everything was successful
  //   await session.commitTransaction();
  // } catch (error) {
  //   // if anything fails above just rollback the changes here

  //   // this will rollback any changes made in the database
  //   await session.abortTransaction();

  //   // logging the error
  //   console.error(error);

  //   // rethrow the error
  //   throw error;
  // } finally {
  //   // ending the session
  //   session.endSession();
  //   console.log('session end');
  // }
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;
