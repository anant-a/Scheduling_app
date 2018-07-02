const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./src/config/database');

const port = process.env.PORT || 8080;
const router = express.Router();
//Initializing passport
app.use(passport.initialize());

const request = require('./src/controllers/request.js') //declaring a variable for routes and controller

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//middlewares
// Allowing CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, jwt");
  next();
});

router.use(function(req,res,next){
    console.log('This is working')
    next();
})

app.use('/api', router)
app.use('/api/request', request)

mongoose.connect('mongodb://127.0.0.1:27017/reqdb', () => {
  console.log('Success');
});

app.listen(port);
console.log('Magic happens on port '+ port);