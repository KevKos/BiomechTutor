const { Router } = require('express');

const auth = Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcrypt');

//Models
const Admin = require('../models/admin');


// Local Modules
const email = require('../modules/email');


auth.post('/admin/create', [
    check('username').isAlphanumeric(),
    check('email').isEmail(),
    check('password').isLength({min:6, max: 20}).escape()
], (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!error.isEmpty()){
        res.json({errors: errors.array()});
    } else {
        var adminData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        Admin.create(adminData, function (err, admin) {
            if (err || !admin) {
                if(err.errors.email){
                    res.json({error: error.errors.email.message});
                } else {
                    res.json({errors: true});
                }
            } else {
                // made email sender to admin and to main account admin (aka me)
                email.adminCreateConfirmation (req.body.username, req.body.email, next);
                res.send(true);
            }
        })
    }
});

module.exports = auth;