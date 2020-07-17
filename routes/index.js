'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
 
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

/* POST for login */
//Try to login with passport
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/*Logout*/
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

/*POST for register*/
router.post('/register', function (req, res) {
    //Insert user
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        var registerUser = {
            username: req.body.username,
            password: hash
        }
        //console.log(registerUser);
        //Check if user already exists
        userModel.find({ username: registerUser.username }, function (err, user) {
            if (err) console.log(err);
            if (user.length) {
                console.log('Username already exists please login.');
                return res.redirect('/login');
            }
            const newUser = new userModel(registerUser);
            newUser.save(function (err) {
                console.log('Inserting');
                if (err) console.log(err);
                req.login(newUser, function (err) {
                    console.log('Trying to login');
                    if (err) console.log(err);
                    return res.redirect('/users');
                });
            });
        });
    })
});


/* GET for register */
router.get('/register', function (req, res) {
    res.render('register');
});

/* GET for login */
router.get('/login', function (req, res) {
    res.render('login');
});

/* GET for users 
router.get('/users', function (req, res) {
    res.render('users');
});*/

module.exports = router;
