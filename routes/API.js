var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var Journey = require('../models/journey');
var User = require('../models/user');

// Auth
router.post('/iOS/auth/signin', function (req, res, next) {
  req.isAPI = true;

  passport.authenticate('local', function (err, user, info) {
    console.log(err, user, info);
  });
});

router.post('/iOS/auth/signup', function (req, res, next) {
  console.log(".post('/iOS/auth/signup'");
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

        if (user) {
          // Log the user in now that they have an account
          req.logIn(user, function (err) {
            if (err) throw err;

            User.findOne({'username': 'Alexander2475914@gmail.com'}, 'password', function (err, password) {
              console.log({
                "user": {
                  "id": user._id || '',
                  "first_name": user.first_name || '',
                  "last_name": user.last_name || '',
                  "email": user.email || '',
                  "password": user.password || '',
                  "parent_gender": user.parent_gender || '',
                  "address": {
                    "phone": user.address.phone || '',
                    "street": user.address.street || '',
                    "city": user.address.city || '',
                    "state": user.address.state || '',
                    "zip": user.address.zip || ''
                  }
                }
              });
              return res.json({
                "user": {
                  "id": user._id || '',
                  "first_name": user.first_name || '',
                  "last_name": user.last_name || '',
                  "email": user.email || '',
                  "password": user.password || '',
                  "parent_gender": user.parent_gender || '',
                  "address": {
                    "phone": user.address.phone || '',
                    "street": user.address.street || '',
                    "city": user.address.city || '',
                    "state": user.address.state || '',
                    "zip": user.address.zip || ''
                  }
                }
              });
            });
          });
        } else {
          return res.json({
            "success": false,
            "user": null
          });
        }
      })(req, res, next);
    }

    // req.logIn(user, function (err) {
    //   if (err) return next(err);
    //
    //   return res.json({
    //     "success": true,
    //     "user": {
    //       "id": user._id,
    //       "email": user.email,
    //       "firstName": user.first_name,
    //       "lastName": user.last_name
    //     }
    //   });
    // });
  })(req, res, next);
});

// Journeys
router.post('/journeys', function (req, res) {
  // Send over some journeys from the database
  Journey
    .find(function (err, journeys) {
      if (err) throw err;

      res.send(journeys);
    })
    .limit(30)
    .select({
      '_id': 1,
      'passport_id': 1,
      'title': 1,
      'body': 1,
      'traveler_name': 1,
      'password': 1
    });
});

module.exports = router;
