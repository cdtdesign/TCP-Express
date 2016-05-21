var express = require('express');
var router = express.Router();
var Journey = require('../models/journey');

/* GET journey */
router.post('/create', function(req, res, next) {
  var newJourney = new Journey({
    passport_id: req.user.passport_id,
    traveler_name: req.user.traveler_name,
    title: req.body.title,
    date: req.body.date,
    body: req.body.body,
    header_image_filename: req.body.header_image,
    tags: req.body.tags
  });
  newJourney.save(function (err) {
    if (err) throw err;
    res.redirect ('/journeyblog');
  });
});

router.get('/get/:journey_id', function (req, res, next) {
  Journey.find({_id: req.params.journey_id}, function (err, journey) {
    if (err) throw err;
    res.json({'journey': journey[0]});
  });
});

router.post('/edit', function (req, res, next) {
  Journey.findOneAndUpdate({_id: req.body.journeyId}, {$set: {
    title: req.body.title,
    date: req.body.date,
    body: req.body.body,
    tags: req.body.tags
  }}, function (err) {
    if (err) throw err;
    res.redirect ('/journeyblog');
  });
});

router.get('/delete/:journey_id', function (req, res, next) {
  console.log('req.params:', req.params);
  console.log('req.user.passport_id:', req.user.passport_id);
  Journey.find({_id: req.params.journey_id}, function (err, currentJourney) {
    if (err) throw err;
    if (req.user.passport_id == currentJourney[0].passport_id) {
      Journey.remove({_id: req.params.journey_id}, function (err) {
        if (err) throw err;
        res.status(200).json ({
          message: 'Journey was deleted.'
        });
      });
    }
  });
});

module.exports = router;
