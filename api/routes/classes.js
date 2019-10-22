const { Router } = require('express');

const classes = Router();

//models
const Admin = require('../models/admin');


/*
    GET CLASSES BY A SPECIFIC ADMIN (by username)
*/
classes.get('/admin', function(res){
    // console.log(JSON.stringify(admin))
    var username = res.locals.username;
    Admin.find({username: username}, function(err, classes){
        if(err || !classes){
        }else{
            console.log(classes)
            // res.send(classes);
        }
    }); //end of find
});

module.exports = classes;
