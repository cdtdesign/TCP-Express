var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET Sign In page. */
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.post('/signin',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/auth/signin',
                                   failureFlash: false })
);

router.post('/signup',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/auth/signup',
                                   failureFlash: false })
);

/* GET Sign Up page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', {  });
});

module.exports = router;
