var express = require('express');
var router = express.Router();
var Journey = require('../models/journey.js');
var moment = require('moment');

/* GET blog page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    Journey.find({}).sort('-created_at').exec(function (err, journeys) {
      if (err) throw err;

      for (var i=0; i<journeys.length; i++) {
        journeys[i].friendlyDate = moment(journeys[i].date).fromNow();

        console.log('journeys[i].date:', JSON.stringify(journeys[i].date));
        console.log('journeys[i].friendlyDate', journeys[i].friendlyDate);
      }
      console.log('req.user.passport_id', req.user.passport_id);
      console.log('journeys:', JSON.stringify(journeys));
      res.render('blog', {
        "journeys": journeys
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
