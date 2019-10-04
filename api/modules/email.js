var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken')

function  adminCreateConfirmation (username, email) {
    // var emailToken = jwt.sign(
    //   {
    //     user: username,
    //     type: 'user'
    //   },
    //     process.env.EMAIL_SECRET,
    //   {
    //     // email expires in 1 day
    //     expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
    //   });

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'kevindkos@gmail.com',
               pass: 'Erinpente#24'
           }
       });

       const mailOptions = {
        from: email, // sender address
        to: 'kdkos@hotmail.com', // list of receivers
        subject: 'Smart Tutor Email', // Subject line
        html: '<p>this is a test</p>'// plain text body
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });

};

module.exports.adminCreateConfirmation = adminCreateConfirmation;