var express = require('express');
var router = express.Router();
var passport = require('passport');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tcp',
  password : process.env.TCP_DATABASE_PASSWORD,
  database : 'Passport'
});

router.get('/',
  function(req, res) {
    res.render('index', { user: req.user });
  });

router.get('/signin', function(req, res){
  res.render('signin');
});

router.post('/signin', function(req, res) {
  passport.authenticate('local', { failureRedirect: '/auth/signin' });
  console.log('Redirect to root');
  res.redirect('/');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {});
});

router.post('/signup', function(req, res, next) {
  // That MySQL query that
  // inserts to the database
  // if (req.params.password != req.params.confirm_password) {
  //   // The passwords don't match
  // } else {
    // The passwords do match
    connection.query('INSERT INTO travelers (email, password, first_name, last_name, traveler_name, traveler_gender, parent_gender) VALUES ("' + req.body.email + '", "' + req.body.password + '", "' + req.body.first_name + '", "' + req.body.last_name + '", "' + req.body.traveler_name + '", 3, 3)', function (err, results, fields) {
      if (err) throw err;
      console.log(results);
    });
  // }
  res.render('signup', {});
});

router.get('/signout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

module.exports = router;
