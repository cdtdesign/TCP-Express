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
router.post('/iOS/signin', function (req, res, next) {
  req.isAPI = true;

  passport.authenticate('local', function (err, user, info) {
    console.log(err, user, info);
  });
});

router.post('/iOS/signup', function (req, res, next) {
  req.isAPI = true;

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.json({
        "success": false,
        "error": err
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

    if (!user) {
      return res.json({
        "success": false,
        "user": null
      });
    }

    req.logIn(user, function (err) {
      if (err) return next(err);

      return res.json({
        "success": true,
        "user": {
          "id": user._id,
          "email": user.email,
          "firstName": user.first_name,
          "lastName": user.last_name
        }
      });
    });
  })(req, res, next);
});

module.exports = router;
