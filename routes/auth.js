var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET Sign In page. */
// router.get('/signin', function(req, res, next) {
//   res.render('signin');
// });
//
// /* GET Sign Up page. */
// router.get('/signup', function(req, res, next) {
//   res.render('signup', {  });
// });

// Define routes.
router.get('/',
  function(req, res) {
    res.render('index', { user: req.user });
  });

router.get('/signin',
  function(req, res){
    res.render('signin');
  });

router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/');
  });
// router.post('/signin', function (req, res) {
//   res.send('it\'s here.');
// })

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
