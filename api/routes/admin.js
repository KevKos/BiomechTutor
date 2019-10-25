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
    classAssignment: req.body.classId
  }
  Unit.create(unitData, function(err, user){
      res.send(true); //pass true to front end to redirect
  });
});

/*
    GET CLASSES FOR ADMIN
*/
admin.get('/getClasses', (req,res) =>  {
  Class.find({adminCreator: req.query.adminId}).lean().exec(function(err, classes) {
    if(err || !classes){
      console.log(err);
      res.json({error:true});
    }else{
      classes.forEach(element => {
        Unit.find({classAssignment: element._id}).lean().exec(function(err, units) {
          if(err || !units){
            console.log(err);
            res.json({error:true});
          }else{
              units.forEach (element => {
                Question.find({unitAssignment: element._id}).lean().exec(function(err, questions) {
                  if(err || !questions){
                    console.log(err);
                    res.json({error:true});
                  }else{
                      // element.questions = ['test'];
                  }
                });
                element.questions = []
                element.questions.push = 'test'
              })
              // adds each unit to the class
              element.units = units;
              var newClasses = element;
              console.log(newClasses) 
              res.send(newClasses)   
          }
        });
      });
    }
  });
})



/*
    GET UNITS FOR CLASS
*/
admin.get('/getUnits', (req,res) =>  {
  console.log('success 1')
  Unit.find({classAssignment: req.query.classId}, function(err, units) {
      if(err || !units){
          console.log(err);
          res.json({error:true});
      }else{
          res.send({units});
      }
  })
})

module.exports = admin;

