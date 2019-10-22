var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var AdminSchema = new mongoose.Schema ({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    classes: [
        {
            title: String,
            description : {type: String},
            units: [
                {
                    title: String,
                    description: {type: String},
                    questions: [
                        {
                            text: String,
                            // change picture to cdn
                            picture: {type: String},
                            answer: {type: String},
                            units: {type: String},
                            hint: {type: String},
                            // limit leading questions to 4
                            leadingQuestions: [
                                {
                                    question: String,
                                    option: [
                                        {
                                            answer: String,
                                            correct: Boolean,
                                            // change picture to cdn
                                            picture: String,
                                        }
                                    ]
                                }
                            ],
                        }
                    ]
                }
            ]
        }
    ]
})

// authenticate login against database
AdminSchema.statics.authenticate = function (email, password, callback) { //pass in email, password and callback fucntion
    Admin.findOne({ email: email })  //find an that has matching email to one entered in login form
      .exec(function (err, admin) {
        if (err || !admin) {
          callback(err)  //if error (no admin email that matches), return
        }else{
          //use bcrypt to compare entered password to the database password
          bcrypt.compare(password, admin.password, function (err, result) {
            if (result === true) {
              callback(null, admin);
            } else {
              callback('password no match');
            }
          });
        }      
      });
  }
  
  
  //hashing a password before saving it to the database
  AdminSchema.pre('save', function (next) {
    var admin = this;
    bcrypt.hash(admin.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      admin.password = hash;
      next();
    })
  });

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;