var express = require('express');
var router = express.Router();
var Journey = require('../models/journey.js');
var moment = require('moment');
var swig = require('swig');

/* GET blog page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    swig.setFilter('userLikes', function(journeyPassportID) {
      // if (req.user.journeys_liked.indexOf(journeyPassportID) != -1) {
      //   return 'liked';
      // }
    });

    Journey.find({}).sort('-created_at').exec(function (err, journeys) {
      if (err) throw err;

      for (var i=0; i<journeys.length; i++) {
        journeys[i].friendlyDate = moment(journeys[i].date).fromNow();
      }

      res.render('blog', {
        "journeys": journeys
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
