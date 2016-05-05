var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

router.get('/', function(req, res) {
    res.render('index');
  });

router.get('/signin', function(req, res){
  res.render('signin');
});

router.post('/signin', function(req, res) {
  res.redirect('/');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/signout', function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/profile', function(req, res){
    res.render('profile');
  });

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }
));
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }
));

module.exports = router;
