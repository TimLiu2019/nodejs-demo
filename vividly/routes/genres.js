const express = require('express');
const router = express.Router();

const genres = [{ id: 1, name: "Action" }, { id: 2, name: "Comedy" }];

router.get("/", (req, res) => {
  res.send(genres);
});
router.get("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  res.send(genre);
});

router.post("/", (req, res) => {
  const result = validateGenre(req.body);
  if (result.error) return res.status(404).send(result.error);
  console.log(result.error);
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  // look up if this genre exist
  // if not 404
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  const result = validateGenre(req.body);

  if (result.error) return res.status(404).send(result.error);
  console.log(result.error.details);
  // update genre
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  // look up if this genre exist
  // if not 404
  console.log(" start to delete...");
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  
  const index = genres.indexOf(genre);
  console.log("index", index);
  genres.slice(index, 1);
  
  res.send(genre);
});
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });
  return schema.validate(genre);
}
module.exports = router;