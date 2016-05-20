var express = require('express');
var router = express.Router();
var Journey = require('../models/journey.js');
var moment = require('moment');

/* GET blog page. */
router.get('/', function(req, res, next) {
  Journey.find({}).sort('-created_at').exec(function (err, journeys) {
    if (err) throw err;

    for (var i=0; i<journeys.length; i++) {
      journeys[i].friendlyDate = moment(journeys[i].date).fromNow()
    }

    res.render('blog', {
      "journeys": journeys
    });
  });
});

module.exports = router;
