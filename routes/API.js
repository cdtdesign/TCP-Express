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
    if (err) {
      return res.json({
        "success": false,
        "error": err
      });
    } else {
      req.logIn(user, function (err) {
        if (err) return next(err);

        User.findOne({'email': req.body.username}, function (err, userData) {
          return res.json({
            "user": {
              "id": userData._id || '',
              "passport_id": userData.passport_id || '',
              "first_name": userData.first_name || '',
              "last_name": userData.last_name || '',
              "email": userData.username || '',
              "password": userData.password || '',
              "parent_gender": userData.parent_gender || '',
              "address": {
                "phone": userData.address.phone || '',
                "street": userData.address.street || '',
                "city": userData.address.city || '',
                "state": userData.address.state || '',
                "zip": userData.address.zip || ''
              }
            }
          });
        });
      });
    }
  })(req, res, next);
});

router.post('/iOS/auth/signup', function (req, res, next) {
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
  })(req, res, next);
});

// Journeys
router.post('/iOS/journeys', function (req, res) {
  // Send over some journeys from the database
  Journey.find(function (err, journeys) {
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

router.post('/iOS/journeys/created', function (req, res) {
  // Send journeys created by the traveler
  Journey.find(function (err, journeys) {
    if (err) throw err;
    res.send(journeys);
  })
  .where('passport_id')
  .equals(req.body.passport_id)
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
