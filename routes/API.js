var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var Journey = require('../models/journey');

router.get('/journeys', function (req, res) {
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
      'traveler_name': 1
    });
});

module.exports = router;
