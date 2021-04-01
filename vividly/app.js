const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
const genres =[{id:1, name:'Action'},
               {id:2, name:'Comedy'}
];

app.get('/vividly/api/genres', (req,res) =>{
res.send(genres);
});
app.get('/vividly/api/genres/:id', (req,res) =>{
 const genre= genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('The genre with given id was not found');

    res.send(genre);
    });

app.post('/vividly/api/genres', (req,res) =>{

    const result = validateGenre(req.body);
   if(result.error) return res.status(404).send(result.error);
   console.log(result.error);
    const genre = {
        id : genres.length +1,
        name:req.body.name
    }
    genres.push(genre);
    res.send(genre);
}


);

app.put('/vividly/api/genres/:id', (req,res) =>{
  // look up if this genre exist
  // if not 404
  const genre= genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('The genre with given id was not found');
  
  const result = validateGenre(req.body);

   if(result.error) return res.status(404).send(result.error);
   console.log(result.error.details);
    // update genre
     genre.name = req.body.name
    res.send(genre);
});

function validateGenre(genre){
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });
  return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(` Listening on port ${port}...`));