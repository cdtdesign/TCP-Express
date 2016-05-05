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

router.post('/signup', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/signin' }));


router.get('/signout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

router.get('/profile', function(req, res){
    res.render('profile');
  });

router.get('/twitter', passport.authenticate('twitter'));
router.get('/facebook', passport.authenticate('facebook'));

router.get('/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/auth/signin' }
));
router.get('/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/auth/signin' }
));

module.exports = router;
