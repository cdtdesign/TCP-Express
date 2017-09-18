var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var User = require('../models/user');

// Web: Native
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/signin', function(req, res) {
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

router.post('/signup', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/signup'
}));

router.get('/signout', function(req, res) {
  if (req.user) {
    req.logout();
  }
  res.redirect('/');
});

router.get('/profile', function(req, res) {
  res.render('profile');
});

// Web: Twitter
router.get('/twitter', passport.authenticate('twitter'));

// Web: Facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: [
    'user_birthday',
    'email'
  ]
}));

router.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/auth/signin'
  }
));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/signin'
  }
));

// iOS: Native
router.post('/iOS/signin', passport.authenticate('local'), function (req, res) {
  console.log('req.user:', req.user);
  res.json({
    "user": req.user
  });
});

router.post('/iOS/signup', function (req, res, next) {
  req.isAPI = true;

  // Tell the app if there's already a user with the email address provided
  User.count({
    username: req.body.username
  }, function (err, count) {
    if (count > 0) {
      // There's already a user with the email address provided
      return res.status(409).json({
        "message": "Someone is already using the provided email address."
      });
    } else {
      // Nobody has created an account with the provided
      // email address yet, so we'll make one now
      passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);

        // Log the user in now that they have an account
        req.logIn(user, function (err) {
          if (err) throw err;

          User.findOne({'username': 'Alexander2475914@gmail.com'}, 'password', function (err, password) {
            res.json({'user': user});
          });
        });
      })(req, res, next);
    }
  });
});

module.exports = router;
