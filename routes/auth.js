var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/signin', function(req, res) {
  console.log('flash(\'error\'):', flash('error'));
  res.render('signin', {message: req.flash('error')});
});

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/signin',
  failureFlash: true
}));

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local',
{ successRedirect: '/', failureRedirect: '/auth/signup' }));


router.get('/signout', function(req, res){
  if (req.user) {
    req.logout();
    // req.session.destroy();
  }
  res.redirect('/');
});

router.get('/profile', function(req, res){
    res.render('profile');
  });

router.get('/twitter', passport.authenticate('twitter'));
router.get('/facebook', passport.authenticate('facebook', { scope: ['user_birthday', 'email'] }));

router.get('/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/auth/signin' }
));
router.get('/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/auth/signin' }
));

module.exports = router;
