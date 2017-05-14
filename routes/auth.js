var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

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
router.post('/iOS/signup', function (req, res, next) {
  req.isAPI = true;

  passport.authenticate('local', {
    session: false
  }, function (err, user, info) {
    console.log(err, user, info);

    if (err) {
      return res.json({
        "success": false,
        "error": err
      });
    }

    if (!user) {
      return res.json({
        "success": false,
        "user": null
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.json({
        "success": true,
        "user": user
      });
    });
  })(req, res, next);
});

module.exports = router;
