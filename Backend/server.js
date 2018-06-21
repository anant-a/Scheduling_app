const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const port = process.env.PORT || 8080;
const router = express.Router();
const fs           = require('fs');

// Configuring Passport
const passport = require('passport');
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());





const request = require('./src/controllers/request.js')




app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


//middlewares

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