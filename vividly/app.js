const mongoose = require('mongoose');
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers= require("./routes/customers");
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);

mongoose.connect('mongodb://localhost/vividly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 

  })
  .then(()=> console.log('Connected to Mongodb ...'))
  .catch(()=> console.error('Could not connect to mongodb'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` Listening on port ${port}...`));
