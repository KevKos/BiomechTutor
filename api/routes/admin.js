const { Router } = require('express');
const admin = Router();
const { check, validationResult } = require('express-validator');


//Models
const Admin = require('../models/admin');
const Class = require('../models/class');
const Unit = require('../models/units');
const Question = require('../models/questions');

/*
  CREATE CLASS
*/
admin.post('/create/class', (req, res)  => {
  var classData = {
    title: req.body.class,
    adminCreator: req.body.admin,
  }
  Class.create(classData, function(err, user){
      res.send(true); //pass true to front end to redirect
  });
});

/*
  CREATE UNIT
*/
admin.post('/create/unit', (req, res)  => {
  var unitData = {
    title: req.body.unit,
    classAssignment: req.body.classId,
    adminCreator: req.body.adminId
  }
  Unit.create(unitData, function(err, user){
      res.send(true); //pass true to front end to redirect
  });
});

/*
  CREATE QUESTION
*/
admin.post('/create/question', (req, res)  => {
  var questionData = {
    unitAssignment: req.body.unit,
    solution: req.body.solution,
    classAssignment: req.body.class,
    adminCreator: req.body.admin,
    text: req.body.question,
    answer: req.body.answerNumber,
    units: req.body.answerUnits
  }
  Question.create(questionData, function(err, question){
      res.send(true); //pass true to front end to redirect
  });
});

/*
    GET CLASSES FOR ADMIN
*/
admin.get('/getClasses', (req,res)  =>  {
  Class.find({adminCreator: req.query.adminId}, function(err, classes){
      Unit.find({adminCreator: req.query.adminId}, function(err, units){
        Question.find({adminCreator: req.query.adminId}, function(err, questions){
          res.send({classes: classes, units: units, questions: questions})
        })
      })
  })
 
})

/*
    GET CLASSES FOR HEADER
*/
admin.get('/getClassesHeader', (req,res)  =>  {
  Class.find(function(err, classes){
    res.send(classes)
  })
 
})

/*
    GET CLASS INFORMATION
*/
admin.get('/classes/getClassInformation', (req,res)  =>  {
  Class.findById(req.query.id, function(err, classes){
    Unit.find({classAssignment: req.query.id}, function(err, units){
        res.send({classes: classes, units: units})
    })
  })
})

/*
    GET UNIT FOR QUESTIONS
*/
admin.get('/units/getUnitInformation', (req,res)  =>  {
  Unit.findById(req.query.id, function(err, units){
    Question.find({unitAssignment: req.query.id}, function(err, questions){
        res.send({unit: units, questions: questions})
    })
  })
})


module.exports = admin;

