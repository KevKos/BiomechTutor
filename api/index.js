var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 //Initial Database Setup - logs connection to console
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
//  database connection
const mongoUri = 'mongodb://localhost/biomechanics';  //development


var mongoOptions =  {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, autoReconnect: true, };
mongoose.connect(mongoUri, mongoOptions);
var db = mongoose.connection;

 //handle mongo error
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('openUri', function  ()  {
   // we're connected!
     db.db.stats(function(err, stats) {
       console.log(stats);
   });
 });

 //use sessions
//  app.use(session({
//    secret: process.env.SESSION_SECRET,
//    secure: true, //cookies only available over https
//    cookie: {httpOnly: true, secure: true},
//    resave: true,
//    cookie: {maxAge:60 * 60 * 1000},//expires: true, maxAge: expiryDate}, //set rolling logout to 15mins
//    saveUninitialized: true,
//    store: new MongoStore({
//      mongooseConnection: db
//    })
//  }));


//models
const auth = require('./routes/auth');
app.use('/auth', auth);

app.use((err,req,res,next)  =>  {
  console.log('At error handler');
  console.log(err);
  if(err.name == 'TokenExpiredError'){
    // res.status(401).send({error: 'Login timed out. Please login again'});
    res.sendStatus(401);
  }else{
    res.json({error: true});
  }

})

module.exports = {
    path: "/api/",
    handler: app
}

