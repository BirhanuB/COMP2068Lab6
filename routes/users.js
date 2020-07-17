'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');

/* GET for users 
router.get('/users', function (req, res) {
    res.render('users');
});

module.exports = router;

*/
router.get('/users', function (req, res) {
    userModel.find({}, function (err, users) {
        if (err) {
            res.send('Error');
        }
        else if (users.length) {
            console.log(users);
            res.json(users);
        }
        else {
            res.send('No users found');
        }
    });
});

module.exports = router;

