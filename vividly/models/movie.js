const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre } = require("./genre");


const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    genre: { type: Genre },
    numberInStock: { type: Number, required: true, default:0 },
    dailyRentalRate: { type: Number, required: true, default:0 }
  });
  const Movie = mongoose.model("Movie", customerMovie);

  function validateMovie(movie) {
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(50)
        .required(),
      numberInStock: Joi.number(),
      dailyRentalRate: Joi.number()
    });
    return schema.validate(movie);
  }

  exports.Movie = Movie;
  exports.validate = validateMovie;