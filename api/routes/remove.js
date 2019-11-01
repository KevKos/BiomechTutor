const { Router } = require('express');
const remove = Router();
const { check, validationResult } = require('express-validator');
var mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


//Models
const Class = require('../models/class');
const Unit = require('../models/units');
const Question = require('../models/questions');

/*
  REMOVE CLASS (and associated units and questions)
*/
remove.post('/class', (req, res)  => {
    Class.deleteOne({_id: ObjectId(String(req.body.id))}, function(err, question) {
        if(err || !question) {
            console.log(err);
        }else{
        }
    })
    Unit.deleteMany({classAssignment: ObjectId(String(req.body.id))}, function(err, question) {
        if(err || !question) {
            console.log(err);
        }else{
        }
    })
    Question.deleteMany({classAssignment: ObjectId(String(req.body.id))}, function(err, question)   {
        if(err || !question) {
            console.log(err);
        }else{
            res.send(true)
        }
    })
 
});

/*
  REMOVE UNIT (and associated questions)
*/
remove.post('/unit', (req, res)  => {
    Unit.deleteOne({_id: ObjectId(String(req.body.id))}, function(err, question) {
        if(err || !question) {
            console.log(err);
        }else{
            // res.send(true)
            //account has successfully been deleted
        }
    })
    Question.deleteMany({unitAssignment: ObjectId(String(req.body.id))}, function(err, question)   {
        if(err || !question) {
            console.log(err);
        }else{
            res.send(true)
            //account has successfully been deleted
        }
    })
 
});


/*
  REMOVE QUESTION 
*/
remove.post('/question', (req, res)  => {
    Question.deleteOne({_id: ObjectId(String(req.body.id))}, function(err, question)   {
        if(err || !question) {
            console.log(err);
        }else{
            res.send(true)
            //account has successfully been deleted
        }
    })
});




module.exports = remove;

