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
})

// authenticate login against database
AdminSchema.statics.authenticate = function (username, password, callback) { //pass in email, password and callback fucntion
    Admin.findOne({ username: username })  //find an that has matching email to one entered in login form
      .exec(function (err, admin) {
        if (err || !admin) {
          callback(err)  //if error (no admin email that matches), return
        }else{
              if (password == admin.password) {
                callback(null, admin)
              } else {
                callback(err)
              }
            }      
      });
  }
  


var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;