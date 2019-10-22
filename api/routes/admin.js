const { Router } = require('express');
const admin = Router();
const { check, validationResult } = require('express-validator');

//Models
const Admin = require('../models/admin');

/*
  CREATE CLASS
*/
admin.post('/create/class', (req, res)  => {
  Admin.updateOne(
    {username: req.body.username},
    {$push: 
      {
      classes: {title: req.body.class}
      }
    }, function(err){
      if(err){
        console.log(err);
      }
      else{
      }
    });
}); 

module.exports = admin;

