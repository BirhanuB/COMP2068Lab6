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
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        userModel.find({}, function (err, users) {
            if (err) {
                res.send('Error');
            }
            else if (users.length) {
                res.render('users', { users: users, user: req.user });
            }
            else {
                res.send('No users found');
            }
        });
    } else {
        res.redirect('/login');   
    }
});

module.exports = router;

