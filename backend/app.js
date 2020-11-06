const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const postRoutes = require('./routes/posts');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
// Connectiong to mongoose
mongoose.connect('mongodb://localhost:27017/meanposts', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> {
    console.log('Database connected successfully');
  })
  .catch(()=> {
    console.log('Connection failed');
  });
// CORS setup
app.use((req, res ,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Access");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})
// Router
app.use('/api/posts', postRoutes);
module.exports = app;
