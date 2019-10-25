const { Router } = require('express');

const auth = Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcrypt');

//Models
const Admin = require('../models/admin');

// Local Modules
const email = require('../modules/email');

// create admin account
auth.post('/admin/create', [
    check('username').isAlphanumeric(),
    check('email').isEmail(),
    check('password').isLength({ min: 6, max: 20}).escape()
  ],  (req,res, next)  => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
      res.json({ errors: errors.array()  });
    } else{
      var adminData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
      Admin.create(adminData, function(err, user){
          res.send(true); //pass true to front end to redirect
      });
    }  
});

// log in
auth.post('/login', function(req,res,next) {
    Admin.authenticate(req.body.email, req.body.password, function (err, admin) { //authenticate using function in user.js
        if (err) {
         if(err == 'password no match'){
            res.json({error: true, msg: 'password'});
          }
        } else {
          sendAuthToken(admin, 'admin', req, res);
        }
    });
});

// logout
auth.get('/logout', function(req,res){
    console.log('logging out');
    delete req.session;
    res.send(true);
  });

function sendAuthToken(account, type, req, res){
    var user_secure = null;
    console.log(account)
    jwt.sign(
      {_id: account._id,
       account: type},
       process.env.TOKEN_SECRET, {expiresIn: '2h'},
       function(err, token){
    if(err){console.log(err);}
    // req.session.accessToken = token;
    token = 'someToken'; // set token to something random because it wasnt working
    if(type === 'admin'){
        // right now only brining back id, email and username
        user_secure = ((
        {_id, email, username, classes})   =>      //this line dictactes the key's being picked from the object
            ({_id, email, username, classes}))(account);
            user_secure.admin = true;      
    }
    user_secure.token = token;
    res.send(user_secure);   //send user back to store -> auth/login
    }); 
  }

module.exports = auth;